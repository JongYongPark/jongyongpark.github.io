# 내 작업 

# v1

Visual Studio에서 clang-cl.exe 컴파일러를 사용한 샘플 코드를 작성해 드리겠습니다. 제공해주신 로그를 살펴보니 nlohmann::json 라이브러리를 사용하는 C++ 코드에서 컴파일 오류가 발생했습니다. 특히 C++20 개념(concepts)과 관련된 오류가 보입니다.

Visual Studio에서 clang-cl.exe 컴파일러를 사용하는 샘플 프로젝트를 만들었습니다. 제공해주신 로그를 분석한 결과, nlohmann::json 라이브러리와 C++20 기능을 사용할 때 발생하는 문제를 해결하는 코드를 작성했습니다.

## 주요 구성 요소

1. **샘플 코드 (main.cpp)**
   - API 스펙을 정의하고 관리하는 클래스
   - nlohmann::json을 사용한 JSON 직렬화/역직렬화 기능
   - 컴파일러 오류를 피하기 위한 적절한 C++ 문법 사용

2. **Visual Studio Clang-cl 설정 방법**
   - Clang-cl 컴파일러를 사용하기 위한 Visual Studio 설정 가이드
   - `--target=amd64-pc-windows-msvc` 및 `-mno-avx` 옵션 설정 방법
   - nlohmann/json 라이브러리 통합 방법

3. **Visual Studio 속성 시트 (props 파일)**
   - Clang-cl 컴파일러 사용을 위한 사전 설정 제공
   - C++20 표준 활성화
   - 필요한 컴파일러 옵션 설정

4. **CMake 구성 파일**
   - CMake를 사용하는 프로젝트에서 Clang-cl 설정하는 방법
   - 필요한 컴파일러 플래그 설정

## 로그에서 발견된 문제 해결

로그에서 발견된 주요 오류는 C++20의 개념(concepts) 기능과 관련된 것이었습니다. 이를 해결하기 위해:

1. `typename` 키워드 사용 문제: 템플릿 종속 타입 앞에 `typename` 키워드를 사용했습니다.
2. "atomic constraint depends on itself" 오류: 순환 참조 없이 코드를 작성했습니다.
3. 컴파일러 호환성 이슈: 최신 Clang 컴파일러를 사용하도록 설정했습니다.

## 사용 방법

1. Visual Studio에서 새 C++ 프로젝트를 생성합니다.
2. 제공된 가이드에 따라 Clang-cl 컴파일러를 설정합니다.
3. 샘플 코드를 복사하여 main.cpp에 붙여넣습니다.
4. nlohmann/json 라이브러리를 설치합니다 (vcpkg 사용 권장).
5. 프로젝트를 빌드하고 실행합니다.

작성된 샘플 코드는 API 스펙을 관리하는 기능을 제공하며, Visual Studio에서 Clang-cl 컴파일러를 사용할 때 발생할 수 있는 문제를 피할 수 있도록 설계되었습니다.


# v1.1

안타깝게도 실제 파일을 압축하여 직접 제공해드릴 수는 없습니다. 하지만 Visual Studio에서 프로젝트를 쉽게 설정할 수 있도록 단계별 가이드를 제공해 드리겠습니다.

## Visual Studio에서 Clang-cl 프로젝트 생성 단계

1. **새 프로젝트 생성**:
   - Visual Studio 실행
   - "파일 > 새로 만들기 > 프로젝트" 선택
   - "콘솔 앱" 선택 (C++)
   - 프로젝트 이름 지정 (예: "ApiSpecSample")

2. **Clang-cl 컴파일러 설정**:
   - 솔루션 탐색기에서 프로젝트 우클릭 > "속성" 선택
   - "구성 속성 > 일반 > 플랫폼 도구 집합" > "LLVM (clang-cl)" 선택
   - "C/C++ > 명령줄"에 다음 추가:
     ```
     --target=amd64-pc-windows-msvc -mno-avx
     ```
   - "C/C++ > 언어" > "C++ 언어 표준" > "C++20" 선택

3. **nlohmann/json 라이브러리 설치** (vcpkg 사용):
   ```
   vcpkg install nlohmann-json:x64-windows
   vcpkg integrate install
   ```

