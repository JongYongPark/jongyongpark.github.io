---
title: "Mojo Install"
date: 2025-02-27
categories: ["sdlc"]
tags: ["Mojo"]
---

# Mojo 설치 
Mojo는 Modular가 개발한 새로운 프로그래밍 언어로, Python과 유사하지만 더 높은 성능을 제공합니다. WSL (Windows Subsystem for Linux)의 Ubuntu 환경에서 Mojo를 설치하려면 다음과 같은 단계를 따르면 됩니다.

---

### **1. WSL 및 Ubuntu 확인**
먼저 WSL이 설치되어 있고 Ubuntu가 실행 중인지 확인하세요.
- WSL이 설치되어 있지 않다면 [Microsoft 공식 문서](https://learn.microsoft.com/ko-kr/windows/wsl/install)를 참고하여 설치하세요.
- Ubuntu는 Microsoft Store에서 다운로드하거나 명령줄에서 설치할 수 있습니다.

WSL Ubuntu가 이미 설치되어 있다면, 터미널을 열고 다음 명령어로 Ubuntu 버전을 확인하세요:
```bash
lsb_release -a
```

---

### **2. Mojo 설치 준비**
Mojo는 아직 초기 단계의 언어이므로 공식적으로 지원되는 패키지 관리자가 없습니다. 따라서 Modular의 공식 웹사이트나 CLI 도구를 사용하여 설치해야 합니다.

#### **2.1. 필수 의존성 설치**
Mojo를 설치하기 전에 필요한 기본 도구들을 설치합니다:
```bash
sudo apt update
sudo apt install -y curl git build-essential
```

---

### **3. Modular CLI 설치**
Mojo는 Modular의 CLI 도구를 통해 설치됩니다. 다음 단계를 따라 CLI를 설치하세요.

#### **3.1. Modular CLI 다운로드 및 설치**
공식 Modular CLI 설치 스크립트를 실행합니다:
```bash
curl https://get.modular.com | sh
```

#### **3.2. PATH 설정**
스크립트가 실행된 후, `~/.bashrc` 또는 `~/.zshrc` 파일에 Modular CLI의 경로를 추가해야 할 수 있습니다. 다음 명령어를 실행하여 확인하세요:
```bash
source ~/.bashrc
```
또는 Zsh를 사용 중이라면:
```bash
source ~/.zshrc
```

설치가 완료되었는지 확인하려면 다음 명령어를 실행하세요:
```bash
modular --version
```
버전 정보가 출력되면 설치가 성공한 것입니다.

---

### **4. Mojo 설치**
Modular CLI를 사용하여 Mojo를 설치합니다.

#### **4.1. Mojo 설치 명령어 실행**
다음 명령어를 실행하여 Mojo를 설치합니다:
```bash
modular install mojo
```

#### **4.2. 설치 확인**
설치가 완료되면, Mojo가 제대로 동작하는지 확인하기 위해 간단한 코드를 실행해 보세요:
```bash
mojo --version
```
또는 간단한 "Hello, World!" 프로그램을 작성하고 실행해 보세요:
```bash
echo 'print("Hello, Mojo!")' > hello.mojo
mojo hello.mojo
```
"Hello, Mojo!"가 출력되면 설치가 성공한 것입니다.

---

### **5. 추가 설정 (옵션)**
#### **5.1. PATH 환경 변수 업데이트**
Mojo 실행 파일이 시스템의 PATH에 포함되어 있는지 확인하세요. 만약 포함되어 있지 않다면, `.bashrc` 또는 `.zshrc` 파일에 다음 줄을 추가하세요:
```bash
export PATH="$HOME/.modular/bin:$PATH"
```
그런 다음 변경 사항을 적용합니다:
```bash
source ~/.bashrc
```

#### **5.2. VS Code와 연동 (옵션)**
Mojo 코드를 편집하기 위해 Visual Studio Code를 사용할 경우, WSL 확장과 함께 Modular에서 제공하는 Mojo 확장을 설치하면 편리합니다.

---

### **6. 문제 해결**
설치 중 문제가 발생한다면 다음 사항을 확인하세요:
1. **WSL 버전**: WSL 2를 사용 중인지 확인하세요. WSL 1에서는 일부 기능이 제한될 수 있습니다.
   ```bash
   wsl --list --verbose
   ```
   WSL 2로 업그레이드하려면:
   ```bash
   wsl --set-version <distro-name> 2
   ```

2. **권한 문제**: `curl` 명령어 실행 중 권한 오류가 발생한다면 `sudo`를 사용하거나 사용자 디렉토리에 설치하세요.

3. **Modular CLI 설치 실패**: 네트워크 문제로 인해 설치가 실패할 수 있습니다. 다시 시도하거나 공식 문서를 참조하세요.

---

위 단계를 따라 설치하면 WSL Ubuntu 환경에서 Mojo를 성공적으로 사용할 수 있습니다. 추가 질문이 있다면 언제든지 물어보세요! 😊


----
# 내 작업

### Bashrc 설정정
```

---
🔥 Mojo installed! 🔥

Mojo's Python virtual environment created at /home/jonpark/.modular/pkg/packages.modular.com_mojo/venv

If you are using ZSH (default on macOS), run the following commands:

echo 'export MODULAR_HOME="/home/jonpark/.modular"' >> ~/.zshrc
echo 'export PATH="/home/jonpark/.modular/pkg/packages.modular.com_mojo/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

If you are using bash, run the following commands:

BASHRC=$( [ -f "$HOME/.bash_profile" ] && echo "$HOME/.bash_profile" || echo "$HOME/.bashrc" )
echo 'export MODULAR_HOME="/home/jonpark/.modular"' >> "$BASHRC"
echo 'export PATH="/home/jonpark/.modular/pkg/packages.modular.com_mojo/bin:$PATH"' >> "$BASHRC"
source "$BASHRC"

Then enter 'mojo' to start the Mojo REPL.

For tool help, enter 'mojo --help'.
For more docs, see https://docs.modular.com/mojo.
```

### 실행

```
(base) jonpark@BD-82898:~/workspace/jonpark-work/mk/scripts$ BASHRC=$( [ -f "$HOME/.bash_profile" ] && echo "$HOME/.bash_profile" || echo "$HOME/.bashrc" )
echo 'export MODULAR_HOME="/home/jonpark/.modular"' >> "$BASHRC"
echo 'export PATH="/home/jonpark/.modular/pkg/packages.modular.com_mojo/bin:$PATH"' >> "$BASHRC"
source "$BASHRC"

I
(base) jonpark@BD-82898:~/workspace/jonpark-work/mk/scripts$ mojo hello.mojo 
Hello, Mojo!

(base) jonpark@BD-82898:~/workspace/jonpark-work/mk/scripts$ cat hello.mojo 
fn main():
    print("Hello, Mojo!")

```
