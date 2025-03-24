---
title: "Go Install"
date: 2025-02-27
categories: ["sdlc"]
tags: ["Go"]
---

# Go Install

기존 Go 1.22.2가 `/usr/bin/go`로 설치되어 있고, 새롭게 Go 1.23.1 및 Go 1.23.5를 **`~/local`** 폴더에 설치한 후 원하는 버전을 선택해서 사용하는 방법을 정리해 드리겠습니다. 🚀  

---

## ✅ **1. 기존 Go (1.22.2) 확인**
현재 기본 Go(1.22.2)가 `/usr/bin/go`에 설치되어 있음.

```sh
/usr/bin/go version
```

출력 예시:
```
go version go1.22.2 linux/amd64
```

---

## ✅ **2. 새로운 Go 버전 (1.23.1 & 1.23.5) 설치**
기존 Go(1.22.2)는 유지하면서, 추가 Go 버전을 설치하겠습니다.

### 🔹 **Go 1.23.1 다운로드 및 설치**
```sh
mkdir -p ~/local
cd ~/local
wget https://go.dev/dl/go1.23.1.linux-amd64.tar.gz
tar -xzf go1.23.1.linux-amd64.tar.gz
mv go go1.23.1
```

### 🔹 **Go 1.23.5 다운로드 및 설치**
```sh
cd ~/local
wget https://go.dev/dl/go1.23.5.linux-amd64.tar.gz
tar -xzf go1.23.5.linux-amd64.tar.gz
mv go go1.23.5
```

설치 후 폴더 구조:
```
/usr/bin/go  # 기존 Go 1.22.2
~/local/go1.23.1
~/local/go1.23.5
```

---

## ✅ **3. 원하는 Go 버전 선택하여 사용**
Go 버전을 전환할 때 **환경 변수를 변경**하면 됩니다.

### 🔹 **현재 셸에서 특정 Go 버전 사용**
**Go 1.23.1 사용**
```sh
export GOROOT=~/local/go1.23.1
export PATH=$GOROOT/bin:$PATH
```

**Go 1.23.5 사용**
```sh
export GOROOT=~/local/go1.23.5
export PATH=$GOROOT/bin:$PATH
```

**기본 Go(1.22.2)로 복귀**
```sh
export GOROOT=/usr
export PATH=/usr/bin:$PATH
```

설정 후 버전 확인:
```sh
go version
```

---

## ✅ **4. Go 버전 변경 자동화 (`go-switch` 스크립트)**
매번 환경 변수를 수정하는 대신, **Bash 스크립트로 자동 전환**할 수 있습니다.

### 🔹 **Go 버전 변경 스크립트 (`~/.go-switch`)**
```sh
nano ~/.go-switch
```
아래 내용을 추가합니다:
```sh
#!/bin/bash

if [ -z "$1" ]; then
    echo "사용법: go-switch <버전>"
    echo "설치된 버전 목록:"
    echo "  system (현재 기본 Go 1.22.2)"
    ls ~/local | grep go
    exit 1
fi

if [ "$1" == "system" ]; then
    export GOROOT=/usr
    export PATH=/usr/bin:$PATH
else
    GO_VERSION="go$1"
    GO_PATH="$HOME/local/$GO_VERSION"
    
    if [ ! -d "$GO_PATH" ]; then
        echo "❌ $GO_VERSION 버전이 설치되지 않았습니다."
        exit 1
    fi
    
    export GOROOT=$GO_PATH
    export PATH=$GOROOT/bin:$PATH
fi

echo "Go 버전이 $(go version) (으)로 변경되었습니다."
```

### 🔹 **스크립트 실행 가능하도록 설정**
```sh
chmod +x ~/.go-switch
```

### 🔹 **`go-switch` 명령어를 쉽게 실행하도록 설정**
```sh
echo 'alias go-switch="source ~/.go-switch"' >> ~/.bashrc
source ~/.bashrc
```

---

## ✅ **5. Go 버전 변경 사용 방법**
이제 **원하는 Go 버전으로 쉽게 변경**할 수 있습니다.

### 🔹 **Go 1.23.1 사용**
```sh
go-switch 1.23.1
```
출력:
```
Go 버전이 go1.23.1 linux/amd64 (으)로 변경되었습니다.
```

### 🔹 **Go 1.23.5 사용**
```sh
go-switch 1.23.5
```
출력:
```
Go 버전이 go1.23.5 linux/amd64 (으)로 변경되었습니다.
```

### 🔹 **기본 Go (1.22.2)로 복귀**
```sh
go-switch system
```
출력:
```
Go 버전이 go1.22.2 linux/amd64 (으)로 변경되었습니다.
```

### 🔹 **설치된 Go 버전 목록 확인**
```sh
go-switch
```
출력:
```
사용법: go-switch <버전>
설치된 버전 목록:
  system (현재 기본 Go 1.22.2)
  go1.23.1
  go1.23.5
```

---

## ✅ **6. (선택 사항) `update-alternatives`를 사용하여 Go 버전 관리**
Ubuntu의 `update-alternatives`를 이용하면 **Go 버전을 더 쉽게 전환**할 수 있습니다.

### 🔹 **Go 버전 등록**
```sh
sudo update-alternatives --install /usr/local/bin/go go /usr/bin/go 10
sudo update-alternatives --install /usr/local/bin/go go ~/local/go1.23.1/bin/go 20
sudo update-alternatives --install /usr/local/bin/go go ~/local/go1.23.5/bin/go 30
```

### 🔹 **Go 버전 선택**
```sh
sudo update-alternatives --config go
```
출력 예시:
```
sudo update-alternatives --config go
[sudo] password for jonpark: 
There are 3 choices for the alternative go (providing /usr/local/bin/go).

  Selection    Path    Priority   Status
--------------------------------------
* 0 /home/jonpark/local/go1.23.5/bin/go   30        auto mode
  1 /home/jonpark/local/go1.23.1/bin/go   20        manual mode
  2 /home/jonpark/local/go1.23.5/bin/go   30        manual mode
  3 /usr/bin/go                           10        manual mode
```
원하는 버전의 번호를 입력하면 해당 Go 버전이 기본으로 설정됩니다.

### 🔹 **현재 선택된 Go 버전 확인**
```sh
go version
```

---

# ✅ **🎯 최종 정리**
| 방법 | 설명 |
|------|------|
| **환경 변수 변경 (간단한 방법)** | `export PATH=~/local/go1.23.1/bin:$PATH` |
| **Bash 스크립트 (`go-switch`)** | `go-switch 1.23.5` 로 쉽게 전환 |
| **Ubuntu `update-alternatives`** | `sudo update-alternatives --config go` |

✅ **`go-switch` 스크립트를 사용하면 여러 Go 버전을 쉽게 전환할 수 있습니다!** 🚀