4. **소스 코드 파일 교체**:
   - 제공된 `main.cpp` 코드를 복사하여 프로젝트의 main.cpp에 붙여넣기

5. **프로젝트 빌드 및 실행**:
   - F7 키 (빌드)
   - F5 키 (실행)

## 파일 구조
프로젝트는 다음과 같은 구조로 구성됩니다:

```
ApiSpecSample/
├── ApiSpecSample.vcxproj      (VS 프로젝트 파일)
├── ApiSpecSample.vcxproj.filters
├── ClangCl.props             (선택적 속성 시트)
├── main.cpp                  (샘플 소스 코드)
└── CMakeLists.txt           (CMake 사용 시)
```

만약 프로젝트 설정이나 코드에 대해 추가 질문이 있으시면 말씀해 주세요. Visual Studio에서 구현하는 동안 겪는 어려움이 있다면 도움을 드리겠습니다.


# v1.2

vcpkg를 사용하기 위해서는 먼저 vcpkg를 설치하고 설정해야 합니다. 다음은 vcpkg를 설치하고 nlohmann-json 라이브러리를 설치하는 단계입니다:

### vcpkg 설치 및 nlohmann-json 라이브러리 설치하기

1. **vcpkg 다운로드 및 설치**:
   ```
   git clone https://github.com/Microsoft/vcpkg.git
   cd vcpkg
   .\bootstrap-vcpkg.bat
   ```

2. **nlohmann-json 라이브러리 설치**:
   ```
   .\vcpkg install nlohmann-json:x64-windows
   ```

3. **Visual Studio와 통합**:
   ```
   .\vcpkg integrate install
   ```

### Visual Studio 프로젝트에 직접 nlohmann/json 설치하기 (vcpkg 없이)

vcpkg를 사용하지 않으려면 다음 방법으로 nlohmann/json을 직접 추가할 수 있습니다:

1. **GitHub에서 다운로드**:
   - https://github.com/nlohmann/json 방문
   - "Code" 버튼 클릭 > "Download ZIP" 선택
   - ZIP 파일 압축 해제

2. **헤더 파일만 프로젝트에 추가**:
   - 압축 해제된 폴더에서 `include/nlohmann/json.hpp` 파일 찾기
   - 이 파일을 프로젝트 폴더에 복사 (예: 'include/nlohmann/json.hpp')

3. **Visual Studio 프로젝트 설정**:
   - 프로젝트 속성 > C/C++ > 일반 > 추가 포함 디렉터리에 `include` 경로 추가
   - 소스 코드에서 `#include <nlohmann/json.hpp>` 사용

### 간단한 대안: 단일 헤더 파일 사용

가장 간단한 방법은 단일 헤더 파일 버전을 사용하는 것입니다:

1. https://github.com/nlohmann/json/releases 페이지 방문
2. 최신 릴리스에서 `json.hpp` 다운로드
3. 이 파일을 프로젝트에 추가
4. 소스 코드에서 `#include "json.hpp"` 사용하여 포함

이 방법이 가장 간단하며 외부 도구나 복잡한 설정이 필요하지 않습니다.


# v1.3 : 사사용자에게 더 많은 결과를 보여주는 코드

물론입니다! 사용자에게 더 많은 결과를 보여주는 코드를 추가하겠습니다. API 스펙을 콘솔에 시각적으로 표시하고 간단한 사용자 인터랙션도 넣어보겠습니다.

main.cpp 파일을 업데이트했습니다. 이제 사용자에게 더 풍부한 시각적 결과를 보여주는 코드가 추가되었습니다. 주요 변경사항은 다음과 같습니다:

1. **콘솔 색상 및 서식 기능**:
   - 색상 코드를 사용하여 출력을 더 시각적으로 구분
   - 헤더, 서브헤더, 성공/오류 메시지 등 다양한 출력 스타일 적용

2. **추가 엔드포인트 및 상세 표시**:
   - 새로운 파일 업로드 엔드포인트 추가
   - 엔드포인트 상세 정보를 시각적으로 보기 좋게 표시

3. **사용자 상호작용 시뮬레이션**:
   - 다양한 엔드포인트 검색 시뮬레이션
   - 찾은 엔드포인트와 찾지 못한 엔드포인트의 처리 차이 표시

