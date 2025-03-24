# 내 작업 

notepad $PROFILE.CurrentUserAllHosts


# v1

PowerShell 프로필 파일은 PowerShell 세션이 시작될 때 자동으로 로드되는 스크립트입니다. 두 파일의 차이점은 적용 범위에 있습니다:

1. **Profile.ps1**:
   - 경로: `C:\Users\RyanPark\OneDrive - Black Duck Software\Documents\WindowsPowerShell\profile.ps1`
   - 적용 범위: 시스템의 모든 사용자와 모든 PowerShell 호스트(콘솔, ISE 등)에 적용됩니다
   - 이 파일은 "AllUsersAllHosts" 프로필에 해당합니다

2. **Microsoft.PowerShell_profile.ps1**:
   - 경로: `C:\Users\RyanPark\OneDrive - Black Duck Software\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`
   - 적용 범위: 현재 사용자(RyanPark)와 PowerShell 콘솔 호스트에만 적용됩니다
   - 이 파일은 "CurrentUserCurrentHost" 프로필에 해당합니다

주요 차이점:
- `profile.ps1`은 더 일반적인 프로필로, 모든 PowerShell 환경에 적용됩니다
- `Microsoft.PowerShell_profile.ps1`은 PowerShell 콘솔에서만 적용되며, Visual Studio Code의 PowerShell 터미널이나 PowerShell ISE에는 적용되지 않습니다

PowerShell에는 다음과 같은 4가지 프로필 범위가 있습니다:
1. AllUsersAllHosts (모든 사용자, 모든 호스트)
2. AllUsersCurrentHost (모든 사용자, 현재 호스트)
3. CurrentUserAllHosts (현재 사용자, 모든 호스트)
4. CurrentUserCurrentHost (현재 사용자, 현재 호스트)

일반적으로 개인 설정은 CurrentUserCurrentHost나 CurrentUserAllHosts 프로필에 추가하는 것이 좋습니다.

# v1.1

PowerShell에서 특정 프로필 파일을 직접 호출하는 방법은 다음과 같습니다:

Current User, All Hosts 프로필 파일인 `profile.ps1`을 열기 위해서는 `$PROFILE.CurrentUserAllHosts` 변수를 사용하면 됩니다:

```powershell
notepad $PROFILE.CurrentUserAllHosts
```

이 명령어는 `C:\Users\RyanPark\OneDrive - Black Duck Software\Documents\WindowsPowerShell\profile.ps1` 파일을 메모장으로 열어줍니다.

참고로, PowerShell에서 사용할 수 있는 모든 프로필 경로는 다음과 같이 확인할 수 있습니다:

```powershell
$PROFILE | Get-Member -MemberType NoteProperty | Select-Object Name, Definition
```

각 프로필 파일에 접근하는 방법:

- Current User, Current Host (기본값): `$PROFILE` 또는 `$PROFILE.CurrentUserCurrentHost`
- Current User, All Hosts: `$PROFILE.CurrentUserAllHosts`
- All Users, Current Host: `$PROFILE.AllUsersCurrentHost`
- All Users, All Hosts: `$PROFILE.AllUsersAllHosts`

프로필 파일을 직접 실행(로드)하려면 다음 명령어를 사용합니다:

```powershell
. $PROFILE.CurrentUserAllHosts
```

이 명령어는 프로필 파일을 현재 PowerShell 세션에 로드합니다.

# v2 powershell 에서 cmd 명령어 사용용

CMD에서 자주 사용하는 명령어들을 PowerShell 프로필에 별칭으로 설정하는 방법을 알려드리겠습니다. 아래 코드를 PowerShell 프로필에 추가하면 됩니다:

