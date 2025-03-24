---
title: "Windows 에서 WSL을 통해 ec2에 접근하기"
date: 2025-03-10
categories: ["SDLC"]
tags: ["WSL"]
---

# Windows 에서 WSL을 통해 ec2 에 접근시 symbol link에 따른 문제점

## 내 작업 
```bash
### AWS ec2
# Hdd 가 부족해서 하나 더 추가했다 - 이것이 opt/dlami/nvme 임임
(base) ubuntu@ip-172-31-26-173:~$ df -Th
Filesystem                     Type      Size  Used Avail Use% Mounted on
/dev/root                      ext4      117G   69G   48G  60% /
tmpfs                          tmpfs      32G   48M   32G   1% /dev/shm
tmpfs                          tmpfs      13G  1.4M   13G   1% /run
tmpfs                          tmpfs     5.0M     0  5.0M   0% /run/lock
efivarfs                       efivarfs  128K  4.1K  119K   4% /sys/firmware/efi/efivars
/dev/nvme0n1p15                vfat      105M  6.1M   99M   6% /boot/efi
tmpfs                          tmpfs     6.3G   68K  6.3G   1% /run/user/126
/dev/mapper/vg.01-lv_ephemeral ext4      206G   76G  119G  39% /opt/dlami/nvme
tmpfs                          tmpfs     6.3G   76K  6.3G   1% /run/user/1000


(base) ubuntu@ip-172-31-26-173:~$ ll workspace
lrwxrwxrwx 1 ubuntu ubuntu 15 Jan 24 09:47 workspace -> /opt/dlami/nvme/

### WSL
bash#:~$ cat .bashrc | grep ec2
alias mount_ec2='sudo sshfs  -o uid=`id -u jonpark`  -o gid=`id -g jonpark`  -o allow_other ubuntu@jonpark-ec2:/home/ubuntu -o IdentityFile=~/jonpark-ec2.pem ~/work_ec2'

## 수정 : -o follow_symlinks  추가
alias mount_ec2='sudo sshfs -o uid=`id -u jonpark` -o gid=`id -g jonpark` -o allow_other -o follow_symlinks ubuntu@jonpark-ec2:/home/ubuntu -o IdentityFile=~/jonpark-ec2.pem ~/work_ec2'

## 실행 
bash#:~$ sudo umount ~/work_ec2

bash#:~$ sudo sshfs -o uid=`id -u jonpark` -o gid=`id -g jonpark` -o allow_other -o follow_symlinks ubuntu@jonpark-ec2:/home/ubuntu -o IdentityFile=~/jonpark-ec2.pem ~/work_ec2
[sudo] password for jonpark:

## 결과
bash#:~$ ll  -d work_ec2
drwx------ 1 jonpark jonpark 4.0K Feb 25 14:13 work_ec2/
bash#:~$ ls  work_ec2
blackduck-oidc                          LINUX_PACKAGES_LICENSES                 Public/                                   THIRD_PARTY_SOURCE_CODE_URLS
BUILD_FROM_SOURCE_PACKAGES_LICENCES     LINUX_PACKAGES_LIST                     PYTHON_PACKAGES_LICENSES                  Videos/
Desktop/                                Music/                                  srm-2024.12.1-0-linux-x64-installer.run*  workspace/
Documents/                              nvidia-acknowledgements/                srm-license.txt                           zed-linux-x86_64.tar.gz
Downloads/                              OSSNvidiaDriver_v550.90.07_license.txt  Templates/
google-chrome-stable_current_amd64.deb  Pictures/                               thinclient_drives/
bash#:~$ ll  -d work_ec2/workspace/
drwxrwxrwt 1 jonpark jonpark 4.0K Feb 24 19:20 work_ec2/workspace//
bash#:~$ ls  work_ec2/workspace/
ai/  dev_tool/  dockers/  jonpark-work/  lost+found/  miniconda3/  open-webui/
bash#:~$

```
## 답변 
이제 문제가 더 명확해졌습니다. EC2에서 `workspace`는 `/opt/dlami/nvme/`를 가리키는 심볼릭 링크입니다. SSHFS를 통한 마운트 시 심볼릭 링크 처리에 문제가 있는 것으로 보입니다.