4. **실용적인 샘플 출력**:
   - 각 API 엔드포인트에 대한 curl 커맨드 생성
   - 테스트 URL 및 필요한 헤더 정보 표시

5. **Windows 호환성 개선**:
   - Windows에서 유니코드 문자가 제대로 표시되도록 콘솔 인코딩 설정
   - `windows.h` 헤더 포함

이 코드를 실행하면 콘솔에서 색상과 서식이 적용된 출력을 볼 수 있으며, API 스펙의 생성, 직렬화, 역직렬화, 조회 과정을 시각적으로 확인할 수 있습니다. 마지막에는 사용자 입력을 기다려 프로그램이 즉시 종료되지 않도록 했습니다.

Visual Studio에서 이 코드를 실행하면 더 풍부한 콘솔 출력을 확인하실 수 있습니다.


# v1.4 : PWsh.exe(PowerShell Core의 실행 파일) 오류 메시지

PWsh.exe(PowerShell Core의 실행 파일) 오류 메시지가 나타나는 것은 Visual Studio의 빌드 후 이벤트 또는 사용자 지정 빌드 단계에서 PowerShell Core를 실행하려고 시도하는 것 같습니다.

이 오류는 빌드에 영향을 주지 않는 것으로 보입니다(빌드는 성공했다고 표시됨). 다음과 같은 원인이 있을 수 있습니다:

1. **프로젝트 설정의 빌드 후 이벤트**: 프로젝트에 PowerShell 스크립트를 실행하는 빌드 후 이벤트가 설정되어 있을 수 있습니다.

2. **Visual Studio 확장 또는 도구**: 설치된 확장 프로그램이 빌드 완료 후 pwsh.exe를 호출하려고 시도할 수 있습니다.

3. **빌드 사용자 지정 단계**: 프로젝트에 PowerShell Core를 사용하는 사용자 지정 빌드 단계가 있을 수 있습니다.

이 문제를 해결하려면:

1. **프로젝트 속성 확인하기**:
   - 프로젝트를 마우스 오른쪽 버튼으로 클릭하고 "속성" 선택
   - "빌드 이벤트" 탭에서 "빌드 후 이벤트 명령줄"에 pwsh.exe 관련 명령이 있는지 확인
   - 있다면 제거하거나 주석 처리(:: 사용)

2. **솔루션 탐색기에서 .vcxproj 파일 내용 확인**:
   - 메모장 등으로 .vcxproj 파일을 열어 pwsh.exe 관련 항목이 있는지 확인
   - `<PostBuildEvent>` 태그에서 pwsh.exe 호출이 있는지 확인

이 오류는 프로그램 실행에는 영향을 주지 않으므로, 당장 급하지 않다면 무시해도 됩니다. 빌드는 성공적으로 완료되었고 실행 파일이 생성되었기 때문입니다.


# v1.5
Visual Studio 프로젝트를 MSBuild와 CMake로 각각 빌드하고 실행하는 방법을 알려드리겠습니다.

## MSBuild로 빌드하고 실행하기

### 명령 프롬프트(CMD)에서 빌드:

1. **개발자 명령 프롬프트 열기**:
   - 시작 메뉴에서 "Developer Command Prompt for VS" 또는 "x64 Native Tools Command Prompt for VS" 실행

2. **프로젝트 디렉토리로 이동**:
   ```cmd
   cd C:\path\to\ApiSpecSample
   ```

3. **MSBuild로 빌드**:
   ```cmd
   msbuild ApiSpecSample.vcxproj /p:Configuration=Debug /p:Platform=x64
   ```

4. **결과물 실행**:
   ```cmd
   x64\Debug\ApiSpecSample.exe
   ```

### 릴리스 빌드:
```cmd
msbuild ApiSpecSample.vcxproj /p:Configuration=Release /p:Platform=x64
x64\Release\ApiSpecSample.exe
```

## CMake로 빌드하고 실행하기

### 명령 프롬프트에서:

1. **빌드 디렉토리 생성 및 이동**:
   ```cmd
   mkdir build
   cd build
   ```