```powershell
# CMD 명령어 PowerShell 별칭 설정

# 파일 시스템 명령어
Set-Alias -Name dir -Value Get-ChildItem
Set-Alias -Name cls -Value Clear-Host
Set-Alias -Name copy -Value Copy-Item
Set-Alias -Name move -Value Move-Item
Set-Alias -Name del -Value Remove-Item
Set-Alias -Name type -Value Get-Content
Set-Alias -Name md -Value New-Item
Set-Alias -Name rd -Value Remove-Item
Set-Alias -Name cd -Value Set-Location

# 네트워크 명령어
Set-Alias -Name ipconfig -Value Get-NetIPConfiguration
Set-Alias -Name ping -Value Test-Connection
Set-Alias -Name netstat -Value Get-NetTCPConnection
Set-Alias -Name nslookup -Value Resolve-DnsName

# 프로세스 관련 명령어
Set-Alias -Name tasklist -Value Get-Process
Set-Alias -Name taskkill -Value Stop-Process

# 기타 유용한 CMD 명령어 별칭
Set-Alias -Name find -Value Select-String
Set-Alias -Name sort -Value Sort-Object
Set-Alias -Name fc -Value Compare-Object
Set-Alias -Name where -Value Where-Object

# 직접 구현이 필요한 명령어 함수
function tracert { 
    cmd /c tracert $args 
}

function ipconfig-all {
    Get-NetIPConfiguration -Detailed
}

function systeminfo {
    Get-ComputerInfo
}

function findstr {
    param([string]$pattern, [string]$file)
    Get-Content $file | Select-String $pattern
}

function hostname {
    $env:COMPUTERNAME
}

function whoami {
    [Security.Principal.WindowsIdentity]::GetCurrent().Name
}

# 추가 유틸리티 함수
function which {
    param([string]$command)
    Get-Command $command | Select-Object -ExpandProperty Source
}

# 명령어 프롬프트 기능을 위한 함수
function prompt {
    # 기본 PowerShell 프롬프트를 CMD 스타일로 변경
    $path = Get-Location
    "$path> "
}
```

이 코드를 PowerShell 프로필에 추가하는 방법:

1. PowerShell을 관리자 권한으로 실행
2. 다음 명령어로 프로필 파일 열기:
   ```powershell
   notepad $PROFILE
   ```
3. 위 코드를 파일에 붙여넣기
4. 저장 후 종료
5. PowerShell 세션을 다시 시작하거나 다음 명령어로 프로필 다시 로드:
   ```powershell
   . $PROFILE
   ```

이제 PowerShell에서 CMD 명령어를 별칭으로 사용할 수 있습니다. 예를 들어 `dir`, `cls`, `ipconfig` 등의 명령어가 PowerShell에서 작동할 것입니다.

추가 명령어가 필요하면 같은 형식으로 `Set-Alias` 또는 함수를 더 정의하여 확장할 수 있습니다.

# v2.1 수정

제공해주신 오류 메시지를 분석해보니 PowerShell에서 이미 존재하는 별칭들과 충돌이 발생했습니다. 이를 문제가 되는 것과 문제가 되지 않는 것으로 구분하겠습니다.

## 문제가 되는 별칭 (이미 존재하는 별칭)

### AllScope 옵션이 있어 제거할 수 없는 별칭
1. `dir` (Get-ChildItem)
2. `cls` (Clear-Host)
3. `copy` (Copy-Item)
4. `move` (Move-Item)
5. `del` (Remove-Item)
6. `type` (Get-Content)
7. `md` (New-Item)
8. `rd` (Remove-Item)
9. `cd` (Set-Location)

### 읽기 전용이거나 상수로 설정된 별칭
1. `sort` (Sort-Object)
2. `fc` (Compare-Object)
3. `where` (Where-Object)

## 문제가 되지 않는 별칭 (설정 가능한 별칭)

다음 별칭들은 오류 메시지가 없었으므로 문제없이 설정 가능합니다:

1. `ipconfig` (Get-NetIPConfiguration)
2. `ping` (Test-Connection)
3. `netstat` (Get-NetTCPConnection)
4. `nslookup` (Resolve-DnsName)
5. `tasklist` (Get-Process)
6. `taskkill` (Stop-Process)
7. `find` (Select-String)

따라서 프로필 파일에서는 문제가 되는 별칭 설정은 제거하고, 문제가 되지 않는 별칭만 설정하거나 함수 형태로 구현하는 것이 좋습니다.


# v3 mv Move-Item

