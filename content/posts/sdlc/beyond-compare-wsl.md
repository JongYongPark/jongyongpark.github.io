---
title: "Beyond Compare 4를 리눅스에 설치하기"
date: 2025-02-25
categories: ["sdlc"]
tags: ["BeyondCompare"]
---

# Beyond Compare 4를 리눅스에 설치하기

```bash
bash#:~$ cd ~/Downloads/

bash#:~/Downloads$ wget https://www.scootersoftware.com/bcompare-4.4.6.27483_amd64.deb
--2025-02-25 14:58:16--  https://www.scootersoftware.com/bcompare-4.4.6.27483_amd64.deb
Resolving www.scootersoftware.com (www.scootersoftware.com)... 72.32.90.250
Connecting to www.scootersoftware.com (www.scootersoftware.com)|72.32.90.250|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 20609066 (20M) [application/octet-stream]
Saving to: ‘bcompare-4.4.6.27483_amd64.deb’

bcompare-4.4.6.27483_amd64.deb          100%[=============================================================================>]  19.65M  3.55MB/s    in 6.7s

2025-02-25 14:58:24 (2.93 MB/s) - ‘bcompare-4.4.6.27483_amd64.deb’ saved [20609066/20609066]

bash#:~/Downloads$ sudo apt install ./bcompare-4.4.6.27483_amd64.deb
[sudo] password for jonpark:
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Note, selecting 'bcompare' instead of './bcompare-4.4.6.27483_amd64.deb'
The following package was automatically installed and is no longer required:
  libllvm17t64
Use 'sudo apt autoremove' to remove it.
The following NEW packages will be installed:
  bcompare
0 upgraded, 1 newly installed, 0 to remove and 16 not upgraded.
Need to get 0 B/20.6 MB of archives.
After this operation, 60.9 MB of additional disk space will be used.
Get:1 /home/jonpark/Downloads/bcompare-4.4.6.27483_amd64.deb bcompare amd64 4.4.6-27483 [20.6 MB]
Selecting previously unselected package bcompare.
(Reading database ... 130187 files and directories currently installed.)
Preparing to unpack .../bcompare-4.4.6.27483_amd64.deb ...
Unpacking bcompare (4.4.6-27483) ...
Setting up bcompare (4.4.6-27483) ...
cp: cannot create regular file '/usr/share/kservices5/': Not a directory
Processing triggers for bamfdaemon (0.5.6+22.04.20220217-0ubuntu5) ...
Rebuilding /usr/share/applications/bamf-2.index...
Processing triggers for desktop-file-utils (0.27-2build1) ...
Processing triggers for gnome-menus (3.36.0-1.1ubuntu3) ...
Processing triggers for shared-mime-info (2.4-4) ...
Processing triggers for libc-bin (2.39-0ubuntu8.4) ...
localepurge: Disk space freed:      0 KiB in /usr/share/locale
localepurge: Disk space freed:      0 KiB in /usr/share/man
localepurge: Disk space freed:      0 KiB in /usr/share/tcltk
localepurge: Disk space freed:      0 KiB in /usr/share/cups/templates
localepurge: Disk space freed:      0 KiB in /usr/share/cups/locale
localepurge: Disk space freed:      0 KiB in /usr/share/cups/doc-root
localepurge: Disk space freed:      0 KiB in /usr/share/cups/templates
localepurge: Disk space freed:      0 KiB in /usr/share/cups/locale
localepurge: Disk space freed:      0 KiB in /usr/share/cups/doc-root
localepurge: Disk space freed:      0 KiB in /usr/share/help
localepurge: Disk space freed:      0 KiB in /usr/share/vim/vim91/lang

Total disk space freed by localepurge: 0 KiB

N: Download is performed unsandboxed as root as file '/home/jonpark/Downloads/bcompare-4.4.6.27483_amd64.deb' couldn't be accessed by user '_apt'. - pkgAcquire::Run (13: Permission denied)

########################################
## 아래부터는 옵션임.

bash#:~/Downloads$ ls  ~/.config/bcompare/ -al
total 28K
drwxrwxr-x  2 jonpark jonpark 4.0K Feb 25 15:05 ./
drwx------ 23 jonpark jonpark 4.0K Feb 25 15:05 ../
-rw-rw-r--  1 jonpark jonpark    0 Feb 25 15:05 BCLOCK_11.0
-rw-rw-r--  1 jonpark jonpark  546 Feb 25 15:05 BCState.xml
-rw-rw-r--  1 jonpark jonpark  204 Feb 25 15:05 BCState.xml.bak
-rw-rw-r--  1 jonpark jonpark    1 Feb 25 15:05 IsPro
-rw-rw-r--  1 jonpark jonpark  563 Feb 25 15:05 menu.ini
-rw-rw-r--  1 jonpark jonpark   48 Feb 25 15:07 registry.dat

bash#:~/Downloads$ ls /usr/lib/beyondcompare/
bcmount32*  bcmount.sh*  BCompare.mad  GPG-KEY-scootersoftware  lib7z.so*        libunrar.so*  qt4/                         scootersoftware.list
bcmount64*  BCompare*    ext/          help/                    libQt4Pas.so.5*  mime.types    scootersoftware-keyring.gpg

bash#:~/Downloads$ cd  /usr/lib/beyondcompare/

bash#:/usr/lib/beyondcompare$ ls
bcmount32*  bcmount.sh*  BCompare.mad  GPG-KEY-scootersoftware  lib7z.so*        libunrar.so*  qt4/                         scootersoftware.list
bcmount64*  BCompare*    ext/          help/                    libQt4Pas.so.5*  mime.types    scootersoftware-keyring.gpg

bash#:/usr/lib/beyondcompare$ sudo cp BCompare BCompare.org

bash#:/usr/lib/beyondcompare$ sudo cp -r ~/.config/bcompare ~/.config/bcompare.org

bash#:/usr/lib/beyondcompare$ rm -rf ~/.config/bcompare

bash#:/usr/lib/beyondcompare$ echo "kill BC"
kill BC

bash#:/usr/lib/beyondcompare$ sudo rm -rf ~/.config/bcompare #thinks bensonkb
sudo sed -i "s/??????????????????????/g" /usr/lib/beyondcompare/BCompare
bash#:/usr/lib/beyondcompare$

## Start BC
## Enter license
## Works

```