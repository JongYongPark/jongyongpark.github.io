---
title: "OpenCV compile on Windows"
date: 2025-02-20
categories: ["Developer"]
tags: ["OpenCV", "Windows", ]
---

# Claude

이 오류는 ARM64 플랫폼을 위한 CMake 구성 과정에서 발생한 문제입니다. 주요 오류는 프로젝트 설정이 제대로 되지 않았고, ARM64 플랫폼 구성이 올바르지 않다는 것입니다.

PowerShell 스크립트를 다음과 같이 수정하여 해결할 수 있습니다:



```powershell
# OpenCV Windows Build Script for x64 and ARM64
# Prerequisites: Visual Studio 2022, CMake, Git

# Configuration
$OPENCV_VERSION = "4.9.0"
$SOURCE_DIR = "C:\workspace\jonpark-work\opencv_source"
$BUILD_BASE_DIR = "C:\workspace\jonpark-work\opencv_build"
$INSTALL_BASE_DIR = "C:\workspace\jonpark-work\opencv_install"

# Common CMake parameters
$CMAKE_COMMON_PARAMS = @(
    "-DCMAKE_MINIMUM_REQUIRED_VERSION=3.10",  # 최소 CMake 버전 지정
    "-DBUILD_SHARED_LIBS=ON",
    "-DBUILD_TESTS=OFF",
    "-DBUILD_PERF_TESTS=OFF",
    "-DBUILD_EXAMPLES=OFF",
    "-DWITH_CUDA=OFF",
    "-DBUILD_opencv_world=ON",
    "-DBUILD_opencv_python2=OFF",
    "-DBUILD_opencv_python3=OFF",
    "-DWITH_IPP=ON",
    "-DENABLE_CXX11=ON",
    "-DOPENCV_ENABLE_NONFREE=ON",
    "-DBUILD_WITH_STATIC_CRT=OFF"
)

# Download OpenCV source
if (-not (Test-Path $SOURCE_DIR)) {
    git clone https://github.com/opencv/opencv.git $SOURCE_DIR
    Push-Location $SOURCE_DIR
    git checkout $OPENCV_VERSION
    Pop-Location
}

# Function to build OpenCV for specific architecture
function Build-OpenCV {
    param (
        [string]$arch,
        [string]$generator,
        [string]$platform
    )

    $BUILD_DIR = "$BUILD_BASE_DIR\$arch"
    $INSTALL_DIR = "$INSTALL_BASE_DIR\$arch"

    # Remove existing build directory to ensure clean build
    if (Test-Path $BUILD_DIR) {
        Remove-Item -Path $BUILD_DIR -Recurse -Force
    }

    # Create build directory
    New-Item -ItemType Directory -Force -Path $BUILD_DIR
    Push-Location $BUILD_DIR

    # Configure CMake with explicit project name and build type
    cmake -G $generator -A $platform `
        -DCMAKE_INSTALL_PREFIX="$INSTALL_DIR" `
        -DCMAKE_BUILD_TYPE=Release `
        -DOpenCV_ARCH=$platform `
        -DOpenCV_RUNTIME=vc17 `
        $CMAKE_COMMON_PARAMS `
        -S $SOURCE_DIR -B $BUILD_DIR

    if ($LASTEXITCODE -ne 0) {
        Write-Error "CMake configuration failed for $arch"
        Pop-Location
        exit 1
    }

    # Build and install
    cmake --build $BUILD_DIR --config Release --target INSTALL --parallel 8

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Build failed for $arch"
        Pop-Location
        exit 1
    }

    Pop-Location
}

# 빌드 전 Visual Studio 환경 설정
$VS_PATH = "C:\Program Files\Microsoft Visual Studio\2022\Community"
$VS_TOOLS = "$VS_PATH\VC\Auxiliary\Build"

if (Test-Path "$VS_TOOLS\vcvarsall.bat") {
    Write-Host "Setting up Visual Studio environment..."
    # x64 환경 설정
    cmd.exe /c "call `"$VS_TOOLS\vcvarsall.bat`" x64 && set > %temp%\vcvars.txt"
    Get-Content "$env:temp\vcvars.txt" | foreach-object {
        if ($_ -match "^(.*?)=(.*)$") {
            Set-Content "env:\$($matches[1])" $matches[2]
        }
    }
} else {
    Write-Error "Visual Studio environment setup failed"
    exit 1
}

