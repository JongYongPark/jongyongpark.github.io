# curl -k -vvv https://bd-82898.local 실패

### **🔍 문제 분석: `curl -k -vvv https://bd-82898.local` 실패 (SSL_ERROR_SYSCALL)**

#### **🚨 문제 요약**
1. `curl -k -vvv https://bd-82898.local` 실행 시 **TLS 핸드셰이크 실패** (`SSL_ERROR_SYSCALL`).
2. `curl` 로그:
   ```
   * OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to bd-82898.local:443
   ```
3. `bd-82898.local`의 IP 주소는 `127.0.0.1`로 해석됨 (로컬 호스트에서 실행 중).
4. `kubectl` 로그에서 **Ingress Nginx 컨트롤러가 정상적으로 실행되지 않음** (`Deployment is not ready: 0 out of 1 expected pods are ready`).

---

## **🔎 원인 분석**
### **1️⃣ Ingress Nginx가 정상적으로 실행되지 않음**
- 로그에서 Ingress Nginx 컨트롤러가 정상적으로 기동되지 않았다는 메시지가 반복됨:
  ```
  Deployment is not ready: ingress-nginx/my-nginx-ingress-nginx-controller. 0 out of 1 expected pods are ready
  ```
- `kubectl get pods -n ingress-nginx` 명령어를 실행하여 Ingress Controller Pod 상태를 확인해야 함.

✅ **해결 방법**
```sh
kubectl get pods -n ingress-nginx
```
- 만약 **CrashLoopBackOff** 또는 **Error** 상태라면 로그 확인:
  ```sh
  kubectl logs -n ingress-nginx <nginx-controller-pod>
  ```

---

### **2️⃣ HTTPS 포트(443)가 제대로 리스닝되지 않음**
- `curl`이 `127.0.0.1:443`에 연결하려 하지만 TLS 핸드셰이크가 실패함.
- `netstat` 또는 `ss` 명령어를 사용하여 포트 443이 열려 있는지 확인해야 함.

✅ **해결 방법**
```sh
netstat -tulnp | grep :443
```
- 정상적인 경우:
  ```
  tcp    LISTEN  0  128  0.0.0.0:443  0.0.0.0:*  nginx
  ```
- 만약 아무것도 출력되지 않는다면 Ingress Nginx가 포트를 제대로 리스닝하지 않는 것.

---

### **3️⃣ TLS 인증서 문제**
- `curl -k` 옵션을 사용해도 TLS 오류가 발생함 → 인증서가 제대로 구성되지 않았을 가능성이 있음.
- `cnc-deploy` 로그를 보면 `CNC_CIM_TLS_NGINX_SECRET_NAME="cnc-cim-tls-nginx"` 환경 변수가 설정되어 있음.

✅ **해결 방법**
```sh
kubectl get secret -n ingress-nginx cnc-cim-tls-nginx -o yaml
```
- 만약 존재하지 않는다면:
  ```sh
  echo "TLS Secret이 존재하지 않음. 새로 생성 필요"
  ```
- **TLS 인증서를 다시 생성하고 적용해야 함**.

---

### **🚀 해결 방법 요약**
✅ **1. Ingress Nginx Pod 상태 확인**
```sh
kubectl get pods -n ingress-nginx
kubectl logs -n ingress-nginx <nginx-controller-pod>
```
- **오류 로그 분석 후 조치**.

✅ **2. 443 포트 확인**
```sh
netstat -tulnp | grep :443
```
- **포트가 리스닝 중인지 확인**.

✅ **3. TLS 인증서 확인 및 재설정**
```sh
kubectl get secret -n ingress-nginx cnc-cim-tls-nginx -o yaml
```
- **존재하지 않으면 새로운 인증서 생성 후 적용**.

이제 위 단계를 실행하고 결과를 확인한 후 추가적인 조치를 취할 수 있습니다. 🚀
---
# curl -k -vvv https://bd-82898.local 실패

### **🔍 문제 분석 & 해결 방법: `curl -k -vvv https://bd-82898.local` 실패 (SSL_ERROR_SYSCALL)**

### **🚨 문제 요약**
1. **Ingress Controller가 정상적으로 실행 중 (`1/1 Running`)**
   ```sh
   kubectl get pods -n ingress-nginx
   ```
   ```
   NAME                                                 READY   STATUS    RESTARTS   AGE
   my-nginx-ingress-nginx-controller-57f6bc457c-k9x7c   1/1     Running   0          59m
   ```

2. **TLS 인증서 `cnc-cim-tls-nginx`가 존재하지 않음**
   ```sh
   kubectl get secret -n ingress-nginx cnc-cim-tls-nginx -o yaml
   ```
   ```
   Error from server (NotFound): secrets "cnc-cim-tls-nginx" not found
   ```

3. **Ingress Controller 로그에서 SSL 인증서 로딩 실패**
   ```
   W0312 09:56:08.059301 10 controller.go:1306] Error getting SSL certificate "cnc/cnc-cim-tls-nginx": local SSL certificate cnc/cnc-cim-tls-nginx was not found. Using default certificate
   ```

4. **서비스 Endpoint 없음**
   ```
   W0312 09:56:08.059231 10 controller.go:1083] Service "cnc/cnc-minio" does not have any active Endpoint.
   W0312 09:56:08.059231 10 controller.go:1083] Service "cnc/cnc-cim-cnc-storage-proxy" does not have any active Endpoint.
   ```

