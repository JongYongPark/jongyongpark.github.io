---
title: "Zone.Identifier"
date: 2025-03-10
categories: ["SDLC"]
tags: ["WSL"]
---

# windows 에서 wsl로 복사하면 "복사한 파일이름 zone.idenifier" 파일이 생기지 않게 하는 방법. 

Zone.Identifier 파일은 Windows 시스템에서 외부 출처(인터넷, 이메일 등)에서 다운로드한 파일에 자동으로 추가되는 대체 데이터 스트림(Alternate Data Stream, ADS)입니다. 이 파일에는 원본 파일의 출처와 관련된 보안 정보가 포함되어 있습니다.

파일을 WSL로 복사할 때 Windows에서는 이 메타데이터를 별도의 Zone.Identifier 파일로 변환합니다. 이는 NTFS 파일 시스템의 기능이지만 Linux 파일 시스템에서는 지원하지 않기 때문입니다.

## Zone.Identifier 파일이 생성되지 않게 하는 방법:

1. **Windows에서 파일 신뢰 설정**:
   - 원본 파일을 우클릭 > 속성
   - 하단의 "보안: 이 파일은 다른 컴퓨터에서 왔으며..." 옆의 "차단 해제" 체크박스 선택
   - "확인" 클릭 후 WSL로 다시 복사

2. **WSL 내에서 Zone.Identifier 파일 삭제**:
   ```bash
   find . -name "*.Zone.Identifier" -type f -delete
   ```

3. **PowerShell에서 Unblock-File 명령어 사용**:
   ```powershell
   Unblock-File -Path "C:\path\to\your\file.cpp"
   ```

4. **복사 대신 리눅스 명령어로 파일 생성**:
   - WSL에서 직접 파일을 생성하거나 편집
   - 또는 `scp`, `rsync` 등의 리눅스 명령어를 사용하여 파일 전송

5. **WSL 마운트 옵션 사용** (WSL2에서):
   ```
   # /etc/wsl.conf 파일에 추가
   [automount]
   options = "metadata,umask=22,fmask=11"
   ```
   - WSL을 재시작해야 적용됩니다

6. **Git 사용**:
   - Git을 통해 파일을 가져오면 Zone.Identifier가 생성되지 않습니다

가장 간단한 방법은 Windows에서 파일의 차단을 해제한 후 WSL로 복사하거나, 이미 복사된 Zone.Identifier 파일들을 일괄 삭제하는 것입니다.