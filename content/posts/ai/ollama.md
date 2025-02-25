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

---
# Best GUI 

Below is a detailed comparison of three GUI tools—LM Studio, Open WebUI, and Gradio—for integrating with a Retrieval-Augmented Generation (RAG) workflow, specifically for deployment on an EC2 Ubuntu instance.

---

### 1. LM Studio

**Overview:**  
LM Studio is a dedicated local inference platform designed to manage and run large language models (LLMs) via a standalone desktop-style interface.

**Strengths:**  
- **Model Management:** Provides out‐of‐the‐box features for downloading, updating, and managing local LLMs.
- **Integrated Inference Server:** Offers a built-in inference server that can process model requests locally.
- **User-Friendly Interface:** Its GUI is designed for ease of use, making it accessible to users who prefer a desktop-like experience.

**Limitations for RAG:**  
- **RAG-Specific Integration:** LM Studio isn’t specifically built for integrating retrieval components with generation. If your workflow requires dynamic document retrieval and on-the-fly augmentation of model responses, you might need to build additional custom logic.
- **Deployment Flexibility:** While it runs well as a standalone application, adapting it for web-based or multi-user RAG deployments on a server might require extra configuration.

**Deployment on EC2 Ubuntu:**  
- LM Studio can be installed on Ubuntu (using an AppImage or installation package) and run on EC2. However, you may need to configure it to run headless or as a background service if you plan to access it via a web interface.

---

### 2. Open WebUI

**Overview:**  
Open WebUI is a web-based interface that supports interacting with various LLMs. It’s designed to be extensible and can integrate document retrieval features essential for RAG workflows.

**Strengths:**  
- **Web-Based Interface:** Accessible via a browser, making it ideal for multi-user and remote deployments.
- **RAG Integration:** Built-in support for integrating with document libraries and retrieval systems—users can upload documents and have the model generate responses based on both the conversation and retrieved content.
- **Container-Friendly:** Often deployed via Docker, which simplifies installation and scaling on EC2 Ubuntu.

**Limitations:**  
- **Installation Complexity:** While Docker simplifies deployment, initial setup may require familiarity with containerization.
- **Customization:** For very specific use cases, you may need to tweak configuration files or code.

**Deployment on EC2 Ubuntu:**  
- Open WebUI is commonly deployed using Docker. With Docker installed on your EC2 Ubuntu instance, you can pull the official image and run it with a few commands, exposing the service on a desired port (e.g., 3000).

**RAG Integration:**  
- Open WebUI excels at RAG tasks due to its ability to incorporate document search and retrieval modules alongside model inference, enabling richer, context-aware interactions.

---

### 3. Gradio

**Overview:**  
Gradio is a Python library that lets you build interactive web UIs quickly for machine learning models. It’s widely used for demos and prototyping.

**Strengths:**  
- **Ease of Use:** Very simple to set up; you write a few lines of Python to create an interactive interface.
- **Flexibility:** Highly customizable if you’re comfortable with Python. You can integrate any retrieval mechanism you build yourself.
- **Rapid Prototyping:** Ideal for quick demos, experiments, or proof-of-concept RAG applications.

**Limitations:**  
- **Production Readiness:** While Gradio is excellent for demos and prototyping, it might require additional effort to harden it for production use (e.g., reverse proxy, security configurations).
- **Manual Integration:** RAG functionality (retrieval plus generation) isn’t built-in; you need to implement the retrieval logic separately and wire it to the UI.

**Deployment on EC2 Ubuntu:**  
- You can install Gradio via pip and run your Python scripts on EC2 Ubuntu. The interface will run on a specified port, which you can expose using a reverse proxy (like Nginx) if needed.

**RAG Integration:**  
- With Gradio, you have full control over the integration. You can build your retrieval system in Python, then create an interface where the model’s responses are augmented by retrieved documents. However, this requires custom coding.

---

