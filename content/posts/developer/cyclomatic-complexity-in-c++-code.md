---
title: "Cyclomatic Complexity in C++ Code"
date: 2025-01-31
categories: ["Developer"]
tags: ["C++","CCM"]
---


# Cyclomatic Complexity in C++ Code

Cyclomatic Complexity (CCM) is a software metric used to indicate the complexity of a program. It directly measures the number of linearly independent paths through a program's source code. Higher CCM values suggest more complex and potentially less maintainable code.

## CCM Calculation Rules

Cyclomatic Complexity is calculated based on the control flow graph of the program using the following rules:

1. Basic Complexity: The simplest program has a CCM of 1.
2. Control Flow Branches: Each if, for, while, case, and other control flow statements add to the CCM.
3. Logical Operators: Logical operators like && and || can also increase CCM by introducing additional paths.

## Example C++ Code with CCM Calculation

```cpp
#include <iostream>

using namespace std;

// Function declaration
int calculate(int a, int b, int c);

int main() {
    int x = 10;
    int y = 20;
    int z = 30;
    int result = calculate(x, y, z);
    cout << "Result: " << result << endl;
    return 0;
}

// Function with high Cyclomatic Complexity
int calculate(int a, int b, int c) {
    int CCM = 1; // Basic complexity

    // If statement 1: CCM += 1
    if (a > b) {
        CCM++;
        cout << "a is greater than b" << endl;
    }

    // If-else statement: CCM += 1
    if (b > c) {
        CCM++;
        cout << "b is greater than c" << endl;
    } else {
        CCM++;
        cout << "c is greater than or equal to b" << endl;
    }

    // For loop: CCM += 1
    for(int i = 0; i < 5; ++i) {
        CCM++;
        cout << "Iteration: " << i << endl;
    }

    // While loop: CCM += 1
    int count = 0;
    while(count < 3) {
        CCM++;
        cout << "Count: " << count << endl;
        count++;
    }

    // Switch-case statement: Each case adds to CCM
    int option = 2;
    switch(option) {
        case 1:
            CCM++;
            cout << "Option 1 selected" << endl;
            break;
        case 2:
            CCM++;
            cout << "Option 2 selected" << endl;
            break;
        case 3:
            CCM++;
            cout << "Option 3 selected" << endl;
            break;
        default:
            CCM++;
            cout << "Default option selected" << endl;
            break;
    }

    // Logical operators: Each '&&' or '||' adds to CCM
    if (a > 0 && b > 0) { // '&&' adds 1
        CCM++;
        cout << "Both a and b are positive" << endl;
    }

    if (a > 0 || c > 0) { // '||' adds 1
        CCM++;
        cout << "Either a or c is positive" << endl;
    }

    return CCM;
}
```

## Code Explanation and CCM Calculation

1. Basic Complexity:
   - CCM = 1
   - Every function starts with a CCM of 1.

2. First if Statement:
   - Condition: `if (a > b)`
   - CCM increases by 1.
   - Current CCM: 2

3. Second if-else Statement:
   - Condition: `if (b > c) ... else ...`
   - if and else constitute a single decision point, increasing CCM by 1.
   - Current CCM: 3

4. for Loop:
   - Condition: `for(int i = 0; i < 5; ++i)`
   - Loops introduce a new path, increasing CCM by 1.
   - Current CCM: 4

5. while Loop:
   - Condition: `while(count < 3)`
   - Another loop adds to CCM by 1.
   - Current CCM: 5

6. switch-case Statement:
   - Each case and default adds to CCM.
   - 4 cases (1, 2, 3, default) increase CCM by 4.
   - Current CCM: 9

7. Logical Operators (&& and ||):
   - `if (a > 0 && b > 0)`
     - && adds 1 to CCM.
     - Current CCM: 10
   - `if (a > 0 || c > 0)`
     - || adds 1 to CCM.
     - Final CCM: 11

## Final Cyclomatic Complexity

The `calculate` function has a final CCM value of 11.

### CCM Increase Summary