# Build for x64
Write-Host "Building for x64..."
Build-OpenCV -arch "x64" -generator "Visual Studio 17 2022" -platform "x64"

# ARM64 빌드 전 환경 재설정
if (Test-Path "$VS_TOOLS\vcvarsall.bat") {
    Write-Host "Setting up Visual Studio environment for ARM64..."
    cmd.exe /c "call `"$VS_TOOLS\vcvarsall.bat`" x64_arm64 && set > %temp%\vcvars.txt"
    Get-Content "$env:temp\vcvars.txt" | foreach-object {
        if ($_ -match "^(.*?)=(.*)$") {
            Set-Content "env:\$($matches[1])" $matches[2]
        }
    }
}

# Build for ARM64
Write-Host "Building for ARM64..."
Build-OpenCV -arch "arm64" -generator "Visual Studio 17 2022" -platform "ARM64"

```

주요 변경사항과 해결방법:

1. Visual Studio 환경 설정 추가
   - `vcvarsall.bat`을 사용하여 적절한 빌드 환경 설정
   - x64와 ARM64 각각에 대해 별도의 환경 설정

2. CMake 구성 개선
   - 명시적으로 프로젝트 소스와 빌드 디렉토리 지정 (-S, -B 옵션)
   - CMAKE_BUILD_TYPE을 명시적으로 지정
   - OpenCV 관련 추가 파라미터 설정

3. 빌드 디렉토리 정리
   - 빌드 전 기존 디렉토리 제거하여 클린 빌드 보장

4. 오류 처리 개선
   - CMake 구성과 빌드 단계에서의 오류 확인
   - 실패 시 적절한 오류 메시지 출력

스크립트 실행 방법:
1. PowerShell을 관리자 권한으로 실행
2. 스크립트가 있는 디렉토리로 이동
3. `.\opencv-build.ps1` 실행

이 수정된 스크립트는 이전 오류들을 해결하고, 더 안정적인 빌드 프로세스를 제공합니다.

# 인자로 옶션 받도록 수정

```powershell
# OpenCV Windows Build Script for x64 and ARM64
param (
    [Parameter()]
    [ValidateSet('build', 'clean')]
    [string]$Action = 'build',
    
    [Parameter()]
    [ValidateSet('x64', 'arm64', 'all')]
    [string]$Platform = 'all'
)

# Configuration
$OPENCV_VERSION = "4.9.0"
$SOURCE_DIR = "C:\workspace\jonpark-work\opencv_source"
$BUILD_BASE_DIR = "C:\workspace\jonpark-work\opencv_build"
$INSTALL_BASE_DIR = "C:\workspace\jonpark-work\opencv_install"

# Common CMake parameters
$CMAKE_COMMON_PARAMS = @(
    "-DCMAKE_MINIMUM_REQUIRED_VERSION=3.10",
    "-DBUILD_SHARED_LIBS=ON",
    "-DBUILD_TESTS=OFF",
    "-DBUILD_PERF_TESTS=OFF",
    "-DBUILD_EXAMPLES=OFF",
    "-DWITH_CUDA=OFF",
    "-DBUILD_opencv_world=ON",
    "-DBUILD_opencv_python2=OFF",
    "-DBUILD_opencv_python3=OFF",
    "-DWITH_IPP=ON",
    "-DENABLE_CXX11=ON",
    "-DOPENCV_ENABLE_NONFREE=ON",
    "-DBUILD_WITH_STATIC_CRT=OFF"
)

# Clean function
function Clean-Build {
    param (
        [string]$arch
    )
    
    $BUILD_DIR = "$BUILD_BASE_DIR\$arch"
    $INSTALL_DIR = "$INSTALL_BASE_DIR\$arch"
    
    Write-Host "Cleaning $arch build directories..."
    
    if (Test-Path $BUILD_DIR) {
        Remove-Item -Path $BUILD_DIR -Recurse -Force
        Write-Host "Removed build directory: $BUILD_DIR"
    }
    
    if (Test-Path $INSTALL_DIR) {
        Remove-Item -Path $INSTALL_DIR -Recurse -Force
        Write-Host "Removed install directory: $INSTALL_DIR"
    }
}

# Download OpenCV source
function Get-OpenCVSource {
    if (-not (Test-Path $SOURCE_DIR)) {
        Write-Host "Cloning OpenCV repository..."
        git clone https://github.com/opencv/opencv.git $SOURCE_DIR
        Push-Location $SOURCE_DIR
        git checkout $OPENCV_VERSION
        Pop-Location
    }
}

# Function to build OpenCV for specific architecture
function Build-OpenCV {
    param (
        [string]$arch,
        [string]$generator,
        [string]$platform
    )

    $BUILD_DIR = "$BUILD_BASE_DIR\$arch"
    $INSTALL_DIR = "$INSTALL_BASE_DIR\$arch"

    Write-Host "Building OpenCV for $arch..."
    
    # Create build directory
    New-Item -ItemType Directory -Force -Path $BUILD_DIR
    Push-Location $BUILD_DIR

    # Configure CMake with explicit project name and build type
    Write-Host "Configuring CMake for $arch..."
    cmake -G $generator -A $platform `
        -DCMAKE_INSTALL_PREFIX="$INSTALL_DIR" `
        -DCMAKE_BUILD_TYPE=Release `
        -DOpenCV_ARCH=$platform `
        -DOpenCV_RUNTIME=vc17 `
        $CMAKE_COMMON_PARAMS `
        -S $SOURCE_DIR -B $BUILD_DIR

    if ($LASTEXITCODE -ne 0) {
        Write-Error "CMake configuration failed for $arch"
        Pop-Location
        exit 1
    }

    # Build and install
    Write-Host "Building and installing for $arch..."
    cmake --build $BUILD_DIR --config Release --target INSTALL --parallel 8

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Build failed for $arch"
        Pop-Location
        exit 1
    }

    Pop-Location
    Write-Host "Build completed for $arch"
}

# Setup Visual Studio environment
function Set-VSEnvironment {
    param (
        [string]$arch
    )
    
    $VS_PATH = "C:\Program Files\Microsoft Visual Studio\2022\Community"
    $VS_TOOLS = "$VS_PATH\VC\Auxiliary\Build"
    
    if (Test-Path "$VS_TOOLS\vcvarsall.bat") {
        Write-Host "Setting up Visual Studio environment for $arch..."
        $vcvarsArch = if ($arch -eq "arm64") { "x64_arm64" } else { "x64" }
        
        cmd.exe /c "call `"$VS_TOOLS\vcvarsall.bat`" $vcvarsArch && set > %temp%\vcvars.txt"
        Get-Content "$env:temp\vcvars.txt" | foreach-object {
            if ($_ -match "^(.*?)=(.*)$") {
                Set-Content "env:\$($matches[1])" $matches[2]
            }
        }
    } else {
        Write-Error "Visual Studio environment setup failed"
        exit 1
    }
}

