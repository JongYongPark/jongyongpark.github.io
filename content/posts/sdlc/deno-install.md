---
title: "Deno Install"
date: 2025-02-27
categories: ["sdlc"]
tags: ["Deno"]
---

# Install

Deno는 JavaScript와 TypeScript를 위한 현대적인 런타임 환경으로, 설치 및 사용이 매우 간단합니다. 아래에 Deno를 설치하고 "Hello, World!" 프로그램을 작성하여 실행하는 방법을 안내해 드리겠습니다.

### 1. Deno 설치하기

**macOS 및 Linux**:

터미널을 열고 다음 명령어를 입력하여 Deno를 설치할 수 있습니다:


```sh
curl -fsSL https://deno.land/install.sh | sh
```


이 명령어는 공식 설치 스크립트를 다운로드하여 실행합니다.

**Windows**:

PowerShell을 관리자 권한으로 열고 다음 명령어를 실행합니다:


```powershell
iwr https://deno.land/install.ps1 -useb | iex
```


또는, Windows에서 [Chocolatey](https://chocolatey.org/) 패키지 관리자를 사용 중이라면, 다음과 같이 설치할 수 있습니다:


```powershell
choco install deno
```


**설치 확인**:

설치가 완료되면, 터미널이나 PowerShell에서 다음 명령어를 입력하여 Deno가 정상적으로 설치되었는지 확인합니다:


```sh
deno --version
```


버전 정보가 출력되면 성공적으로 설치된 것입니다.

### 2. "Hello, World!" 프로그램 작성 및 실행

**1단계: 파일 생성**

원하는 디렉터리에 `hello_world.ts`라는 파일을 생성하고, 다음과 같은 코드를 입력합니다:


```typescript
console.log("Hello, World!");
```


**2단계: 프로그램 실행**

터미널이나 PowerShell에서 해당 파일이 있는 디렉터리로 이동한 후, 다음 명령어를 입력하여 프로그램을 실행합니다:


```sh
deno run hello_world.ts
```


정상적으로 실행되면 콘솔에 `Hello, World!`가 출력됩니다.

Deno는 TypeScript를 기본적으로 지원하므로, 별도의 컴파일 과정 없이 `.ts` 파일을 직접 실행할 수 있습니다.

### 참고 자료

- Deno 공식 설치 문서: [https://deno.land/manual@v1.35.1/getting_started/installation](https://deno.land/manual@v1.35.1/getting_started/installation)
- Deno 공식 예제: [https://deno.land/manual@v1.35.1/examples/hello_world](https://deno.land/manual@v1.35.1/examples/hello_world)

위의 자료를 참고하여 Deno의 다양한 기능을 탐색해 보시기 바랍니다. 



# Run Rust code

Deno는 JavaScript와 TypeScript를 위한 런타임 환경으로 설계되었으며, Rust 코드를 직접 실행하는 기능은 제공하지 않습니다. 그러나 Deno는 Rust로 작성된 네이티브 플러그인을 통해 성능이 중요한 작업을 처리할 수 있도록 지원합니다. 이러한 플러그인을 활용하면 Deno와 Rust 간의 상호 운용이 가능합니다.

### Deno에서 Rust 네이티브 플러그인 사용하기

1. **Rust 플러그인 작성**: 먼저, Rust로 필요한 기능을 구현한 후, 이를 Deno에서 사용할 수 있는 플러그인으로 컴파일합니다.

2. **Deno에서 플러그인 로드**: Deno 스크립트 내에서 `Deno.dlopen()` 함수를 사용하여 컴파일된 플러그인을 동적으로 로드하고, 정의된 함수를 호출합니다.

이러한 과정을 통해 Deno 애플리케이션에서 Rust로 작성된 고성능 코드를 활용할 수 있습니다.

### WebAssembly(WASM) 사용

또 다른 방법으로, Rust 코드를 WebAssembly(WASM) 모듈로 컴파일한 후 Deno에서 이를 로드하여 실행할 수 있습니다. 이 방법은 플랫폼 간 호환성을 제공하며, Deno의 `WebAssembly` API를 통해 WASM 모듈을 손쉽게 사용할 수 있습니다.

### 결론

Deno는 Rust 코드를 직접 실행하지는 않지만, 네이티브 플러그인 또는 WebAssembly를 통해 Rust와의 통합을 지원합니다. 이를 통해 Deno 애플리케이션에서 Rust의 성능과 기능을 활용할 수 있습니다. 


---
Deno는 JavaScript와 TypeScript를 위한 런타임 환경으로, Rust 코드를 직접 실행할 수는 없습니다. 그러나 Deno는 **Foreign Function Interface(FFI)**를 통해 Rust로 작성된 네이티브 라이브러리를 호출할 수 있습니다. 아래는 Deno에서 Rust 코드를 작성하고 이를 FFI를 통해 호출하는 방법을 단계별로 설명합니다.

### 1. Rust 라이브러리 작성 및 컴파일

**1단계: Cargo 프로젝트 생성**

터미널에서 새로운 Cargo 라이브러리 프로젝트를 생성합니다:


```sh
cargo new --lib deno_rust_lib
cd deno_rust_lib
```


**2단계: `Cargo.toml` 수정**

`Cargo.toml` 파일을 열어 `[lib]` 섹션에 다음을 추가하여 C와 호환되는 동적 라이브러리를 생성하도록 설정합니다:


```toml
[lib]
crate-type = ["cdylib"]
```


**3단계: Rust 코드 작성**

`src/lib.rs` 파일을 열어 다음과 같이 작성합니다:


```rust
#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}
```


여기서 `#[no_mangle]`은 Rust의 네임 맹글링을 방지하여 함수 이름이 그대로 유지되도록 합니다.

**4단계: 라이브러리 컴파일**

다음 명령어를 사용하여 라이브러리를 컴파일합니다:


```sh
cargo build --release
```


컴파일이 완료되면 `target/release` 디렉터리에 `libdeno_rust_lib.so`(Linux), `libdeno_rust_lib.dylib`(macOS), 또는 `deno_rust_lib.dll`(Windows) 파일이 생성됩니다.

### 2. Deno에서 Rust 라이브러리 호출

**1단계: Deno 스크립트 작성**

프로젝트 루트에 `main.ts` 파일을 생성하고 다음과 같이 작성합니다:


```typescript
const libName = {
  windows: "deno_rust_lib.dll",
  darwin: "libdeno_rust_lib.dylib",
  linux: "libdeno_rust_lib.so",
}[Deno.build.os];

if (!libName) {
  throw new Error(`Unsupported OS: ${Deno.build.os}`);
}

const libPath = `./target/release/${libName}`;

const dylib = Deno.dlopen(libPath, {
  add: { parameters: ["i32", "i32"], result: "i32" },
});

const result = dylib.symbols.add(10, 20);
console.log(`Result from Rust: ${result}`); // Result from Rust: 30

dylib.close();
```


**2단계: 스크립트 실행**

터미널에서 다음 명령어를 실행하여 스크립트를 실행합니다:


```sh
deno run --allow-ffi --allow-read main.ts
```


여기서 `--allow-ffi`는 FFI를 사용하기 위한 권한을, `--allow-read`는 라이브러리 파일을 읽기 위한 권한을 부여합니다.

### 참고 자료

- Deno 공식 FFI 문서: [https://deno.land/manual/runtime/ffi](https://deno.land/manual/runtime/ffi)
- Rust와 Deno의 FFI 사용 예제: [https://alexandrempsantos.com/deno/creating-a-deno-plugin/](https://alexandrempsantos.com/deno/creating-a-deno-plugin/)

위의 과정을 통해 Deno에서 Rust로 작성된 함수를 호출할 수 있습니다. 이를 통해 성능이 중요한 부분을 Rust로 구현하고, Deno에서 이를 활용하는 하이브리드 애플리케이션을 개발할 수 있습니다. 