### 해결 방법

SSHFS로 마운트할 때 심볼릭 링크를 따라가도록 `follow_symlinks` 옵션을 추가해야 합니다:

```bash
sudo sshfs -o uid=`id -u jonpark` -o gid=`id -g jonpark` -o allow_other -o follow_symlinks ubuntu@jonpark-ec2:/home/ubuntu -o IdentityFile=~/jonpark-ec2.pem ~/work_ec2
```

또는 직접 심볼릭 링크의 대상을 마운트할 수도 있습니다:

```bash
sudo sshfs -o uid=`id -u jonpark` -o gid=`id -g jonpark` -o allow_other ubuntu@jonpark-ec2:/opt/dlami/nvme -o IdentityFile=~/jonpark-ec2.pem ~/work_ec2/workspace
```

### 추가 고려사항

1. **WSL2와 Windows 간의 파일 시스템 접근**:
   - WSL2에서 마운트된 SSHFS 공유는 Windows에서 `\\WSL.LOCALHOST\Ubuntu\...` 경로로 직접 접근이 어려울 수 있습니다.
   - WSL2는 가상 머신으로 실행되어 Windows와 파일 시스템이 분리되어 있습니다.

2. **대안으로 Windows에서 직접 마운트**:
   - Windows에서 SSHFS-Win 또는 WinSCP와 같은 도구를 사용하여 EC2를 직접 마운트하는 것도 고려해볼 수 있습니다.
   - 또는 Windows 10/11의 OpenSSH 클라이언트와 SFTP 기능을 활용할 수도 있습니다.

심볼릭 링크 관련 문제가 해결되면 Windows에서도 `\\WSL.LOCALHOST\Ubuntu\home\jonpark\work_ec2\workspace` 경로로 접근이 가능해질 수 있지만, WSL2의 특성상 여전히 제한이 있을 수 있습니다.

# 내 작업


# Windows에서 WSL과 AWS EC2를 SSHFS로 네트워크 드라이브에 매핑하는 방법 - net use를 사용하고자 하나 동작안함.

Windows에서 SSHFS를 사용하여 WSL과 AWS EC2의 Ubuntu 홈 디렉토리를 네트워크 드라이브로 매핑하는 과정을 설명해드리겠습니다.

## 준비물

1. Windows 10/11
2. WSL Ubuntu 설치됨
3. AWS EC2 Ubuntu 인스턴스 및 접속 키(.pem 파일)
4. SSHFS-Win 도구 (Windows에서 SSHFS 지원)
5. WinFsp (Windows File System Proxy) - SSHFS-Win의 필수 종속성

## 단계별 설치 및 설정 방법

### 1. WinFsp와 SSHFS-Win 설치