## Open WebUI와 LM Studio 비교

Open WebUI와 LM Studio는 모두 로컬 환경에서 대규모 언어 모델(LLM)을 활용할 수 있는 도구로, Retrieval-Augmented Generation(RAG) 기능과의 통합 측면에서 각각의 특징을 비교해보겠습니다.

### Open WebUI

**RAG 통합 기능:**

- **문서 기반 대화:** Open WebUI는 로컬에 저장된 PDF나 TXT 파일을 업로드하여, 해당 문서의 내용을 기반으로 모델과 상호작용할 수 있는 RAG 기능을 제공합니다. 이를 통해 사용자는 개인 문서를 모델과의 대화에 직접 활용할 수 있습니다. citeturn0search1

- **웹 검색 통합:** SearXNG, Google PSE, Brave Search, DuckDuckGo 등 다양한 검색 엔진과의 통합을 통해 실시간 웹 검색 결과를 대화에 포함시킬 수 있습니다. 이를 통해 최신 정보를 모델 응답에 반영할 수 있습니다. citeturn0search9

**사용자 경험:**

- **커스터마이즈 가능성:** Open WebUI는 다양한 플러그인과 설정을 통해 사용자 맞춤형 기능을 제공하며, 고급 사용자에게 적합한 높은 수준의 커스터마이즈를 지원합니다.

- **설치 및 설정:** Docker를 활용한 설치를 권장하며, 설치 및 초기 설정에는 다소 기술적인 지식이 필요할 수 있습니다.

### LM Studio

**RAG 통합 기능:**

- **모델 관리 및 실행:** LM Studio는 다양한 LLM 모델을 로컬에서 관리하고 실행할 수 있는 플랫폼으로, 내장된 추론 서버를 통해 모델을 효율적으로 활용할 수 있습니다.

- **RAG 구현:** LM Studio 자체에는 직접적인 RAG 기능이 내장되어 있지 않지만, 내장된 추론 서버를 통해 외부 애플리케이션이나 인터페이스와 연동하여 RAG 기능을 구현할 수 있습니다.

**사용자 경험:**

- **직관적인 인터페이스:** LM Studio는 사용하기 쉬운 인터페이스를 제공하여, 개발자뿐만 아니라 일반 사용자도 손쉽게 모델을 관리하고 활용할 수 있습니다.

- **설치 및 설정:** 독립 실행형 애플리케이션으로 제공되어, 설치 과정이 비교적 간단하며, 추가적인 설정 없이 바로 사용할 수 있습니다.

### 결론

- **Open WebUI:** 로컬 문서와의 상호작용 및 실시간 웹 검색 통합 등 강력한 RAG 기능을 내장하고 있으며, 다양한 커스터마이즈 옵션을 통해 고급 사용자의 요구를 충족시킬 수 있습니다.

- **LM Studio:** 직관적인 인터페이스와 간편한 설치 과정을 통해 사용 편의성을 제공하며, 외부 애플리케이션과의 연동을 통해 RAG 기능을 구현할 수 있습니다.

따라서, 사용자의 기술 수준과 요구 사항에 따라 Open WebUI는 고급 기능과 커스터마이즈를 원하는 사용자에게, LM Studio는 간편한 설치와 사용을 원하는 사용자에게 적합한 선택이 될 수 있습니다. 

---
## Final Recommendation for RAG UI on EC2 Ubuntu

- **For a robust, production-ready web interface with built-in retrieval support, _Open WebUI_ is likely the best choice.** It offers a complete web solution with integrated document libraries and search capabilities, making it ideal for a Retrieval-Augmented Generation workflow.
  
- **If rapid prototyping and flexibility are your primary goals, _Gradio_ is a strong candidate.** It allows you to quickly develop a custom UI that integrates your retrieval logic with model inference, though you’ll need to build more of the backend logic yourself.

