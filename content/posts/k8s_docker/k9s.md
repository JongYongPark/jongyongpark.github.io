---
title: "k9s install"
date: 2025-03-10
categories: ["k8s"]
tags: ["k9s"]
---
# 내 작업 
``` bash

# 최신 릴리스 버전 확인
RELEASE=$(curl -s https://api.github.com/repos/derailed/k9s/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')

# 바이너리 다운로드
curl -L https://github.com/derailed/k9s/releases/download/${RELEASE}/k9s_Linux_amd64.tar.gz -o k9s.tar.gz

# 압축 해제
mkdir -p k9s
tar -xzf k9s.tar.gz -C k9s

# 실행 파일 이동
sudo mv k9s/k9s /usr/local/bin/

# 실행 권한 부여
sudo chmod +x /usr/local/bin/k9s

# 임시 파일 정리
rm -rf k9s k9s.tar.gz

```

---

# install instruction from web

K9s is easy to get up and running in Ubuntu with the following:



## Download
wget https://github.com/derailed/k9s/releases/download/v0.32.7/k9s_linux_amd64.deb

## Install k9s
dpkg -i k9s_linux_amd64.deb
You can learn more about and download K9s from here:

K9s download and install


# K9s tool alternative
There are a few K9s tool alternative solutions that I would recommend if you are looking for something different and that gives you a GUI while still giving you the ability to have command line access to your environment.

- Aptakube
 Lens
- Headlamp
- OpenLens
- kubectl with other plugins

# k9s install on WSL Ubuntu
WSL Ubuntu에 k9s를 설치하는 방법을 알려드리겠습니다.

## WSL Ubuntu에 k9s 설치 방법

### 방법 1: Homebrew 사용 (권장)

1. Homebrew가 설치되어 있지 않다면 먼저 설치합니다:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Homebrew 설치 후 PATH 설정:
   ```bash
   echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.profile
   eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
   ```

3. k9s 설치:
   ```bash
   brew install k9s
   ```

### 방법 2: 바이너리 직접 다운로드

1. 최신 릴리스 확인:
   ```bash
   RELEASE=$(curl -s https://api.github.com/repos/derailed/k9s/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
   ```

2. 바이너리 다운로드:
   ```bash
   curl -L https://github.com/derailed/k9s/releases/download/${RELEASE}/k9s_Linux_amd64.tar.gz -o k9s.tar.gz
   ```

3. 압축 해제:
   ```bash
   mkdir -p k9s
   tar -xzf k9s.tar.gz -C k9s
   ```

4. 실행 파일로 이동:
   ```bash
   sudo mv k9s/k9s /usr/local/bin/
   ```

5. 실행 권한 부여:
   ```bash
   sudo chmod +x /usr/local/bin/k9s
   ```

6. 정리:
   ```bash
   rm -rf k9s k9s.tar.gz
   ```

### 방법 3: snap 사용

우분투에서는 snap으로도 쉽게 설치할 수 있습니다:

```bash
sudo snap install k9s
```

### 방법 4: apt 사용 (PPA 추가)

```bash
sudo apt update
sudo apt install -y gpg
curl -fsSL https://derailed.github.io/k9s/k9s-repo-add.sh | sudo sh
sudo apt update
sudo apt install k9s
```

### 사용 전 확인사항

k9s를 사용하기 전에 kubectl이 설정되어 있고 쿠버네티스 클러스터에 접근 가능해야 합니다.

### 실행 방법

```bash
k9s
```

특정 네임스페이스에서 시작:
```bash
k9s -n your-namespace
```

k9s가 제대로 설치되었는지 확인:
```bash
k9s version
```

---

# k9s install

WSL에 k9s를 설치하는 방법을 안내해드리겠습니다.

## WSL에 k9s 설치 방법

### 방법 1: Homebrew 사용 (권장)

1. Homebrew가 설치되어 있지 않다면 먼저 설치합니다:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Homebrew 설치 후 PATH 설정이 필요할 수 있습니다:
   ```bash
   echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.profile
   eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
   ```

3. k9s 설치:
   ```bash
   brew install k9s
   ```

### 방법 2: 바이너리 직접 다운로드

1. 최신 릴리스 확인:
   ```bash
   RELEASE=$(curl -s https://api.github.com/repos/derailed/k9s/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
   ```

2. 바이너리 다운로드:
   ```bash
   curl -L https://github.com/derailed/k9s/releases/download/${RELEASE}/k9s_Linux_amd64.tar.gz -o k9s.tar.gz
   ```

3. 압축 해제:
   ```bash
   mkdir -p k9s
   tar -xzf k9s.tar.gz -C k9s
   ```

4. 실행 파일로 이동:
   ```bash
   sudo mv k9s/k9s /usr/local/bin/
   ```

5. 실행 권한 부여:
   ```bash
   sudo chmod +x /usr/local/bin/k9s
   ```

6. 정리:
   ```bash
   rm -rf k9s k9s.tar.gz
   ```

### 방법 3: snap 사용

```bash
sudo snap install k9s
```

### 사용 방법

k9s를 사용하기 전에 kubectl이 설정되어 있어야 합니다. 설치 후에는 다음 명령어로 실행할 수 있습니다:

```bash
k9s
```

특정 네임스페이스에서 시작:
```bash
k9s -n kubernetes-namespace
```

k9s가 제대로 설치되었는지 확인:
```bash
k9s version
```


---

# k9s usage

https://blog.palark.com/k9s-the-powerful-terminal-ui-for-kubernetes/