1. **WinFsp 설치**:
   - [WinFsp 다운로드 페이지](https://github.com/winfsp/winfsp/releases)에서 최신 버전을 다운로드합니다.
   - 다운로드한 설치 프로그램을 실행하고 기본 설정으로 설치합니다.

2. **SSHFS-Win 설치**:
   - [SSHFS-Win 다운로드 페이지](https://github.com/winfsp/sshfs-win/releases)에서 최신 버전을 다운로드합니다.
   - 다운로드한 설치 프로그램을 실행하고 기본 설정으로 설치합니다.

### 2. WSL Ubuntu 홈 디렉토리 매핑하기

WSL은 이미 `\\wsl$\Ubuntu` 경로로 접근할 수 있지만, SSHFS를 사용한 방법도 설명해드리겠습니다:

1. **WSL의 SSH 서버 설정**:
   ```bash
   # WSL Ubuntu에서 실행
   sudo apt update
   sudo apt install openssh-server
   sudo service ssh start
   
   # SSH 서버가 실행 중인지 확인
   sudo service ssh status
   
   # WSL의 IP 주소 확인
   ip addr show | grep inet
   ```

2. **암호 없이 로그인 설정(선택사항)**:
   ```bash
   # Windows에서 SSH 키 생성(이미 있으면 생략)
   ssh-keygen -t rsa

   # Windows에서 공개키를 WSL로 복사
   type C:\Users\YourUsername\.ssh\id_rsa.pub | ssh YourWSLUsername@WSL_IP "cat >> ~/.ssh/authorized_keys"
   ```

3. **네트워크 드라이브 매핑**:
   - 파일 탐색기를 열고 "이 PC"를 오른쪽 클릭하여 "네트워크 드라이브 연결"을 선택합니다.
   - 드라이브 문자를 선택(예: Z:)하고 폴더 필드에 다음을 입력합니다:
     ```
     \\sshfs\YourWSLUsername@WSL_IP
     ```
   - "다른 사용자 이름과 암호 사용" 체크박스를 선택하고 WSL 사용자 이름과 암호를 입력합니다.
   - "완료"를 클릭합니다.

### 3. AWS EC2 Ubuntu 홈 디렉토리 매핑하기

1. **필요한 정보 준비**:
   - EC2 인스턴스의 퍼블릭 IP 또는 DNS
   - EC2 접속용 키 파일(.pem)
   - EC2 사용자 이름(일반적으로 'ubuntu')

2. **네트워크 드라이브 매핑**:
   
   #### 방법 1: 직접 파일 탐색기에서 매핑
   - 파일 탐색기를 열고 "이 PC"를 오른쪽 클릭하여 "네트워크 드라이브 연결"을 선택합니다.
   - 드라이브 문자를 선택(예: Y:)하고 폴더 필드에 다음을 입력합니다:
     ```
     \\sshfs.r\ubuntu@EC2_PUBLIC_IP
     ```
   - "자격 증명 다르게 연결" 체크박스를 선택합니다.
   - 고급 옵션을 클릭하고 추가 매개변수 필드에 다음을 입력합니다:
     ```
     -o IdentityFile=C:\Path\To\Your\KeyFile.pem -o StrictHostKeyChecking=no
     ```
   - "확인"을 클릭합니다.

   #### 방법 2: 명령 프롬프트 사용
   관리자 권한으로 명령 프롬프트를 열고 다음 명령어를 실행합니다:
   ```cmd
   net use Y: \\sshfs\ubuntu@EC2_PUBLIC_IP /user:ubuntu /persistent:yes
   ```
   
   그런 다음 프롬프트가 나타나면 비밀번호 대신 "-o IdentityFile=C:\Path\To\Your\KeyFile.pem"을 입력합니다.

### 심볼릭 링크 처리를 위한 추가 옵션

EC2에 심볼릭 링크가 있고(예: workspace -> /opt/dlami/nvme/), 이를 따라가고 싶다면 다음 옵션을 추가하세요:

```
-o follow_symlinks
```

전체 명령어 예시:
```cmd
net use Y: \\sshfs.r\ubuntu@EC2_PUBLIC_IP /user:ubuntu /persistent:yes
```

고급 매개변수 필드에:
```
-o IdentityFile=C:\Path\To\Your\KeyFile.pem -o StrictHostKeyChecking=no -o follow_symlinks
```

## 문제 해결

1. **연결 실패시**:
   - 방화벽 설정 확인 (특히 EC2의 보안 그룹에서 SSH 포트 22가 열려 있는지)
   - 키 파일 권한이 너무 개방적이면 SSH 연결이 거부될 수 있음(.pem 파일의 권한 확인)
   - EC2 인스턴스가 실행 중인지 확인

2. **성능 문제**:
   - 큰 파일이나 많은 파일을 다룰 때 네트워크 지연이 발생할 수 있음
   - `-o cache=yes` 옵션을 사용하여 캐싱 활성화 가능

3. **연결 끊김 문제**:
   - `-o ServerAliveInterval=60` 옵션을 추가하여 연결 유지

이 방법을 사용하면 Windows에서 WSL과 AWS EC2의 Ubuntu 홈 디렉토리를 네트워크 드라이브로 쉽게 접근할 수 있습니다.