- **LM Studio** is excellent for managing and running local language models, but it might not offer the out-of-the-box RAG integration that you need, and adapting it for multi-user or web-based RAG deployments on EC2 Ubuntu could require additional work.

Please let us know if you need further details or assistance with setting up any of these tools.

---
https://www.restack.io/p/anything-llm-answer-lm-studio-vs-open-webui-cat-ai

Performance and Scalability
LMStudio is optimized for local deployments, ensuring that users can leverage their hardware effectively. The built-in inference server allows for quick responses and efficient resource management.
Open WebUI is designed for cloud-based applications, which can offer scalability but may introduce latency depending on the network conditions.

Conclusion
In summary, the choice between LMStudio and Open WebUI largely depends on the user's specific needs and preferences. For those prioritizing ease of use and local performance, LMStudio is an excellent choice. Conversely, users looking for customization and cloud capabilities may prefer Open WebUI.

---

## Open WebUI와 Gradio 비교 

아래는 EC2 Ubuntu에서 실행할 RAG(Retrieval-Augmented Generation) 시스템 구축 시, Open WebUI와 Gradio를 RAG 지원 측면에서 비교한 내용을 한국어로 번역한 것입니다.

---

### **Open WebUI**

**1. 목적 및 RAG에 대한 내장 기능:**  
- **문서 수집 및 인덱싱:**  
  Open WebUI는 로컬 문서 라이브러리와의 연동이 원활하도록 설계되어 있습니다. PDF, HTML, TXT 등의 문서를 업로드, 인덱싱, 그리고 검색할 수 있는 기능을 기본으로 제공하여, RAG 시스템에서 외부 문서의 내용을 검색하고 모델 응답에 반영할 수 있습니다.

- **통합 RAG 워크플로우:**  
  Open WebUI는 검색된 문서의 정보를 모델 추론과 결합하는 설정이나 플러그인을 제공하여, 대화형 인터페이스 내에서 retrieval과 generation을 함께 수행할 수 있습니다.

- **멀티유저 웹 인터페이스:**  
  웹 기반으로 동작하기 때문에 여러 사용자가 동시에 접근할 수 있으며, Docker를 통해 배포할 수 있어 환경 일관성을 유지하면서 확장성 있게 운영할 수 있습니다.

**2. 배포 및 사용자 정의:**  
- **Docker 기반 배포:**  
  Docker를 사용하면 EC2 Ubuntu 환경에 쉽게 배포할 수 있으며, 설정이 표준화되어 있어 관리가 용이합니다.
- **커스터마이즈:**  
  플러그인과 설정 옵션이 다양하여 검색, 인덱싱, 문서 처리 등 RAG에 필요한 맞춤형 기능을 쉽게 추가할 수 있습니다.
- **성능 및 확장성:**  
  외부 벡터 데이터베이스나 검색 엔진과의 연동을 통해 대량의 문서 검색 작업을 효율적으로 처리할 수 있습니다.

---

### **Gradio**

**1. 목적 및 RAG에 대한 기능:**  
- **빠른 프로토타이핑:**  
  Gradio는 Python 라이브러리로, 몇 줄의 코드로 인터랙티브한 웹 인터페이스를 쉽게 만들 수 있어, RAG 시스템의 초기 프로토타입 제작에 매우 유용합니다.
- **UI 구성의 유연성:**  
  사용자가 원하는 방식으로 인터페이스를 자유롭게 설계할 수 있으므로, 파일 업로드, 문서 처리, 그리고 모델 응답 결합을 위한 맞춤형 UI를 만들 수 있습니다.
- **내장 기능 제한:**  
  Gradio는 기본적으로 문서 수집이나 인덱싱, 검색 기능을 제공하지 않으므로, RAG 시스템에 필요한 문서 처리 파이프라인(예: Apache Tika, PDFMiner, 벡터 데이터베이스 연동 등)을 직접 구현해야 합니다.