# Main execution logic
Write-Host "OpenCV Build Script"
Write-Host "Action: $Action"
Write-Host "Platform: $Platform"

# Handle clean action
if ($Action -eq 'clean') {
    if ($Platform -eq 'all' -or $Platform -eq 'x64') {
        Clean-Build -arch "x64"
    }
    if ($Platform -eq 'all' -or $Platform -eq 'arm64') {
        Clean-Build -arch "arm64"
    }
    exit 0
}

# Handle build action
Get-OpenCVSource

if ($Platform -eq 'all' -or $Platform -eq 'x64') {
    Set-VSEnvironment -arch "x64"
    Build-OpenCV -arch "x64" -generator "Visual Studio 17 2022" -platform "x64"
}

if ($Platform -eq 'all' -or $Platform -eq 'arm64') {
    Set-VSEnvironment -arch "arm64"
    Build-OpenCV -arch "arm64" -generator "Visual Studio 17 2022" -platform "ARM64"
}

Write-Host "Script completed successfully"

```

수정된 스크립트 사용 방법:

1. 기본 빌드 (x64와 arm64 모두):
```powershell
.\opencv-build.ps1
```

2. 특정 플랫폼만 빌드:
```powershell
.\opencv-build.ps1 -Platform x64
.\opencv-build.ps1 -Platform arm64
```

3. 빌드 디렉토리 정리:
```powershell
.\opencv-build.ps1 -Action clean -Platform all
.\opencv-build.ps1 -Action clean -Platform x64
.\opencv-build.ps1 -Action clean -Platform arm64
```

주요 변경사항:
1. 파라미터 추가
   - Action: 'build' 또는 'clean' (기본값: 'build')
   - Platform: 'x64', 'arm64', 'all' (기본값: 'all')

2. 함수 모듈화
   - Clean-Build: 빌드 디렉토리 정리
   - Get-OpenCVSource: 소스 코드 다운로드
   - Set-VSEnvironment: Visual Studio 환경 설정
   - Build-OpenCV: 실제 빌드 수행

3. 진행 상황 표시 개선
   - 각 단계별 진행 상황을 명확하게 표시
   - 오류 발생 시 상세 메시지 출력

4. 에러 처리 강화
   - 각 단계별 오류 검사
   - Visual Studio 환경 설정 실패 시 적절한 처리

스크립트는 기본적으로 빌드 모드로 동작하며, 모든 플랫폼을 빌드합니다. 필요한 경우 파라미터를 통해 특정 동작이나 플랫폼을 지정할 수 있습니다.

# cov-build 

Coverity build capture와 PowerShell 스크립트를 함께 사용하기 위해서는 명령어 형식을 수정해야 합니다. 여기 두 가지 해결 방법이 있습니다:

1. PowerShell 실행기를 명시적으로 지정:
```bash
cov-build --dir .\opencv_build\idir powershell.exe -File .\opencv-build.ps1
```

2. CMD를 통해 실행:
```bash
cov-build --dir .\opencv_build\idir cmd /c "powershell.exe -File .\opencv-build.ps1"
```

또는 빌드 스크립트를 배치 파일로 래핑하는 방법도 있습니다:

1. 새로운 파일 `build-wrapper.bat` 생성:
```batch
@echo off
powershell.exe -File "%~dp0opencv-build.ps1" %*
```

2. 이후 다음과 같이 실행:
```bash
cov-build --dir .\opencv_build\idir .\build-wrapper.bat
```

참고: 
- `%~dp0`는 배치 파일이 있는 디렉토리의 경로를 나타냅니다.
- `%*`는 모든 커맨드 라인 인자를 전달합니다.

위의 방법들 중 첫 번째 방법(PowerShell 실행기를 직접 지정)을 사용하는 것을 추천합니다. 이 방법이 가장 직관적이고 간단합니다.

# w64devkit

w64devkit 환경을 위한 bash 스크립트로 변환하겠습니다.



```bash
#!/bin/bash