| Code Structure | CCM Increase | Description |
|----------------|--------------|-------------|
| Basic Complexity | 1 | Function starts with CCM = 1 |
| if (a > b) | +1 | Conditional branch |
| if (b > c) else | +1 | Conditional branch with else |
| for Loop | +1 | Loop introduces a new path |
| while Loop | +1 | Loop introduces a new path |
| switch-case (4 cases) | +4 | Each case and default adds a branch |
| if (a > 0 && b > 0) | +1 | Logical AND operator adds a branch |
| if (a > 0 \|\| c > 0) | +1 | Logical OR operator adds a branch |
| **Total Cyclomatic Complexity** | **11** | |

## Importance of Cyclomatic Complexity

Cyclomatic Complexity is crucial for several reasons:

1. Maintainability: High CCM indicates complex code that is harder to understand and maintain.
2. Testability: Higher CCM requires more test cases to achieve adequate test coverage.
3. Bug Risk: Complex code is more prone to bugs and errors.

## Optimizing Cyclomatic Complexity

To keep CCM manageable, consider the following practices:

1. Simplify Conditional Statements: Reduce the number of nested conditions and use simpler logic.
2. Refactor Functions: Break down large functions into smaller, single-responsibility functions.
3. Minimize switch-case Statements: Use polymorphism or other design patterns to handle multiple cases.
4. Limit Logical Operators: Avoid excessive use of && and || in conditional statements.

## Conclusion

Cyclomatic Complexity Metric (CCM) is a valuable tool for assessing and managing the complexity of your code. By understanding how different C++ structures affect CCM, you can write cleaner, more maintainable, and less error-prone code.

## CCM Calculation from compiled code
```bash
g++ ccm.cpp
./a.out
c is greater than or equal to b
Iteration: 0
Iteration: 1
Iteration: 2
Iteration: 3
Iteration: 4
Count: 0
Count: 1
Count: 2
Option 2 selected
Both a and b are positive
Either a or c is positive
Result: 13
```
## CCM Calculation from Coverity

![alt text](.md/cyclomatic-complexity-in-c++-code/ccm.png)

## CCM 

https://learn.microsoft.com/en-us/visualstudio/code-quality/code-metrics-cyclomatic-complexity?view=vs-2022

https://www.mathworks.com/help/matlab/matlab_prog/measure-code-complexity-using-cyclomatic-complexity.html

https://www.sonarsource.com/learn/cyclomatic-complexity/

## Minimizing Cyclomatic Complexity with Pattern Matching

https://www.danylkoweb.com/Blog/minimizing-cyclomatic-complexity-with-pattern-matching-SR

https://www.rhyous.com/2017/10/19/eliminating-cylclomatic-complexity-by-replacing-switchcase-with-a-method-or-a-dictionary/


----
# C++ 코드에서 여러 식과 문에서 변수 `CCM`의 값이 어떻게 변하는지 보여주는 예제

C++ 코드에서 여러 식과 문에서 변수 `CCM`의 값이 어떻게 변하는지 보여주는 예제를 작성해보겠습니다. 특히 `switch-case` 문 내에서 `CCM`의 변화도 포함하겠습니다. 이 예제에서는 `CCM`을 정수형 변수로 가정하고, 다양한 연산과 제어 구조를 통해 `CCM`의 값을 변경하며 그 변화를 출력합니다.