---

## **🔎 문제의 원인**
1. **TLS 인증서가 존재하지 않음 (`cnc-cim-tls-nginx` secret 누락)**
   - Ingress는 `cnc-cim-tls-nginx`를 참조하지만, 해당 Secret이 생성되지 않음.
   - 현재 기본 `fake-certificate.pem`을 사용 중.

2. **Ingress에 연결된 서비스(`cnc-minio`, `cnc-cim-cnc-storage-proxy`, `cnc-cim-cim`)가 활성화되지 않음**
   - Ingress Controller는 대상 서비스로 요청을 전달해야 하지만, 서비스 Endpoint가 활성화되지 않음.
   - Ingress는 정상 작동하지만, 백엔드 서비스가 준비되지 않음.

3. **Ingress가 `127.0.0.1`에서 리스닝하는지 확인 필요**
   - `curl` 명령어가 `127.0.0.1:443`로 요청을 보내고 있음.
   - `kubectl get svc -n ingress-nginx`로 `ingress-nginx` 서비스가 어떤 IP에서 리스닝하는지 확인 필요.

---

## **🚀 해결 방법**
### **1️⃣ TLS 인증서 (`cnc-cim-tls-nginx`) 생성 및 적용**
현재 `cnc-cim-tls-nginx` Secret이 없기 때문에 새로 생성해야 합니다.

```sh
kubectl create secret tls cnc-cim-tls-nginx -n ingress-nginx \
  --cert=/path/to/your/cert.pem \
  --key=/path/to/your/key.pem
```
✅ **확인 방법**
```sh
kubectl get secret -n ingress-nginx cnc-cim-tls-nginx
```
- Secret이 정상적으로 생성되었는지 확인 후, Ingress Controller를 다시 시작합니다.

```sh
kubectl rollout restart deployment -n ingress-nginx my-nginx-ingress-nginx-controller
```

---

### **2️⃣ Ingress Controller가 443 포트를 리스닝하는지 확인**
현재 `curl`이 `127.0.0.1:443`로 요청을 보내고 있으므로, `ingress-nginx` 서비스가 실제로 443에서 리스닝하는지 확인해야 합니다.

```sh
kubectl get svc -n ingress-nginx
```

✅ **예제 출력**
```
NAME                                 TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
my-nginx-ingress-nginx-controller    LoadBalancer   10.96.58.210     <pending>     80:31873/TCP,443:31874/TCP   59m
```
- `PORT(S)`에서 `443`이 리스닝하는지 확인.

🚨 **포트가 `443`이 아니라면 Ingress 설정을 변경해야 함.**
- `ingress-nginx`가 `NodePort` 또는 `LoadBalancer`로 배포되었는지 확인 후 수정.

---

### **3️⃣ 서비스 Endpoint 문제 해결**
Ingress가 정상 작동하려면 `cnc-minio`, `cnc-cim-cnc-storage-proxy`, `cnc-cim-cim` 서비스가 활성화되어 있어야 합니다.

```sh
kubectl get pods -n cnc
kubectl get svc -n cnc
```

✅ **서비스가 비활성 상태이면 다시 시작**
```sh
kubectl rollout restart deployment -n cnc cnc-minio cnc-cim-cnc-storage-proxy cnc-cim-cim
```

🚨 **특정 서비스의 Pod이 CrashLoopBackOff 상태라면 로그 확인**
```sh
kubectl logs -n cnc <pod-name>
```
해당 서비스가 정상적으로 실행되지 않으면 Ingress가 트래픽을 전달할 수 없습니다.

---

## **✅ 최종 점검**
1. **TLS 인증서 Secret 생성**
   ```sh
   kubectl get secret -n ingress-nginx cnc-cim-tls-nginx
   ```
   - 존재하지 않으면 생성 후 Ingress Controller 재시작.

2. **Ingress가 443 포트에서 리스닝 중인지 확인**
   ```sh
   kubectl get svc -n ingress-nginx
   ```

3. **연결된 서비스가 정상적으로 실행 중인지 확인**
   ```sh
   kubectl get pods -n cnc
   kubectl get svc -n cnc
   ```

4. **모든 설정 후 `curl` 다시 실행**
   ```sh
   curl -k -vvv https://bd-82898.local
   ```

이제 위 단계대로 수행하면 **TLS 문제와 서비스 연결 문제를 해결할 수 있습니다!** 🚀
---
# Secret 생성 후 Helm 재설치(install) 필요 여부

### **🔍 Secret 생성 후 Helm 재설치(install) 필요 여부 분석**

현재 `kubectl create secret tls ... | kubectl apply -f -` 명령어를 실행하여 TLS Secret을 생성하고 적용하였습니다.

✅ **Secret이 정상적으로 적용되었는지 확인:**
```sh
kubectl get secret -n ingress-nginx cnc-cim-tls-nginx -o yaml
kubectl get secret -n ingress-nginx cnc-certificate -o yaml
```
- Secret이 `ingress-nginx` 네임스페이스에 정상적으로 생성되었는지 확인합니다.

---

