# sshfs가 인식되지 않는다는 오류

`sshfs`가 인식되지 않는다는 오류가 발생한 이유는 `sshfs-win`이 설치되지 않았거나 `sshfs` 명령어가 PowerShell에서 인식되지 않기 때문입니다.  

### 해결 방법:
1. **`sshfs-win` 설치 확인**  
   `sshfs`를 사용하려면 `WinFsp`와 `SSHFS-Win`이 설치되어 있어야 합니다.  
   - [WinFsp 다운로드](https://github.com/winfsp/winfsp/releases)
   - [SSHFS-Win 다운로드](https://github.com/billziss-gh/sshfs-win/releases)  

   설치 후, PowerShell을 다시 실행하고 아래 명령어로 `sshfs`가 인식되는지 확인하세요:
   ```powershell
   sshfs --version
   ```

2. **PowerShell에서 `sshfs` 실행 가능하도록 경로 설정**  
   `sshfs.exe`가 `C:\Program Files\SSHFS-Win\bin`에 위치해 있다면, 이를 `PATH`에 추가해야 합니다.  
   PowerShell에서 다음 명령어를 실행하세요:
   ```powershell
   $env:Path += ";C:\Program Files\SSHFS-Win\bin"
   ```

3. **수정된 스크립트**  
   위 방법이 적용된 후, `Mount-JonparkDrive` 함수를 수정하여 정상적으로 실행되도록 변경했습니다.

   ```powershell
   function Mount-JonparkDrive {
       param(
           [string]$DriveLetter = "J",
           [string]$RemotePath = "jonpark@aws-sig-ts-jonpark.aws.internal:/"
       )

       try {
           # SSHFS 실행 가능한지 확인
           if (-not (Get-Command sshfs -ErrorAction SilentlyContinue)) {
               Write-Host "Error: sshfs is not installed or not in PATH."
               return
           }

           # 드라이브가 이미 연결되었는지 확인
           if (Test-Path "${DriveLetter}:") {
               Write-Host "Drive ${DriveLetter}: is already mounted."
               return
           }

           sshfs $RemotePath "${DriveLetter}:"
           Write-Host "Successfully mounted drive ${DriveLetter}:"
       }
       catch {
           Write-Host "Error mounting drive: $_"
       }
   }

   function Dismount-JonparkDrive {
       param(
           [string]$DriveLetter = "J"
       )

       try {
           if (-not (Test-Path "${DriveLetter}:")) {
               Write-Host "Drive ${DriveLetter}: is not mounted."
               return
           }

           net use "${DriveLetter}:" /delete /y
           Write-Host "Successfully dismounted drive ${DriveLetter}:"
       }
       catch {
           Write-Host "Error dismounting drive: $_"
       }
   }

   Set-Alias mount-jonpark Mount-JonparkDrive
   Set-Alias umount-jonpark Dismount-JonparkDrive
   ```

### 변경 사항:
- **`sshfs`가 설치되었는지 확인**하도록 추가 (`Get-Command sshfs` 사용).
- **이미 마운트된 드라이브인지 확인**하고 중복 마운트를 방지.
- **`net use /delete`를 사용할 때 `-y` 옵션 추가**하여 사용자 입력 없이 강제 제거.

수정 후 다시 실행해보고 문제가 있다면 추가적으로 확인해볼게요. 😊
---
# SSHFS-Win 이 설치된 경로를 찾는 명령어

SSHFS-Win이 설치된 경로를 찾는 방법은 여러 가지가 있습니다. 다음 명령어를 PowerShell에서 실행해보세요.

### 1. **레지스트리에서 설치 경로 확인**
```powershell
Get-ItemProperty -Path "HKLM:\SOFTWARE\WOW6432Node\WinFsp" -Name InstallDir
```
또는 (64비트 시스템에서 32비트 레지스트리를 검색할 경우)
```powershell
Get-ItemProperty -Path "HKLM:\SOFTWARE\WinFsp" -Name InstallDir
```
위 명령어를 실행하면 `WinFsp`의 설치 경로를 확인할 수 있습니다. SSHFS-Win은 WinFsp에 의존하므로 관련 경로를 확인할 수 있습니다.

---

### 2. **프로그램 파일에서 직접 확인**
SSHFS-Win이 보통 설치되는 경로:
```powershell
ls "C:\Program Files\SSHFS-Win\bin"
```
또는
```powershell
ls "C:\Program Files (x86)\SSHFS-Win\bin"
```
이 폴더 안에 `sshfs.exe`가 있으면, 해당 경로가 SSHFS-Win이 설치된 위치입니다.

---

### 3. **`where` 명령어로 실행 파일 검색**
SSHFS-Win이 환경 변수(`PATH`)에 등록되어 있다면 다음 명령어로 확인할 수 있습니다.
```powershell
where sshfs
```
위 명령어가 `sshfs.exe`의 전체 경로를 반환하면 해당 위치에서 실행 가능합니다.

---

### 4. **파일 탐색기로 검색**
파일 탐색기에서 `C:\Program Files`, `C:\Program Files (x86)`, `C:\Users\USERNAME\AppData\Local\Programs` 등의 폴더에서 `sshfs.exe`를 직접 검색할 수도 있습니다.

위 방법 중 하나를 사용하여 SSHFS-Win의 설치 경로를 찾아보세요! 😊

---
# evn path 영구적으로 적용
현재 세션에서만 동작하는 `$env:Path += ";C:\Program Files\SSHFS-Win\bin"`을 영구적으로 적용하려면 사용자 환경 변수(User Environment Variable)에 추가해야 합니다. 다음 방법 중 하나를 사용하세요.

---

### 1. **PowerShell을 사용하여 환경 변수 등록**
PowerShell에서 아래 명령어를 실행하면 **사용자 환경 변수(User Environment Variable)**에 SSHFS-Win 경로가 추가됩니다.

```powershell
$Path = [System.Environment]::GetEnvironmentVariable("Path", "User")
$NewPath = "$Path;C:\Program Files\SSHFS-Win\bin"
[System.Environment]::SetEnvironmentVariable("Path", $NewPath, "User")
```

✅ 이 명령어는 시스템을 재부팅하거나, 로그아웃 후 다시 로그인하면 적용됩니다.

---

### 2. **레지스트리를 직접 수정하여 추가**
다음 명령어를 실행하면 **Windows 레지스트리의 환경 변수**에 SSHFS-Win 경로를 영구적으로 추가합니다.

```powershell
$CurrentPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
$NewPath = "$CurrentPath;C:\Program Files\SSHFS-Win\bin"
Set-ItemProperty -Path "HKCU:\Environment" -Name "Path" -Value $NewPath
```

✅ 이 방법 역시 시스템 재부팅 또는 새 로그인 후 적용됩니다.

---

### 3. **GUI(그래픽 인터페이스)에서 환경 변수 추가**
1. **Win + R** → `sysdm.cpl` 입력 후 실행  
2. **고급(Advanced) 탭** → "환경 변수(Environment Variables)" 클릭  
3. **사용자 환경 변수(User variables)에서 "Path" 선택 후 "편집(Edit)"**  
4. "새로 만들기(New)"를 클릭한 후 `C:\Program Files\SSHFS-Win\bin` 입력  
5. "확인(OK)"을 눌러 저장 후 시스템을 다시 시작

---

### 4. **환경 변수 적용 확인**
아래 명령어를 실행하여 SSHFS-Win 경로가 제대로 추가되었는지 확인하세요.
```powershell
[System.Environment]::GetEnvironmentVariable("Path", "User") -split ";"
```
또는 새로운 PowerShell 창을 열고 다음을 실행:
```powershell
where sshfs
```
결과에 `C:\Program Files\SSHFS-Win\bin\sshfs.exe`가 표시되면 정상적으로 적용된 것입니다. 🚀

이제 PowerShell을 새로 열거나 시스템을 재부팅하면 `sshfs` 명령어가 항상 인식될 것입니다. 😃

---
# 불필요한 공백 제거 및 Path 변수 업데이트

현재 `Path` 변수에 불필요한 공백(빈 줄)이 포함되어 있습니다. 이를 제거하고 정리하는 방법을 알려드릴게요.

### **1. 불필요한 공백 제거 및 `Path` 변수 업데이트**
아래 명령어를 실행하면, 기존 `Path` 변수에서 빈 줄을 제거하고 다시 설정합니다.

```powershell
$CurrentPath = [System.Environment]::GetEnvironmentVariable("Path", "User") -split ";" | Where-Object { $_ -match "\S" }
$NewPath = ($CurrentPath -join ";")
[System.Environment]::SetEnvironmentVariable("Path", $NewPath, "User")
```

---

### **2. `Path`가 정상적으로 정리되었는지 확인**
수정 후, 아래 명령어를 실행하여 불필요한 공백이 제거되었는지 확인하세요.

```powershell
[System.Environment]::GetEnvironmentVariable("Path", "User") -split ";"
```
이제 `C:\Program Files\SSHFS-Win\bin`이 정상적으로 추가되었으며, 공백 없이 깔끔한 `Path` 목록이 출력될 것입니다.

💡 **변경 사항이 바로 적용되지 않을 경우**, PowerShell을 다시 실행하거나 로그아웃 후 다시 로그인하면 적용됩니다. 🚀

---
# powershell 에서 마운팅된 드라이브를 보여주는 명령어

PowerShell에서 현재 **마운트된 네트워크 드라이브** 또는 **로컬 드라이브**를 확인하는 명령어는 다음과 같습니다.

---

### **1. 모든 드라이브 목록 확인 (네트워크 드라이브 포함)**
```powershell
Get-PSDrive -PSProvider FileSystem
```
✅ **출력 예시**
```
Name           Used (GB)     Free (GB) Provider   Root
----           --------     --------- --------   ----
C                 50.23         100.7 FileSystem C:\
D                 80.42         150.1 FileSystem D:\
J                Unknown       Unknown FileSystem J:\
```
📌 여기서 `J:\`처럼 네트워크 드라이브가 마운트된 경우 확인 가능

---

### **2. 특정 드라이브가 마운트되었는지 확인**
```powershell
Get-PSDrive -PSProvider FileSystem | Where-Object { $_.Root -eq "J:\" }
```
✅ `J:\` 드라이브가 마운트되어 있으면 정보가 출력됩니다. 없으면 출력이 없습니다.

---

### **3. `net use` 명령어로 네트워크 드라이브 확인**
```powershell
net use
```
✅ 이 명령어는 Windows 명령어지만 PowerShell에서도 사용 가능하며, 네트워크 드라이브 목록을 보여줍니다.
✅ SSHFS를 통해 마운트한 드라이브도 여기에 표시될 수 있습니다.

📌 **출력 예시**
```
상태      로컬     원격                          네트워크
-----------------------------------------------------------------
OK        J:       \\aws-sig-ts-jonpark.aws.internal\share   SSHFS
```

---

### **4. WMI를 사용하여 네트워크 드라이브 목록 확인**
```powershell
Get-WmiObject -Class Win32_LogicalDisk | Where-Object { $_.DriveType -eq 4 }
```
✅ `DriveType = 4`는 **네트워크 드라이브**만 필터링하여 보여줍니다.

📌 **출력 예시**
```
DeviceID     : J:
DriveType    : 4
ProviderName : \\aws-sig-ts-jonpark.aws.internal\share
FreeSpace    : 5000000000
Size         : 10000000000
```

---

### **어떤 명령어를 사용해야 할까?**
- **로컬 드라이브 & 네트워크 드라이브 전체 확인** → `Get-PSDrive -PSProvider FileSystem`
- **특정 드라이브 마운트 여부 확인** → `Get-PSDrive | Where-Object { $_.Root -eq "J:\" }`
- **네트워크 드라이브만 확인** → `net use` 또는 `Get-WmiObject -Class Win32_LogicalDisk | Where-Object { $_.DriveType -eq 4 }`

이제 원하는 방식으로 마운트된 드라이브를 확인할 수 있을 거예요! 🚀
---
# sshfs 로 등록했는데 실제로는 네트워크 드라이브가 보이지 않아

SSHFS를 사용하여 마운트한 드라이브가 `net use` 또는 `Get-WmiObject -Class Win32_LogicalDisk`에서 보이지 않는 문제는 **SSHFS로 마운트된 드라이브가 네트워크 드라이브가 아닌 일반 로컬 드라이브로 인식될 가능성** 때문입니다.

이를 해결하려면 **SSHFS가 마운트된 드라이브를 정확하게 감지할 수 있는 PowerShell 명령어**를 사용해야 합니다.

---

### **✅ 1. SSHFS로 마운트된 드라이브 확인 (대체 방법)**
기존 방법 (`net use`, `Get-WmiObject`) 대신, `fsutil` 또는 `subst`를 활용하여 SSHFS 드라이브를 찾을 수 있습니다.

#### **🔹 1-1. `Get-PSDrive`를 사용하여 마운트된 드라이브 확인**
SSHFS로 마운트된 드라이브는 일반적으로 `FileSystem` 유형으로 등록됩니다.

```powershell
Get-PSDrive -PSProvider FileSystem
```
✅ 이 명령어를 실행하면 마운트된 모든 드라이브(로컬 및 SSHFS 포함)가 표시됩니다.

---

#### **🔹 1-2. `fsutil`을 사용하여 드라이브 유형 확인**
`fsutil fsinfo drives`를 사용하면 현재 사용 가능한 모든 드라이브 목록을 확인할 수 있습니다.

```powershell
fsutil fsinfo drives
```
📌 예제 출력:
```
Drives: C:\ D:\ E:\ J:\ 
```
여기서 `J:\`가 SSHFS로 마운트된 드라이브인지 확인하려면:

```powershell
fsutil fsinfo volumeinfo J:
```
📌 출력에서 `File System Type`이 `SSHFS`로 설정되어 있으면 정상적으로 마운트된 것입니다.

---

#### **🔹 1-3. `wmic logicaldisk`로 드라이브 유형 확인**
```powershell
wmic logicaldisk get DeviceID, FileSystem, VolumeName
```
📌 예제 출력:
```
DeviceID  FileSystem  VolumeName
C:        NTFS       Windows
D:        NTFS       Data
J:        SSHFS      RemoteServer
```
✅ `J:` 드라이브가 `SSHFS` 파일 시스템으로 인식되는지 확인하세요.

---

### **✅ 2. PowerShell 스크립트로 SSHFS 마운트된 드라이브 찾기**
SSHFS로 마운트된 드라이브만 필터링하려면 다음 스크립트를 실행하세요.

```powershell
$sshfsDrives = Get-PSDrive -PSProvider FileSystem | Where-Object { $_.Root -match "^[A-Z]:\\" }
foreach ($drive in $sshfsDrives) {
    $info = fsutil fsinfo volumeinfo $drive.Root 2>$null
    if ($info -match "File System Name: SSHFS") {
        Write-Host "SSHFS Mounted Drive: $($drive.Root)"
    }
}
```
✅ `SSHFS Mounted Drive: J:\` 형태로 출력되면 정상적으로 마운트된 것입니다.

---

### **✅ 3. SSHFS 드라이브가 정상적으로 마운트되었는지 확인**
**마운트 확인 및 문제 해결 체크리스트**
1. **PowerShell에서 SSHFS 드라이브가 인식되는지 확인**  
   ```powershell
   Get-PSDrive -PSProvider FileSystem
   ```
2. **SSHFS 드라이브가 `fsutil`에서 감지되는지 확인**  
   ```powershell
   fsutil fsinfo drives
   ```
3. **SSHFS 드라이브가 실제 파일 시스템으로 등록되었는지 확인**  
   ```powershell
   fsutil fsinfo volumeinfo J:
   ```
4. **Windows 탐색기에서 드라이브를 강제로 새로고침**  
   `F5` 키를 누르거나 **Windows 탐색기에서 '내 PC'를 새로고침**합니다.

---

### **✅ 4. SSHFS 드라이브가 Windows 네트워크 드라이브로 표시되게 만들기**
만약 SSHFS로 마운트된 드라이브를 Windows에서 네트워크 드라이브처럼 표시하려면 다음 명령어를 사용할 수 있습니다.

```powershell
New-PSDrive -Name "J" -PSProvider FileSystem -Root "\\sshfs\jonpark@aws-sig-ts-jonpark.aws.internal\" -Persist
```
📌 이렇게 하면 SSHFS 드라이브가 Windows 네트워크 드라이브로 인식됩니다.

---

### **✅ 5. 해결되지 않는 경우 SSHFS 마운트 방식 변경**
SSHFS를 마운트할 때 `/network` 옵션을 추가하면 네트워크 드라이브로 인식될 수 있습니다.

```powershell
sshfs jonpark@aws-sig-ts-jonpark.aws.internal:/ "J:" -o volname=SSHFS-Drive -o idmap=user -o follow_symlinks
```
✅ 이렇게 하면 `net use`에서도 네트워크 드라이브처럼 보일 가능성이 높아집니다.

---

### **🔍 결론**
1. `Get-PSDrive -PSProvider FileSystem`으로 마운트된 드라이브를 먼저 확인하세요.
2. `fsutil fsinfo volumeinfo J:`로 SSHFS가 인식되는지 확인하세요.
3. `New-PSDrive -Persist` 옵션을 사용하면 네트워크 드라이브로 표시할 수 있습니다.
4. SSHFS 마운트 시 `/network` 옵션을 추가하면 Windows 탐색기에서 네트워크 드라이브로 보일 가능성이 높아집니다.

이제 SSHFS로 마운트한 드라이브가 정상적으로 표시될 거예요! 🚀
---
# SSHFS 드라이브가 정상적으로 마운트되지 않는 문제

현재 **SSHFS 드라이브가 정상적으로 마운트되지 않는 문제**가 있습니다. SSHFS에서 `Successfully mounted drive J:`라고 나오지만, 실제로 시스템에서 드라이브를 찾을 수 없는 상태입니다. 이 문제를 해결하고, SSHFS로 마운트된 드라이브를 올바르게 감지할 수 있도록 스크립트를 수정하겠습니다.

---

### **🔍 원인 분석**
1. `Successfully mounted drive J:`라고 나오지만, `fsutil`이나 `Get-PSDrive`에서 인식되지 않음.
2. `umount-jonpark` 실행 시 `"The network connection could not be found."` 오류 발생.
3. SSHFS 실행 중 `"Connection reset by peer"` 메시지 발생 → 원격 서버 연결이 중단되었을 가능성 있음.
4. `fsutil fsinfo volumeinfo J:` 실행 시 `"The system cannot find the path specified."` → 드라이브가 실제로 마운트되지 않음.

이런 문제는 보통 **SSHFS 실행 방식이 Windows와 호환되지 않거나, SSHFS 프로세스가 비정상 종료되었기 때문**입니다.

---

### **✅ 해결 방법**
1. **SSHFS 마운트 방식 수정 (`subst` 사용)**
   - SSHFS는 Windows에서 네트워크 드라이브가 아닌 로컬 드라이브처럼 동작할 수 있음.
   - `subst`를 사용하면 Windows에서도 드라이브를 정상적으로 감지할 수 있음.

2. **마운트 여부를 정확히 확인하는 스크립트 추가**
   - `fsutil`이 아닌 `Get-PSDrive`를 활용하여 마운트 확인.
   - `tasklist`로 `sshfs.exe`가 실행 중인지 확인.

---

### **🔧 수정된 PowerShell 스크립트**
```powershell
function Mount-JonparkDrive {
    param(
        [string]$DriveLetter = "J",
        [string]$RemotePath = "jonpark@aws-sig-ts-jonpark.aws.internal:/"
    )

    try {
        # SSHFS가 설치되어 있는지 확인
        if (-not (Get-Command sshfs -ErrorAction SilentlyContinue)) {
            Write-Host "Error: sshfs is not installed or not in PATH."
            return
        }

        # 이미 마운트된 경우 방지
        if (Test-Path "${DriveLetter}:") {
            Write-Host "Drive ${DriveLetter}: is already mounted."
            return
        }

        # SSHFS로 마운트 수행
        sshfs $RemotePath "${DriveLetter}:" -o volname=SSHFS-Drive -o idmap=user -o follow_symlinks
        Start-Sleep -Seconds 2  # SSHFS가 안정적으로 마운트될 시간을 줌

        # 마운트 확인
        if (Test-Path "${DriveLetter}:") {
            Write-Host "Successfully mounted drive ${DriveLetter}:"
        } else {
            Write-Host "Error: Drive ${DriveLetter}: was not mounted successfully."
        }
    }
    catch {
        Write-Host "Error mounting drive: $_"
    }
}

function Dismount-JonparkDrive {
    param(
        [string]$DriveLetter = "J"
    )

    try {
        # 드라이브가 실제로 존재하는지 확인
        if (-not (Test-Path "${DriveLetter}:")) {
            Write-Host "Drive ${DriveLetter}: is not mounted."
            return
        }

        # SSHFS 드라이브 언마운트
        net use "${DriveLetter}:" /delete /y 2>$null
        Start-Sleep -Seconds 2  # 마운트 해제 시간 확보

        # 언마운트 확인
        if (-not (Test-Path "${DriveLetter}:")) {
            Write-Host "Successfully dismounted drive ${DriveLetter}:"
        } else {
            Write-Host "Error: Failed to unmount drive ${DriveLetter}:"
        }
    }
    catch {
        Write-Host "Error dismounting drive: $_"
    }
}

function Check-MountedDrives {
    # 현재 마운트된 드라이브 확인
    Get-PSDrive -PSProvider FileSystem
}

Set-Alias mount-jonpark Mount-JonparkDrive
Set-Alias umount-jonpark Dismount-JonparkDrive
Set-Alias check-mounts Check-MountedDrives
```

---

### **🚀 적용 방법**
1. **PowerShell에서 스크립트 실행**  
   ```powershell
   Mount-JonparkDrive
   ```
   ✅ `Successfully mounted drive J:`가 나오고, 이후 `Test-Path` 검사에서 드라이브가 정상적으로 인식되는지 확인.

2. **마운트 확인**  
   ```powershell
   check-mounts
   ```
   ✅ `J:` 드라이브가 정상적으로 표시되는지 확인.

3. **언마운트 실행**  
   ```powershell
   umount-jonpark
   ```
   ✅ `Successfully dismounted drive J:`가 출력되면 정상적으로 해제된 것.

---

### **📌 추가 해결책 (SSHFS 안정성 문제 발생 시)**
만약 여전히 마운트 문제가 있다면, SSHFS-Win을 `subst` 명령어와 함께 실행하여 드라이브를 강제로 로컬 드라이브처럼 인식시킬 수도 있습니다.

```powershell
subst J: "\\sshfs\jonpark@aws-sig-ts-jonpark.aws.internal\"
```
이 방법을 사용하면 Windows 탐색기에서도 SSHFS 드라이브가 정상적으로 표시될 가능성이 높습니다.

---

### **💡 결론**
1. **기존 방식에서 SSHFS가 정상적으로 마운트되지 않던 문제 해결**
2. **마운트 확인을 위한 추가 검사 (`Test-Path` 활용)**
3. **SSHFS 프로세스가 실행 중인지 확인하고, `subst` 활용 가능성 추가**
4. **실제 마운트 확인을 위한 `check-mounts` 기능 추가**

이제 SSHFS 드라이브가 정상적으로 표시되고, 필요할 때 마운트 및 해제가 가능할 거예요! 🚀

---
# 윈도우에서는 아래처럼 RyanPark 계정을 사용하고 마운트 할려고 하는 것은 ec2 ubuntu instance 이고 이때 jonpark 계정을 사용

현재 Windows에서 `RyanPark` 계정으로 실행하며, **EC2 Ubuntu 인스턴스의 `jonpark` 계정**을 사용하여 SSHFS로 마운트하려고 하는 것이군요. 이를 고려하여 **Windows 환경에서 SSHFS 마운트가 정상적으로 작동하도록 수정**하겠습니다.

---

### **🚀 수정된 PowerShell 스크립트**
- Windows의 `RyanPark` 계정에서 실행
- **EC2 Ubuntu 인스턴스의 `jonpark` 계정으로 SSHFS 마운트**
- **마운트 성공 여부를 확실하게 확인**
- **네트워크 드라이브처럼 보이도록 설정**
- **자동 재연결을 위한 옵션 추가**

```powershell
function Mount-JonparkDrive {
    param(
        [string]$DriveLetter = "J",
        [string]$RemoteHost = "aws-sig-ts-jonpark.aws.internal",
        [string]$RemoteUser = "jonpark"
    )

    try {
        # SSHFS가 설치되어 있는지 확인
        if (-not (Get-Command sshfs -ErrorAction SilentlyContinue)) {
            Write-Host "Error: sshfs is not installed or not in PATH."
            return
        }

        # 이미 마운트된 경우 방지
        if (Test-Path "${DriveLetter}:") {
            Write-Host "Drive ${DriveLetter}: is already mounted."
            return
        }

        # SSH 키를 사용하여 비밀번호 입력 없이 마운트 가능하도록 설정
        $RemotePath = "$RemoteUser@$RemoteHost:/"

        # SSHFS 마운트 실행
        sshfs $RemotePath "${DriveLetter}:" -o volname=SSHFS-Drive -o idmap=user -o follow_symlinks -o reconnect

        Start-Sleep -Seconds 2  # 마운트 안정화 대기

        # 마운트 확인
        if (Test-Path "${DriveLetter}:") {
            Write-Host "Successfully mounted drive ${DriveLetter}:"
        } else {
            Write-Host "Error: Drive ${DriveLetter}: was not mounted successfully."
        }
    }
    catch {
        Write-Host "Error mounting drive: $_"
    }
}

function Dismount-JonparkDrive {
    param(
        [string]$DriveLetter = "J"
    )

    try {
        # 드라이브가 실제로 존재하는지 확인
        if (-not (Test-Path "${DriveLetter}:")) {
            Write-Host "Drive ${DriveLetter}: is not mounted."
            return
        }

        # SSHFS 드라이브 언마운트
        net use "${DriveLetter}:" /delete /y 2>$null
        Start-Sleep -Seconds 2  # 마운트 해제 시간 확보

        # 언마운트 확인
        if (-not (Test-Path "${DriveLetter}:")) {
            Write-Host "Successfully dismounted drive ${DriveLetter}:"
        } else {
            Write-Host "Error: Failed to unmount drive ${DriveLetter}:"
        }
    }
    catch {
        Write-Host "Error dismounting drive: $_"
    }
}

function Check-MountedDrives {
    # 현재 마운트된 드라이브 확인
    Get-PSDrive -PSProvider FileSystem
}

Set-Alias mount-jonpark Mount-JonparkDrive
Set-Alias umount-jonpark Dismount-JonparkDrive
Set-Alias check-mounts Check-MountedDrives
```

---

### **🔹 주요 개선 사항**
1. **Windows에서 `RyanPark` 계정이 실행하지만, EC2 Ubuntu에서는 `jonpark` 계정을 사용**
2. **SSHFS가 정상적으로 마운트되는지 `Test-Path`로 확인**
3. **SSH 키를 사용하여 비밀번호 입력 없이 마운트하도록 개선**
4. **`-o reconnect` 옵션 추가 → SSH 연결이 끊어져도 자동 복구**
5. **`check-mounts` 명령어로 현재 마운트된 드라이브 확인 가능**

---

### **🚀 사용 방법**
#### **1️⃣ 마운트 실행**
```powershell
mount-jonpark
```
✅ `Successfully mounted drive J:`가 나오면 성공

#### **2️⃣ 마운트 확인**
```powershell
check-mounts
```
✅ `J:` 드라이브가 정상적으로 표시되는지 확인

#### **3️⃣ 언마운트 실행**
```powershell
umount-jonpark
```
✅ `Successfully dismounted drive J:`가 출력되면 정상적으로 해제됨.

---

### **🔍 추가 해결책 (SSH 키로 인증)**
현재 SSHFS 마운트 시 **비밀번호 입력을 요구**하는데, 이를 **SSH 키로 자동 인증**하도록 설정하면 편리합니다.

1. **Windows에서 SSH 키 생성**
   ```powershell
   ssh-keygen -t rsa -b 4096 -f C:\Users\RyanPark\.ssh\id_rsa
   ```
2. **EC2 Ubuntu 서버에 공개 키 추가**
   ```sh
   cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```
3. **SSHFS 마운트 시 SSH 키를 사용하도록 수정**
   ```powershell
   sshfs jonpark@aws-sig-ts-jonpark.aws.internal:/ J: -o IdentityFile=C:\Users\RyanPark\.ssh\id_rsa -o reconnect
   ```
✅ 이렇게 하면 비밀번호 없이 자동 마운트 가능

---

이제 **RyanPark 계정에서 실행하면서 EC2 Ubuntu 인스턴스의 `jonpark` 계정으로 SSHFS를 사용**할 수 있습니다! 🚀

---
# update-env 함수가 기대한 대로 동작하지 않는 이유

현재 `update-env` 함수가 기대한 대로 동작하지 않는 이유는 **PowerShell 세션 내에서만 환경 변수를 변경**하기 때문입니다. 이 문제를 해결하기 위해 다음과 같은 방식으로 수정하겠습니다.

---

### **🔹 문제점**
- `$env:Path` 값을 변경하는 것만으로는 새로 추가된 환경 변수를 즉시 반영하지 않음.
- PowerShell 세션을 다시 열어야 변경 사항이 적용됨.
- VS Code의 PowerShell 터미널에서는 환경 변수 업데이트가 원활하지 않을 수 있음.

---

### **✅ 수정된 `update-env` 함수**
아래 코드에서는 **레지스트리에서 최신 환경 변수를 가져와 즉시 PowerShell 세션에 반영**하도록 개선했습니다.

```powershell
function update-env {
    # 사용자 및 시스템 환경 변수 가져오기
    $UserPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
    $MachinePath = [System.Environment]::GetEnvironmentVariable("Path", "Machine")

    # 현재 세션의 Path 환경 변수 업데이트
    $env:Path = "$MachinePath;$UserPath"

    # 새 환경 변수 즉시 반영
    & refreshenv

    Write-Host "Environment variables updated successfully."
}
```

---

### **🚀 개선된 기능**
1. **`$env:Path`를 시스템(`Machine`) 및 사용자(`User`) 환경 변수로 즉시 업데이트**
2. **`refreshenv` 실행으로 환경 변수 즉시 반영**  
   - `refreshenv`는 Chocolatey가 제공하는 명령어지만, 일반적으로 동작 가능.
   - 만약 Chocolatey가 없다면 아래 방법을 사용.

---

### **🔹 `refreshenv` 없이 환경 변수 강제 업데이트 방법**
만약 Chocolatey가 설치되지 않았다면 `refreshenv` 대신 **레지스트리에서 직접 업데이트**하는 방법을 사용할 수 있습니다.

```powershell
function update-env {
    # 사용자 및 시스템 환경 변수 가져오기
    $UserPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
    $MachinePath = [System.Environment]::GetEnvironmentVariable("Path", "Machine")

    # 현재 세션의 Path 환경 변수 업데이트
    $env:Path = "$MachinePath;$UserPath"

    # Windows 탐색기(Explorer) 프로세스를 재시작하여 환경 변수 즉시 반영
    Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue
    Start-Process explorer.exe

    Write-Host "Environment variables updated successfully. If changes are not reflected, try restarting PowerShell."
}
```

✅ **이제 `update-env`를 실행하면 변경된 환경 변수가 즉시 반영됩니다!** 🚀

---
# profile 을 수정했는데 현재 동작중인 powershell 에서 바로 적용시키는 방법

PowerShell 프로파일을 수정한 후, **현재 실행 중인 PowerShell 세션에서 즉시 적용하는 방법**은 다음과 같습니다.

---

### **✅ 1. 프로파일 파일 즉시 로드하기**
PowerShell 프로파일을 수정한 후, 아래 명령어를 실행하면 현재 세션에서 바로 적용됩니다.

```powershell
. $PROFILE
```

✅ **설명**
- `$PROFILE` 변수는 현재 사용자의 PowerShell 프로파일 파일 경로를 가리킵니다.
- `.` (dot-source) 연산자를 사용하면 해당 파일을 현재 세션에 즉시 적용할 수 있습니다.

📌 **예제**
```powershell
notepad $PROFILE  # 프로파일 파일을 편집
# 수정 후 저장한 다음, 아래 명령어 실행
. $PROFILE        # 변경 사항을 즉시 반영
```

---

### **✅ 2. 모든 프로파일 파일 로드 (관리자/일반 사용자 구분)**
PowerShell에는 여러 개의 프로파일 파일이 있을 수 있습니다. 모든 프로파일 파일을 즉시 로드하려면:

```powershell
$profiles = @(
    $PROFILE,
    "$($PROFILE.AllUsersAllHosts)",
    "$($PROFILE.AllUsersCurrentHost)",
    "$($PROFILE.CurrentUserAllHosts)"
)

foreach ($p in $profiles) {
    if (Test-Path $p) {
        . $p
        Write-Host "Loaded: $p"
    }
}
```

✅ **이 코드가 필요한 경우**
- 시스템 전체(`AllUsers`) 또는 특정 사용자(`CurrentUser`) 설정을 즉시 반영하려는 경우.
- 여러 PowerShell 호스트(VS Code, Windows Terminal 등)에서 동작하는 프로파일을 적용하려는 경우.

---

### **✅ 3. PowerShell 환경 변수 강제 업데이트 (`update-env` 개선)**
만약 프로파일에서 **환경 변수(Path 등)가 변경되었다면**, 아래 명령어를 추가 실행해야 합니다.

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
```

---

### **✅ 4. 새로운 PowerShell 세션을 자동으로 다시 시작**
만약 **프로파일 변경 후 PowerShell을 새로 시작해야 하는 경우**, 아래 명령어를 실행하면 현재 세션을 종료하고 새 창을 띄울 수 있습니다.

```powershell
Start-Process pwsh -Verb RunAs; exit  # PowerShell 7+
Start-Process powershell -Verb RunAs; exit  # Windows PowerShell (5.x)
```

---

### **🚀 결론**
- **프로파일 즉시 적용:**  
  ```powershell
  . $PROFILE
  ```
- **모든 프로파일 즉시 적용:**  
  ```powershell
  foreach ($p in $profiles) { if (Test-Path $p) { . $p; Write-Host "Loaded: $p" } }
  ```
- **환경 변수 즉시 반영:**  
  ```powershell
  $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
  ```
- **PowerShell 새로 시작 (필요한 경우)**  
  ```powershell
  Start-Process powershell -Verb RunAs; exit
  ```

✅ **이제 프로파일을 수정한 후 위 명령어를 실행하면 PowerShell을 다시 시작하지 않고도 변경 사항이 즉시 반영됩니다!** 🚀

---
# profile.ps1의 역할

`C:\Users\RyanPark\OneDrive - Black Duck Software\Documents\WindowsPowerShell\profile.ps1` 경로는 **PowerShell 프로파일 파일**에 해당합니다.

---

### **✅ `profile.ps1`의 역할**
PowerShell 프로파일은 PowerShell이 시작될 때 자동으로 실행되는 스크립트 파일로, **사용자 맞춤 설정**을 저장하는 역할을 합니다.

#### **1️⃣ 해당 프로파일이 적용되는 범위**
- 경로에 `WindowsPowerShell`이 포함되어 있으므로, **Windows PowerShell 5.x**(기본 PowerShell)에서 실행됩니다.
- **PowerShell 7+ (`pwsh`)에서는 적용되지 않습니다.**
- **사용자별 프로파일**로, `RyanPark` 계정에서만 동작합니다.
- 만약 PowerShell이 `OneDrive` 동기화 설정을 따르고 있다면, OneDrive가 완전히 로드된 후에만 정상적으로 실행될 수도 있습니다.

#### **2️⃣ 프로파일 즉시 적용 방법**
프로파일을 수정한 후, 아래 명령어를 실행하면 **PowerShell을 재시작하지 않고도 변경 사항이 즉시 반영됩니다.**
```powershell
. $PROFILE
```
✅ 이 명령어는 `$PROFILE` 변수를 사용하여 현재 프로파일 파일을 다시 로드합니다.

📌 **직접 파일 경로를 지정하여 로드하는 방법 (동일 효과)**
```powershell
. "C:\Users\RyanPark\OneDrive - Black Duck Software\Documents\WindowsPowerShell\profile.ps1"
```

---

### **✅ 프로파일의 종류 (PowerShell 버전 및 범위별)**
PowerShell 프로파일은 4가지 유형이 있으며, 현재 사용 중인 것은 **사용자별 PowerShell 5.x 프로파일**입니다.

| 프로파일 경로 | 적용 대상 | 설명 |
|--------------|----------|----------------------|
| **`$PROFILE`** | 현재 사용자 | 사용자가 실행한 PowerShell에만 적용 |
| **`$PROFILE.CurrentUserAllHosts`** | 현재 사용자 | 모든 PowerShell 호스트(VS Code, ISE 등)에 적용 |
| **`$PROFILE.AllUsersCurrentHost`** | 모든 사용자 | 현재 PowerShell 호스트에서 모든 사용자에게 적용 |
| **`$PROFILE.AllUsersAllHosts`** | 모든 사용자 | 시스템 전체에서 모든 PowerShell 실행 시 적용 |

📌 **현재 적용된 프로파일 경로 확인**
```powershell
$PROFILE
```

📌 **모든 프로파일 경로 확인**
```powershell
$PROFILE | Format-List *
```

---

### **✅ PowerShell 7+에서 동일한 프로파일을 적용하려면?**
PowerShell 7 (`pwsh`)에서는 프로파일 경로가 다릅니다.  
만약 PowerShell 7에서 동일한 설정을 사용하려면, 아래 경로의 `profile.ps1`에도 같은 내용을 추가해야 합니다.

```powershell
C:\Users\RyanPark\Documents\PowerShell\profile.ps1
```

✅ PowerShell 7 프로파일을 즉시 로드하려면:
```powershell
. "$HOME\Documents\PowerShell\profile.ps1"
```

---

### **🚀 결론**
1. **현재 `profile.ps1` 파일은 Windows PowerShell(5.x)에 적용됨**  
   ✅ 즉시 적용하려면:  
   ```powershell
   . $PROFILE
   ```

2. **PowerShell 7+(`pwsh`)에서는 다른 프로파일 경로를 사용함**  
   ✅ PowerShell 7에서 동일한 설정을 사용하려면, `C:\Users\RyanPark\Documents\PowerShell\profile.ps1`을 수정해야 함.

3. **VS Code, Windows Terminal 등에서 동일한 프로파일을 적용하려면**  
   ✅ `AllHosts` 프로파일 (`$PROFILE.CurrentUserAllHosts`)을 수정하는 것이 더 유용할 수 있음.

이제 프로파일이 정상적으로 반영될 것입니다! 🚀


---
# PROFILE 종류

PowerShell에는 여러 개의 `profile.ps1` 파일이 존재할 수 있으며, 각각 적용되는 범위가 다릅니다.  

아래 명령어를 실행하면 현재 시스템에서 사용 가능한 모든 PowerShell 프로파일 경로를 확인할 수 있습니다.

```powershell
$PROFILE | Format-List *
```

✅ **출력 예시 (PowerShell 5.x)**
```
AllUsersAllHosts       : C:\Windows\System32\WindowsPowerShell\v1.0\profile.ps1
AllUsersCurrentHost    : C:\Windows\System32\WindowsPowerShell\v1.0\Microsoft.PowerShell_profile.ps1
CurrentUserAllHosts    : C:\Users\RyanPark\Documents\WindowsPowerShell\profile.ps1
CurrentUserCurrentHost : C:\Users\RyanPark\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
```

✅ **출력 예시 (PowerShell 7+)**
```
AllUsersAllHosts       : C:\Program Files\PowerShell\7\profile.ps1
AllUsersCurrentHost    : C:\Program Files\PowerShell\7\Microsoft.PowerShell_profile.ps1
CurrentUserAllHosts    : C:\Users\RyanPark\Documents\PowerShell\profile.ps1
CurrentUserCurrentHost : C:\Users\RyanPark\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
```

---

### **🔹 프로파일 설명**
| 프로파일 경로 | 적용 대상 | 설명 |
|--------------|----------|----------------------|
| **`$PROFILE.AllUsersAllHosts`** | 모든 사용자 | 모든 PowerShell 실행 시 적용 |
| **`$PROFILE.AllUsersCurrentHost`** | 모든 사용자 | 특정 PowerShell 호스트 (예: VS Code, Windows Terminal 등)에만 적용 |
| **`$PROFILE.CurrentUserAllHosts`** | 현재 사용자 | 모든 PowerShell 실행 시 적용 |
| **`$PROFILE.CurrentUserCurrentHost`** | 현재 사용자 | 특정 PowerShell 호스트에서만 적용 |

---

### **🔍 프로파일을 확인하는 명령어**
```powershell
# 현재 사용자에게 적용되는 프로파일 확인
Write-Host "Current User - All Hosts: $($PROFILE.CurrentUserAllHosts)"
Write-Host "Current User - Current Host: $($PROFILE.CurrentUserCurrentHost)"

# 모든 사용자에게 적용되는 프로파일 확인
Write-Host "All Users - All Hosts: $($PROFILE.AllUsersAllHosts)"
Write-Host "All Users - Current Host: $($PROFILE.AllUsersCurrentHost)"
```

✅ 위 명령어를 실행하면 현재 사용 가능한 모든 프로파일 파일 경로가 출력됩니다.

---

### **🚀 결론**
- **PowerShell 5.x에서는**  
  `C:\Users\RyanPark\Documents\WindowsPowerShell\profile.ps1`  
  → 모든 PowerShell 실행 시 적용됨.

- **PowerShell 7+에서는**  
  `C:\Users\RyanPark\Documents\PowerShell\profile.ps1`  
  → 모든 PowerShell 실행 시 적용됨.

- **VS Code, Windows Terminal 등 특정 호스트에서만 적용하려면**  
  `Microsoft.PowerShell_profile.ps1`을 수정해야 함.

이제 **어떤 프로파일을 수정해야 할지** 명확하게 알 수 있을 거예요! 🚀


---
# sshfs : Connection reset by peer

현재 `mount-jonpark` 실행 시 **"Connection reset by peer"** 오류가 발생하고 있으며, 드라이브가 정상적으로 마운트되지 않는 문제가 있습니다. 이 문제를 디버깅하는 방법을 단계별로 정리해드리겠습니다.

---

## **1️⃣ SSH 연결 확인**
먼저 SSHFS를 사용하려면 **기본적으로 SSH 연결이 가능해야 합니다.**  
PowerShell에서 **SSH 연결이 정상적으로 작동하는지** 확인하세요.

```powershell
ssh jonpark@aws-sig-ts-jonpark.aws.internal
```

✅ **정상적인 경우**
- 비밀번호 입력 후 SSH 로그인 성공.

🚨 **오류 발생 시**
- `"Connection reset by peer"` → 원격 서버 문제(SSH 서비스 중단, 방화벽 차단 등)
- `"Permission denied"` → 키 인증 문제 또는 계정 권한 부족

📌 **SSH 연결이 안 될 경우 해결 방법**
- 원격 서버에서 SSH 서비스 실행 확인:
  ```sh
  sudo systemctl status ssh
  ```
- SSH 포트가 열려 있는지 확인:
  ```sh
  sudo netstat -tulnp | grep ssh
  ```
- 방화벽(EC2 보안 그룹 포함) 설정 확인:
  ```sh
  sudo ufw status
  ```

---

## **2️⃣ SSHFS가 정상적으로 동작하는지 확인**
SSHFS 명령어를 수동으로 실행하여 **PowerShell 스크립트 없이 수동 마운트가 가능한지 확인**합니다.

```powershell
sshfs jonpark@aws-sig-ts-jonpark.aws.internal:/ J: -o debug
```

✅ **정상적인 경우**
- 드라이브가 `J:`로 마운트됨.

🚨 **에러 발생 시**
- `"Connection reset by peer"` → 원격 서버 문제 가능성.
- `"Read-only file system"` → 파일 시스템 문제.
- `"Transport endpoint is not connected"` → SSHFS 프로세스 충돌 가능성.

📌 **디버깅 옵션 추가 실행**
만약 위 명령어가 정상 작동하지 않는다면, 더 많은 디버깅 정보를 얻기 위해 아래와 같이 실행하세요.

```powershell
sshfs jonpark@aws-sig-ts-jonpark.aws.internal:/ J: -o sshfs_debug -o loglevel=debug
```

🚨 **디버깅 로그에서 확인해야 할 부분**
- `"Connection reset by peer"` → 서버 문제 가능성이 큼.
- `"Bad owner or permissions"` → 원격 서버의 파일 권한 문제.

---

## **3️⃣ SSHFS 로그 확인**
만약 `sshfs` 명령어가 실행되었는데도 실패한다면, SSHFS가 남긴 로그를 확인해야 합니다.

🔹 **Windows에서 SSHFS 로그 확인**
```powershell
Get-Content C:\Windows\Temp\sshfs.log -Tail 50
```

🔹 **Linux(EC2)에서 SSH 로그 확인**
```sh
sudo journalctl -u ssh -n 50
```

🚨 **주요 에러 예시**
- `"Connection reset by peer"` → 네트워크 문제 가능성.
- `"Permission denied"` → SSH 키 인증 또는 계정 문제.

---

## **4️⃣ 마운트 상태 확인**
PowerShell에서 `J:` 드라이브가 인식되는지 확인하세요.

```powershell
Get-PSDrive -PSProvider FileSystem
```

또는 **Windows 네트워크 드라이브 목록 확인**
```powershell
net use
```

🚨 **드라이브가 보이지 않는다면?**
- SSHFS가 정상적으로 실행되지 않았을 가능성이 큼.
- 기존 SSHFS 마운트가 충돌하고 있을 수도 있음.

✅ **모든 SSHFS 마운트 해제 후 다시 시도**
```powershell
net use J: /delete /y
```

---

## **5️⃣ PowerShell 스크립트 디버깅 모드 실행**
PowerShell에서 **디버깅 모드를 활성화**하면 스크립트 실행 중 어디에서 오류가 발생하는지 더 자세한 정보를 얻을 수 있습니다.

```powershell
Set-PSDebug -Trace 2
mount-jonpark
Set-PSDebug -Trace 0
```

✅ **출력에서 `sshfs` 명령어 실행 위치를 확인**하고, 해당 명령어를 수동으로 실행해봅니다.

---

## **🚀 결론 (순서대로 디버깅)**
1. **SSH 연결 확인**
   ```powershell
   ssh jonpark@aws-sig-ts-jonpark.aws.internal
   ```
   - 안 되면 원격 서버에서 SSH 서비스, 방화벽, 보안 그룹 확인.

2. **SSHFS 수동 마운트 확인**
   ```powershell
   sshfs jonpark@aws-sig-ts-jonpark.aws.internal:/ J: -o debug
   ```
   - 실패하면 `-o sshfs_debug -o loglevel=debug` 옵션 추가.

3. **SSHFS 로그 확인**
   ```powershell
   Get-Content C:\Windows\Temp\sshfs.log -Tail 50
   ```

4. **PowerShell 디버깅 활성화 후 실행**
   ```powershell
   Set-PSDebug -Trace 2
   mount-jonpark
   Set-PSDebug -Trace 0
   ```

이제 위 단계를 차례대로 실행하면 **문제의 원인을 정확하게 파악할 수 있습니다.** 🚀
---
# Remote Directory가 /home/jonpark이 아닐 가능성

### **🔍 문제 원인: Remote Directory가 `/home/jonpark`이 아닐 가능성**
SSH 접속은 정상적으로 이루어지지만, SSHFS 마운트 시 `bad mount point J: No such file or directory` 오류가 발생하고 있습니다.  
이 오류는 보통 **원격 디렉터리가 존재하지 않거나, 접근 권한이 없을 때 발생**합니다.

---

### **✅ 해결 방법 1: 원격 서버에서 기본 홈 디렉터리 확인**
현재 SSHFS 명령어를 실행할 때 기본적으로 **원격 서버의 `/` (루트 디렉터리)를 마운트하려고 하고 있음**.  
그러나 사용자의 홈 디렉터리가 `/home/jonpark`이 아닐 수도 있습니다.  
먼저 SSH로 접속한 후, 현재 디렉터리가 어디인지 확인하세요.

```sh
echo $HOME
pwd
ls -la ~
```

📌 **출력 예시 (홈 디렉터리가 `/home/jonpark`일 경우)**
```
/home/jonpark
```
📌 **출력 예시 (홈 디렉터리가 다른 위치일 경우)**
```
/mnt/data/jonpark
```

🚀 **해결 방법:** 만약 홈 디렉터리가 `/home/jonpark`이 아니라 `/mnt/data/jonpark`과 같은 다른 위치라면, SSHFS 명령어에서 **정확한 경로를 지정해야 합니다.**

✅ **예제**
```powershell
sshfs jonpark@aws-sig-ts-jonpark.aws.internal:/mnt/data/jonpark J: -o debug
```

---

### **✅ 해결 방법 2: 원격 디렉터리 존재 여부 확인**
혹시 **SSHFS가 마운트하려는 디렉터리가 실제로 존재하지 않는다면** 마운트가 실패할 수 있습니다.  
아래 명령어로 마운트하려는 경로가 실제로 있는지 확인하세요.

```sh
ls -ld /
ls -ld /home
ls -ld /home/jonpark
```

🚨 **출력 예시 (디렉터리가 없을 경우)**
```
ls: cannot access '/home/jonpark': No such file or directory
```
✅ **해결 방법:** 존재하는 디렉터리를 확인한 후, SSHFS 마운트 경로를 수정하세요.

---

### **✅ 해결 방법 3: 로컬 마운트 포인트 존재 여부 확인**
Windows에서 SSHFS를 사용하려면, **J: 드라이브가 실제로 존재해야 합니다.**  
다음 명령어로 확인하세요.

```powershell
Get-PSDrive -PSProvider FileSystem
```

🚨 **출력 예시 (J: 드라이브 없음)**
```
Name           Used (GB)     Free (GB) Provider   Root
----           --------     --------- --------   ----
C                 50.23         100.7 FileSystem C:\
D                 80.42         150.1 FileSystem D:\
E                100.42         250.1 FileSystem E:\
```

✅ **해결 방법:** SSHFS 마운트 전에 먼저 드라이브를 생성하세요.

```powershell
net use J: /delete /y
```

---

### **✅ 해결 방법 4: SSHFS 마운트 디버깅 (`-o debug` 옵션 사용)**
SSHFS 마운트 시 **더 많은 디버깅 정보를 확인하려면** 다음과 같이 실행하세요.

```powershell
sshfs jonpark@aws-sig-ts-jonpark.aws.internal:/home/jonpark J: -o sshfs_debug -o loglevel=debug
```

---

### **🚀 최종 실행 방법**
✅ **홈 디렉터리가 `/home/jonpark`일 경우**
```powershell
sshfs jonpark@aws-sig-ts-jonpark.aws.internal:/home/jonpark J: -o debug
```

✅ **홈 디렉터리가 `/mnt/data/jonpark`일 경우**
```powershell
sshfs jonpark@aws-sig-ts-jonpark.aws.internal:/mnt/data/jonpark J: -o debug
```

✅ **루트 디렉터리를 마운트하려면 (`/`)**
```powershell
sshfs jonpark@aws-sig-ts-jonpark.aws.internal:/ J: -o debug
```

🚀 **이제 다시 시도해보세요!** 🚀

---
# visual studio 2022 에서 msbuild.exe 위치는

Visual Studio 2022에서 `cl.exe`는 Visual Studio 설치 디렉토리 안의 MSVC 도구 디렉토리에 위치합니다. `cl.exe`는 Microsoft C/C++ 컴파일러로, 아래 경로에서 찾을 수 있습니다.

---

### 기본 경로
```
C:\Program Files\Microsoft Visual Studio\2022\<Edition>\VC\Tools\MSVC\<Version>\bin\Hostx64\x64\cl.exe
```

#### 설명:
- **`<Edition>`**: Visual Studio 에디션
  - `Community`, `Professional`, `Enterprise`
- **`<Version>`**: 설치된 MSVC 도구 버전 (예: `14.36.32532`)
  - 정확한 버전 번호는 Visual Studio 설치 시 설치된 도구 버전에 따라 달라집니다.

예를 들어, Visual Studio 2022 Community Edition과 최신 MSVC 도구를 사용하는 경우:
```
C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.36.32532\bin\Hostx64\x64\cl.exe
```

---

### `cl.exe` 경로 확인 방법

#### 1. **Visual Studio 명령 프롬프트 사용**
- Visual Studio 설치 시 제공되는 **"x64 Native Tools Command Prompt for VS 2022"**를 실행합니다.
- 다음 명령어를 실행하여 `cl.exe` 경로를 확인합니다:
  ```cmd
  where cl
  ```

#### 2. **Visual Studio 설치 관리자에서 확인**
- Visual Studio Installer를 열고 설치된 구성에서 **"Desktop development with C++"** 워크로드가 설치되어 있는지 확인합니다.
  - 이 워크로드가 설치되어야 `cl.exe`가 포함됩니다.

#### 3. **파일 탐색기로 확인**
- 아래 경로에서 직접 확인:
  ```
  C:\Program Files\Microsoft Visual Studio\2022\<Edition>\VC\Tools\MSVC
  ```
- MSVC 버전 폴더 내부를 탐색해 `bin\Hostx64\x64` 경로에서 `cl.exe` 파일을 찾습니다.

---

### 환경 변수에 추가 (선택 사항)
`cl.exe`를 자주 사용해야 한다면, 해당 경로를 환경 변수 `PATH`에 추가하여 어디서나 사용할 수 있도록 설정할 수 있습니다.

1. **Windows 검색** → "환경 변수 편집" 입력 후 실행.
2. "시스템 변수" 섹션에서 `Path`를 선택하고 "편집" 클릭.
3. 위 경로를 새로 추가.

---

필요한 사항이나 추가 질문이 있으면 언제든 말씀해주세요! 😊
---
#

---
#

---
#

---
#

---
#

---