2. **CMake 설정**:
   ```cmd
   cmake -G "Visual Studio 17 2022" -A x64 -T ClangCL ..
   ```
   (Visual Studio 버전에 따라 "Visual Studio 16 2019", "Visual Studio 17 2022" 등으로 조정)

3. **빌드 실행**:
   ```cmd
   cmake --build . --config Debug
   ```

4. **결과물 실행**:
   ```cmd
   Debug\ApiSpecSample.exe
   ```

### 릴리스 빌드:
```cmd
cmake --build . --config Release
Release\ApiSpecSample.exe
```

### PowerShell에서 CMake 빌드 및 실행 (한 번에):
```powershell
mkdir -Force build; cd build; cmake -G "Visual Studio 17 2022" -A x64 -T ClangCL ..; cmake --build . --config Debug; .\Debug\ApiSpecSample.exe
```

## 추가 팁

### Clang-cl 컴파일러 지정 (MSBuild):
```cmd
msbuild ApiSpecSample.vcxproj /p:Configuration=Debug /p:Platform=x64 /p:PlatformToolset=LLVM
```

### 병렬 빌드 (속도 향상):
```cmd
msbuild ApiSpecSample.vcxproj /p:Configuration=Debug /p:Platform=x64 /m
cmake --build . --config Debug --parallel
```

### Visual Studio 없이 CMake 빌드 (Ninja 사용):
```cmd
mkdir build-ninja
cd build-ninja
cmake -G Ninja -DCMAKE_C_COMPILER=clang-cl -DCMAKE_CXX_COMPILER=clang-cl -DCMAKE_BUILD_TYPE=Debug ..
cmake --build .
.\ApiSpecSample.exe
```

두 방식 모두 Clang-cl 컴파일러를 사용하여 API 스펙 샘플 프로젝트를 빌드할 수 있습니다.


# v1.6 : CMake에서 항상 클린 빌드를 수행

CMake에서 항상 클린 빌드를 수행하도록 명령을 수정해드리겠습니다:

```cmd
cmake --build . --target clean && cmake --build . --config Debug
```

위 명령은 먼저 `clean` 타겟을 빌드하여 이전 빌드 결과물을 모두 제거한 후, Debug 구성으로 새롭게 빌드합니다.

PowerShell에서는 다음과 같이 사용할 수 있습니다:

```powershell
cmake --build . --target clean; cmake --build . --config Debug
```

Ninja 빌드 시스템을 사용하는 경우:

```cmd
cmake --build . --clean-first --config Debug
```

또는 더 확실하게 클린 빌드를 위해 빌드 디렉토리를 삭제하고 다시 만드는 방법:

```cmd
rmdir /s /q build
mkdir build
cd build
cmake -G "Visual Studio 17 2022" -A x64 -T ClangCL ..
cmake --build . --config Debug
```

PowerShell에서는:

```powershell
Remove-Item -Recurse -Force -Path build -ErrorAction SilentlyContinue
mkdir -Force build
cd build
cmake -G "Visual Studio 17 2022" -A x64 -T ClangCL ..
cmake --build . --config Debug
```

이 방법을 사용하면 항상 완전히 새로운 빌드가 보장됩니다.


# v1.7 : PWsh.exe 오류
PWsh.exe 오류는 Visual Studio 또는 MSBuild가 빌드 후 이벤트에서 PowerShell Core(pwsh.exe)를 실행하려고 시도하고 있지만, 시스템에 설치되어 있지 않거나 PATH에 없어서 발생하는 문제입니다.

이 문제를 해결하는 방법은 다음과 같습니다:

1. **빌드 후 이벤트 확인 및 수정**:

   CMakeLists.txt 파일을 열고 다음과 같은 부분이 있는지 확인하세요:
   ```cmake
   add_custom_command(TARGET ApiSpecSample POST_BUILD
       COMMAND pwsh.exe ...
       ...
   )
   ```

   이런 부분이 있다면 pwsh.exe를 powershell.exe로 변경하거나 해당 줄을 제거/주석 처리하세요.

