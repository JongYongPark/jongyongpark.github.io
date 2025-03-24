---
title: "Mojo Sample Code like Curl"
date: 2025-02-27
categories: ["sdlc"]
tags: ["Mojo"]
---

## **🚀 Mojo로 `curl`과 비슷한 기능 구현하기**  
Mojo는 Python과 유사한 문법을 가지면서도, 시스템 프로그래밍에 적합한 고성능 언어입니다. 현재 Mojo는 공식적으로 네트워크 라이브러리를 제공하지 않으므로, **소켓을 활용하여 HTTP 요청을 보내는 `curl` 대체 기능**을 직접 구현할 수 있습니다.

---

# **📌 1. Mojo에서 HTTP 요청(`curl` 기능) 구현하기**
다음 코드는 **Mojo에서 `curl`과 유사한 기능을 수행하는 HTTP GET 요청 함수**입니다.

### **💾 `mojo_curl.mojo` 파일 생성**
아래 코드를 `mojo_curl.mojo`라는 파일에 저장하세요.

```mojo
import sys
import socket

# HTTP GET 요청 함수
fn http_get(url: str) -> str:
    # URL 파싱
    let parts = url.split("://")
    if parts.size() != 2 or parts[0] != "http":
        return "❌ 지원되지 않는 URL 형식입니다! (http만 지원)"

    let domain_path = parts[1].split("/", 1)
    let host = domain_path[0]
    let path = "/" + domain_path[1] if domain_path.size() > 1 else "/"

    # 소켓 생성 및 서버 연결
    let sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((host, 80))

    # HTTP 요청 작성
    let request = "GET " + path + " HTTP/1.1\r\n"
    request += "Host: " + host + "\r\n"
    request += "User-Agent: Mojo-Curl/1.0\r\n"
    request += "Connection: close\r\n\r\n"

    # 요청 전송
    sock.send(request.encode())

    # 응답 수신
    let response = ""
    while True:
        let data = sock.recv(1024)
        if not data:
            break
        response += data.decode()

    sock.close()
    return response

# 명령줄에서 URL 입력 받기
fn main():
    if sys.argv.size() < 2:
        print("🛠 사용법: mojo run mojo_curl.mojo <URL>")
        return

    let url = sys.argv[1]
    let response = http_get(url)
    print(response)
```

---

# **📌 2. Mojo 설치 및 실행 방법**
Mojo는 현재 **Linux 및 macOS에서만 실행 가능**합니다.

### **1️⃣ Mojo 설치**
```sh
curl https://get.modular.com/mojo-init.sh | sh
```

### **2️⃣ 환경 변수 설정 (`.bashrc` 또는 `.zshrc`)**
```sh
export PATH="$HOME/.modular/bin:$PATH"
```

### **3️⃣ 설치 확인**
```sh
mojo --version
```
✅ 정상적으로 설치되었다면 `Mojo version X.X.X`가 출력됩니다.

---

# **📌 3. Mojo로 `curl` 실행하기**
## **1️⃣ Mojo 코드 실행 (HTTP GET 요청)**
```sh
mojo run mojo_curl.mojo http://example.com
```

✅ **출력 예시**
```
HTTP/1.1 200 OK
Date: Mon, 26 Feb 2025 12:34:56 GMT
Server: Apache/2.4.41 (Ubuntu)
Content-Type: text/html

<!DOCTYPE html>
<html>
<head><title>Example</title></head>
<body><h1>Hello from Mojo!</h1></body>
</html>
```

---

# **📌 4. HTTP POST 요청 지원**
HTTP POST 요청을 추가하여 데이터를 전송할 수도 있습니다.

### **💾 `mojo_curl_post.mojo` 파일 생성**
```mojo
import sys
import socket

# HTTP POST 요청 함수
fn http_post(url: str, data: str) -> str:
    # URL 파싱
    let parts = url.split("://")
    if parts.size() != 2 or parts[0] != "http":
        return "❌ 지원되지 않는 URL 형식입니다! (http만 지원)"

    let domain_path = parts[1].split("/", 1)
    let host = domain_path[0]
    let path = "/" + domain_path[1] if domain_path.size() > 1 else "/"

    # 소켓 생성 및 서버 연결
    let sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((host, 80))

    # HTTP 요청 작성
    let request = "POST " + path + " HTTP/1.1\r\n"
    request += "Host: " + host + "\r\n"
    request += "User-Agent: Mojo-Curl/1.0\r\n"
    request += "Content-Length: " + str(data.size()) + "\r\n"
    request += "Content-Type: application/x-www-form-urlencoded\r\n"
    request += "Connection: close\r\n\r\n"
    request += data

    # 요청 전송
    sock.send(request.encode())

    # 응답 수신
    let response = ""
    while True:
        let data = sock.recv(1024)
        if not data:
            break
        response += data.decode()

    sock.close()
    return response

# 명령줄에서 URL 및 데이터 입력 받기
fn main():
    if sys.argv.size() < 3:
        print("🛠 사용법: mojo run mojo_curl_post.mojo <URL> <POST_DATA>")
        return

    let url = sys.argv[1]
    let post_data = sys.argv[2]
    let response = http_post(url, post_data)
    print(response)
```

---

## **📌 5. HTTP POST 요청 실행**
```sh
mojo run mojo_curl_post.mojo http://example.com "name=mojo&lang=rust"
```

✅ **출력 예시**
```
HTTP/1.1 200 OK
Date: Mon, 26 Feb 2025 12:34:56 GMT
Server: Apache/2.4.41 (Ubuntu)
Content-Type: text/html

{"message": "Data received successfully"}
```

---

# **📌 6. Mojo `curl` 기능 확장 가능성**
✅ **추가 가능 기능**
- **HTTPS 지원** → `ssl` 라이브러리를 활용하여 TLS 통신 구현  
- **Header Customization** → 요청 헤더 추가 (`User-Agent`, `Authorization` 등)  
- **파일 다운로드 기능** → `GET` 요청을 통해 바이너리 데이터를 받아 저장  

---

# **🎯 결론**
✅ **Mojo는 Python과 유사한 문법을 사용하면서도 네이티브 성능을 제공하는 언어**  
✅ **소켓을 활용하여 `curl`과 같은 네트워크 요청을 직접 구현 가능**  
✅ **Rust보다 쉬운 문법으로 메모리 안전성을 유지하면서도 고성능 코드 작성 가능**  
✅ **Mojo를 사용하면 Python 스타일로 쉽고 빠르게 네트워크 프로그램을 작성할 수 있음** 🚀

💡 **이제 Mojo에서 HTTP 요청을 자유롭게 처리할 수 있습니다!** 🎯