### **🚀 Helm 재설치가 필요한가?**
#### ✅ **Helm 재설치가 필요 없는 경우**
- 기존 Helm 차트가 **Secret을 참조할 때 직접 네임스페이스에서 가져오도록 구성된 경우**.
- Ingress 또는 다른 관련 리소스가 Secret을 참조하고 있으며, Secret이 새로 적용된 경우 **Helm 재설치 없이 적용됨**.
- 아래 명령어를 실행하여 Ingress 설정이 자동으로 반영되는지 확인:
  ```sh
  kubectl rollout restart deployment -n ingress-nginx my-nginx-ingress-nginx-controller
  ```
  - Ingress Controller가 Secret 변경 사항을 자동으로 감지하면 Helm 재설치 없이 적용됨.

#### ❌ **Helm 재설치가 필요한 경우**
- Helm 차트가 Secret을 미리 생성하는 방식(Helm의 `values.yaml`에서 Secret을 관리)으로 되어 있다면, Helm이 Secret을 다시 배포할 필요가 있음.
- 기존 Ingress 리소스가 새로운 Secret을 참조하도록 업데이트되지 않은 경우.
- 확인 방법:
  ```sh
  helm get values my-helm-release -n cnc
  ```
  - `tls.secretName` 값이 `cnc-cim-tls-nginx`로 설정되어 있지 않다면, Helm 값을 업데이트해야 함.

✅ **Helm 재설치 없이 적용 가능한 방법 (Ingress 강제 업데이트)**
```sh
kubectl annotate ingress cnc-cim --overwrite kubernetes.io/ingress.class=nginx
kubectl rollout restart deployment -n ingress-nginx my-nginx-ingress-nginx-controller
```
- Ingress를 강제로 다시 적용하여 새로운 Secret을 사용하도록 함.

✅ **Helm 업데이트 적용이 필요한 경우**
```sh
helm upgrade --install my-helm-release ./helm-chart -n cnc
```
- `helm upgrade`를 사용하면 기존 리소스를 유지하면서 변경 사항을 적용할 수 있음.

---

### **🚀 최종 결론**
| 상황 | Helm 재설치 필요 여부 |
|------|------------------|
| Ingress Controller가 Secret 변경 사항을 자동 감지하는 경우 | ❌ 필요 없음 (Ingress 재시작만 필요) |
| Helm 차트가 Secret을 직접 생성하는 경우 (`values.yaml`에 정의) | ✅ `helm upgrade` 필요 |
| Ingress 리소스가 새로운 Secret을 자동으로 참조하지 않는 경우 | ✅ Ingress 강제 재적용 필요 (`kubectl annotate ingress`) |

📌 **권장 해결 방법:**
1. **Ingress Controller 재시작 후 테스트**
   ```sh
   kubectl rollout restart deployment -n ingress-nginx my-nginx-ingress-nginx-controller
   ```

2. **Ingress 리소스 강제 업데이트 후 테스트**
   ```sh
   kubectl annotate ingress cnc-cim --overwrite kubernetes.io/ingress.class=nginx
   ```

3. **그래도 적용되지 않는다면 Helm 재설치**
   ```sh
   helm upgrade --install my-helm-release ./helm-chart -n cnc
   ```

🚀 **위 단계를 순서대로 실행 후 `curl -k -vvv https://bd-82898.local`을 다시 실행하여 정상 작동하는지 확인하세요!**
---
# /etc/hosts에서 bd-82898.local 설정 방법
### **🔍 `/etc/hosts`에서 `bd-82898.local` 설정 방법**

현재 **Ingress Controller가 배포된 Kubernetes 클러스터**에서 `bd-82898.local`을 올바르게 설정하려면 `/etc/hosts` 파일을 적절히 수정해야 합니다.

---

## **✅ 1️⃣ `/etc/hosts`에 올바른 IP 추가하기**
현재 `curl -k -vvv https://bd-82898.local` 실행 시 **`127.0.0.1`로 해석**되는데, 이것이 올바른 Ingress Controller의 IP가 아닐 가능성이 큽니다.

📌 **Ingress의 실제 External IP 확인**
```sh
kubectl get svc -n ingress-nginx
```
✅ 예제 출력:
```
NAME                                 TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)                      AGE
my-nginx-ingress-nginx-controller    LoadBalancer   10.96.58.210     192.168.1.100   80:31873/TCP,443:31874/TCP   59m
```
- `EXTERNAL-IP` 값 (`192.168.1.100`)이 Ingress Controller가 제공하는 외부 접속 IP.

---

## **✅ 2️⃣ `/etc/hosts` 수정**
`bd-82898.local`을 올바르게 해석하도록 `/etc/hosts` 파일을 수정해야 합니다.

```sh
sudo nano /etc/hosts
```

🚀 **추가해야 할 내용 (예제)**
```
192.168.1.100    bd-82898.local
```
- 위에서 확인한 **Ingress Controller의 External IP**(`192.168.1.100`)를 사용해야 합니다.
- 만약 Ingress가 `NodePort`를 사용하고 있다면, 마스터 노드의 IP를 사용해야 할 수도 있습니다.

✅ **파일 저장 후 변경 사항 적용**
```sh
sudo systemctl restart networking
```

---

## **✅ 3️⃣ 설정 확인**
설정이 제대로 반영되었는지 `ping` 또는 `nslookup`으로 확인합니다.