# Configuration
OPENCV_VERSION="4.9.0"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="${SCRIPT_DIR}/opencv_source"
BUILD_BASE_DIR="${SCRIPT_DIR}/opencv_build"
INSTALL_BASE_DIR="${SCRIPT_DIR}/opencv_install"
W64DEVKIT_DIR="C:/workspace/dev_tool/w64devkit"

# Default values
ACTION="build"
PLATFORM="all"
USE_COVERITY=0

# Help function
show_help() {
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  -a, --action    Action to perform (build/clean) [default: build]"
    echo "  -p, --platform  Platform to build (x64/arm64/all) [default: all]"
    echo "  -c, --coverity  Enable Coverity build"
    echo "  -h, --help      Show this help message"
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -a|--action)
            ACTION="$2"
            shift 2
            ;;
        -p|--platform)
            PLATFORM="$2"
            shift 2
            ;;
        -c|--coverity)
            USE_COVERITY=1
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Validate arguments
if [[ ! "$ACTION" =~ ^(build|clean)$ ]]; then
    echo "Invalid action: $ACTION"
    exit 1
fi

if [[ ! "$PLATFORM" =~ ^(x64|arm64|all)$ ]]; then
    echo "Invalid platform: $PLATFORM"
    exit 1
fi

# Setup environment
export PATH="${W64DEVKIT_DIR}/bin:$PATH"
export CC="${W64DEVKIT_DIR}/bin/gcc.exe"
export CXX="${W64DEVKIT_DIR}/bin/g++.exe"

