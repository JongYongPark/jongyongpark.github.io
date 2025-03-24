---
title: "Gcc Visibility"
date: 2025-03-04
categories: ["ops"]
tags: ["Coverity","Gcc"]
---

# Gcc Visibility

전처리된 파일에서 보이는 `basic_string` 함수의 속성과 컴파일러 옵션이 CIM 소스 창에서 이 함수들이 보이지 않는 이유에 대해 자세히 설명해 드리겠습니다.

## 가시성 속성 상세 설명

다음 코드 라인을 살펴보겠습니다:
```cpp
inline __attribute__ ((__visibility__("hidden"))) __attribute__ ((__exclude_from_explicit_instantiation__))
```

이것은 함수에 두 가지 중요한 GCC/Clang 속성을 적용하고 있습니다:

1. `__attribute__ ((__visibility__("hidden")))` - 이 속성은 컴파일러에게 함수에 "hidden" 가시성을 부여하도록 지시합니다:
   - 이 심볼은 공유 라이브러리/실행 파일에서 내보내지지 않습니다
   - 다른 모듈에서 동적 링크를 통해 접근할 수 없습니다
   - 정의된 컴파일 단위나 라이브러리 내에서만 접근 가능합니다

2. `__attribute__ ((__exclude_from_explicit_instantiation__))` - 이 속성은 컴파일러에게 이 함수를 어떤 명시적 템플릿 인스턴스화에도 포함시키지 말라고 지시합니다. 이는 코드 크기를 줄이고 중복 정의를 방지하는 데 도움이 됩니다.

## 컴파일러 플래그의 영향

`-fvisibility-inlines-hidden` 옵션으로 컴파일하면, 컴파일러에게 모든 C++ 인라인 함수에 자동으로 hidden 가시성을 적용하라고 지시하는 것입니다. 이는 일반적인 최적화 방법으로:

- 심볼 테이블의 크기를 줄입니다
- 더 적극적인 인라이닝을 허용하여 잠재적으로 성능을 향상시킵니다
- 서로 다른 라이브러리 간의 심볼 충돌을 방지합니다
- 라이브러리의 노출된 API 표면을 줄입니다

## CIM 소스 창에서 함수가 누락된 이유

Component Information Model(CIM) 소스 창에서 이러한 함수들이 보이지 않는 이유는 다음과 같습니다:

1. **숨겨진 심볼은 노출되지 않음**: Hidden 가시성을 가진 함수들은 대부분의 코드 분석 도구가 스캔하는 일반 심볼 테이블에 나타나지 않습니다.

2. **인라이닝 효과**: 함수가 인라인되면 컴파일된 바이너리에서 별도의 엔티티로 존재하지 않을 수 있습니다 - 그들의 코드는 호출 지점에 직접 삽입됩니다.

3. **템플릿 인스턴스화 필터링**: `__exclude_from_explicit_instantiation__` 속성은 템플릿 함수의 가시성을 더욱 줄입니다.

## 실용적 의미

이 동작은 실제로 의도적이며 다음과 같은 이점이 있습니다:

- **성능**: 내보내는 심볼 집합을 줄이면 로딩 시간과 런타임 성능이 향상됩니다
- **바이너리 크기**: 더 적은 내보내는 심볼로 바이너리 크기가 작아집니다
- **캡슐화**: 구현 세부 사항을 노출하지 않음으로써 정보 은닉이 향상됩니다

분석 목적으로 CIM 소스 창에서 이 함수들을 보려면 다음과 같은 방법을 시도할 수 있습니다:

1. 일시적으로 `-fvisibility-inlines-hidden` 플래그를 사용하지 않고 컴파일
2. 숨겨진 심볼을 감지할 수 있는 더 고급 분석 도구 사용
3. 분석하고 싶은 특정 함수에 `__attribute__ ((__visibility__("default")))` 적용

이 기술은 C++ 표준 라이브러리의 구현 방식과 유사하게, 구현 세부 사항을 숨기면서 깔끔한 공개 API를 유지하기 위해 대규모 C++ 라이브러리에서 널리 사용됩니다.


# Gcc Visibility 예제제
`-fvisibility-inlines-hidden` 옵션의 효과를 보여주는 샘플 코드를 만들고 이 옵션을 사용한 경우와 사용하지 않은 경우를 비교해 드리겠습니다.

## 샘플 코드

먼저 간단한 C++ 코드를 만들어 보겠습니다:

```cpp
// visibility_test.h
#pragma once

class Calculator {
public:
    Calculator() = default;
    ~Calculator() = default;
    
    // 인라인 메서드
    inline int add(int a, int b) const {
        return a + b;
    }
    
    // 일반 메서드
    int multiply(int a, int b) const;
};

// 헤더 파일에 정의된 별도의 인라인 함수
inline int square(int x) {
    return x * x;
}
```

```cpp
// visibility_test.cpp
#include "visibility_test.h"
#include <iostream>

// 일반 메서드 구현
int Calculator::multiply(int a, int b) const {
    return a * b;
}

// 전역 함수
void print_result(int result) {
    std::cout << "Result: " << result << std::endl;
}

int main() {
    Calculator calc;
    int sum = calc.add(5, 3);
    int product = calc.multiply(5, 3);
    int squared = square(5);
    
    print_result(sum);
    print_result(product);
    print_result(squared);
    
    return 0;
}
```

## 컴파일 및 비교

이제 위 코드를 두 가지 방식으로 컴파일해 보겠습니다:

### 1. 기본 컴파일 (가시성 옵션 없음)

```bash
g++ -o visibility_test_normal visibility_test.cpp
```

### 2. `-fvisibility-inlines-hidden` 옵션 사용

```bash
g++ -fvisibility-inlines-hidden -o visibility_test_hidden visibility_test.cpp
```

## 결과 비교

두 실행 파일의 심볼 테이블을 `nm` 명령어를 사용하여 분석해 보겠습니다:

### 기본 컴파일 결과

```bash
nm -C visibility_test_normal | grep "Calculator\|square"
```

출력 예시:
```
00000000004011e0 T Calculator::add(int, int) const
0000000000401200 T Calculator::multiply(int, int) const
00000000004011d0 T square(int)
```

모든 메서드가 "T" 타입(글로벌 심볼)으로 표시되어 외부에서 접근 가능합니다.

### `-fvisibility-inlines-hidden` 옵션 사용 결과

```bash
nm -C visibility_test_hidden | grep "Calculator\|square"
```

출력 예시:
```
                 U Calculator::add(int, int) const
0000000000401200 T Calculator::multiply(int, int) const
                 U square(int)
```

여기서 볼 수 있듯이:
- `Calculator::add(int, int)` 메서드와 `square(int)` 함수는 심볼 테이블에서 "T" 타입으로 표시되지 않고 "U" 타입(정의되지 않은 심볼)으로 표시되거나 완전히 사라졌습니다.
- `Calculator::multiply(int, int)` 메서드는 인라인이 아니기 때문에 여전히 "T" 타입으로 표시됩니다.

## 실질적인 차이점

1. **바이너리 크기**: `-fvisibility-inlines-hidden` 옵션을 사용하면 바이너리 크기가 약간 줄어들 수 있습니다.

2. **심볼 테이블**: 인라인 함수와 메서드가 공개 심볼 테이블에 나타나지 않습니다.

3. **동적 링킹**: 다른 라이브러리가 이 코드를 동적으로 링크할 때, 인라인 함수를 직접 참조할 수 없습니다.

4. **분석 도구**: `-fvisibility-inlines-hidden` 옵션을 사용하면 일부 분석 도구(디버거, CIM 등)에서 인라인 함수가 보이지 않을 수 있습니다.

## 실용적인 예: 라이브러리 만들기

이 옵션은 특히 공유 라이브러리를 만들 때 유용합니다:

```cpp
// calculator_lib.h
#pragma once

// 인라인 구현 함수이지만 공개 API로 의도됨
inline int quick_add(int a, int b) {
    return a + b;
}

// 내부용 인라인 함수 (숨기고 싶음)
namespace internal {
    inline int helper_function(int x) {
        return x * 2;
    }
}

class MathLib {
public:
    // 공개 API
    int compute(int a, int b);
    
private:
    // 내부 인라인 메서드
    inline int process(int x) {
        return internal::helper_function(x);
    }
};
```

`-fvisibility-inlines-hidden` 옵션을 사용하면:
- `quick_add` 함수는 의도적으로 공개하려면 `__attribute__((visibility("default")))` 속성을 추가해야 합니다.
- `internal::helper_function`과 `MathLib::process`는 자동으로 숨겨져 라이브러리 사용자에게 노출되지 않습니다.

이것은 라이브러리의 API 표면을 줄이고 구현 세부 사항을 숨기는 데 도움이 됩니다.

이러한 차이점은 바이너리에서만 나타나며, 코드의 기능이나 실행에는 영향을 미치지 않습니다. 이 옵션은 라이브러리 작성자가 어떤 함수를 공개 API의 일부로 노출할지 더 잘 제어할 수 있게 해줍니다.