**2. 배포 및 사용자 정의:**  
- **설정의 간단함:**  
  pip로 설치가 간편하며, Python 스크립트를 실행하여 인터페이스를 구동할 수 있으므로 초기 개발 및 데모용으로 매우 적합합니다.
- **프로덕션 준비도:**  
  Gradio는 데모와 프로토타이핑에 최적화되어 있어, 생산 환경에 사용하려면 추가적인 보안, 성능 최적화, 리버스 프록시 설정 등이 필요할 수 있습니다.
- **수동 통합:**  
  RAG 시스템에 필요한 문서 처리, 검색, 인덱싱 로직을 별도로 구현한 후, Gradio 인터페이스에 연결해야 합니다.

---

### **RAG 시스템 구축 시 추천**

- **Open WebUI**:  
  RAG 시스템에서 문서 수집, 인덱싱, 검색 등 retrieval 기능이 내장되어 있고, Docker를 통한 배포와 다중 사용자 지원, 확장성 측면에서 강력한 기능을 제공하므로, 생산 환경의 RAG 시스템 구축에 적합합니다.

- **Gradio**:  
  빠른 프로토타이핑과 인터랙티브한 데모 제작에 유리하지만, RAG에 필요한 문서 처리 및 검색 기능은 직접 구현해야 하므로, 프로토타입 단계에서는 좋으나, 완성도 높은 프로덕션 시스템을 구축하기 위해서는 추가적인 개발이 필요합니다.

---

### **요약**

- **RAG 통합 기능 측면에서 Open WebUI는** 문서 업로드, 인덱싱, 검색 기능 등 RAG에 필요한 주요 기능들을 내장하고 있어, EC2 Ubuntu에서 RAG 시스템을 구축할 때 더 강력한 옵션입니다.
- **Gradio는** 간단한 UI와 빠른 개발 속도를 제공하지만, RAG 시스템에 필요한 문서 처리 및 retrieval 기능을 자체적으로 구현해야 하므로, 빠른 데모 제작에는 좋으나 프로덕션 단계에서는 추가 개발이 필요합니다.

이 정보를 참고하여, 귀하의 RAG 시스템 구축 요구 사항에 가장 적합한 도구를 선택하시기 바랍니다. 추가 문의 사항이 있으면 언제든지 연락 주십시오.

---

# Open WebUI 설치
---
Open WebUI는 사용자 친화적인 AI 인터페이스로, Docker를 통해 손쉽게 설치하고 실행할 수 있습니다. 아래에 Docker를 활용한 설치 방법과 Docker 없이 사용하는 방법을 안내해 드리겠습니다.

### Docker를 사용하여 Open WebUI 설치 및 실행하기

1. **Docker 설치:**
   - **Ubuntu:**
     터미널을 열고 다음 명령어를 순차적으로 실행하여 Docker를 설치합니다:
     ```bash
     sudo apt-get update
     sudo apt-get install ca-certificates curl
     sudo install -m 0755 -d /etc/apt/keyrings
     curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.asc
     sudo chmod a+r /etc/apt/keyrings/docker.asc
     echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
     sudo apt-get update
     sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
     ```
     설치 완료 후, Docker가 정상적으로 설치되었는지 확인하려면 다음 명령어를 실행하세요:
     ```bash
     sudo docker run hello-world
     ```
     이 명령어를 실행하면 Docker가 정상적으로 작동하는지 확인할 수 있습니다.

2. **Open WebUI 컨테이너 실행:**
   - Docker를 통해 Open WebUI를 실행하려면 다음 명령어를 입력합니다:
     ```bash
     docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
     ```
     - `-d`: 백그라운드에서 컨테이너를 실행합니다.
     - `-p 3000:8080`: 호스트의 포트 3000을 컨테이너의 포트 8080에 매핑합니다.
     - `--add-host=host.docker.internal:host-gateway`: 컨테이너에서 호스트의 네트워크에 접근할 수 있도록 설정합니다.
     - `-v open-webui:/app/backend/data`: 컨테이너의 데이터를 호스트에 저장하여 데이터 지속성을 유지합니다.
     - `--name open-webui`: 컨테이너의 이름을 `open-webui`로 지정합니다.
     - `--restart always`: 컨테이너가 중지되더라도 자동으로 재시작되도록 설정합니다.
     - `ghcr.io/open-webui/open-webui:main`: 사용할 Docker 이미지를 지정합니다.