2. **Visual Studio 프로젝트 파일 수정**:

   build 디렉토리에 있는 ApiSpecSample.vcxproj 파일을 텍스트 편집기로 열고 다음과 같은 부분을 찾으세요:
   ```xml
   <PostBuildEvent>
     <Command>pwsh.exe ...</Command>
   </PostBuildEvent>
   ```

   이 부분을 찾아 삭제하거나 다음과 같이 변경하세요:
   ```xml
   <PostBuildEvent>
     <Command>rem 주석 처리된 명령</Command>
   </PostBuildEvent>
   ```

3. **CMake 캐시 초기화**:

   완전히 새로 빌드하려면 빌드 디렉토리를 삭제하고 다시 생성하세요:
   ```cmd
   cd C:\workspace\jonpark-work\ApiSpecSample
   rmdir /s /q build
   mkdir build
   cd build
   cmake -G "Visual Studio 17 2022" -A x64 -T ClangCL ..
   cmake --build . --config Debug
   ```

이렇게 하면 pwsh.exe를 찾을 수 없다는 오류 메시지가 더 이상 표시되지 않을 것입니다. 그래도 오류가 계속 발생한다면, Visual Studio에서 프로젝트 속성을 열고 빌드 이벤트 탭을 확인하여 pwsh.exe를 참조하는 모든 명령을 제거하거나 수정하세요.


# v1.8 : pwsh.exe 오류

로그를 확인해보니 pwsh.exe 오류의 정확한 원인이 파악되었습니다. 이 오류는 빌드 과정 자체에서 발생하는 것이 아니라, vcpkg의 AppLocalFromInstalled 단계에서 발생하고 있습니다.

vcpkg는 빌드된 실행 파일이 필요한 DLL을 자동으로 복사하기 위해 PowerShell Core(pwsh.exe)를 사용하려고 시도하고 있습니다. 하지만 pwsh.exe가 없어서 실패한 후, 자동으로 대체 방안으로 일반 PowerShell(powershell.exe)을 사용하여 성공적으로 완료하고 있습니다.

로그에서 확인된 사항:
1. vcpkg가 `applocal.ps1` 스크립트를 pwsh.exe로 실행하려고 시도합니다.
2. pwsh.exe를 찾지 못해 오류가 발생합니다. (오류 코드: 9009)
3. 시스템이 자동으로 일반 PowerShell(`C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`)로 대체하여 실행합니다.
4. 최종 빌드는 성공적으로 완료됩니다. (0 경고, 0 오류)

따라서 이 메시지는 오류처럼 보이지만 실제로는 빌드 과정에 영향을 주지 않는 경고 메시지입니다. vcpkg가 PowerShell Core를 첫 번째로 시도하고, 없을 경우 자동으로 일반 PowerShell로 대체하는 폴백 메커니즘을 사용하고 있기 때문입니다.

이 메시지를 완전히 제거하려면 다음 옵션이 있습니다:

1. PowerShell Core(pwsh.exe) 설치하기:
   ```
   winget install Microsoft.PowerShell
   ```
   또는
   ```
   choco install powershell-core
   ```

2. vcpkg 구성 파일 수정하기:
   vcpkg 디렉토리의 scripts/buildsystems/msbuild/applocal.targets 파일을 편집하여 pwsh.exe 대신 powershell.exe를 직접 사용하도록 설정

하지만 빌드 자체는 성공적으로 완료되고 있으므로, 단순히 출력 메시지만 신경 쓰인다면 무시해도 됩니다. 이 메시지는 빌드나 결과물의 품질에 영향을 주지 않습니다.


# v1.9 : PowerShell을 유지하면서 이 오류 메시지를 제거하는 방법

네, 이미 사용 중인 PowerShell을 유지하면서 이 오류 메시지를 제거하는 방법이 있습니다. vcpkg가 PWsh.exe를 찾는 대신 바로 일반 PowerShell을 사용하도록 설정할 수 있습니다.

다음과 같은 방법으로 설정할 수 있습니다:

### 방법 1: vcpkg 환경 변수 설정

PowerShell 세션에서 다음 환경 변수를 설정하세요:

```powershell
$env:VCPKG_FORCE_SYSTEM_BINARIES = "1"
```

이 변수는 vcpkg가 시스템 바이너리(powershell.exe)를 사용하도록 강제합니다. 매번 설정하지 않으려면 PowerShell 프로필에 추가하거나 시스템 환경 변수로 설정할 수 있습니다.

