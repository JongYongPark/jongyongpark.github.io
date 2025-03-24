# AUTOSAR C++ A2-10-5 규칙 가이드

## 목차
1. [규칙 개요](#규칙-개요)
2. [핵심 개념](#핵심-개념)
3. [위반 사례](#위반-사례)
4. [해결 방법](#해결-방법)
5. [상세 설명](#상세-설명)
6. [참고 사항](#참고-사항)

## 규칙 개요

AUTOSAR C++ A2-10-5 규칙은 다음과 같이 정의됩니다:

> "정적 저장 기간을 가진 함수 또는 외부/내부 연결을 가진 비멤버 객체의 식별자 이름은 재사용되어서는 안 된다."

### 규칙의 목적
- 코드의 명확성과 가독성 향상
- 유지보수성 개선
- 모호성과 오류 가능성 감소
- 자동차 소프트웨어의 안전성 강화

## 핵심 개념

### 1. Static Storage Duration (정적 저장 기간)
- C++에서 모든 함수는 기본적으로 정적 저장 기간을 가짐
- 프로그램 시작부터 종료까지 메모리에 존재
- `static` 키워드는 함수의 저장 기간이 아닌 링키지(linkage)를 변경

### 2. Non-member Object (비멤버 객체)
- 클래스나 구조체의 멤버가 아닌 변수나 객체
- 전역 변수, 네임스페이스 범위 변수, 블록 범위의 정적 변수 등

### 3. Linkage (연결)
- **External Linkage**: 다른 번역 단위에서도 참조 가능
- **Internal Linkage**: 같은 번역 단위 내에서만 참조 가능

## 위반 사례

### 1. 함수 오버로딩
```cpp
// 위반 예시
int32_t my_printf(char const* msg) {
    return printf("char: %s\n", msg);
}

int32_t my_printf(std::string const& msg) {  // 위반: 동일 식별자 재사용
    return printf("string: %s\n", msg.c_str());
}
```

### 2. 다른 범위에서 식별자 재사용
```cpp
// 위반 예시
int globalVar;  // 외부 링키지를 가진 전역 변수

void func() {
    int globalVar = 5;  // 위반: 외부 링키지를 가진 식별자 재사용
}
```

## 해결 방법

### 1. 함수 이름 구분
```cpp
// 올바른 예시
int32_t my_printf_c_string(char const* msg) {
    return printf("char: %s\n", msg);
}

int32_t my_printf_cpp_string(std::string const& msg) {
    return printf("string: %s\n", msg.c_str());
}
```

### 2. 변수 이름 구분
```cpp
// 올바른 예시
int globalVar;

void func() {
    int localGlobalVar = 5;  // 명확한 이름 사용
}
```

## 상세 설명

### Static Storage Duration vs Automatic Storage Duration

#### Static Storage Duration
- 프로그램 시작 시점에 생성
- 프로그램 종료까지 존재
- 초기화되지 않으면 0 또는 nullptr로 자동 초기화

#### Automatic Storage Duration
- 선언된 블록 진입 시 생성
- 블록 종료 시 파괴
- 초기화되지 않으면 값이 불확정 상태

### 예시 코드
```cpp
#include <iostream>

// 정적 저장 기간
int globalStaticVar = 10;
void staticFunction() {
    std::cout << "Static function is called" << std::endl;
}

void exampleFunction() {
    // 자동 저장 기간
    int localAutoVar = 20;  
    
    // 정적 저장 기간
    static int localStaticVar = 30;  
    
    localAutoVar++;
    localStaticVar++;
    
    std::cout << "localAutoVar: " << localAutoVar << std::endl;
    std::cout << "localStaticVar: " << localStaticVar << std::endl;
}
```

## 참고 사항

### 오해 해소
- 함수에 `static` 키워드가 없더라도 모든 함수는 기본적으로 정적 저장 기간을 가짐
- C++에서는 함수 오버로딩이 합법적이지만, AUTOSAR C++14는 더 엄격한 안전 기준을 적용

### 컴파일 및 검증
```bash
# 일반 컴파일
g++ -std=c++14 -o test_a2_10_5 test_a2_10_5.cpp

# AUTOSAR 검증
coverity scan --checker=AUTOSAR test_a2_10_5.cpp
```

### 결론
AUTOSAR C++14 Rule A2-10-5는 자동차 소프트웨어의 안전성과 신뢰성을 위해 코드의 명확성을 강조하는 규칙입니다. 식별자의 재사용을 금지함으로써 코드의 가독성과 유지보수성을 향상시킵니다.


# Static Storage Duration in C++

C++ 표준에 따른 Static Storage Duration에 대해 cppreference.com을 참조하여 정확히 설명해 드리겠습니다.

## Static Storage Duration의 정의

cppreference.com에 따르면, 변수가 다음 조건을 모두 만족할 때 **static storage duration**을 가집니다:

1. 변수가 네임스페이스 범위(namespace scope)에 속하거나 `static` 또는 `extern` 키워드로 처음 선언됨
2. 스레드 저장 기간(thread storage duration)을 가지지 않음 (C++11부터)

이런 엔티티(entity)의 저장 공간은 프로그램 실행 기간 동안 지속됩니다.

## 네임스페이스 범위와 함수

함수에 관해서는, C++에서 모든 함수는 항상 네임스페이스 범위(또는 글로벌 범위)에 속합니다. 클래스 내부에 정의된 멤버 함수라도 원칙적으로는 클래스 네임스페이스 내에 존재합니다. 

따라서 네임스페이스 범위에 속하는 모든 함수는 기본적으로 static storage duration을 가집니다. 즉, 함수에 `static`이나 `extern`이 명시적으로 붙지 않더라도 자동으로 static storage duration을 가지게 됩니다.

## 예시 설명

```cpp
// 전역 변수 (네임스페이스 범위) - static storage duration
int globalVar;

// 네임스페이스 내 변수 - static storage duration
namespace MyNamespace {
    int nsVar;
}

// 함수 - static storage duration
void func() {
    // 로컬 변수 - automatic storage duration
    int localVar;
    
    // static 키워드로 선언된 로컬 변수 - static storage duration
    static int staticLocalVar;
}

// 클래스 정의
class MyClass {
public:
    // 멤버 함수 - static storage duration (함수 자체는)
    void memberFunc() {
        // 로컬 변수 - automatic storage duration
        int localVar;
    }
    
    // 정적 멤버 변수 - static storage duration
    static int staticMemberVar;
};
```

## Static Storage Duration과 Linkage의 관계

제가 앞서 설명한 내용에서, static storage duration과 linkage(연결)를 혼동할 수 있는 부분이 있었을 수 있습니다. 이 둘은 별개의 개념입니다:

- **Storage Duration**: 객체가 메모리에 존재하는 시간을 정의
- **Linkage**: 서로 다른 번역 단위(translation unit)에서 동일한 이름의 식별자가 같은 객체를 참조하는지 여부를 결정

함수는 기본적으로 external linkage(외부 연결)와 static storage duration을 가집니다. `static` 키워드를 함수에 적용하면 linkage가 internal(내부)로 변경되지만, 저장 기간은 이미 static이므로 변경되지 않습니다.

## AUTOSAR C++14 Rule A2-10-5와의 관계

AUTOSAR C++14 Rule A2-10-5에서 말하는 "function with static storage duration"은 사실상 모든 함수를 포함합니다. 이 규칙이 함수 오버로딩을 제한하는 이유는 모든 함수가 기본적으로 static storage duration을 가지기 때문입니다.

따라서 `static` 키워드가 없는 일반 함수도 이 규칙의 적용 대상이 됩니다.