```sh
ping -c 4 bd-82898.local
```
✅ 정상적인 경우:
```
PING bd-82898.local (192.168.1.100) 56(84) bytes of data.
64 bytes from 192.168.1.100: icmp_seq=1 ttl=64 time=0.053 ms
```

```sh
nslookup bd-82898.local
```
✅ 정상적인 경우:
```
Server:        127.0.0.53
Address:       127.0.0.53#53

Non-authoritative answer:
Name:   bd-82898.local
Address: 192.168.1.100
```

---

## **✅ 4️⃣ `curl`로 테스트**
이제 `/etc/hosts`를 수정했으므로 다시 `curl`을 실행하여 Ingress Controller가 정상적으로 응답하는지 확인합니다.

```sh
curl -k -vvv https://bd-82898.local
```

✅ **정상적인 경우:**
```
* Connected to bd-82898.local (192.168.1.100) port 443
* TLS handshake successful
...
HTTP/1.1 200 OK
```

🚨 **여전히 SSL/TLS 오류가 발생한다면?**
- Ingress에 올바른 TLS Secret이 적용되었는지 확인:
  ```sh
  kubectl get secret -n ingress-nginx cnc-cim-tls-nginx
  ```
- Ingress 리소스를 확인:
  ```sh
  kubectl describe ingress -n cnc
  ```

---

## **🚀 결론**
1. **Ingress Controller의 External IP 확인 (`kubectl get svc -n ingress-nginx`)**
2. **Ingress의 External IP를 `/etc/hosts`에 추가**
   ```sh
   sudo nano /etc/hosts
   ```
   ```
   192.168.1.100    bd-82898.local
   ```
3. **설정 적용 후 확인 (`ping`, `nslookup`)**
4. **`curl`로 HTTPS 요청 테스트 (`curl -k -vvv https://bd-82898.local`)**

이제 `bd-82898.local`이 올바르게 설정되었으므로, Ingress와 연결이 정상적으로 작동할 것입니다! 🚀
---
# curl -k -vvv https://bd-82898.local 실패

### **🔍 문제 분석 및 해결 방법: `curl -k -vvv https://bd-82898.local` 실패 (`SSL_ERROR_SYSCALL`)**

## **🚨 주요 문제 확인**
1. **현재 `bd-82898.local`이 `127.0.0.1`로 해석됨 (잘못된 IP)**
   ```sh
   cat /etc/hosts
   ```
   ```
   127.0.0.1       localhost bd-82898.local
   ```
   - `/etc/hosts` 파일에서 `bd-82898.local`이 `127.0.0.1`로 설정되어 있음.
   - 하지만 Ingress Controller는 **클러스터의 NodePort 또는 노드 IP에서 실행됨.**
   - `127.0.0.1:443`는 현재 Ingress Controller와 연결되지 않음.

2. **Ingress Controller가 `NodePort`로 실행됨**
   ```sh
   kubectl get svc -n ingress-nginx
   ```
   ```
   NAME                                          TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE
   my-nginx-ingress-nginx-controller             NodePort    10.96.58.210   <none>        80:30105/TCP,443:31813/TCP   69m
   ```
   - 현재 Ingress Controller가 `NodePort`로 설정됨.
   - 외부에서 `443` 포트로 접근하려면 **클러스터 노드의 IP 및 `NodePort`를 사용해야 함.**
   - 현재 `/etc/hosts`의 `127.0.0.1`은 **잘못된 주소**이며, 수정해야 함.

3. **`hostname -I` 결과**
   ```sh
   hostname -I
   ```
   ```
   172.31.180.118 172.17.0.1 172.18.0.1 fc00:f853:ccd:e793::1
   ```
   - **올바른 노드 IP는 `172.31.180.118` (이전 출력에서 첫 번째 IP가 일반적으로 노드 IP)**
   - `/etc/hosts`에서 `bd-82898.local`을 이 IP로 매핑해야 함.

---

## **✅ 해결 방법**
### **1️⃣ `/etc/hosts`에서 `bd-82898.local`을 노드 IP로 변경**
📌 **`/etc/hosts` 수정**
```sh
sudo nano /etc/hosts
```
🚀 **수정 후 예제 (`127.0.0.1`을 `172.31.180.118`로 변경)**
```
172.31.180.118   bd-82898.local
```
📌 **변경 사항 적용**
```sh
sudo systemctl restart networking
```
또는 WSL을 다시 시작하면 변경 사항이 반영됩니다.

✅ **설정 확인**
```sh
ping bd-82898.local
```
정상적인 경우:
```
PING bd-82898.local (172.31.180.118) 56(84) bytes of data.
64 bytes from 172.31.180.118: icmp_seq=1 ttl=64 time=0.053 ms
```

---

### **2️⃣ `curl`로 올바른 NodePort 사용하여 테스트**
현재 Ingress Controller가 `NodePort (31813)`에서 HTTPS를 제공하므로 **올바른 포트로 요청을 보내야 함**.

✅ **NodePort 확인**
```sh
kubectl get svc -n ingress-nginx
```
✅ **`curl` 테스트 (올바른 포트 사용)**
```sh
curl -k -vvv https://bd-82898.local:31813
```
🚀 **정상적인 경우**
```
* Connected to bd-82898.local (172.31.180.118) port 31813
* TLS handshake successful
...
HTTP/1.1 200 OK
```
🚨 **여전히 `SSL_ERROR_SYSCALL` 발생하면?**
- Ingress 설정이 올바르게 적용되었는지 확인:
```sh
kubectl get ingress -n cnc
kubectl describe ingress -n cnc
```
- TLS 설정이 누락되었다면 Ingress 리소스를 업데이트해야 함.