# Common CMake parameters
CMAKE_COMMON_PARAMS=(
    "-DCMAKE_MINIMUM_REQUIRED_VERSION=3.10"
    "-DBUILD_SHARED_LIBS=ON"
    "-DBUILD_TESTS=OFF"
    "-DBUILD_PERF_TESTS=OFF"
    "-DBUILD_EXAMPLES=OFF"
    "-DWITH_CUDA=OFF"
    "-DBUILD_opencv_world=ON"
    "-DBUILD_opencv_python2=OFF"
    "-DBUILD_opencv_python3=OFF"
    "-DWITH_IPP=ON"
    "-DENABLE_CXX11=ON"
    "-DOPENCV_ENABLE_NONFREE=ON"
    "-DBUILD_WITH_STATIC_CRT=OFF"
    "-DCMAKE_BUILD_TYPE=Release"
)

# Clean function
clean_build() {
    local arch="$1"
    local build_dir="${BUILD_BASE_DIR}/${arch}"
    local install_dir="${INSTALL_BASE_DIR}/${arch}"
    
    echo "Cleaning ${arch} build directories..."
    
    if [ -d "$build_dir" ]; then
        rm -rf "$build_dir"
        echo "Removed build directory: $build_dir"
    fi
    
    if [ -d "$install_dir" ]; then
        rm -rf "$install_dir"
        echo "Removed install directory: $install_dir"
    fi
}

# Download OpenCV source
get_opencv_source() {
    if [ ! -d "$SOURCE_DIR" ]; then
        echo "Cloning OpenCV repository..."
        git clone https://github.com/opencv/opencv.git "$SOURCE_DIR"
        pushd "$SOURCE_DIR" > /dev/null
        git checkout "$OPENCV_VERSION"
        popd > /dev/null
    fi
}

# Build function
build_opencv() {
    local arch="$1"
    local build_dir="${BUILD_BASE_DIR}/${arch}"
    local install_dir="${INSTALL_BASE_DIR}/${arch}"
    
    echo "Building OpenCV for ${arch}..."
    
    # Create build directory
    mkdir -p "$build_dir"
    pushd "$build_dir" > /dev/null
    
    # Configure CMake
    echo "Configuring CMake for ${arch}..."
    
    local cmake_cmd="cmake -G 'Unix Makefiles' \
        -DCMAKE_INSTALL_PREFIX='${install_dir}' \
        ${CMAKE_COMMON_PARAMS[@]} \
        '${SOURCE_DIR}'"
    
    if [ $USE_COVERITY -eq 1 ]; then
        echo "Using Coverity Build..."
        cov-build --dir "./opencv_build/idir" eval "$cmake_cmd"
    else
        eval "$cmake_cmd"
    fi
    
    if [ $? -ne 0 ]; then
        echo "CMake configuration failed for ${arch}"
        popd > /dev/null
        exit 1
    fi
    
    # Build and install
    echo "Building and installing for ${arch}..."
    
    local build_cmd="make -j8 install"
    
    if [ $USE_COVERITY -eq 1 ]; then
        cov-build --dir "./opencv_build/idir" eval "$build_cmd"
    else
        eval "$build_cmd"
    fi
    
    if [ $? -ne 0 ]; then
        echo "Build failed for ${arch}"
        popd > /dev/null
        exit 1
    fi
    
    popd > /dev/null
    echo "Build completed for ${arch}"
}

