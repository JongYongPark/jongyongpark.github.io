# 걸린 시간 측정

Windows CMD 명령어를 실행할 때 걸리는 시간을 측정하는 방법은 몇 가지가 있습니다. PowerShell에서는 더 강력한 방법을 제공합니다:

## PowerShell에서 명령어 실행 시간 측정하기

### 1. Measure-Command 사용하기
PowerShell의 `Measure-Command` cmdlet을 사용하면 명령어 실행 시간을 정확하게 측정할 수 있습니다:

```powershell
Measure-Command { Get-ChildItem }
```

이 명령어는 `Get-ChildItem`(ls와 동일) 실행에 걸린 시간을 상세히 보여줍니다.

### 2. 시작/종료 시간 기록하기
`Stopwatch` 객체를 사용하여 시간을 측정할 수도 있습니다:

```powershell
$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
Get-ChildItem
$stopwatch.Stop()
$stopwatch.Elapsed
```

### 3. CMD 명령어 실행 시간 측정하기
CMD 명령어의 실행 시간을 측정하려면:

```powershell
Measure-Command { cmd /c dir }
```

### 4. 프로필에 유틸리티 함수 만들기
PowerShell 프로필에 다음과 같은 함수를 추가하면 편리합니다:

```powershell
function Time-Command {
    param(
        [Parameter(Mandatory=$true, Position=0)]
        [scriptblock]$Command
    )
    
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    & $Command
    $stopwatch.Stop()
    Write-Host "명령어 실행 시간: $($stopwatch.Elapsed.TotalSeconds) 초" -ForegroundColor Yellow
}
```

사용 예:
```powershell
Time-Command { Get-ChildItem }
Time-Command { cmd /c dir }
```

## CMD에서 명령어 실행 시간 측정하기

CMD 자체에서 시간을 측정하려면:

```cmd
@echo off
set start=%time%

:: 명령어 실행
dir

set end=%time%
set options="tokens=1-4 delims=:.,"
for /f %options% %%a in ("%start%") do set start_h=%%a&set /a start_m=100%%b %% 100&set /a start_s=100%%c %% 100&set /a start_ms=100%%d %% 100
for /f %options% %%a in ("%end%") do set end_h=%%a&set /a end_m=100%%b %% 100&set /a end_s=100%%c %% 100&set /a end_ms=100%%d %% 100

set /a hours=%end_h%-%start_h%
set /a mins=%end_m%-%start_m%
set /a secs=%end_s%-%start_s%
set /a ms=%end_ms%-%start_ms%
if %ms% lss 0 set /a secs = %secs% - 1 & set /a ms = 100%ms%
if %secs% lss 0 set /a mins = %mins% - 1 & set /a secs = 60%secs%
if %mins% lss 0 set /a hours = %hours% - 1 & set /a mins = 60%mins%
if %hours% lss 0 set /a hours = 24%hours%

echo 실행 시간: %hours%:%mins%:%secs%.%ms%
```

PowerShell이 제공하는 시간 측정 기능이 더 간단하고 정확하므로, 가능하면 PowerShell의 `Measure-Command`를 사용하는 것이 좋습니다.