---

### **3️⃣ Ingress Controller의 External IP를 직접 확인 후 `/etc/hosts` 업데이트**
📌 **외부에서 접근 가능한 Ingress Controller의 IP 확인**
```sh
kubectl get nodes -o wide
```
✅ 예제 출력:
```
NAME       STATUS   ROLES    AGE    VERSION   INTERNAL-IP      EXTERNAL-IP
worker-1   Ready    <none>   2d     v1.25.2   172.31.180.118   <none>
```
- **`INTERNAL-IP` (172.31.180.118)를 `/etc/hosts`에 설정해야 함.**

📌 **Ingress 상태 확인**
```sh
kubectl describe svc -n ingress-nginx my-nginx-ingress-nginx-controller
```
✅ **결과에서 External IP가 설정되어 있는지 확인**
```
LoadBalancer Ingress: 172.31.180.118
```
🚀 **올바른 `/etc/hosts` 설정**
```
172.31.180.118   bd-82898.local
```

---

## **🚀 최종 해결 방법 요약**
1. **Ingress Controller의 노드 IP 확인**
   ```sh
   hostname -I
   ```
2. **NodePort로 요청 (`31813` 확인)**
   ```sh
   curl -k -vvv https://bd-82898.local:31813
   ```
3. **`/etc/hosts`에서 `127.0.0.1`을 Ingress Controller IP로 변경**
   ```sh
   sudo nano /etc/hosts
   ```
   ```
   172.31.180.118   bd-82898.local
   ```
4. **네트워크 변경 사항 적용**
   ```sh
   sudo systemctl restart networking
   ```

---

🚀 **이제 다시 `curl -k -vvv https://bd-82898.local`을 실행하여 정상 동작하는지 확인하세요!**
---
# curl -k -vvv https://bd-82898.local:31813 실패 (Connection refused)

### **🔍 문제 분석 및 해결 방법: `curl -k -vvv https://bd-82898.local:31813` 실패 (`Connection refused`)**

## **🚨 주요 문제 확인**
1. **`bd-82898.local`이 올바른 노드 IP(`172.31.180.118`)로 해석됨** ✅  
   ```sh
   cat /etc/hosts
   ```
   ```
   172.31.180.118   bd-82898.local
   ```
   - `/etc/hosts` 설정은 올바르게 적용됨.
   - `ping bd-82898.local` 테스트 결과 **정상적인 응답**을 받음.

2. **Ingress Controller가 `NodePort`로 실행 중** ✅  
   ```sh
   kubectl get svc -n ingress-nginx
   ```
   ```
   NAME                                          TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE
   my-nginx-ingress-nginx-controller             NodePort    10.96.58.210   <none>        80:30105/TCP,443:31813/TCP   69m
   ```
   - **HTTPS(443) → NodePort `31813`에서 제공됨**.
   - 외부에서 `https://bd-82898.local:31813`로 접근해야 함.

3. **`curl` 요청 시 `Connection refused` 발생** ❌  
   ```sh
   curl -k -vvv https://bd-82898.local:31813
   ```
   ```
   * connect to 172.31.180.118 port 31813 failed: Connection refused
   * Failed to connect to bd-82898.local port 31813
   ```
   - **원인: Ingress Controller가 실행 중이지만, 노드의 `31813` 포트가 실제로 열려 있지 않음.**

---

## **✅ 해결 방법**
### **1️⃣ Ingress Controller가 실제로 `NodePort`에서 리스닝하는지 확인**
Ingress Controller가 `31813`에서 수신하고 있는지 확인해야 합니다.

📌 **Ingress Controller Pod의 상태 확인**
```sh
kubectl get pods -n ingress-nginx
```
✅ 정상적인 경우:
```
NAME                                                 READY   STATUS    RESTARTS   AGE
my-nginx-ingress-nginx-controller-57f6bc457c-k9x7c   1/1     Running   0          69m
```
🚨 **Pod이 `CrashLoopBackOff` 또는 `Error` 상태라면 문제 발생 → 로그 확인 필요**
```sh
kubectl logs -n ingress-nginx my-nginx-ingress-nginx-controller-57f6bc457c-k9x7c
```

📌 **NodePort(`31813`)가 실제로 열려 있는지 확인**
```sh
netstat -tulnp | grep 31813
```
✅ 정상적인 경우:
```
tcp6       0      0 :::31813                :::*                    LISTEN      1234/nginx
```
🚨 **출력이 없으면 Ingress Controller가 `NodePort`를 리스닝하지 않음 → 재시작 필요**
```sh
kubectl rollout restart deployment -n ingress-nginx my-nginx-ingress-nginx-controller
```

---

### **2️⃣ `NodePort`가 모든 인터페이스에서 열려 있는지 확인**
📌 **Ingress Service가 External Traffic을 올바르게 받도록 설정**
```sh
kubectl edit svc -n ingress-nginx my-nginx-ingress-nginx-controller
```
🚀 **아래 설정을 추가 또는 확인 (`ExternalTrafficPolicy: Cluster` 유지)**
```yaml
spec:
  type: NodePort
  externalTrafficPolicy: Cluster
```
📌 **변경 후 Ingress Controller 재시작**
```sh
kubectl rollout restart deployment -n ingress-nginx my-nginx-ingress-nginx-controller
```