PowerShell에서 Unix/Linux의 `mv` 명령어에 해당하는 것은 `Move-Item` cmdlet입니다. 이 명령어는 파일이나 디렉토리를 한 위치에서 다른 위치로 이동할 때 사용합니다.

기본 사용법:
```powershell
Move-Item -Path "소스경로" -Destination "목적지경로"
```

예시:
```powershell
# 파일 이동
Move-Item -Path "C:\temp\document.txt" -Destination "C:\Documents\"

# 디렉토리 이동
Move-Item -Path "C:\OldFolder" -Destination "C:\NewLocation\"

# 파일 이름 변경 (같은 디렉토리 내에서 이동)
Move-Item -Path "C:\temp\old.txt" -Destination "C:\temp\new.txt"
```

PowerShell은 이미 `move`라는 `Move-Item`에 대한 내장 별칭을 제공합니다. 그러나 `mv`는 기본적으로 별칭이 설정되어 있지 않습니다. 

`mv` 별칭을 만들고 싶다면 PowerShell 프로필에 다음 코드를 추가할 수 있습니다:
```powershell
Set-Alias -Name mv -Value Move-Item
```

이렇게 하면 `mv` 명령어를 Unix/Linux처럼 사용할 수 있습니다.


# v4 ls 

PowerShell에서 `ls` 명령어(Get-ChildItem의 별칭)를 더 이쁘게 표시하는 방법은 여러 가지가 있습니다:

## 1. Format-Table 사용하기

```powershell
ls | Format-Table Name, Length, LastWriteTime -AutoSize
```

## 2. 컬러 지정 및 그룹화

```powershell
ls | Sort-Object Extension | Format-Wide -Column 4 -Property Name
```

## 3. PowerShell 함수로 커스텀 ls 만들기

PowerShell 프로필에 다음 함수를 추가하면 컬러풀한 ls를 사용할 수 있습니다:

```powershell
function Show-ColorLS {
    param (
        [string]$Path = "."
    )
    
    $items = Get-ChildItem -Path $Path
    
    foreach ($item in $items) {
        if ($item.PSIsContainer) {
            # 디렉토리는 파란색으로 표시
            Write-Host $item.Name -ForegroundColor Blue -NoNewline
            Write-Host "\" -ForegroundColor Blue
        } else {
            # 파일 확장자에 따라 다른 색상 적용
            switch -Regex ($item.Extension) {
                '\.exe$|\.bat$|\.cmd$|\.ps1$' { 
                    # 실행 파일은 녹색
                    Write-Host $item.Name -ForegroundColor Green 
                }
                '\.txt$|\.log$|\.md$' { 
                    # 텍스트 파일은 노란색
                    Write-Host $item.Name -ForegroundColor Yellow 
                }
                '\.jpg$|\.png$|\.gif$|\.bmp$' { 
                    # 이미지 파일은 마젠타
                    Write-Host $item.Name -ForegroundColor Magenta 
                }
                default { 
                    # 기타 파일은 흰색
                    Write-Host $item.Name -ForegroundColor White 
                }
            }
        }
    }
}

Set-Alias -Name cls -Value Show-ColorLS
```

## 4. 외부 모듈 사용하기

PowerShell 갤러리에서 `Terminal-Icons` 모듈을 설치하고 사용할 수 있습니다:

```powershell
Install-Module -Name Terminal-Icons -Repository PSGallery
Import-Module -Name Terminal-Icons

# 프로필에 추가하면 자동으로 적용됨
ls
```

## 5. 간단한 별칭 설정

```powershell
# 가장 유용한 정보만 보여주는 ls 별칭
function Get-NiceDir {
    Get-ChildItem | Select-Object Mode, LastWriteTime, 
    @{Name="Size(KB)"; Expression={"{0:N2}" -f ($_.Length / 1KB)}}, Name
}

Set-Alias -Name ll -Value Get-NiceDir
```

PowerShell 7 이상에서는 `Get-ChildItem`의 결과가 기본적으로 더 보기 좋게 표시됩니다. PowerShell 7을 사용하고 있다면 `ls`를 그냥 사용해도 꽤 괜찮은 결과를 얻을 수 있습니다.