# Main execution
echo "OpenCV Build Script"
echo "Script Directory: $SCRIPT_DIR"
echo "Action: $ACTION"
echo "Platform: $PLATFORM"
echo "Coverity: $USE_COVERITY"

# Handle clean action
if [ "$ACTION" = "clean" ]; then
    if [ "$PLATFORM" = "all" ] || [ "$PLATFORM" = "x64" ]; then
        clean_build "x64"
    fi
    if [ "$PLATFORM" = "all" ] || [ "$PLATFORM" = "arm64" ]; then
        clean_build "arm64"
    fi
    exit 0
fi

# Handle build action
get_opencv_source

if [ "$PLATFORM" = "all" ] || [ "$PLATFORM" = "x64" ]; then
    build_opencv "x64"
fi

if [ "$PLATFORM" = "all" ] || [ "$PLATFORM" = "arm64" ]; then
    build_opencv "arm64"
fi

echo "Script completed successfully"

```

사용 방법:

1. 기본 빌드 (모든 플랫폼):
```bash
./opencv-build.sh
```

2. 특정 플랫폼 빌드:
```bash
./opencv-build.sh --platform x64
./opencv-build.sh --platform arm64
```

3. 클린 빌드:
```bash
./opencv-build.sh --action clean
./opencv-build.sh --action clean --platform x64
```

4. Coverity 빌드:
```bash
./opencv-build.sh --coverity
```

주요 변경사항:
1. w64devkit 환경 설정 추가
   - PATH 설정
   - 컴파일러 설정 (GCC/G++)

2. Unix Makefiles 제너레이터 사용
   - Visual Studio 대신 GCC 기반 빌드

3. bash 스크립트 스타일로 변환
   - 인자 파싱
   - 함수 정의
   - 경로 처리

4. 빌드 시스템 변경
   - make 사용
   - 병렬 빌드 (-j8)

주의사항:
1. 스크립트를 실행하기 전에 실행 권한을 부여해야 합니다:
```bash
chmod +x opencv-build.sh
```

2. w64devkit의 경로가 다른 경우 W64DEVKIT_DIR 변수를 수정해야 합니다.

3. 경로에 공백이 있는 경우 적절히 따옴표로 감싸져 있는지 확인하세요.

4. Git이 w64devkit 환경에서 사용 가능한지 확인하세요.

이 스크립트는 w64devkit 환경에서 OpenCV를 빌드하는데 최적화되어 있습니다.

# bash shell to use windows compiler, not gcc

Visual Studio에서 제공하는 `cl` 컴파일러 또는 `clang-cl`을 사용하여 OpenCV를 빌드하도록 스크립트를 수정하겠습니다. 주요 변경 사항은 다음과 같습니다:

1. **컴파일러 및 도구 체인 설정**:
   - `gcc`/`g++` 대신 `cl` 또는 `clang-cl`을 사용합니다.
   - CMake의 생성기(Generator)를 Visual Studio용으로 변경합니다.

2. **빌드 시스템 변경**:
   - `make` 대신 `MSBuild`를 사용하여 솔루션 파일(`*.sln`)을 빌드합니다.

3. **환경 변수 설정**:
   - Visual Studio의 환경을 초기화하기 위해 `vcvarsall.bat`를 호출합니다.

4. **플랫폼별 빌드 지원**:
   - x64와 ARM64 아키텍처를 명시적으로 지정합니다.

---

### **수정된 스크립트**

```bash
#!/bin/bash
# Configuration
OPENCV_VERSION="4.9.0"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="${SCRIPT_DIR}/opencv_source"
BUILD_BASE_DIR="${SCRIPT_DIR}/opencv_build"
INSTALL_BASE_DIR="${SCRIPT_DIR}/opencv_install"
VISUAL_STUDIO_PATH="C:/Program Files/Microsoft Visual Studio/2022/Community/VC/Auxiliary/Build"