3. **Open WebUI 접속:**
   - 컨테이너가 정상적으로 실행되면, 웹 브라우저에서 `http://localhost:3000`으로 접속하여 Open WebUI를 사용할 수 있습니다.

### Docker 없이 Open WebUI 사용하기

Docker를 사용하지 않고 Open WebUI를 설치하려면 Python 환경에서 직접 설치할 수 있습니다.

1. **Python 및 pip 설치:**
   - Python 3.11 이상이 필요합니다.
   - **Ubuntu:**
     터미널에서 다음 명령어를 실행하여 Python과 pip를 설치합니다:
     ```bash
     sudo apt-get update
     sudo apt-get install python3.11 python3.11-venv python3.11-dev
     ```

2. **가상 환경 생성 및 활성화:**
   - 프로젝트 디렉토리를 생성하고 이동한 후, 가상 환경을 생성하고 활성화합니다:
     ```bash
     python3.11 -m venv venv
     source venv/bin/activate
     ```

3. **Open WebUI 설치:**
   - pip를 사용하여 Open WebUI를 설치합니다:
     ```bash
     pip install open-webui
     ```

4. **Open WebUI 실행:**
   - 설치 후, 다음 명령어로 Open WebUI를 실행합니다:
     ```bash
     open-webui serve
     ```
   - 이후 웹 브라우저에서 `http://localhost:3000`으로 접속하여 Open WebUI를 사용할 수 있습니다.

**참고:** Docker를 사용하면 설치 및 배포가 간편하며, 환경 설정이 표준화되어 있어 권장됩니다. 그러나 Docker를 사용하지 않는 방법도 공식적으로 지원되므로, 필요와 환경에 따라 선택하시면 됩니다.

**출처:**
- [Open WebUI 공식 GitHub 저장소](https://github.com/open-webui/open-webui)
- [Open WebUI 설치 가이드](https://docs.openwebui.com/getting-started/#manual-installation) 




---
# LM Studio를 설치

EC2 Ubuntu 환경에서 LM Studio를 설치하려면 다음 단계를 따르세요:

1. **LM Studio AppImage 다운로드:**
   - LM Studio의 공식 웹사이트 [https://lmstudio.ai/](https://lmstudio.ai/)에서 최신 버전의 AppImage 파일을 다운로드합니다.

2. **AppImage 파일 실행 권한 부여:**
   - 다운로드한 파일에 실행 권한을 부여합니다:
     ```bash
     chmod +x ./LM_Studio-<version>.AppImage
     ```
     - `<version>`을 다운로드한 파일의 실제 버전으로 대체하세요.

3. **LM Studio 실행:**
   - 일부 Ubuntu 버전에서는 보안 샌드박스 설정으로 인해 실행 시 문제가 발생할 수 있습니다. 이러한 경우 `--no-sandbox` 옵션을 사용하여 실행합니다:
     ```bash
     ./LM_Studio-<version>.AppImage --no-sandbox
     ```
     - 이 방법은 Ubuntu 24.04에서 발생하는 문제를 해결하는 데 도움이 됩니다. citeturn0search0

이러한 단계를 통해 EC2 Ubuntu 환경에서 LM Studio를 설치하고 실행할 수 있습니다.

더 자세한 설치 과정과 문제 해결 방법은 아래 영상을 참고하시기 바랍니다:

videoHow to Install LM Studio on Linux to Run Models Locallyturn0search3 