```cpp
#include <iostream>

using namespace std;

int main() {
    int CCM = 0; // 초기값 설정
    cout << "초기 CCM 값: " << CCM << endl;

    // 1. 단순 대입 연산
    CCM = 5;
    cout << "대입 후 CCM 값: " << CCM << endl;

    // 2. 덧셈 연산
    CCM += 10;
    cout << "덧셈 후 CCM 값: " << CCM << endl;

    // 3. 뺄셈 연산
    CCM -= 3;
    cout << "뺄셈 후 CCM 값: " << CCM << endl;

    // 4. 곱셈 연산
    CCM *= 2;
    cout << "곱셈 후 CCM 값: " << CCM << endl;

    // 5. 나눗셈 연산
    if (CCM != 0) { // 0으로 나누는 것을 방지
        CCM /= 4;
        cout << "나눗셈 후 CCM 값: " << CCM << endl;
    }

    // 6. 조건부 연산 (삼항 연산자)
    CCM = (CCM > 3) ? CCM + 1 : CCM - 1;
    cout << "조건부 연산 후 CCM 값: " << CCM << endl;

    // 7. 증감 연산
    CCM++;
    cout << "증가 연산 후 CCM 값: " << CCM << endl;

    CCM--;
    cout << "감소 연산 후 CCM 값: " << CCM << endl;

    // 8. 비트 연산
    CCM = CCM << 1; // 왼쪽 시프트
    cout << "비트 시프트 후 CCM 값: " << CCM << endl;

    CCM = CCM & 0xF; // 비트 AND
    cout << "비트 AND 후 CCM 값: " << CCM << endl;

    // 9. 논리 연산
    bool flag = (CCM != 0);
    cout << "논리 연산 후 flag 값: " << flag << endl;

    // 10. switch-case 문에서 CCM 값 변경
    int option = 2;
    switch(option) {
        case 1:
            CCM += 100;
            cout << "switch-case 1 실행 후 CCM 값: " << CCM << endl;
            break;
        case 2:
            CCM += 200;
            cout << "switch-case 2 실행 후 CCM 값: " << CCM << endl;
            break;
        case 3:
            CCM += 300;
            cout << "switch-case 3 실행 후 CCM 값: " << CCM << endl;
            break;
        default:
            CCM += 400;
            cout << "switch-case default 실행 후 CCM 값: " << CCM << endl;
            break;
    }

    // 11. 반복문 내에서 CCM 값 변경
    for(int i = 0; i < 3; ++i) {
        CCM += i;
        cout << "for 루프 " << i+1 << "회차 후 CCM 값: " << CCM << endl;
    }

    // 12. 함수 호출을 통한 CCM 값 변경
    auto modifyCCM = [&](int value) {
        CCM += value;
        cout << "함수 호출 후 CCM 값: " << CCM << endl;
    };

    modifyCCM(50);
    modifyCCM(-20);

    return 0;
}
```

### 코드 설명

1. **초기화 및 단순 대입:**
   - `CCM`을 0으로 초기화한 후, 5로 대입합니다.
   
2. **산술 연산:**
   - `CCM`에 10을 더하고, 3을 빼고, 2를 곱하고, 4로 나눕니다.
   
3. **조건부 연산:**
   - `CCM`이 3보다 크면 1을 더하고, 그렇지 않으면 1을 뺍니다.
   
4. **증감 연산:**
   - `CCM`을 증가시키고, 다시 감소시킵니다.
   
5. **비트 연산:**
   - `CCM`을 왼쪽으로 시프트하고, 0xF(15)과 비트 AND 연산을 수행합니다.
   
6. **논리 연산:**
   - `CCM`이 0이 아닌지 확인하여 `flag`에 저장합니다.
   
7. **switch-case 문:**
   - `option` 변수의 값에 따라 `CCM`을 다르게 변경합니다. 여기서는 `option`이 2이므로 `CCM += 200`이 실행됩니다.
   
8. **반복문:**
   - `for` 루프를 통해 3번 반복하면서 `CCM`에 반복 변수 `i`를 더합니다.
   
9. **함수 호출:**
   - 람다 함수를 사용하여 `CCM`을 변경하는 함수를 정의하고, 이를 호출하여 `CCM`을 더하고 빼는 연산을 수행합니다.

### 실행 결과 예시

```
초기 CCM 값: 0
대입 후 CCM 값: 5
덧셈 후 CCM 값: 15
뺄셈 후 CCM 값: 12
곱셈 후 CCM 값: 24
나눗셈 후 CCM 값: 6
조건부 연산 후 CCM 값: 7
증가 연산 후 CCM 값: 8
감소 연산 후 CCM 값: 7
비트 시프트 후 CCM 값: 14
비트 AND 후 CCM 값: 14
논리 연산 후 flag 값: 1
switch-case 2 실행 후 CCM 값: 214
for 루프 1회차 후 CCM 값: 214
for 루프 2회차 후 CCM 값: 215
for 루프 3회차 후 CCM 값: 217
함수 호출 후 CCM 값: 267
함수 호출 후 CCM 값: 247
```

### 추가 설명

- **switch-case 문:**
  - `switch(option)`에서 `option`이 2이므로 `case 2` 블록이 실행되어 `CCM`에 200이 더해집니다.
  - 다른 `option` 값을 설정하면 해당 케이스가 실행됩니다. 예를 들어, `option = 1`로 설정하면 `case 1`이 실행됩니다.

