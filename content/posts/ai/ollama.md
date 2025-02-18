---
title: "Ollama"
date: 2025-02-17
categories: ["AI"]
tags: ["Ollama", "AI","Llama"]
---

# EC2의 Ubuntu 인스턴스에서 Ollama를 설치하고 사용하는 방법

EC2의 Ubuntu 인스턴스에서 Ollama를 설치하고 사용하는 방법을 안내해드리겠습니다.

### 1. Ollama 설치

Ollama는 로컬 환경에서 대규모 언어 모델(LLM)을 실행할 수 있게 해주는 오픈 소스 프레임워크입니다. Ubuntu에서 Ollama를 설치하려면 다음 단계를 따르세요.

1. **시스템 업데이트 및 필수 패키지 설치:**

   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y curl
   ```

2. **Ollama 설치 스크립트 실행:**

   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```

3. **설치 확인:**

   ```bash
   ollama --version
   ```

   위 명령어를 실행하여 Ollama가 정상적으로 설치되었는지 확인합니다.

### 2. Ollama 서비스 시작 및 종료

Ollama는 모델을 제공하기 위해 서버 모드로 실행할 수 있습니다.

- **서비스 시작:**

  ```bash
  ollama serve
  ```

  이 명령어는 Ollama 서버를 시작하여 모델을 API 형태로 제공하게 합니다.

- **서비스 종료:**

  `serve` 명령어는 포그라운드에서 실행되므로, 터미널에서 `Ctrl + C`를 눌러 종료할 수 있습니다. 백그라운드에서 실행 중인 경우, `ps` 명령어를 사용하여 프로세스 ID를 확인한 후 `kill` 명령어로 종료할 수 있습니다.

### 3. Ollama 명령어

Ollama는 다양한 명령어를 제공합니다. 주요 명령어는 다음과 같습니다.

- **모델 실행:**

  ```bash
  ollama run <모델_이름>
  ```

  예를 들어, `llama3` 모델을 실행하려면 다음과 같이 입력합니다.

  ```bash
  ollama run llama3
  ```

- **모델 다운로드:**

  ```bash
  ollama pull <모델_이름>
  ```

  특정 모델을 사전에 다운로드하려면 위 명령어를 사용합니다.

- **로컬에 설치된 모델 목록 확인:**

  ```bash
  ollama list
  ```

  현재 시스템에 설치된 모델들을 확인할 수 있습니다.

- **모델 정보 확인:**

  ```bash
  ollama show <모델_이름>
  ```

  특정 모델의 상세 정보를 확인합니다.

### 4. 모델 저장 위치 변경

Ollama는 기본적으로 모델을 시스템의 특정 디렉토리에 저장합니다. 그러나 저장 공간 관리나 다른 디스크를 활용하기 위해 모델 저장 위치를 변경할 수 있습니다.

1. **환경 변수 설정:**

   모델을 저장할 디렉토리를 생성한 후, `OLLAMA_MODELS` 환경 변수를 설정합니다.

   ```bash
   export OLLAMA_MODELS=/path/to/your/preferred/directory
   ```

   이 설정을 영구적으로 적용하려면 해당 내용을 `~/.bashrc` 또는 `~/.bash_profile`에 추가한 후 `source` 명령어로 적용합니다.

   ```bash
   echo 'export OLLAMA_MODELS=/path/to/your/preferred/directory' >> ~/.bashrc
   source ~/.bashrc
   ```

2. **서버 실행 시 적용:**

   환경 변수를 설정한 후, Ollama 서버를 실행하면 모델이 지정한 디렉토리에 저장됩니다.

   ```bash
   ollama serve
   ```

   또는 서버 실행 시 직접 환경 변수를 지정할 수도 있습니다.

   ```bash
   OLLAMA_MODELS=/path/to/your/preferred/directory ollama serve
   ```

이러한 설정을 통해 모델 저장 위치를 원하는 디렉토리로 변경할 수 있습니다.

위의 절차를 따르면 EC2의 Ubuntu 인스턴스에서 Ollama를 설치하고 효율적으로 사용할 수 있습니다. 