---

### **3️⃣ 방화벽 설정 확인 (WSL2 환경)**
현재 WSL2에서 실행 중이므로 **WSL2의 네트워크 설정이 Ingress Controller의 `NodePort`를 차단할 수 있음**.

📌 **WSL2에서 `NodePort` 포트를 허용**
```sh
sudo iptables -A INPUT -p tcp --dport 31813 -j ACCEPT
sudo iptables -A OUTPUT -p tcp --sport 31813 -j ACCEPT
```
📌 **현재 열린 포트 확인**
```sh
sudo netstat -tulnp | grep 31813
```
✅ 정상적인 경우:
```
tcp6       0      0 :::31813                :::*                    LISTEN      1234/nginx
```

🚨 **포트가 열려 있지 않으면 WSL2 네트워크 구성을 변경해야 함.**

---

### **4️⃣ `curl`로 다시 테스트**
📌 **이제 다시 `curl`을 실행하여 확인**
```sh
curl -k -vvv https://bd-82898.local:31813
```
✅ **정상적인 경우**
```
* Connected to bd-82898.local (172.31.180.118) port 31813
* TLS handshake successful
...
HTTP/1.1 200 OK
```

🚨 **여전히 `Connection refused`가 발생하면?**
- `NodePort`가 정상적으로 열려 있는지 다시 확인 (`netstat -tulnp | grep 31813`)
- Ingress Controller 로그 확인 (`kubectl logs -n ingress-nginx <pod-name>`)

---

## **🚀 최종 해결 방법 요약**
1. **Ingress Controller가 실행 중인지 확인**
   ```sh
   kubectl get pods -n ingress-nginx
   ```
2. **`NodePort(31813)`가 열려 있는지 확인**
   ```sh
   netstat -tulnp | grep 31813
   ```
3. **Ingress Controller가 올바르게 배포되었는지 확인 후 재시작**
   ```sh
   kubectl rollout restart deployment -n ingress-nginx my-nginx-ingress-nginx-controller
   ```
4. **WSL2에서 `NodePort(31813)` 방화벽 허용**
   ```sh
   sudo iptables -A INPUT -p tcp --dport 31813 -j ACCEPT
   ```
5. **`curl` 테스트 재실행**
   ```sh
   curl -k -vvv https://bd-82898.local:31813
   ```

🚀 **이제 다시 실행해보고 `curl`이 정상적으로 응답하는지 확인하세요!**
---
# NodePort (31813) Connection Refused

### **🔍 문제 분석 및 해결 방법: `NodePort (31813) Connection Refused`**

## **🚨 주요 문제 확인**
1. **`/etc/hosts` 설정 확인 (`bd-82898.local`이 올바르게 설정됨) ✅**
   ```sh
   cat /etc/hosts
   ```
   ```
   172.31.180.118   bd-82898.local
   ```
   - **이제 `bd-82898.local`이 `172.31.180.118`(클러스터 노드 IP)로 해석됨)** → 올바르게 설정됨.

2. **Ingress Controller가 실행 중 ✅**
   ```sh
   kubectl get pods -n ingress-nginx
   ```
   ```
   NAME                                                READY   STATUS    RESTARTS   AGE
   my-nginx-ingress-nginx-controller-c6559fb58-296k6   1/1     Running   0          7m28s
   ```
   - **Ingress Controller가 `Running` 상태이며 재시작도 수행됨.**

3. **`NodePort (31813)`이 열려 있지 않음 ❌**
   ```sh
   netstat -tulnp | grep 31813
   ```
   - **결과 없음 → Ingress Controller가 `NodePort 31813`을 리스닝하지 않음.**

4. **Pod 로그 확인 불가 (`Error from server (NotFound)`) ❌**
   ```sh
   kubectl logs -n ingress-nginx my-nginx-ingress-nginx-controller-57f6bc457c-k9x7c
   ```
   - **Pod 이름이 변경됨 → 올바른 Pod 이름 사용해야 함.**
   - **현재 실행 중인 Pod 로그를 확인해야 함.**

---

## **✅ 해결 방법**
### **1️⃣ 올바른 Ingress Controller Pod 로그 확인**
현재 `my-nginx-ingress-nginx-controller-57f6bc457c-k9x7c`가 존재하지 않으므로, **실제 실행 중인 Pod 로그를 확인해야 함**.

📌 **현재 실행 중인 Ingress Pod 확인**
```sh
kubectl get pods -n ingress-nginx
```
✅ 예제 출력:
```
NAME                                                READY   STATUS    RESTARTS   AGE
my-nginx-ingress-nginx-controller-c6559fb58-296k6   1/1     Running   0          10m
```
🚀 **실제 실행 중인 Pod의 로그 확인**
```sh
kubectl logs -n ingress-nginx my-nginx-ingress-nginx-controller-c6559fb58-296k6
```
- 로그에 **`listening on port 31813`** 또는 **TLS 설정 관련 오류가 있는지 확인**.

---