- **람다 함수:**
  - `modifyCCM` 람다 함수는 `CCM`을 인자로 받은 값을 더하거나 빼서 변경합니다.
  - 함수 호출 시 `CCM`의 현재 값에 따라 변경된 값을 출력합니다.

이 예제는 다양한 C++ 연산과 제어 구조에서 변수 `CCM`의 값이 어떻게 변화하는지를 보여줍니다. 특히 `switch-case` 문 내에서의 `CCM` 값 변경을 포함하여, 여러 상황에서 `CCM`이 어떻게 변하는지를 쉽게 이해할 수 있습니다.


---
# 다양한 C++ 문과 식에서 CCM 값이 어떻게 변하는지를 보여주는 예제 코드

알겠습니다. Cyclomatic Complexity Metric(CCM, 사이클로매틱 복잡도 지표)은 코드의 복잡성을 측정하는 데 사용되는 지표로, 주로 제어 흐름의 복잡성을 평가합니다. CCM은 프로그램 내의 독립적인 경로의 수를 나타내며, 유지보수성과 테스트 용이성을 평가하는 데 유용합니다.

아래는 다양한 C++ 문과 식에서 CCM 값이 어떻게 변하는지를 보여주는 예제 코드입니다. 특히 `switch-case` 문이 CCM에 미치는 영향도 포함하였습니다.

## Cyclomatic Complexity 계산 규칙

Cyclomatic Complexity는 다음과 같은 규칙에 따라 계산됩니다:

1. **기본 복잡도**: 시작점과 종료점 사이의 선형 경로는 기본적으로 1의 복잡도를 가집니다.
2. **제어 흐름 분기**: `if`, `while`, `for`, `case` 등 제어 흐름을 분기시키는 각 구조는 복잡도를 1씩 증가시킵니다.
3. **논리 연산자**: `&&`, `||` 같은 논리 연산자는 추가적인 분기를 생성하여 복잡도를 증가시킬 수 있습니다.

## 예제 코드 및 CCM 설명

```cpp
#include <iostream>

using namespace std;

// 함수 선언
int calculate(int a, int b, int c);

int main() {
    int x = 10;
    int y = 20;
    int z = 30;
    int result = calculate(x, y, z);
    cout << "결과: " << result << endl;
    return 0;
}

// Cyclomatic Complexity가 높은 함수
int calculate(int a, int b, int c) {
    int CCM = 1; // 기본 복잡도

    // if 문 1: CCM += 1
    if (a > b) {
        CCM++;
        cout << "a가 b보다 큼" << endl;
    }

    // if-else 문 1: CCM += 1
    if (b > c) {
        CCM++;
        cout << "b가 c보다 큼" << endl;
    } else {
        CCM++;
        cout << "c가 b보다 크거나 같음" << endl;
    }

    // for 루프 1: CCM += 1
    for(int i = 0; i < 5; ++i) {
        CCM++;
        cout << "반복 횟수: " << i << endl;
    }

    // while 루프 1: CCM += 1
    int count = 0;
    while(count < 3) {
        CCM++;
        cout << "카운트: " << count << endl;
        count++;
    }

    // switch-case 문: 각 case마다 CCM += 1
    int option = 2;
    switch(option) {
        case 1:
            CCM++;
            cout << "옵션 1 선택" << endl;
            break;
        case 2:
            CCM++;
            cout << "옵션 2 선택" << endl;
            break;
        case 3:
            CCM++;
            cout << "옵션 3 선택" << endl;
            break;
        default:
            CCM++;
            cout << "기본 옵션 선택" << endl;
            break;
    }

    // 논리 연산자 사용: && 또는 || 사용 시 CCM += 1
    if (a > 0 && b > 0) { // && 연산자 하나로 CCM += 1
        CCM++;
        cout << "a와 b가 모두 양수임" << endl;
    }

    if (a > 0 || c > 0) { // || 연산자 하나로 CCM += 1
        CCM++;
        cout << "a 또는 c가 양수임" << endl;
    }

    return CCM;
}
```

### 코드 설명 및 CCM 계산

1. **기본 복잡도**: `CCM = 1`
   