### 방법 2: vcpkg 설정 파일 수정

vcpkg 디렉토리에 있는 `scripts/buildsystems/msbuild/applocal.targets` 파일을 찾아 수정합니다:

1. 텍스트 편집기로 파일을 엽니다.
2. 다음과 같은 줄을 찾습니다:
   ```xml
   <Exec Command="pwsh.exe -ExecutionPolicy Bypass -noprofile -File ..." ... />
   ```
3. 해당 줄을 다음과 같이 변경합니다:
   ```xml
   <Exec Command="powershell.exe -ExecutionPolicy Bypass -noprofile -File ..." ... />
   ```

### 방법 3: 프로젝트 수준에서 설정

프로젝트 파일(.vcxproj)을 수정하여 vcpkg 자동 통합 기능을 비활성화하거나 수정할 수 있습니다:

```xml
<PropertyGroup>
  <VcpkgEnabled>true</VcpkgEnabled>
  <VcpkgUsePowerShellCore>false</VcpkgUsePowerShellCore>
</PropertyGroup>
```

이 설정을 추가하면 vcpkg가 PowerShell Core 대신 일반 PowerShell을 사용하게 됩니다.

### 방법 4: PowerShell 별칭 설정

PowerShell에서 pwsh.exe에 대한 별칭을 설정하는 방법도 있습니다:

```powershell
Set-Alias -Name pwsh -Value powershell
```

이 명령을 PowerShell 프로필에 추가하면 pwsh 명령이 일반 PowerShell을 실행하게 됩니다.

가장 간단한 방법은 방법 1의 환경 변수를 설정하는 것입니다. 이렇게 하면 vcpkg의 소스 코드를 수정하지 않고도 원하는 동작을 얻을 수 있습니다.


# v1.10 : vcpkg 디렉토리의 applocal.targets 파일을 수정하는 방법

vcpkg 디렉토리의 applocal.targets 파일을 수정하는 방법을 자세히 알려드리겠습니다:

### 단계별 applocal.targets 파일 수정 방법

1. **파일 위치 찾기**:
   로그에서 보이는 경로를 바탕으로, 다음 위치에 파일이 있을 것입니다:
   ```
   C:\workspace\jonpark-work\vcpkg\scripts\buildsystems\msbuild\applocal.targets
   ```

2. **파일 백업하기** (선택 사항이지만 권장):
   ```powershell
   Copy-Item "C:\workspace\jonpark-work\vcpkg\scripts\buildsystems\msbuild\applocal.targets" "C:\workspace\jonpark-work\vcpkg\scripts\buildsystems\msbuild\applocal.targets.backup"
   ```

3. **파일 편집하기**:
   텍스트 편집기(메모장, VS Code 등)로 파일을 엽니다:
   ```powershell
   # 메모장 사용
   notepad "C:\workspace\jonpark-work\vcpkg\scripts\buildsystems\msbuild\applocal.targets"
   
   # 또는 VS Code 사용
   code "C:\workspace\jonpark-work\vcpkg\scripts\buildsystems\msbuild\applocal.targets"
   ```

4. **수정할 부분 찾기**:
   파일 내에서 `pwsh.exe`를 검색합니다. 다음과 같은 XML 코드 블록을 찾게 될 것입니다:
   ```xml
   <Target Name="AppLocalFromInstalled" AfterTargets="LinkSkippedExecution" BeforeTargets="CopyFilesToOutputDirectory">
     <Exec 
       Command="pwsh.exe -ExecutionPolicy Bypass -noprofile -File &quot;$(MSBuildThisFileDirectory)applocal.ps1&quot; &quot;$(TargetPath)&quot; &quot;$(VcpkgInstalledDir)$(VcpkgTriplet)\bin&quot; &quot;$(TLogLocation)$(ProjectName).write.1u.tlog&quot; &quot;$(IntDir)vcpkg.applocal.log&quot;"
       StandardOutputImportance="Normal"
       StandardErrorImportance="Normal"
       ContinueOnError="true"
     />
     <!-- ... 다른 코드가 있을 수 있음 ... -->
   </Target>
   ```

