---
title: "Chrome"
date: 2025-02-21
categories: ["SDLC"]
tags: ["Chrome",]
---

# Chrome Install on Ubuntu

Ubuntu에서 Chrome을 완전히 제거하고 다시 설치하는 명령어 순서입니다:

1. Chrome 제거:
```bash
# Chrome 패키지 제거
sudo apt-get purge google-chrome-stable

# 관련 의존성 패키지 제거
sudo apt-get autoremove

# Chrome 설정 파일 제거 (선택사항)
rm -rf ~/.config/google-chrome
```

2. Chrome 다시 설치:
```bash
# Chrome 다운로드를 위한 필요 패키지 설치
sudo apt-get install wget

# Chrome 패키지 다운로드
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

# 다운로드한 패키지 설치
sudo dpkg -i google-chrome-stable_current_amd64.deb

# 의존성 문제가 있다면 다음 명령어로 해결
sudo apt-get install -f

# 다운로드한 설치 파일 제거 (선택사항)
rm google-chrome-stable_current_amd64.deb
```

설치가 완료되면 Applications 메뉴나 터미널에서 `google-chrome` 명령어로 Chrome을 실행할 수 있습니다.

---