# Default values
ACTION="build"
PLATFORM="all"
USE_COVERITY=0

# Help function
show_help() {
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  -a, --action    Action to perform (build/clean) [default: build]"
    echo "  -p, --platform  Platform to build (x64/arm64/all) [default: all]"
    echo "  -c, --coverity  Enable Coverity build"
    echo "  -h, --help      Show this help message"
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -a|--action)
            ACTION="$2"
            shift 2
            ;;
        -p|--platform)
            PLATFORM="$2"
            shift 2
            ;;
        -c|--coverity)
            USE_COVERITY=1
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Validate arguments
if [[ ! "$ACTION" =~ ^(build|clean)$ ]]; then
    echo "Invalid action: $ACTION"
    exit 1
fi
if [[ ! "$PLATFORM" =~ ^(x64|arm64|all)$ ]]; then
    echo "Invalid platform: $PLATFORM"
    exit 1
fi

# Setup environment
setup_visual_studio_env() {
    local arch="$1"
    if [[ "$arch" == "x64" ]]; then
        cmd //c "call \"${VISUAL_STUDIO_PATH}/vcvarsall.bat\" x64 && set > env.txt"
    elif [[ "$arch" == "arm64" ]]; then
        cmd //c "call \"${VISUAL_STUDIO_PATH}/vcvarsall.bat\" arm64 && set > env.txt"
    fi
    while read -r line; do
        export "$line"
    done < env.txt
    rm env.txt
}

# Common CMake parameters
CMAKE_COMMON_PARAMS=(
    "-DCMAKE_MINIMUM_REQUIRED_VERSION=3.10"
    "-DBUILD_SHARED_LIBS=ON"
    "-DBUILD_TESTS=OFF"
    "-DBUILD_PERF_TESTS=OFF"
    "-DBUILD_EXAMPLES=OFF"
    "-DWITH_CUDA=OFF"
    "-DBUILD_opencv_world=ON"
    "-DBUILD_opencv_python2=OFF"
    "-DBUILD_opencv_python3=OFF"
    "-DWITH_IPP=ON"
    "-DENABLE_CXX11=ON"
    "-DOPENCV_ENABLE_NONFREE=ON"
    "-DBUILD_WITH_STATIC_CRT=OFF"
    "-DCMAKE_BUILD_TYPE=Release"
)

# Clean function
clean_build() {
    local arch="$1"
    local build_dir="${BUILD_BASE_DIR}/${arch}"
    local install_dir="${INSTALL_BASE_DIR}/${arch}"
    
    echo "Cleaning ${arch} build directories..."
    
    if [ -d "$build_dir" ]; then
        rm -rf "$build_dir"
        echo "Removed build directory: $build_dir"
    fi
    
    if [ -d "$install_dir" ]; then
        rm -rf "$install_dir"
        echo "Removed install directory: $install_dir"
    fi
}

# Download OpenCV source
get_opencv_source() {
    if [ ! -d "$SOURCE_DIR" ]; then
        echo "Cloning OpenCV repository..."
        git clone https://github.com/opencv/opencv.git "$SOURCE_DIR"
        pushd "$SOURCE_DIR" > /dev/null
        git checkout "$OPENCV_VERSION"
        popd > /dev/null
    fi
}