2. **첫 번째 `if` 문**:
   - 조건문: `if (a > b)`
   - CCM 증가: +1
   - 현재 CCM: 2

3. **두 번째 `if-else` 문**:
   - 조건문: `if (b > c) ... else ...`
   - `if`와 `else`는 동일한 조건 분기이므로 CCM 증가: +1
   - 현재 CCM: 3

4. **`for` 루프**:
   - 조건문: `for(int i = 0; i < 5; ++i)`
   - 반복문은 하나의 독립적인 경로를 추가하므로 CCM 증가: +1
   - 현재 CCM: 4

5. **`while` 루프**:
   - 조건문: `while(count < 3)`
   - 반복문은 하나의 독립적인 경로를 추가하므로 CCM 증가: +1
   - 현재 CCM: 5

6. **`switch-case` 문**:
   - 각 `case`와 `default`는 별도의 분기를 생성
   - 총 4개의 `case` (1, 2, 3, default)
   - CCM 증가: +4
   - 현재 CCM: 9

7. **논리 연산자 `&&` 사용**:
   - 조건문: `if (a > 0 && b > 0)`
   - `&&`는 하나의 추가 분기를 생성
   - CCM 증가: +1
   - 현재 CCM: 10

8. **논리 연산자 `||` 사용**:
   - 조건문: `if (a > 0 || c > 0)`
   - `||`는 하나의 추가 분기를 생성
   - CCM 증가: +1
   - 최종 CCM: 11

### 최종 Cyclomatic Complexity

함수 `calculate`의 최종 CCM 값은 **11**입니다.

### CCM 증가 요약

| 코드 구성 요소                | CCM 증가 | 설명                                        |
|------------------------------|----------|---------------------------------------------|
| 기본 복잡도                  | 1        | 함수 시작 시 기본값                          |
| `if (a > b)`                 | +1       | 조건 분기                                   |
| `if (b > c) else`            | +1       | `if`와 `else`는 하나의 조건 분기             |
| `for` 루프                   | +1       | 반복문 분기                                 |
| `while` 루프                 | +1       | 반복문 분기                                 |
| `switch-case` (4 cases)       | +4       | 각 `case`와 `default`가 별도의 분기 생성      |
| `if (a > 0 && b > 0)`        | +1       | 논리 연산자 `&&`에 의한 분기                  |
| `if (a > 0 || c > 0)`        | +1       | 논리 연산자 `||`에 의한 분기                  |
| **총합**                     | **11**   |                                             |

## Cyclomatic Complexity의 중요성

CCM은 코드의 복잡성을 정량적으로 측정하여 다음과 같은 이점을 제공합니다:

1. **유지보수성 향상**: 높은 CCM은 코드가 복잡하고 이해하기 어려움을 나타내며, 이는 유지보수를 어렵게 만들 수 있습니다.
2. **테스트 용이성**: 높은 CCM은 테스트 커버리지를 높이기 위해 더 많은 테스트 케이스가 필요함을 의미합니다.
3. **버그 가능성**: 복잡한 코드일수록 버그가 발생할 가능성이 높아집니다.

따라서, 가능한 한 낮은 CCM을 유지하는 것이 코드의 품질과 유지보수성을 향상시키는 데 도움이 됩니다.

## CCM 최적화 방안

1. **조건문 단순화**: 복잡한 조건문을 단순화하거나 논리 연산자를 줄입니다.
2. **함수 분할**: 하나의 함수에 너무 많은 로직을 포함하지 않고, 기능별로 작은 함수로 분할합니다.
3. **스위치 케이스 최소화**: 가능한 경우 `switch-case` 대신 다른 구조를 사용하거나, 각 `case`를 별도의 함수로 분리합니다.
4. **반복문 최소화**: 반복문 내의 복잡한 로직을 단순화합니다.

## 결론

Cyclomatic Complexity Metric(CCM)은 코드의 복잡성을 측정하고 관리하는 데 중요한 도구입니다. 위의 예제와 설명을 통해 다양한 C++ 구조에서 CCM이 어떻게 변하는지 이해할 수 있었기를 바랍니다. 코드를 작성할 때 CCM을 고려하여 가능한 한 간결하고 단순한 구조를 유지하는 것이 바람직합니다.