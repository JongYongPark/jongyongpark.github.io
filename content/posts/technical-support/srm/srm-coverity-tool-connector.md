---
title: "SRM Coverity Tool Connector Issues"
date: 2025-02-27
categories: ["ops"]
tags: ["SDLC","SRM","Coverity"]
---

# An unexpected error occurred while validating the connection 
01207318

### **🔍 문제 요약 및 해결 방법**  

#### ✅ **문제 요약**
고객이 **Coverity(HTTP, 8080 포트)**에 대한 툴 커넥터 설정 중 **"An unexpected error occurred while validating the connection"** 오류가 발생했다고 보고함.  
로그를 확인한 결과, 다음과 같은 문제가 발생함:

1. **오류 메시지:**  
   ```
   ERROR - Creating a new NewHttpClient instance failed with: Response validation for [Coverity Session Cookie] encountered 1 error:
   1. Expected a [COVJSESSIONID-build] cookie in the response, but it was missing.
   ```
   - Coverity 서버의 응답에서 **`COVJSESSIONID-build` 세션 쿠키가 누락됨**  
   
2. **고객 확인 사항:**
   - SRM 서버가 Coverity 서버에 8080/8443 (TCP) 및 80/443 (TCP) 포트로 정상적으로 연결 가능.  
   - Coverity 관리자가 생성한 **API 키 파일 또는 사용자명/비밀번호 방식 모두 동일한 오류 발생.**  

3. **의심되는 원인:**
   - **302 리다이렉트 발생 가능성**  
     - HTTPS로 리다이렉트되거나, 로그인 페이지로 리다이렉트될 가능성 있음.  
     - HTTPS를 사용하고 올바른 포트를 입력해야 할 수 있음 (`https://` 및 8443 포트 사용).  
   - **Coverity 서버의 위치 변경 여부 확인 필요**  
   - **Proxy 설정 여부 확인 필요**  

4. **추가 확인 사항:**  
   - SRM이 Coverity와의 연결을 검증하는 요청은 `GET <coverity url>/api/v2/serverInfo/version` 형식이며, **기본 인증(Basic Auth) 헤더 포함**  
   - 최신 로그에서 Coverity 응답은 다음과 같음:
     ```
     {"internalVersion":"7aa56f4 im-2024.12-push-31","externalVersion":"2024.12.0"}
     ```
   - **`COVJSESSIONID-build` 쿠키가 응답에 없음.**  
   - 대신 **`COVJSESSIONID8080SG`** 라는 이름의 세션 쿠키가 존재함.

5. **코드 변경 가능성 (`CDX-951` 관련)**  
   - 최신 Coverity Connect 업데이트에서 **세션 쿠키를 검증하는 로직이 변경됨**  
   - 코드가 `COVJSESSIONID-build` 쿠키를 찾도록 되어 있지만, 현재 응답에서는 **쿠키 이름이 `COVJSESSIONID8080SG`**로 다름.  
   - 해결책으로 `coverity.session-cookie-name = COVJSESSIONID8080SG` 설정을 시도할 수 있음.  

---

### **🚀 해결 방법**
1. **HTTPS 및 올바른 포트(8443) 사용**
   - 현재 8080 포트(HTTP)에서 오류 발생 → `https://` 및 8443 포트를 사용하여 시도.  
   - URL을 `http://`에서 `https://`로 변경하고 `8443` 포트를 사용:
     ```
     https://coverity.example.com:8443
     ```
   
2. **Proxy 설정 여부 확인**
   - 고객 네트워크에서 **Proxy가 설정되어 있는지 확인**  
   - Proxy가 있는 경우, SRM이 Coverity 서버에 직접 연결할 수 있도록 설정 변경 필요.  

3. **302 리다이렉트 확인**
   - 302 응답이 HTTPS로 리다이렉트하는 것인지, 로그인 페이지로 리다이렉트하는 것인지 확인.  
   - 로그인 페이지로 리다이렉트될 경우, 제공된 자격 증명이 만료되었을 가능성이 있음 → **새 API 키 생성 및 테스트 필요.**  

4. **세션 쿠키 이름 변경 시도**
   - `coverity.session-cookie-name = COVJSESSIONID8080SG` 설정 적용하여 테스트.  
   - 이는 최신 Coverity 업데이트에서 변경된 쿠키 네이밍과 관련된 문제일 가능성이 있음.  

5. **SRM 디버그 로깅 활성화**
   - `com.avi.codedx.k.d.ac`의 디버그 로그를 활성화하여 더 자세한 오류 원인을 확인.  
   - 디버그 로그에서 **응답 본문(response body) 확인 필요.**  

---

### **🎯 결론**
✅ **주요 원인은 최신 Coverity 업데이트에서 세션 쿠키 이름이 변경된 것과 HTTP → HTTPS 리다이렉트 문제일 가능성이 큼.**  
✅ **HTTPS(`https://` 및 8443 포트)로 요청하고, `coverity.session-cookie-name` 값을 새로운 쿠키(`COVJSESSIONID8080SG`)로 변경하여 테스트 필요.**  
✅ **Proxy 설정 확인 및 API 키를 새로 생성하여 테스트하면 추가적인 원인 파악 가능.** 🚀

---