### **2️⃣ `NodePort (31813)`이 열려 있는지 확인 및 Ingress 설정 확인**
📌 **Ingress Controller가 `NodePort`에서 서비스되고 있는지 확인**
```sh
kubectl get svc -n ingress-nginx
```
✅ 정상적인 경우:
```
NAME                                          TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE
my-nginx-ingress-nginx-controller             NodePort    10.96.58.210   <none>        80:30105/TCP,443:31813/TCP   69m
```
- **`NodePort 31813`이 할당되어 있어야 함.**
- 만약 `NodePort`가 설정되지 않았다면, **Ingress를 다시 설정해야 함**.

🚀 **`NodePort` 포트가 실제로 리스닝 중인지 확인**
```sh
netstat -tulnp | grep 31813
```
✅ 정상적인 경우:
```
tcp6       0      0 :::31813                :::*                    LISTEN      1234/nginx
```
🚨 **여전히 결과가 없으면 Ingress Controller를 다시 배포해야 함.**

---

### **3️⃣ Ingress Controller 설정 수정 (필요한 경우)**
📌 **`NodePort` 설정을 강제 적용**
```sh
kubectl edit svc -n ingress-nginx my-nginx-ingress-nginx-controller
```
🚀 **아래 설정 확인 및 추가**
```yaml
spec:
  type: NodePort
  externalTrafficPolicy: Cluster
```
📌 **변경 후 Ingress Controller 재시작**
```sh
kubectl rollout restart deployment -n ingress-nginx my-nginx-ingress-nginx-controller
```

---

### **4️⃣ WSL2에서 `NodePort (31813)` 포트가 차단되지 않았는지 확인**
현재 **WSL2에서 실행 중이므로 WSL2의 네트워크 설정이 `NodePort`를 차단할 가능성이 있음**.

📌 **WSL2에서 `NodePort (31813)` 방화벽 허용**
```sh
sudo iptables -A INPUT -p tcp --dport 31813 -j ACCEPT
sudo iptables -A OUTPUT -p tcp --sport 31813 -j ACCEPT
```
📌 **현재 열린 포트 확인**
```sh
sudo netstat -tulnp | grep 31813
```
✅ 정상적인 경우:
```
tcp6       0      0 :::31813                :::*                    LISTEN      1234/nginx
```
🚨 **포트가 열려 있지 않으면 WSL2 네트워크 구성을 변경해야 함.**

---

### **5️⃣ `curl`로 다시 테스트**
📌 **이제 다시 `curl`을 실행하여 확인**
```sh
curl -k -vvv https://bd-82898.local:31813
```
✅ **정상적인 경우**
```
* Connected to bd-82898.local (172.31.180.118) port 31813
* TLS handshake successful
...
HTTP/1.1 200 OK
```

🚨 **여전히 `Connection refused`가 발생하면?**
- `NodePort`가 정상적으로 열려 있는지 다시 확인 (`netstat -tulnp | grep 31813`)
- Ingress Controller 로그 확인 (`kubectl logs -n ingress-nginx <pod-name>`)

---

## **🚀 최종 해결 방법 요약**
1. **Ingress Controller가 실행 중인지 확인**
   ```sh
   kubectl get pods -n ingress-nginx
   ```
2. **실제 실행 중인 Pod 로그 확인**
   ```sh
   kubectl logs -n ingress-nginx my-nginx-ingress-nginx-controller-c6559fb58-296k6
   ```
3. **`NodePort (31813)`가 열려 있는지 확인**
   ```sh
   netstat -tulnp | grep 31813
   ```
4. **Ingress Controller가 올바르게 배포되었는지 확인 후 재시작**
   ```sh
   kubectl rollout restart deployment -n ingress-nginx my-nginx-ingress-nginx-controller
   ```
5. **WSL2에서 `NodePort (31813)` 방화벽 허용**
   ```sh
   sudo iptables -A INPUT -p tcp --dport 31813 -j ACCEPT
   ```
6. **`curl` 테스트 재실행**
   ```sh
   curl -k -vvv https://bd-82898.local:31813
   ```

🚀 **이제 다시 실행해보고 `curl`이 정상적으로 응답하는지 확인하세요!**


---
# NodePort (31813) Connection Refused
### **🔍 문제 분석 및 해결 방법: `NodePort (31813) Connection Refused`**

---

## **🚨 주요 문제 요약**
1. **Ingress Controller Pod이 정상 실행됨 (`Running`)** ✅  
   ```sh
   kubectl get pods -n ingress-nginx
   ```
   ```
   NAME                                                 READY   STATUS    RESTARTS   AGE
   my-nginx-ingress-nginx-controller-6b7b86d57d-2trlq   1/1     Running   0          80s
   ```
   - Ingress Controller가 정상적으로 실행 중임.

2. **`NodePort (31813)`에서 서비스되지 않음 (`Connection refused`)** ❌  
   ```sh
   curl -k -vvv https://bd-82898.local:31813
   ```
   ```
   * connect to 172.31.180.118 port 31813 failed: Connection refused
   * Failed to connect to bd-82898.local port 31813
   ```
   - **Ingress Controller가 `NodePort`를 리스닝하지 않거나, WSL2에서 차단됨.**

