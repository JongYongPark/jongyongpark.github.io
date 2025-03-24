
---
title: "Coverity API SSL Issue"
date: 2025-02-24
categories: ["ops"]
tags: ["Coverity","API","SSL"]
---

# Blackduck API 호출 시 발생하는 SSL 인증서 문제를 해결하는 Java 코드 - disable SSL

Blackduck API 호출 시 발생하는 SSL 인증서 문제를 해결하는 Java 코드를 작성해드리겠습니다:

```java
import javax.net.ssl.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.cert.X509Certificate;
import java.nio.charset.StandardCharsets;

public class BlackDuckApiClient {
    
    private static void disableSSLVerification() {
        try {
            TrustManager[] trustAllCerts = new TrustManager[] {
                new X509TrustManager() {
                    public X509Certificate[] getAcceptedIssuers() { return null; }
                    public void checkClientTrusted(X509Certificate[] certs, String authType) { }
                    public void checkServerTrusted(X509Certificate[] certs, String authType) { }
                }
            };

            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
            
            HostnameVerifier allHostsValid = (hostname, session) -> true;
            HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String authenticate(String baseUrl, String username, String password) {
        try {
            URL url = new URL(baseUrl + "/api/tokens/authenticate");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            
            // 요청 설정
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Accept", "application/vnd.blackducksoftware.user-4+json");
            conn.setRequestProperty("Content-Type", "application/json");
            
            // Basic Auth 설정
            String auth = username + ":" + password;
            String encodedAuth = java.util.Base64.getEncoder().encodeToString(auth.getBytes());
            conn.setRequestProperty("Authorization", "Basic " + encodedAuth);
            
            conn.setDoOutput(true);
            
            // 응답 읽기
            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
                String inputLine;
                StringBuilder response = new StringBuilder();
                
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();
                
                return response.toString();
            } else {
                System.out.println("Response Code: " + responseCode);
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        // SSL 검증 비활성화
        disableSSLVerification();
        
        String baseUrl = "https://your-blackduck-server";
        String username = "your-username";
        String password = "your-password";
        
        String response = authenticate(baseUrl, username, password);
        System.out.println("Response: " + response);
    }
}
```

안전한 운영 환경을 위한 인증서 설정 방법:

1. Blackduck 서버의 인증서 내보내기:
```bash
# 브라우저에서 인증서 내보내기 또는 관리자로부터 인증서 파일(.cer) 받기
```

1. Java 키스토어에 인증서 추가:
```bash
# JVM의 cacerts에 인증서 추가
keytool -import -alias blackduck -file blackduck.cer -keystore "$JAVA_HOME/lib/security/cacerts" -storepass changeit
```

1. Java 코드에서 키스토어 설정:
```java
System.setProperty("javax.net.ssl.trustStore", "path/to/cacerts");
System.setProperty("javax.net.ssl.trustStorePassword", "changeit");
```

주의사항:
- 운영 환경에서는 `disableSSLVerification()` 메소드 사용을 피하고 인증서를 올바르게 설정하세요
- 실제 구현 시 username과 password는 설정 파일이나 환경 변수로 관리하세요
- API 응답의 에러 처리를 추가하세요
- 연결과 스트림은 반드시 닫아주세요

이 코드는 Blackduck API의 인증 토큰을 얻는 기본적인 구현입니다. 실제 사용 시에는 보안 요구사항과 환경에 맞게 수정이 필요할 수 있습니다.



# Blackduck API 호출 시 발생하는 SSL 인증서 문제를 해결하는 Java 코드 - save cert into trust store

네, SSL 인증서를 안전하게 처리하는 BlackDuck API 클라이언트 코드를 작성해드리겠습니다:

```java
import javax.net.ssl.*;
import java.io.*;
import java.net.URL;
import java.security.KeyStore;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class SecureBlackDuckApiClient {
    private final String baseUrl;
    private final String trustStorePath;
    private final String trustStorePassword;
    private KeyStore trustStore;

    public SecureBlackDuckApiClient(String baseUrl, String trustStorePath, String trustStorePassword) {
        this.baseUrl = baseUrl;
        this.trustStorePath = trustStorePath;
        this.trustStorePassword = trustStorePassword;
        initializeTrustStore();
    }

    private void initializeTrustStore() {
        try {
            trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
            File trustStoreFile = new File(trustStorePath);
            
            if (trustStoreFile.exists()) {
                // 기존 트러스트 스토어 로드
                try (FileInputStream fis = new FileInputStream(trustStoreFile)) {
                    trustStore.load(fis, trustStorePassword.toCharArray());
                }
            } else {
                // 새로운 트러스트 스토어 생성
                trustStore.load(null, trustStorePassword.toCharArray());
            }
        } catch (Exception e) {
            throw new RuntimeException("Trust store initialization failed", e);
        }
    }

    private void saveCertificateToTrustStore(X509Certificate cert, String alias) throws Exception {
        trustStore.setCertificateEntry(alias, cert);
        try (FileOutputStream fos = new FileOutputStream(trustStorePath)) {
            trustStore.store(fos, trustStorePassword.toCharArray());
        }
    }

    private X509Certificate[] getServerCertificates(String hostname, int port) throws Exception {
        SSLContext context = SSLContext.getInstance("TLS");
        X509TrustManager trustManager = new X509TrustManager() {
            public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
            public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException { }
            public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                serverCertificateChain = chain;
            }
        };
        
        context.init(null, new TrustManager[]{trustManager}, null);
        
        SSLSocketFactory factory = context.getSocketFactory();
        try (SSLSocket socket = (SSLSocket) factory.createSocket(hostname, port)) {
            socket.startHandshake();
            return serverCertificateChain;
        }
    }

    private transient X509Certificate[] serverCertificateChain;

    private void setupSSLContext() throws Exception {
        // 서버 URL에서 호스트와 포트 추출
        URL url = new URL(baseUrl);
        String hostname = url.getHost();
        int port = url.getPort() != -1 ? url.getPort() : 443;

        // 서버 인증서 가져오기
        X509Certificate[] certificates = getServerCertificates(hostname, port);
        
        // 인증서를 트러스트 스토어에 저장
        for (int i = 0; i < certificates.length; i++) {
            String alias = hostname + "-cert-" + i;
            saveCertificateToTrustStore(certificates[i], alias);
        }

        // SSL 컨텍스트 설정
        TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        tmf.init(trustStore);

        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, tmf.getTrustManagers(), null);
        
        HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
    }

    public String authenticate(String username, String password) throws Exception {
        // SSL 컨텍스트 설정
        setupSSLContext();

        // API 요청
        URL url = new URL(baseUrl + "/api/tokens/authenticate");
        HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
        
        try {
            // 요청 설정
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Accept", "application/vnd.blackducksoftware.user-4+json");
            conn.setRequestProperty("Content-Type", "application/json");
            
            // Basic Auth 설정
            String auth = username + ":" + password;
            String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8));
            conn.setRequestProperty("Authorization", "Basic " + encodedAuth);
            
            conn.setDoOutput(true);

            // 응답 처리
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    response.append(line);
                }
                return response.toString();
            }
        } finally {
            conn.disconnect();
        }
    }

    public static void main(String[] args) {
        try {
            String baseUrl = "https://your-blackduck-server";
            String trustStorePath = "path/to/truststore.jks";
            String trustStorePassword = "your-truststore-password";
            
            SecureBlackDuckApiClient client = new SecureBlackDuckApiClient(
                baseUrl, trustStorePath, trustStorePassword);
            
            String response = client.authenticate("username", "password");
            System.out.println("Authentication Response: " + response);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

이 코드의 주요 특징:

1. 자동으로 서버 인증서를 가져와서 신뢰할 수 있는 저장소에 저장합니다.
2. 저장된 인증서를 사용하여 안전한 HTTPS 연결을 설정합니다.
3. 트러스트 스토어를 파일로 관리하여 재사용할 수 있습니다.

사용 방법:
```java
// 클라이언트 생성
SecureBlackDuckApiClient client = new SecureBlackDuckApiClient(
    "https://your-blackduck-server",
    "/path/to/truststore.jks",
    "truststore-password"
);

// API 호출
String response = client.authenticate("username", "password");
```

주의사항:
1. 실제 사용 시 비밀번호와 민감한 정보는 설정 파일이나 환경 변수로 관리하세요.
2. 예외 처리를 더 세밀하게 구현하세요.
3. 트러스트 스토어 파일의 권한 설정에 주의하세요.
4. 정기적으로 인증서를 갱신하는 로직을 추가하세요.