5. **코드 수정하기**:
   `pwsh.exe`를 `powershell.exe`로 변경합니다:
   ```xml
   <Target Name="AppLocalFromInstalled" AfterTargets="LinkSkippedExecution" BeforeTargets="CopyFilesToOutputDirectory">
     <Exec 
       Command="powershell.exe -ExecutionPolicy Bypass -noprofile -File &quot;$(MSBuildThisFileDirectory)applocal.ps1&quot; &quot;$(TargetPath)&quot; &quot;$(VcpkgInstalledDir)$(VcpkgTriplet)\bin&quot; &quot;$(TLogLocation)$(ProjectName).write.1u.tlog&quot; &quot;$(IntDir)vcpkg.applocal.log&quot;"
       StandardOutputImportance="Normal"
       StandardErrorImportance="Normal"
       ContinueOnError="true"
     />
     <!-- ... 다른 코드는 그대로 유지 ... -->
   </Target>
   ```

6. **파일 저장하기**:
   변경 사항을 저장합니다.

7. **빌드 테스트하기**:
   수정 후 프로젝트를 다시 빌드하여 pwsh.exe 오류가 더 이상 나타나지 않는지 확인합니다:
   ```powershell
   msbuild ApiSpecSample.vcxproj /p:Configuration=Release /p:Platform=x64 /t:Rebuild
   ```

### 주의 사항

1. vcpkg를 업데이트하면 이 파일이 다시 원래 상태로 돌아갈 수 있습니다. 이 경우 다시 수정해야 할 수 있습니다.

2. 다른 방법으로는 앞서 언급한 시스템 환경 변수를 설정하는 것이 있습니다:
   - 시스템 속성 > 고급 > 환경 변수 > 새로 만들기
   - 변수 이름: `VCPKG_FORCE_SYSTEM_BINARIES`
   - 변수 값: `1`

이렇게 수정하면 vcpkg가 빌드 후 단계에서 pwsh.exe를 찾으려고 시도하지 않고 직접 powershell.exe를 사용하게 되어 오류 메시지가 나타나지 않을 것입니다.


# v 1.11 : vcpkg.targets 

applocal.targets 파일이 없는 것 같습니다. 실제로 vcpkg의 최신 버전에서는 파일 구조가 변경되었을 수 있습니다. 이 경우, vcpkg.targets 파일이 applocal.targets의 기능을 포함하고 있을 가능성이 높습니다.

다음 단계에 따라 vcpkg.targets 파일을 수정하여 pwsh.exe 오류를 해결해 보겠습니다:

1. **vcpkg.targets 파일 열기**:
   ```powershell
   notepad "C:\workspace\jonpark-work\vcpkg\scripts\buildsystems\msbuild\vcpkg.targets"
   ```
   또는 VS Code 같은 에디터로 열어도 됩니다.

2. **파일 내용 확인**:
   파일 내용을 살펴보고 pwsh.exe를 참조하는 부분을 찾습니다. 다음과 같은 형태일 것입니다:
   ```xml
   <Exec Command="pwsh.exe -ExecutionPolicy Bypass -noprofile -File ..." ... />
   ```

3. **pwsh.exe를 powershell.exe로 변경**:
   모든 pwsh.exe 참조를 powershell.exe로 변경합니다. 여러 위치에 있을 수 있으니 찾아서 모두 변경하세요.

4. **변경 사항 저장 후 빌드 테스트**:
   파일을 저장하고 프로젝트를 다시 빌드하여 오류가 해결되었는지 확인합니다.

만약 위 방법으로도 해결되지 않는다면, 시스템 환경 변수를 설정하는 방법을 시도해 볼 수 있습니다:

1. **PowerShell에서 환경 변수 설정**:
   ```powershell
   $env:VCPKG_FORCE_SYSTEM_BINARIES = "1"
   ```

2. **영구 환경 변수로 설정**:
   - 시작 > 시스템 환경 변수 편집 > 환경 변수 > 새로 만들기
   - 변수 이름: `VCPKG_FORCE_SYSTEM_BINARIES`
   - 변수 값: `1`

이 환경 변수는 vcpkg가 시스템 바이너리(즉, pwsh.exe 대신 powershell.exe)를 사용하도록 강제합니다. 이 방법이 파일 수정보다 더 간단하고 vcpkg 업데이트에도 영향을 받지 않습니다.