3. **`netstat -tulnp | grep 31813` 실행 시 아무런 결과가 없음** ❌  
   ```sh
   netstat -tulnp | grep 31813
   ```
   - **Ingress Controller가 `31813` 포트를 열지 않음.**
   - **Kubernetes의 `NodePort` 설정 문제 가능성 있음.**

---

## **✅ 해결 방법**
### **1️⃣ `NodePort (31813)`가 올바르게 설정되었는지 확인**
📌 **Ingress Controller의 서비스 설정을 확인**
```sh
kubectl get svc -n ingress-nginx
```
✅ 예상되는 정상적인 경우:
```
NAME                                          TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE
my-nginx-ingress-nginx-controller             NodePort    10.96.58.210   <none>        80:30105/TCP,443:31813/TCP   69m
```
🚨 **만약 `443:31813/TCP`가 없거나 `TYPE=ClusterIP`이면, `NodePort` 설정이 잘못됨.**  
이를 수정해야 함.

---

### **2️⃣ `NodePort (31813)`가 Ingress Controller Pod에서 리스닝되는지 확인**
📌 **Ingress Controller의 실제 Pod에서 `31813` 포트를 리스닝하고 있는지 확인**
```sh
kubectl exec -it -n ingress-nginx my-nginx-ingress-nginx-controller-6b7b86d57d-2trlq -- netstat -tulnp | grep 31813
```
✅ **정상적인 경우 (Pod 내부에서 `31813` 포트가 열려 있음):**
```
tcp6       0      0 :::31813                :::*                    LISTEN      1234/nginx
```
🚨 **만약 포트가 열려 있지 않다면?**
- Ingress 설정이 잘못되어 있을 가능성이 큼.
- 아래 **Ingress 설정을 강제 수정**해야 함.

---

### **3️⃣ Ingress Controller 서비스 설정을 강제 수정**
📌 **Ingress Controller의 `NodePort`가 정확하게 설정되었는지 확인**
```sh
kubectl edit svc -n ingress-nginx my-nginx-ingress-nginx-controller
```
🚀 **아래 설정 확인 및 추가 (`externalTrafficPolicy: Cluster` 유지)**
```yaml
spec:
  type: NodePort
  externalTrafficPolicy: Cluster
  ports:
    - name: https
      port: 443
      targetPort: https
      nodePort: 31813  # <- 올바르게 설정되어야 함
```
📌 **변경 후 Ingress Controller 재시작**
```sh
kubectl rollout restart deployment -n ingress-nginx my-nginx-ingress-nginx-controller
```

---

### **4️⃣ WSL2에서 `NodePort (31813)` 포트가 차단되지 않았는지 확인**
📌 **WSL2는 기본적으로 외부 트래픽을 차단할 수 있으므로, 수동으로 `NodePort`를 허용해야 함.**
```sh
sudo iptables -A INPUT -p tcp --dport 31813 -j ACCEPT
sudo iptables -A OUTPUT -p tcp --sport 31813 -j ACCEPT
```
📌 **현재 열린 포트 확인**
```sh
sudo netstat -tulnp | grep 31813
```
✅ 정상적인 경우:
```
tcp6       0      0 :::31813                :::*                    LISTEN      1234/nginx
```

🚨 **포트가 열려 있지 않으면 WSL2 네트워크 구성을 변경해야 함.**

---

### **5️⃣ `curl`로 다시 테스트**
📌 **이제 다시 `curl`을 실행하여 확인**
```sh
curl -k -vvv https://bd-82898.local:31813
```
✅ **정상적인 경우**
```
* Connected to bd-82898.local (172.31.180.118) port 31813
* TLS handshake successful
...
HTTP/1.1 200 OK
```

🚨 **여전히 `Connection refused`가 발생하면?**
- `NodePort`가 정상적으로 열려 있는지 다시 확인 (`netstat -tulnp | grep 31813`)
- Ingress Controller 로그 확인 (`kubectl logs -n ingress-nginx <pod-name>`)

---

## **🚀 최종 해결 방법 요약**
1. **Ingress Controller가 실행 중인지 확인**
   ```sh
   kubectl get pods -n ingress-nginx
   ```
2. **Ingress Controller의 `NodePort` 설정 확인**
   ```sh
   kubectl get svc -n ingress-nginx
   ```
3. **Pod 내부에서 `NodePort (31813)`가 리스닝되는지 확인**
   ```sh
   kubectl exec -it -n ingress-nginx my-nginx-ingress-nginx-controller-6b7b86d57d-2trlq -- netstat -tulnp | grep 31813
   ```
4. **Ingress Controller 서비스 설정을 강제 수정**
   ```sh
   kubectl edit svc -n ingress-nginx my-nginx-ingress-nginx-controller
   ```
   ```yaml
   spec:
     type: NodePort
     externalTrafficPolicy: Cluster
   ```
5. **Ingress Controller 재시작**
   ```sh
   kubectl rollout restart deployment -n ingress-nginx my-nginx-ingress-nginx-controller
   ```
6. **WSL2에서 `NodePort (31813)` 방화벽 허용**
   ```sh
   sudo iptables -A INPUT -p tcp --dport 31813 -j ACCEPT
   ```
7. **`curl` 테스트 재실행**
   ```sh
   curl -k -vvv https://bd-82898.local:31813
   ```

🚀 **이제 다시 실행해보고 `curl`이 정상적으로 응답하는지 확인하세요!**

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 
