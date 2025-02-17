---
title: "CERT Java Checker"
date: 2025-02-17
categories: ["Checker"]
tags: ["CERT", "Java","Checker"]
---



# CERT SER03-J : Do not serialize unencrypted sensitive data. 

죄송합니다. 이전에 제공된 정보에서 혼란을 드려 죄송합니다. CERT Java 보안 코딩 표준에서 **SER03-J: 민감한 데이터를 암호화하지 않고 직렬화하지 마십시오**라는 규칙은 민감한 정보가 직렬화 과정에서 노출되지 않도록 보호하기 위한 지침을 제공합니다.

### 취약한 코드 예시

아래 코드는 사용자의 비밀번호를 평문으로 직렬화하여 파일에 저장하는 취약한 예제입니다.

```java
import java.io.*;

public class UserInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    private String username;
    private String password; // 민감한 데이터

    public UserInfo(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // getter 및 setter 생략

    public static void main(String[] args) {
        UserInfo user = new UserInfo("user1", "password123");

        // 객체를 파일에 직렬화
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("user.ser"))) {
            oos.writeObject(user);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

위 코드에서는 `UserInfo` 객체를 직렬화하여 `user.ser` 파일에 저장합니다. 그러나 `password` 필드는 암호화되지 않은 상태로 저장되므로, 파일이 유출되면 비밀번호가 노출될 수 있습니다.

### 안전한 코드 예시

민감한 데이터를 보호하기 위해서는 직렬화 전에 암호화하고, 역직렬화 후에는 복호화하는 과정이 필요합니다.

```java
import java.io.*;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class SecureUserInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    private String username;
    private transient String password; // 직렬화에서 제외

    private static final String ALGORITHM = "AES";
    private static final byte[] KEY = new byte[]{ /* 16바이트 키 */ };

    public SecureUserInfo(String username, String password) {
        this.username = username;
        this.password = encrypt(password);
    }

    private String encrypt(String data) {
        try {
            SecretKeySpec secretKey = new SecretKeySpec(KEY, ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedData = cipher.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(encryptedData);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String decrypt(String encryptedData) {
        try {
            SecretKeySpec secretKey = new SecretKeySpec(KEY, ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decodedData = Base64.getDecoder().decode(encryptedData);
            byte[] decryptedData = cipher.doFinal(decodedData);
            return new String(decryptedData);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private void writeObject(ObjectOutputStream oos) throws IOException {
        oos.defaultWriteObject();
        oos.writeObject(encrypt(password));
    }

    private void readObject(ObjectInputStream ois) throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        String encryptedPassword = (String) ois.readObject();
        this.password = decrypt(encryptedPassword);
    }

    // getter 및 setter 생략

    public static void main(String[] args) {
        SecureUserInfo user = new SecureUserInfo("user1", "password123");

        // 객체를 파일에 직렬화
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("secure_user.ser"))) {
            oos.writeObject(user);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 파일에서 객체를 역직렬화
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("secure_user.ser"))) {
            SecureUserInfo deserializedUser = (SecureUserInfo) ois.readObject();
            System.out.println("Username: " + deserializedUser.getUsername());
            System.out.println("Password: " + deserializedUser.getPassword());
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

이 코드에서는 `password` 필드를 `transient`로 선언하여 직렬화에서 제외하고, 커스텀 `writeObject` 및 `readObject` 메서드를 통해 암호화된 비밀번호를 처리합니다. 이렇게 하면 직렬화된 데이터에 민감한 정보가 암호화되어 저장되므로, 데이터 유출 시에도 안전성을 높일 수 있습니다.

**주의**: 위 예제에서 사용된 키(`KEY`)는 실제 환경에서는 안전한 키 관리 방안을 통해 보호되어야 합니다. 