# v1.12 : Visual Studio Clang-cl 프로젝트에서 PWsh.exe 오류 해결 방법


Visual Studio에서 vcpkg를 사용하는 Clang-cl 프로젝트를 빌드할 때 "pwsh.exe is not recognized" 오류가 발생하는 경우가 있습니다. 이 오류는 빌드에 영향을 주지 않지만, 깔끔한 빌드 출력을 원한다면 다음과 같이 해결할 수 있습니다.

## 원인

vcpkg는 빌드 후 단계에서 PowerShell Core(pwsh.exe)를 사용하여 필요한 DLL을 복사하려고 시도합니다. 그러나 PowerShell Core가 설치되어 있지 않으면 오류 메시지가 발생합니다.

## 해결 방법: vcpkg.targets 파일 수정

1. **vcpkg.targets 파일 찾기**:
   ```
   C:\path\to\vcpkg\scripts\buildsystems\msbuild\vcpkg.targets
   ```

2. **파일 편집하기**:
   - 텍스트 편집기로 vcpkg.targets 파일을 엽니다.
   - pwsh.exe를 참조하는 모든 부분을 찾습니다.

3. **pwsh.exe를 powershell.exe로 변경**:
   - 모든 `pwsh.exe` 문자열을 `powershell.exe`로 변경합니다.
   - 다음과 같은 형태를 찾아 변경합니다:
     ```xml
     <Exec Command="pwsh.exe -ExecutionPolicy Bypass -noprofile -File ..." ... />
     ```
     ↓ 변경 후
     ```xml
     <Exec Command="powershell.exe -ExecutionPolicy Bypass -noprofile -File ..." ... />
     ```

4. **파일 저장 및 빌드 테스트**:
   - 변경 사항을 저장합니다.
   - 프로젝트를 다시 빌드하여 오류 메시지가 사라졌는지 확인합니다:
     ```
     msbuild YourProject.vcxproj /p:Configuration=Release /p:Platform=x64
     ```

## 대체 해결 방법

파일 수정 외에도 환경 변수를 설정하여 해결할 수 있습니다:

```powershell
# PowerShell 세션용 (임시)
$env:VCPKG_FORCE_SYSTEM_BINARIES = "1"

# 또는 시스템 환경 변수로 설정 (영구적)
[Environment]::SetEnvironmentVariable("VCPKG_FORCE_SYSTEM_BINARIES", "1", "User")
```

이 환경 변수는 vcpkg가 PowerShell Core 대신 시스템에 설치된 PowerShell을 사용하도록 지시합니다.

## 참고 사항

- vcpkg를 업데이트하면 vcpkg.targets 파일이 초기화될 수 있으므로 환경 변수 방식이 더 견고한 해결책입니다.
- 이 오류는 빌드 결과물에 영향을 주지 않으므로 무시해도 됩니다.
- 대안으로 PowerShell Core를 설치하여 해결할 수도 있습니다: `winget install Microsoft.PowerShell`
  
# v2 - 내 작업

## native compile 명령어
msbuild ApiSpecSample.vcxproj /p:Configuration=Release /p:Platform=x64 /t:Rebuild

cd build
cmake --build . --target clean && cmake --build . --config Debug

Powershell 창 열기

cd C:\workspace\jonpark-work\ApiSpecSample

# coverity 명령어 

rm -r cdir idir

rm -r idir

cov-configure -c cdir/c.xml --compiler clang-cl --comptype clangclcc --template

cov-build -c cdir/c.xml --dir idir msbuild ApiSpecSample.vcxproj /p:Configuration=Release /p:Platform=x64 /t:Rebuild 

Get-Content -Path idir/build-log.txt -Tail 10

mv idir idir-clangclcc

mv cdir cdir-clangclcc


cov-configure -c cdir/c.xml --compiler clang-cl --comptype msvc --template

cov-build -c cdir/c.xml --dir idir msbuild ApiSpecSample.vcxproj /p:Configuration=Release /p:Platform=x64 /t:Rebuild 

Get-Content -Path idir/build-log.txt -Tail 10

