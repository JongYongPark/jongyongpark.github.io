---
title: "OpenWebUI"
date: 2025-02-19
categories: ["AI"]
tags: ["OpenWebUI", "AI","Ollama","EC2"]
---

# 내가 설치한 방법

pip install open-webui
open-webui serve --port 8180


# OpenWebUI 내 설정

Web browser URL: http://jonpark-ec2:8180/admin/settings
OpenWebUI 는 ec2에 설치되어 있으므로 http://localhost:11434 를 사용한다.

``` html
OpenAI API

Manage OpenAI API Connections

https://api.openai.com/v1
API Key


Ollama API

Manage Ollama API Connections

http://localhost:11434


Trouble accessing Ollama? Click here for help.
Direct Connections

Direct Connections allow users to connect to their own OpenAI compatible API endpoints.
```
---
# Msty 에서 ec2 에 설치된 Ollama 접속하기
사용하지 말것것.
모든 것을 API key를 통해 처리함.
ChatGPT 경우에도 API key 를 사용하면 별도의 요금이 차감됨.

### Ollama remote
http://jonpark-ec2:11434 로 접속
현재 연결이 되지 않는다.
11434 포트가 열려있는지 확인해야 함.

---

---
# 아래부터는 모두 참조문서임.
---

# Ollama 모델을 GUI로 관리할 수 있는 도구들

Ollama 모델을 GUI로 관리할 수 있는 몇 가지 도구들을 추천해드리겠습니다:

1. OpenWebUI (https://github.com/open-webui/open-webui)
- Ollama를 위해 특별히 설계된 웹 인터페이스
- Docker로 쉽게 설치 가능
- 모델 관리, 채팅 인터페이스, 프롬프트 관리 등 제공
- 설치 명령어:
```bash
docker run -d -p 3000:8080 -v open-webui:/app/backend/data -e OLLAMA_API_BASE_URL=http://host.docker.internal:11434/api --name open-webui --add-host=host.docker.internal:host-gateway ghcr.io/open-webui/open-webui:main
```

2. OllamaWeb (https://github.com/ollama-webui/ollama-webui)
- 직관적인 웹 기반 GUI 제공
- 모델 다운로드/삭제, 대화 기록 관리
- 다중 모델 대화 지원
- Docker 설치 명령어:
```bash
docker run -d -p 8080:8080 --add-host=host.docker.internal:host-gateway -v ollama-webui:/app/backend/data --name ollama-webui --restart always ghcr.io/ollama-webui/ollama-webui:main
```

3. Ollama-UI (https://github.com/ollama-ui/ollama-ui)
- 경량화된 웹 인터페이스
- 기본적인 모델 관리 기능 제공
- Next.js 기반으로 구현

이 중에서 OpenWebUI가 가장 활발하게 개발되고 있으며, 기능도 풍부해서 추천드립니다. EC2에서 사용하실 때는 보안그룹에서 해당 포트(3000 또는 8080)를 열어주셔야 합니다.

이러한 도구들을 설치하실 때 주의할 점이 있다면, EC2 인스턴스의 메모리와 CPU 사양을 고려하셔야 합니다. GUI 도구와 Ollama 모델이 동시에 실행되므로, 적절한 리소스가 필요합니다.


---

# Open WebUI 설치

EC2 Ubuntu에 OpenWebUI를 설치하고 외부 접속을 설정하는 과정을 단계별로 알려드리겠습니다:

1. EC2의 보안 그룹 설정
```
1. AWS Console에 로그인
2. EC2 대시보드 접속
3. 해당 인스턴스의 보안 그룹 선택
4. "인바운드 규칙 편집" 클릭
5. "규칙 추가" 클릭
6. 다음 설정 입력:
   - 포트 범위: 8180
   - 소스: 0.0.0.0/0 (모든 IP에서 접근 허용) 
   - 설명: OpenWebUI access
7. "규칙 저장" 클릭
```

2. Docker 설치 (아직 설치되지 않은 경우)
```bash
sudo apt-get update
sudo apt-get install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```
설치 후 로그아웃했다가 다시 로그인하면 docker 권한이 적용됩니다.

3. OpenWebUI 설치 및 실행
```bash
# 기존 컨테이너가 있다면 제거
docker rm -f open-webui

# OpenWebUI 실행
docker run -d \
  -p 8180:8080 \
  -v open-webui:/app/backend/data \
  -e OLLAMA_API_BASE_URL=http://host.docker.internal:11434/api \
  --name open-webui \
  --add-host=host.docker.internal:host-gateway \
  ghcr.io/open-webui/open-webui:main
```

4. 설치 확인
```bash
# 컨테이너 실행 상태 확인
docker ps
```

5. 접속 방법
- 브라우저에서 다음 주소로 접속:
```
http://[EC2_PUBLIC_IP]:8180
```
여기서 [EC2_PUBLIC_IP]는 EC2 인스턴스의 퍼블릭 IP 주소입니다.

주의사항:
1. EC2 인스턴스의 퍼블릭 IP가 변경될 수 있으므로, 고정 IP(Elastic IP)를 사용하는 것을 권장합니다.
2. 보안을 위해 접속 IP를 제한하는 것이 좋습니다(보안그룹에서 특정 IP만 허용).
3. OpenWebUI가 정상적으로 작동하려면 Ollama가 먼저 설치되어 실행 중이어야 합니다.

문제 해결:
- 접속이 안 되는 경우:
  ```bash
  # 로그 확인
  docker logs open-webui
  
  # 컨테이너 상태 확인
  docker ps
  ```

- 컨테이너 재시작이 필요한 경우:
  ```bash
  docker restart open-webui
  ```

필요하신 경우 추가적인 설정이나 문제 해결 방법을 알려드리겠습니다.

# Open WebUI 에서 사용하는 Volume

``` bash 
(base) ubuntu@ip-172-31-26-173:~/workspace/dockers$ docker inspect -f '{{ json .Mounts }}' open-webui  | jq
[
  {
    "Type": "volume",
    "Name": "open-webui",
    "Source": "/var/lib/docker/volumes/open-webui/_data",
    "Destination": "/app/backend/data",
    "Driver": "local",
    "Mode": "z",
    "RW": true,
    "Propagation": ""
  }
]

```

# 삭제하기

open-webui 관련 리소스를 삭제하는 전체 과정을 상태 확인과 함께 알려드리겠습니다:

1. 현재 상태 확인
```bash
# 실행 중인 컨테이너 확인
docker ps
# 모든 컨테이너 확인 (중지된 것 포함)
docker ps -a
# 이미지 확인
docker images
# 볼륨 확인
docker volume ls
```

2. 리소스 삭제
```bash
# 컨테이너 중지 및 삭제
docker stop open-webui
docker rm open-webui

# 연관된 볼륨 삭제
docker volume rm open-webui

# 이미지 삭제
docker rmi ghcr.io/open-webui/open-webui:main
```

3. 삭제 후 상태 확인
```bash
# 컨테이너 확인 (open-webui가 없어야 함)
docker ps -a | grep open-webui

# 이미지 확인 (open-webui 이미지가 없어야 함)
docker images | grep open-webui

# 볼륨 확인 (open-webui 볼륨이 없어야 함)
docker volume ls | grep open-webui
```

한 번에 실행할 수 있는 전체 스크립트:
```bash
# 삭제 전 상태 확인
echo "=== 삭제 전 상태 ==="
echo "컨테이너 목록:"
docker ps -a
echo -e "\n이미지 목록:"
docker images
echo -e "\n볼륨 목록:"
docker volume ls

# 리소스 삭제
echo -e "\n=== 리소스 삭제 중 ==="
docker stop open-webui
docker rm open-webui
docker volume rm open-webui
docker rmi ghcr.io/open-webui/open-webui:main

# 삭제 후 상태 확인
echo -e "\n=== 삭제 후 상태 ==="
echo "컨테이너 목록:"
docker ps -a
echo -e "\n이미지 목록:"
docker images
echo -e "\n볼륨 목록:"
docker volume ls
```

이렇게 하면 삭제 전후의 상태를 명확하게 확인할 수 있으며, open-webui 관련 리소스만 선택적으로 삭제됩니다.

---

# Command list



``` bash

docker restart open-webui 

또는 

cd ~/workspace/dockers

docker stop open-webui
docker rm open-webui
docker volume rm open-webui
# sudo rm -rf open-webui/*

docker run -d \
  -p 8180:8080 \
  -v $(pwd)/open-webui:/app/backend/data \
  -e OLLAMA_BASE_URL=http://172.31.26.173:11434/api \
  --name open-webui \
  --add-host=host.docker.internal:host-gateway \
  ghcr.io/open-webui/open-webui:main


docker logs -f open-webui

curl http://localhost:11434/api/tags
curl http://host.docker.internal:11434/api/tags
```

---

# history

1354  docker run -d   -p 8180:8080   -v $(pwd)/open-webui:/app/backend/data   -e OLLAMA_API_BASE_URL=http://host.docker.internal:11434/api   --name open-webui   --add-host=host.docker.internal:host-gateway   ghcr.io/open-webui/open-webui:main
 1355  tree
 1356  docker volume ls
 1357  docker ps
 1358  sudo systemctl status ollama
 1359  sudo vim /etc/systemd/system/ollama.service
 1360  cat /etc/systemd/system/ollama.service
 1361  sudo systemctl daemon-reload
 1362  sudo systemctl restart ollama
 1363  docker stop open-webui
 1364  docker rm open-webui
 1365  docker run -d   -p 8180:8080   -v $(pwd)/open-webui:/app/backend/data   -e OLLAMA_API_BASE_URL=http://host.docker.internal:11434/api   --name open-webui   --add-host=host.docker.internal:host-gateway   ghcr.io/open-webui/open-webui:main
 1366  vim ~/.ollama/daemon.json
 1367  cat ~/.ollama/daemon.json
 1368  docker stop open-webui
 1369  docker rm open-webui
 1370  docker run -d   -p 8180:8080   -v $(pwd)/open-webui:/app/backend/data   -e OLLAMA_API_BASE_URL=http://host.docker.internal:11434/api   --name open-webui   --add-host=host.docker.internal:host-gateway   ghcr.io/open-webui/open-webui:main
 1371  systemctl status ollama
 1372  sudo systemctl status ollama
 1373  sudo journalctl -u ollama
 1374  cat /etc/systemd/system/ollama.service
 1375  sudo systemctl status ollama
 1376  sudo systemctl statop ollama
 1377  sudo systemctl stop ollama
 1378  sudo vim  /etc/systemd/system/ollama.service
 1379  sudo systemctl start ollama
 1380  sudo systemctl daemon-reload
 1381  sudo systemctl start ollama
 1382  sudo systemctl status ollama
 1383  ollama list
 1384  cat  /etc/systemd/system/ollama.service
 1385  sudo vim  /etc/systemd/system/ollama.service
 1386  sudo systemctl daemon-reload
 1387  sudo systemctl restart ollama
 1388  sudo systemctl status ollama
 1389  ollama list
 1390  sudo vim  /etc/systemd/system/ollama.service
 1391  docker restart open-webui
 1392  sudo vim  /etc/systemd/system/ollama.service
 1393  sudo systemctl daemon-reload
 1394  sudo systemctl restart ollama
 1395  ollama list
 1396  sudo systemctl status ollama
 1397  ollama list
 1398  docker ps
 1399  docker restart open-webui
 1400  df -h
 1401  docker restart open-webui
 1402  curl http://localhost:11434/api/tags


(base) ubuntu@ip-172-31-26-173:~/workspace/dockers$ docker restart open-webui
open-webui

(base) ubuntu@ip-172-31-26-173:~/workspace/dockers$ curl http://localhost:11434/api/tags


# Ollama API URL 설정

제공하신 Docker 명령어는 대체로 올바르지만, Ollama API URL 설정에 약간의 수정이 필요합니다. 로컬에 설치된 Ollama와 Docker 컨테이너로 실행되는 OpenWebUI를 연결하기 위해서는 다음과 같이 수정해야 합니다:

```bash
docker run -d \
  -p 8180:8080 \
  -v /home/ubuntu/workspace/dockers/open-webui:/app/backend/data \
  -e OLLAMA_API_BASE_URL=http://host.docker.internal:11434 \
  --name open-webui \
  --add-host=host.docker.internal:host-gateway \
  ghcr.io/open-webui/open-webui:main
```

주요 변경 사항:

1. `OLLAMA_API_BASE_URL` 환경 변수를 `http://host.docker.internal:11434`로 설정했습니다. 이는 Docker 컨테이너 내에서 호스트 시스템의 Ollama API에 접근하기 위한 특별한 DNS 이름입니다[1][5].

2. URL 끝의 `/api`를 제거했습니다. Ollama API의 기본 URL은 일반적으로 포트 번호까지만 포함합니다[2][4].

이 설정을 사용하면 OpenWebUI Docker 컨테이너가 호스트 시스템에서 실행 중인 Ollama API와 올바르게 통신할 수 있습니다. `--add-host=host.docker.internal:host-gateway` 옵션은 이미 포함되어 있어 Docker 컨테이너가 호스트 시스템의 서비스에 접근할 수 있도록 합니다[1][5].

만약 이 설정으로도 연결이 되지 않는다면, Ollama가 모든 네트워크 인터페이스에서 요청을 수신하도록 설정되어 있는지 확인해보세요. Ollama 서비스 파일에서 `--host 0.0.0.0` 옵션을 추가하는 것이 도움될 수 있습니다[1][3].


---
# OpenWebUI 설정 - qwen

OpenWebUI를 Docker로 설치하고 EC2 Linux에 로컬로 설치된 Ollama 모델을 연결하는 과정을 단계별로 설명하겠습니다. 이 작업은 OpenWebUI와 Ollama가 서로 통신할 수 있도록 설정하는 것이 핵심입니다.

---

### **1. 사전 준비**
#### **1.1. EC2 인스턴스 확인**
- EC2 인스턴스가 실행 중인지 확인합니다.
- `ollama`가 이미 설치되어 있고, 모델이 로컬에서 사용 가능해야 합니다.
  - 테스트: `ollama list` 명령어를 통해 모델 목록을 확인합니다.
- 필요한 포트가 열려 있는지 확인합니다.
  - 기본적으로 Ollama는 `11434` 포트를 사용합니다.
  - OpenWebUI는 Docker 컨테이너 내에서 실행되며, 외부에서 접근 가능한 포트를 설정해야 합니다.

#### **1.2. Docker 설치**
EC2 인스턴스에 Docker가 설치되어 있지 않다면 다음 명령어를 사용하여 설치합니다:
```bash
sudo yum update -y
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
```

Docker가 정상적으로 설치되었는지 확인:
```bash
docker --version
```

---

### **2. OpenWebUI Docker 설치**
OpenWebUI를 Docker로 설치하려면 다음 단계를 따릅니다.

#### **2.1. Docker 네트워크 생성**
Ollama와 OpenWebUI가 동일한 네트워크에서 통신할 수 있도록 Docker 네트워크를 생성합니다:
```bash
docker network create openwebui-net
```

#### **2.2. OpenWebUI Docker 컨테이너 실행**
다음 명령어를 사용하여 OpenWebUI를 실행합니다. 여기서 중요한 점은 Ollama의 API 주소를 올바르게 설정하는 것입니다.

```bash
docker run -d \
  --name openwebui \
  --network openwebui-net \
  -p 3000:8080 \
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  ghcr.io/open-webui/open-webui:main
```

- `-p 3000:8080`: OpenWebUI를 외부에서 접근할 수 있도록 포트 매핑합니다. (호스트의 3000번 포트 → 컨테이너의 8080번 포트)
- `-e OLLAMA_BASE_URL=http://host.docker.internal:11434`: Ollama의 API 주소를 지정합니다. `host.docker.internal`은 Docker Desktop 환경에서만 작동하며, Linux에서는 다른 방법으로 설정해야 합니다.

---

### **3. Ollama와 OpenWebUI 연결**
Linux 환경에서는 `host.docker.internal`이 지원되지 않으므로, Ollama의 API 주소를 EC2 인스턴스의 실제 IP 주소로 설정해야 합니다.

#### **3.1. EC2 인스턴스의 IP 주소 확인**
EC2 인스턴스의 프라이빗 IP 주소를 확인합니다:
```bash
hostname -I
```
예시 출력: `172.31.16.15`

#### **3.2. OpenWebUI 환경 변수 수정**
위에서 확인한 IP 주소를 사용하여 `OLLAMA_BASE_URL`을 설정합니다:
```bash
docker run -d \
  --name openwebui \
  --network openwebui-net \
  -p 3000:8080 \
  -e OLLAMA_BASE_URL=http://<EC2_PRIVATE_IP>:11434 \
  ghcr.io/open-webui/open-webui:main
```
- `<EC2_PRIVATE_IP>`를 실제 EC2 인스턴스의 프라이빗 IP로 대체합니다.

---

### **4. 방화벽 및 보안 그룹 설정**
EC2 인스턴스의 보안 그룹과 Linux 방화벽에서 필요한 포트를 열어야 합니다.

#### **4.1. 보안 그룹 설정**
AWS 관리 콘솔에서 EC2 인스턴스의 보안 그룹을 수정하여 다음 규칙을 추가합니다:
- **HTTP 트래픽**: 포트 `3000` (OpenWebUI) 허용
- **Custom TCP**: 포트 `11434` (Ollama API) 허용

#### **4.2. Linux 방화벽 설정**
Linux 방화벽이 활성화되어 있다면, 다음 명령어를 사용하여 포트를 엽니다:
```bash
sudo firewall-cmd --add-port=3000/tcp --permanent
sudo firewall-cmd --add-port=11434/tcp --permanent
sudo firewall-cmd --reload
```

---

### **5. OpenWebUI 접속 및 테스트**
브라우저에서 OpenWebUI에 접속합니다:
```
http://<EC2_PUBLIC_IP>:3000
```
- `<EC2_PUBLIC_IP>`는 EC2 인스턴스의 공인 IP 주소입니다.

접속 후, Ollama 모델이 정상적으로 표시되는지 확인합니다. 만약 모델이 보이지 않는다면, 다음과 같은 문제를 점검하세요:
1. `OLLAMA_BASE_URL`이 올바르게 설정되었는지 확인.
2. Ollama 서비스가 실행 중인지 확인 (`systemctl status ollama`).
3. EC2 보안 그룹 및 방화벽 설정이 올바른지 확인.

---

### **6. 기타 팁**
- **로그 확인**: 문제가 발생하면 OpenWebUI와 Ollama의 로그를 확인합니다.
  ```bash
  docker logs openwebui
  ```
- **업데이트**: 최신 버전의 OpenWebUI와 Ollama를 사용하는지 확인합니다.

이 과정을 따라하면 OpenWebUI와 Ollama를 성공적으로 연결할 수 있을 것입니다. 추가 질문이 있다면 언제든지 말씀해주세요!

# OpenWebUI 설정 - perplexity

OpenWebUI 설정을 확인하고 수정하는 과정을 좀 더 자세히 설명해드리겠습니다:

## OpenWebUI 설정 확인 및 수정

1. OpenWebUI 접속
   - 웹 브라우저를 열고 `http://[EC2_PUBLIC_IP]:8180` 주소로 접속합니다.
   - 로그인 후 대시보드에 진입합니다.

2. 설정 메뉴 접근
   - 화면 좌측 하단의 사용자 이름을 클릭합니다.
   - 드롭다운 메뉴에서 "Settings" 또는 "설정"을 선택합니다.

3. Ollama API 설정 확인
   - 설정 페이지에서 "Ollama API" 또는 "API 설정" 섹션을 찾습니다.
   - "Ollama API Base URL" 항목을 확인합니다.

4. API 주소 수정
   - 현재 설정된 주소가 `http://localhost:11434` 또는 `http://127.0.0.1:11434`인 경우, EC2 인스턴스의 프라이빗 IP 주소로 변경해야 합니다.
   - 주소를 `http://[EC2_PRIVATE_IP]:11434`로 수정합니다. 예: `http://172.31.X.X:11434`

5. 설정 저장
   - 변경사항을 저장하기 위해 "Save" 또는 "저장" 버튼을 클릭합니다.

6. OpenWebUI 재시작
   - 설정 변경 후 OpenWebUI를 재시작하는 것이 좋습니다. SSH로 EC2 인스턴스에 접속하여 다음 명령어를 실행합니다:
     ```bash
     docker restart open-webui
     ```

7. 연결 테스트
   - 설정을 저장하고 OpenWebUI를 재시작한 후, 대시보드로 돌아가 모델 목록이 정상적으로 표시되는지 확인합니다.
   - 새로운 채팅을 시작하여 Ollama 모델과의 통신이 정상적으로 이루어지는지 테스트합니다.

이 과정을 통해 OpenWebUI가 EC2 인스턴스에서 실행 중인 Ollama API와 올바르게 통신할 수 있도록 설정할 수 있습니다. 만약 여전히 문제가 발생한다면, EC2 인스턴스의 보안 그룹 설정에서 11434 포트(Ollama API용)가 내부 네트워크에서 접근 가능하도록 열려있는지 확인해보세요[1][5].


---



# Pip를 통한 설치 - perplexity - 잘 동작함.

EC2 Ubuntu에서 OpenWebUI를 pip를 이용해 설치하고 8180 포트로 설정하는 방법은 다음과 같습니다:

## 1. Python 환경 확인

OpenWebUI는 Python 3.11 버전을 요구합니다. 먼저 Python 버전을 확인하세요:

```bash
python3 --version
```

만약 3.11 버전이 아니라면, 먼저 Python 3.11을 설치해야 합니다.

## 2. OpenWebUI 설치

pip를 사용하여 OpenWebUI를 설치합니다:

```bash
pip install open-webui
```

## 3. OpenWebUI 실행

OpenWebUI를 8180 포트로 실행하기 위해 다음 명령어를 사용합니다:

```bash
open-webui serve --port 8180
```

## 4. Ollama API 연결 설정

Ollama가 이미 실행 중이므로, OpenWebUI가 Ollama API와 통신할 수 있도록 환경 변수를 설정해야 합니다. 다음 명령어를 실행하기 전에 환경 변수를 설정합니다:

```bash
export OLLAMA_API_BASE_URL=http://localhost:11434
```

## 5. 방화벽 설정

EC2 인스턴스의 보안 그룹에서 8180 포트에 대한 인바운드 트래픽을 허용해야 합니다. AWS 콘솔에서 EC2 인스턴스의 보안 그룹을 수정하여 8180 포트를 열어주세요.

## 6. 서비스 등록 (선택사항)

OpenWebUI를 백그라운드 서비스로 실행하려면, 시스템 서비스로 등록할 수 있습니다. 다음과 같이 서비스 파일을 생성합니다:

```bash
sudo nano /etc/systemd/system/openwebui.service
```

파일에 다음 내용을 추가합니다:

```
[Unit]
Description=OpenWebUI Service
After=network.target

[Service]
ExecStart=/usr/local/bin/open-webui serve --port 8180
Environment="OLLAMA_API_BASE_URL=http://localhost:11434"
User=ubuntu
Restart=always

[Install]
WantedBy=multi-user.target
```

서비스를 활성화하고 시작합니다:

```bash
sudo systemctl enable openwebui
sudo systemctl start openwebui
```

이제 EC2 인스턴스의 공개 IP 주소와 8180 포트를 사용하여 웹 브라우저에서 OpenWebUI에 접속할 수 있습니다: `http://:8180`

---
## 데이타베이스 

pip install open-webui로 설치한 경우에도 Open WebUI는 데이터베이스를 사용합니다. 

Open WebUI는 기본적으로 SQLite 데이터베이스를 사용하여 채팅 기록, 설정 등의 데이터를 저장합니다[4][8]. 이 데이터베이스 파일은 일반적으로 'webui.db'라는 이름으로 저장됩니다[2].

데이터베이스 및 기타 데이터 파일의 저장 위치는 설치 방법과 환경에 따라 다를 수 있습니다. 일반적으로 다음과 같은 위치에 저장됩니다:

1. Python 가상 환경을 사용한 경우: ".venv/Lib/site-packages/data" 디렉토리[8]
2. 시스템 Python을 사용한 경우: Python 패키지 저장소 내의 'site-packages' 디렉토리[2]

정확한 위치를 확인하려면 Python REPL에서 Open WebUI 모듈을 임포트하고 데이터 디렉토리 경로를 출력해보는 것이 도움이 될 수 있습니다[8].

따라서 pip install open-webui로 설치한 경우에도 데이터베이스를 사용하며, 이는 로컬 파일 시스템에 저장됩니다.

# 서비스 등록

## 내가 해결한 방법

``` bash 
(base) ubuntu@ip-172-31-26-173:~$ sudo vim /etc/systemd/system/open-webui.service
(base) ubuntu@ip-172-31-26-173:~$ ls /home/ubuntu/.local/bin/
nvisel  nvitop
(base) ubuntu@ip-172-31-26-173:~$ whereis open-webui
open-webui: /opt/dlami/nvme/miniconda3/bin/open-webui
(base) ubuntu@ip-172-31-26-173:~$ ^C
(base) ubuntu@ip-172-31-26-173:~$ sudo vim /etc/systemd/system/open-webui.service
(base) ubuntu@ip-172-31-26-173:~$ ^C
(base) ubuntu@ip-172-31-26-173:~$ sudo vim /etc/systemd/system/open-webui.service
(base) ubuntu@ip-172-31-26-173:~$ cat /etc/systemd/system/open-webui.service
[Unit]
Description=Open WebUI Service
After=network.target

[Service]
ExecStart=/home/ubuntu/workspace/miniconda3/bin/open-webui serve --port 8180
User=ubuntu
Restart=always
Environment="OLLAMA_API_BASE_URL=http://localhost:11434"

[Install]
WantedBy=multi-user.target

(base) ubuntu@ip-172-31-26-173:~$


(base) ubuntu@ip-172-31-26-173:~$ ps aux | grep "open-webui"
ubuntu    963357  0.0  0.0   7004  2432 pts/2    S+   11:05   0:00 grep --color=auto open-webui
(base) ubuntu@ip-172-31-26-173:~$ sudo vim /etc/systemd/system/open-webui.service
(base) ubuntu@ip-172-31-26-173:~$ sudo systemctl daemon-reload
(base) ubuntu@ip-172-31-26-173:~$ sudo systemctl start open-webui
(base) ubuntu@ip-172-31-26-173:~$ sudo systemctl enable open-webui
Created symlink /etc/systemd/system/multi-user.target.wants/open-webui.service → /etc/systemd/system/open-webui.service.
(base) ubuntu@ip-172-31-26-173:~$ sudo systemctl status open-webui
× open-webui.service - Open WebUI Service
     Loaded: loaded (/etc/systemd/system/open-webui.service; enabled; vendor preset: enabled)
     Active: failed (Result: exit-code) since Wed 2025-02-19 11:06:46 UTC; 15s ago
   Main PID: 963411 (code=exited, status=203/EXEC)
        CPU: 593us

Feb 19 11:06:46 ip-172-31-26-173 systemd[1]: open-webui.service: Scheduled restart job, restart counter is at 5.
Feb 19 11:06:46 ip-172-31-26-173 systemd[1]: Stopped Open WebUI Service.
Feb 19 11:06:46 ip-172-31-26-173 systemd[1]: open-webui.service: Start request repeated too quickly.
Feb 19 11:06:46 ip-172-31-26-173 systemd[1]: open-webui.service: Failed with result 'exit-code'.
Feb 19 11:06:46 ip-172-31-26-173 systemd[1]: Failed to start Open WebUI Service.
(base) ubuntu@ip-172-31-26-173:~$ ^C
(base) ubuntu@ip-172-31-26-173:~$ sudo vim /etc/systemd/system/open-webui.service
(base) ubuntu@ip-172-31-26-173:~$ ls /home/ubuntu/.local/bin/
nvisel  nvitop
(base) ubuntu@ip-172-31-26-173:~$ whereis open-webui
open-webui: /opt/dlami/nvme/miniconda3/bin/open-webui
(base) ubuntu@ip-172-31-26-173:~$ ^C
(base) ubuntu@ip-172-31-26-173:~$ sudo vim /etc/systemd/system/open-webui.service
(base) ubuntu@ip-172-31-26-173:~$ ^C
(base) ubuntu@ip-172-31-26-173:~$ sudo vim /etc/systemd/system/open-webui.service
(base) ubuntu@ip-172-31-26-173:~$ cat /etc/systemd/system/open-webui.service
[Unit]
Description=Open WebUI Service
After=network.target

[Service]
ExecStart=/home/ubuntu/workspace/miniconda3/bin/open-webui serve --port 8180
User=ubuntu
Restart=always
Environment="OLLAMA_API_BASE_URL=http://localhost:11434"

[Install]
WantedBy=multi-user.target

(base) ubuntu@ip-172-31-26-173:~$ ^C
(base) ubuntu@ip-172-31-26-173:~$ sudo systemctl daemon-reload
(base) ubuntu@ip-172-31-26-173:~$ sudo systemctl start open-webui
(base) ubuntu@ip-172-31-26-173:~$ sudo systemctl status  open-webui
× open-webui.service - Open WebUI Service
     Loaded: loaded (/etc/systemd/system/open-webui.service; enabled; vendor preset: enabled)
     Active: failed (Result: exit-code) since Wed 2025-02-19 11:12:51 UTC; 3s ago
    Process: 963720 ExecStart=/home/ubuntu/workspace/miniconda3/bin/open-webui serve --port 8180 (code=exited, status=1/FAILURE)
   Main PID: 963720 (code=exited, status=1/FAILURE)
        CPU: 421ms

Feb 19 11:12:51 ip-172-31-26-173 systemd[1]: open-webui.service: Scheduled restart job, restart counter is at 5.
Feb 19 11:12:51 ip-172-31-26-173 systemd[1]: Stopped Open WebUI Service.
Feb 19 11:12:51 ip-172-31-26-173 systemd[1]: open-webui.service: Start request repeated too quickly.
Feb 19 11:12:51 ip-172-31-26-173 systemd[1]: open-webui.service: Failed with result 'exit-code'.
Feb 19 11:12:51 ip-172-31-26-173 systemd[1]: Failed to start Open WebUI Service.
(base) ubuntu@ip-172-31-26-173:~$ ^C
(base) ubuntu@ip-172-31-26-173:~$ ^C
(base) ubuntu@ip-172-31-26-173:~$ sudo vim /etc/systemd/system/open-webui.service
(base) ubuntu@ip-172-31-26-173:~$ sudo systemctl daemon-reload
sudo systemctl restart open-webui
(base) ubuntu@ip-172-31-26-173:~$ sudo systemctl status  open-webui
● open-webui.service - Open WebUI Service
     Loaded: loaded (/etc/systemd/system/open-webui.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2025-02-19 11:15:38 UTC; 11s ago
   Main PID: 963854 (open-webui)
      Tasks: 39 (limit: 76292)
     Memory: 584.3M
        CPU: 11.899s
     CGroup: /system.slice/open-webui.service
             └─963854 /home/ubuntu/workspace/miniconda3/bin/python /opt/dlami/nvme/miniconda3/bin/open-webui serve --port 8180

Feb 19 11:15:46 ip-172-31-26-173 open-webui[963854]:  ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═══╝     ╚══╝╚══╝ ╚══════╝╚═════╝  ╚═════╝ ╚═╝
Feb 19 11:15:46 ip-172-31-26-173 open-webui[963854]: v0.5.14 - building the best open-source AI user interface.
Feb 19 11:15:46 ip-172-31-26-173 open-webui[963854]: https://github.com/open-webui/open-webui
Feb 19 11:15:46 ip-172-31-26-173 open-webui[963854]: [148B blob data]
Feb 19 11:15:47 ip-172-31-26-173 open-webui[963854]: INFO:     Started server process [963854]
Feb 19 11:15:47 ip-172-31-26-173 open-webui[963854]: INFO:     Waiting for application startup.
Feb 19 11:15:47 ip-172-31-26-173 open-webui[963854]: INFO:     Application startup complete.
Feb 19 11:15:47 ip-172-31-26-173 open-webui[963854]: INFO:     Uvicorn running on http://0.0.0.0:8180 (Press CTRL+C to quit)
Feb 19 11:15:47 ip-172-31-26-173 open-webui[963854]: INFO:     ('127.0.0.1', 51680) - "WebSocket /ws/socket.io/?EIO=4&transport=websocket" [accepted]
Feb 19 11:15:47 ip-172-31-26-173 open-webui[963854]: INFO:     connection open
(base) ubuntu@ip-172-31-26-173:~$ cat  /etc/systemd/system/open-webui.service
[Unit]
Description=Open WebUI Service
After=network.target

[Service]
ExecStart=/opt/dlami/nvme/miniconda3/bin/open-webui serve --port 8180
User=ubuntu
Restart=always
Environment="OLLAMA_API_BASE_URL=http://localhost:11434"
Environment="PATH=/opt/dlami/nvme/miniconda3/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
WorkingDirectory=/home/ubuntu

[Install]
WantedBy=multi-user.target

(base) ubuntu@ip-172-31-26-173:~$

```

## 답변 1

이 문제를 해결하기 위해 다음 단계를 따라해 보세요:

1. open-webui.service 파일 내용 확인:
   ```bash
   sudo cat /etc/systemd/system/open-webui.service
   ```
   파일 내용을 확인하여 ExecStart 경로가 올바른지 확인하세요.

2. ExecStart 경로 수정:
   ```bash
   sudo vim /etc/systemd/system/open-webui.service
   ```
   ExecStart 줄을 다음과 같이 수정하세요:
   ```
   ExecStart=/home/ubuntu/.local/bin/open-webui serve --port 8180
   ```

3. 환경 변수 설정:
   서비스 파일에 다음 줄을 추가하세요:
   ```
   Environment="PATH=/home/ubuntu/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
   ```

4. 서비스 파일 권한 확인:
   ```bash
   sudo chmod 644 /etc/systemd/system/open-webui.service
   ```

5. systemd 재로드 및 서비스 재시작:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart open-webui
   ```

6. 서비스 상태 확인:
   ```bash
   sudo systemctl status open-webui
   ```

7. 로그 확인:
   ```bash
   sudo journalctl -u open-webui -n 50 --no-pager
   ```

이러한 단계를 수행한 후에도 문제가 지속되면, open-webui 실행 파일의 정확한 위치를 확인하고 필요한 경우 서비스 파일의 ExecStart 경로를 수정하세요. 또한, 사용자 권한과 필요한 환경 변수가 올바르게 설정되어 있는지 확인하세요.

---

## 답변 2 

open-webui 서비스가 시작되지 않는 문제를 해결하기 위해 다음 단계를 따라해 보세요:

1. 실행 파일 경로 확인:
   `whereis open-webui` 명령어 결과에 따르면 open-webui의 실제 경로는 `/opt/dlami/nvme/miniconda3/bin/open-webui`입니다. 서비스 파일의 ExecStart 경로를 이에 맞게 수정해야 합니다.

2. 서비스 파일 수정:
   ```bash
   sudo vim /etc/systemd/system/open-webui.service
   ```
   ExecStart 줄을 다음과 같이 수정하세요:
   ```
   ExecStart=/opt/dlami/nvme/miniconda3/bin/open-webui serve --port 8180
   ```

3. 환경 변수 설정:
   서비스 파일에 다음 줄을 추가하세요:
   ```
   Environment="PATH=/opt/dlami/nvme/miniconda3/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
   ```

4. 작업 디렉토리 설정:
   서비스 파일에 다음 줄을 추가하세요:
   ```
   WorkingDirectory=/home/ubuntu
   ```

5. systemd 재로드 및 서비스 재시작:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart open-webui
   ```

6. 서비스 상태 확인:
   ```bash
   sudo systemctl status open-webui
   ```

7. 로그 확인:
   문제가 지속되면 다음 명령어로 자세한 로그를 확인하세요:
   ```bash
   sudo journalctl -u open-webui -n 50 --no-pager
   ```

이러한 변경 후에도 문제가 계속되면, open-webui 명령어를 직접 실행해 보고 오류 메시지를 확인하세요:

```bash
/opt/dlami/nvme/miniconda3/bin/open-webui serve --port 8180
```

이 과정에서 나타나는 오류 메시지를 바탕으로 추가적인 문제 해결이 가능할 것입니다.

---
# Pip를 통한 설치 - chatgpt - 위에것이 되어서 테스트 안해봄

EC2 Ubuntu 인스턴스에서 `pip`를 사용하여 OpenWebUI를 설치하고, 8180 포트에서 실행하는 방법을 안내해 드리겠습니다. 또한, `ubuntu` 계정으로 Ollama가 이미 실행 중인 상황을 고려하여, OpenWebUI와 Ollama를 연동하는 방법도 함께 설명하겠습니다.

### 1. OpenWebUI 설치 및 설정

**1. Python 및 pip 업데이트:**

먼저, 시스템의 Python과 pip를 최신 버전으로 업데이트합니다.

```bash
sudo apt update
sudo apt install python3 python3-pip
```

**2. 가상 환경 생성 및 활성화:**

프로젝트를 위한 가상 환경을 생성하고 활성화합니다.

```bash
python3 -m venv openwebui_env
source openwebui_env/bin/activate
```

**3. OpenWebUI 설치:**

가상 환경 내에서 OpenWebUI를 설치합니다.

```bash
pip install openwebui
```

**4. OpenWebUI 설정 파일 생성 및 포트 변경:**

설정 파일을 생성하여 OpenWebUI가 8180 포트에서 실행되도록 설정합니다.

```bash
mkdir -p ~/.openwebui
nano ~/.openwebui/config.yaml
```


`config.yaml` 파일에 다음 내용을 추가합니다:

```yaml
server:
  host: 0.0.0.0
  port: 8180
```


파일을 저장하고 닫습니다.

**5. OpenWebUI 실행:**

설정을 완료한 후, OpenWebUI를 실행합니다.

```bash
openwebui serve
```


이제 OpenWebUI는 8180 포트에서 실행됩니다.

### 2. OpenWebUI와 Ollama 연동

이미 `ubuntu` 계정으로 Ollama가 실행 중이라면, OpenWebUI와 Ollama를 연동하여 사용할 수 있습니다.

**1. Ollama의 API 엔드포인트 확인:**

Ollama가 제공하는 API의 엔드포인트를 확인합니다. 일반적으로 `http://localhost:11434`와 같은 형태입니다.

**2. OpenWebUI 설정 파일 수정:**

앞서 생성한 `~/.openwebui/config.yaml` 파일을 열어 Ollama와의 연동을 설정합니다.

```bash
nano ~/.openwebui/config.yaml
```


파일에 다음 내용을 추가하거나 수정합니다:

```yaml
backend:
  api_url: http://localhost:11434
```


파일을 저장하고 닫습니다.

**3. OpenWebUI 재시작:**

설정 변경 사항을 적용하기 위해 OpenWebUI를 재시작합니다.

```bash
pkill -f openwebui
openwebui serve
```


이제 OpenWebUI는 Ollama와 연동되어 8180 포트에서 실행됩니다.

**참고:** 보안을 위해 EC2 인스턴스의 보안 그룹에서 8180 포트에 대한 인바운드 규칙을 설정하여 필요한 IP에서만 접근 가능하도록 제한하는 것이 좋습니다.

위의 절차를 따라 OpenWebUI를 설치하고 Ollama와 연동하여 8180 포트에서 실행할 수 있습니다. 

---

# EC2 인스턴스에서 **Public IP**와 **Private IP**를 얻는 CLI 명령어

EC2 인스턴스에서 **Public IP**와 **Private IP**를 얻는 CLI 명령어는 다음과 같습니다.

### 1. **Public IP (공인 IP) 조회**
```sh
curl -s http://169.254.169.254/latest/meta-data/public-ipv4
```
- 인스턴스에 퍼블릭 IP가 할당되지 않았다면 빈 값이 반환됩니다.

### 2. **Private IP (사설 IP) 조회**
```sh
curl -s http://169.254.169.254/latest/meta-data/local-ipv4
```
- 인스턴스의 내부 네트워크 IP 주소를 가져옵니다.

### 3. **Public 및 Private IP 함께 출력**
```sh
echo "Public IP: $(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "Private IP: $(curl -s http://169.254.169.254/latest/meta-data/local-ipv4)"
```

이 명령어들은 AWS의 **인스턴스 메타데이터 서비스(IMDS)**를 사용하여 EC2 인스턴스에서 직접 실행할 수 있습니다.

---

# EC2 Ubuntu 인스턴스에서 public IP를 확인하는 방법

EC2 Ubuntu 인스턴스에서 public IP를 확인하는 방법은 다음과 같습니다:

## 1. 메타데이터 서비스 사용

EC2 인스턴스 내부에서 다음 명령어를 실행합니다:

```bash
curl http://169.254.169.254/latest/meta-data/public-ipv4
```

이 명령어는 인스턴스의 public IPv4 주소를 반환합니다.

## 2. AWS CLI 사용

AWS CLI가 설치되어 있고 적절한 권한이 설정되어 있다면 다음 명령어를 사용할 수 있습니다:

```bash
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId, PublicIpAddress]' --output table
```

이 명령어는 모든 EC2 인스턴스의 ID와 해당 public IP 주소를 테이블 형식으로 보여줍니다.

## 3. 외부 서비스 사용

인터넷에 연결된 EC2 인스턴스에서는 다음과 같은 외부 서비스를 사용할 수 있습니다:

```bash
curl https://ipinfo.io/ip
```

또는

```bash
curl https://checkip.amazonaws.com
```

이 방법들은 NAT 뒤에 있는 인스턴스에서도 public IP를 확인할 수 있습니다.

## 4. ec2metadata 도구 사용

일부 EC2 Linux 이미지에는 ec2metadata 도구가 사전 설치되어 있습니다. 이 도구를 사용하려면:

```bash
ec2metadata --public-ipv4
```

이 명령어로 현재 VM의 public IP를 조회할 수 있습니다.

이러한 방법들 중 하나를 선택하여 EC2 Ubuntu 인스턴스의 public IP를 쉽게 확인할 수 있습니다[1][3][4][5].


---

