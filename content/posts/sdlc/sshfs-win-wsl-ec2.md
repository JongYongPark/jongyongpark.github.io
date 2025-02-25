

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
(base) jonpark@BD-82898:~$ cat .bashrc | grep ec2
alias mount_ec2='sudo sshfs  -o uid=`id -u jonpark`  -o gid=`id -g jonpark`  -o allow_other ubuntu@jonpark-ec2:/home/ubuntu -o IdentityFile=~/jonpark-ec2.pem ~/work_ec2'

## 수정 : -o follow_symlinks  추가
alias mount_ec2='sudo sshfs -o uid=`id -u jonpark` -o gid=`id -g jonpark` -o allow_other -o follow_symlinks ubuntu@jonpark-ec2:/home/ubuntu -o IdentityFile=~/jonpark-ec2.pem ~/work_ec2'

## 실행 
(base) jonpark@BD-82898:~$ sudo umount ~/work_ec2

(base) jonpark@BD-82898:~$ sudo sshfs -o uid=`id -u jonpark` -o gid=`id -g jonpark` -o allow_other -o follow_symlinks ubuntu@jonpark-ec2:/home/ubuntu -o IdentityFile=~/jonpark-ec2.pem ~/work_ec2
[sudo] password for jonpark:

## 결과
(base) jonpark@BD-82898:~$ ll  -d work_ec2
drwx------ 1 jonpark jonpark 4.0K Feb 25 14:13 work_ec2/
(base) jonpark@BD-82898:~$ ls  work_ec2
blackduck-oidc                          LINUX_PACKAGES_LICENSES                 Public/                                   THIRD_PARTY_SOURCE_CODE_URLS
BUILD_FROM_SOURCE_PACKAGES_LICENCES     LINUX_PACKAGES_LIST                     PYTHON_PACKAGES_LICENSES                  Videos/
Desktop/                                Music/                                  srm-2024.12.1-0-linux-x64-installer.run*  workspace/
Documents/                              nvidia-acknowledgements/                srm-license.txt                           zed-linux-x86_64.tar.gz
Downloads/                              OSSNvidiaDriver_v550.90.07_license.txt  Templates/
google-chrome-stable_current_amd64.deb  Pictures/                               thinclient_drives/
(base) jonpark@BD-82898:~$ ll  -d work_ec2/workspace/
drwxrwxrwt 1 jonpark jonpark 4.0K Feb 24 19:20 work_ec2/workspace//
(base) jonpark@BD-82898:~$ ls  work_ec2/workspace/
ai/  dev_tool/  dockers/  jonpark-work/  lost+found/  miniconda3/  open-webui/
(base) jonpark@BD-82898:~$

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