# Build function
build_opencv() {
    local arch="$1"
    local build_dir="${BUILD_BASE_DIR}/${arch}"
    local install_dir="${INSTALL_BASE_DIR}/${arch}"
    
    echo "Building OpenCV for ${arch}..."
    
    # Set up Visual Studio environment
    setup_visual_studio_env "$arch"
    
    # Create build directory
    mkdir -p "$build_dir"
    pushd "$build_dir" > /dev/null
    
    # Configure CMake
    echo "Configuring CMake for ${arch}..."
    
    local cmake_cmd="cmake -G 'Visual Studio 17 2022' \
        -A $arch \
        -DCMAKE_INSTALL_PREFIX='${install_dir}' \
        ${CMAKE_COMMON_PARAMS[@]} \
        '${SOURCE_DIR}'"
    
    if [ $USE_COVERITY -eq 1 ]; then
        echo "Using Coverity Build..."
        cov-build --dir "./opencv_build/idir" eval "$cmake_cmd"
    else
        eval "$cmake_cmd"
    fi
    
    if [ $? -ne 0 ]; then
        echo "CMake configuration failed for ${arch}"
        popd > /dev/null
        exit 1
    fi
    
    # Build and install
    echo "Building and installing for ${arch}..."
    
    local build_cmd="MSBuild OpenCV.sln /p:Configuration=Release /p:Platform=$arch /m"
    
    if [ $USE_COVERITY -eq 1 ]; then
        cov-build --dir "./opencv_build/idir" eval "$build_cmd"
    else
        eval "$build_cmd"
    fi
    
    if [ $? -ne 0 ]; then
        echo "Build failed for ${arch}"
        popd > /dev/null
        exit 1
    fi
    
    # Install
    cmake --install . --config Release
    
    popd > /dev/null
    echo "Build completed for ${arch}"
}

# Main execution
echo "OpenCV Build Script"
echo "Script Directory: $SCRIPT_DIR"
echo "Action: $ACTION"
echo "Platform: $PLATFORM"
echo "Coverity: $USE_COVERITY"

# Handle clean action
if [ "$ACTION" = "clean" ]; then
    if [ "$PLATFORM" = "all" ] || [ "$PLATFORM" = "x64" ]; then
        clean_build "x64"
    fi
    if [ "$PLATFORM" = "all" ] || [ "$PLATFORM" = "arm64" ]; then
        clean_build "arm64"
    fi
    exit 0
fi

# Handle build action
get_opencv_source
if [ "$PLATFORM" = "all" ] || [ "$PLATFORM" = "x64" ]; then
    build_opencv "x64"
fi
if [ "$PLATFORM" = "all" ] || [ "$PLATFORM" = "arm64" ]; then
    build_opencv "arm64"
fi
echo "Script completed successfully"
```

---

### **주요 변경 사항 설명**

1. **Visual Studio 환경 설정**:
   - `vcvarsall.bat`를 호출하여 x64 또는 ARM64 환경을 초기화합니다.
   - 환경 변수를 읽어 Bash에서 사용할 수 있도록 처리합니다.

2. **CMake 생성기 변경**:
   - `-G 'Visual Studio 17 2022'`를 사용하여 Visual Studio 프로젝트를 생성합니다.
   - `-A $arch`로 플랫폼(x64 또는 ARM64)을 명시합니다.

3. **빌드 시스템 변경**:
   - `MSBuild`를 사용하여 `.sln` 파일을 빌드합니다.
   - `/p:Configuration=Release`와 `/p:Platform=$arch`로 빌드 옵션을 설정합니다.

4. **Coverity 지원**:
   - Coverity를 사용하는 경우에도 동일한 방식으로 적용됩니다.

---

### **사용 방법**
1. 스크립트를 저장하고 실행 권한을 부여합니다:
   ```bash
   chmod +x build_opencv.sh
   ```

2. 스크립트를 실행합니다:
   ```bash
   ./build_opencv.sh -a build -p all
   ```

3. 필요한 경우 `-c` 옵션으로 Coverity 빌드를 활성화합니다:
   ```bash
   ./build_opencv.sh -a build -p x64 -c
   ```

---

이 스크립트를 통해 Visual Studio의 `cl` 또는 `clang-cl`을 사용하여 OpenCV를 성공적으로 빌드할 수 있습니다.