### 5. 실제 모델 저장위치 방법

중요한 것은 models 폴더를 symbol 링크를 만들어 저장 폴더를 가르키게 하고, owner를 ubuntu로 변경하는 것이다.
그리고 /etc/systemd/system/ollama.service 에서도 user / group 을 ubuntu로 변경해서 정상동작한다.

``` bash
ubuntu@ip-172-31-26-173:~/.ollama$ ll
total 20
drwxr-xr-x  2 ubuntu ubuntu 4096 Feb 18 02:09 ./
drwx------ 30 ubuntu ubuntu 4096 Feb 18 02:02 ../
-rw-------  1 ubuntu ubuntu  896 Feb 18 02:09 history
-rw-------  1 ubuntu ubuntu  387 Jan 24 10:31 id_ed25519
-rw-r--r--  1 ubuntu ubuntu   81 Jan 24 10:31 id_ed25519.pub
lrwxrwxrwx  1 ubuntu ubuntu   37 Feb 18 01:40 models -> /home/ubuntu/workspace/.ollama/models/

ubuntu@ip-172-31-26-173:~/.ollama$ ll /usr/share/ollama/.ollama/models
lrwxrwxrwx 1 ollama ollama 37 Jan 24 10:23 /usr/share/ollama/.ollama/models -> /home/ubuntu/workspace/.ollama/models/

ubuntu@ip-172-31-26-173:~/.ollama$ ll ~/.ollama/models
lrwxrwxrwx 1 ubuntu ubuntu 37 Feb 18 01:40 /home/ubuntu/.ollama/models -> /home/ubuntu/workspace/.ollama/models/

ubuntu@ip-172-31-26-173:~/.ollama$ rm /usr/share/ollama/.ollama/models
rm: cannot remove '/usr/share/ollama/.ollama/models': Permission denied

ubuntu@ip-172-31-26-173:~/.ollama$ sudo rm /usr/share/ollama/.ollama/models

ubuntu@ip-172-31-26-173:~/.ollama$ ollama run llama3.2
>>> /bye

ubuntu@ip-172-31-26-173:~/.ollama$ rm /usr/share/ollama/.ollama/models
rm: cannot remove '/usr/share/ollama/.ollama/models': No such file or directory

ubuntu@ip-172-31-26-173:~/.ollama$ rm /home/ubuntu/.ollama/models

ubuntu@ip-172-31-26-173:~/.ollama$ ollama run llama3.2
pulling manifest
pulling dde5aa3fc5ff... 100% ▕█████████████████████████████████████▏ 2.0 GB
pulling 966de95ca8a6... 100% ▕█████████████████████████████████████▏ 1.4 KB
pulling fcc5a6bec9da... 100% ▕█████████████████████████████████████▏ 7.7 KB
pulling a70ff7e570d9... 100% ▕█████████████████████████████████████▏ 6.0 KB
pulling 56bb8bd477a5... 100% ▕█████████████████████████████████████▏   96 B
pulling 34bb5ab01051... 100% ▕█████████████████████████████████████▏  561 B
verifying sha256 digest
writing manifest
success
>>> /bye

ubuntu@ip-172-31-26-173:~/.ollama$ ll /home/ubuntu/.ollama/models
total 16

ubuntu@ip-172-31-26-173:~/.ollama$ cat /etc/systemd/system/ollama.service
[Unit]
Description=Ollama Service
After=network-online.target

[Service]
ExecStart=/usr/local/bin/ollama serve
User=ubuntu
Greoup=ubuntu
# User=ollama
# Group=ollama
Restart=always
RestartSec=3
Environment="PATH=/home/ubuntu/anaconda3/bin:/home/ubuntu/anaconda3/condabin:/opt/amazon/openmpi/bin:/opt/amazon/efa/bin:/usr/local/cuda-12.1/bin:/usr/local/cuda-12.1/include:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"
# ryan add
# ProtectHome=no
# Environment="Home=/home/ubuntu/workspace/.ollama/"
# Environment="OLLAMA_MODELS=/home/ubuntu/workspace/.ollama/models"
[Install]

```