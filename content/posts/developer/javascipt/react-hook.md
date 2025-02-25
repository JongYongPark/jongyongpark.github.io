---
title: "React Hook"
date: 2025-02-17
categories: ["Developer"]
tags: ["React", "Hook"]
---

# React Hook

React의 함수형 컴포넌트는 매 렌더링마다 컴포넌트 함수를 호출합니다. 이때 React는 내부적으로 **hook 체인(혹은 hook 리스트)**를 유지하며, 각 hook 호출마다 고유한 상태(예: useState의 상태, useEffect의 효과 정보 등)를 저장합니다. 이 구조와 재호출 과정을 자세히 설명하면 다음과 같습니다.

---


### 1. Hook 체인의 기본 구조

- **Fiber와 Hook 리스트:**  
  React는 각 컴포넌트 인스턴스(실제로는 Fiber 노드)에 hook 정보를 저장합니다. 이 정보는 hook들이 호출된 순서대로 배열(혹은 연결 리스트)로 관리되며, 각 hook은 해당 컴포넌트의 렌더링 상태와 관련된 데이터를 보관합니다.

- **순서의 중요성:**  
  함수형 컴포넌트 내에서 hook은 항상 같은 순서로 호출되어야 합니다. 그렇지 않으면 React가 이전 렌더링의 hook 체인과 새 렌더링의 hook 호출 순서를 일치시키지 못하여, 상태를 잘못 매핑하게 됩니다.

---

### 2. 컴포넌트 재호출 시 Hook의 동작 과정

1. **컴포넌트 함수 호출:**  
   컴포넌트가 업데이트되어 다시 렌더링될 때, React는 해당 함수 컴포넌트를 호출합니다. 이때 함수 내부에서 useState, useEffect, useMemo, useCallback 등 hook들이 순서대로 실행됩니다.

2. **Hook 체인과 현재 포인터:**  
   React는 내부적으로 현재 렌더링 중인 컴포넌트의 hook 체인을 관리하는 포인터를 사용합니다. 첫 번째 hook 호출은 체인의 첫 번째 노드와 매핑되고, 두 번째 호출은 두 번째 노드와 매핑되는 식입니다.

3. **상태 값 재사용:**  
   각 hook 호출 시, React는 이전 렌더링에서 저장한 hook 상태를 반환합니다. 예를 들어, useState의 경우:
   - 첫 렌더링에서 useState(0)을 호출하면, 초기 상태 0이 할당된 hook 노드가 생성됩니다.
   - 재렌더링 시 동일한 순서의 useState 호출이 이루어지면, React는 해당 hook 노드를 찾아 이전 상태(변경된 값일 수도 있음)를 반환합니다.

4. **업데이트 및 재계산:**  
   만약 상태 업데이트가 발생하면, 해당 hook의 상태가 변경되고, 이로 인해 컴포넌트 함수가 다시 호출됩니다. 이때 hook 체인의 순서를 그대로 따라가며, 각 hook은 업데이트된 상태 값을 기반으로 동작합니다.

5. **정리 함수 호출 (useEffect 등):**  
   useEffect의 경우, 의존성 배열이 변경되었거나 컴포넌트가 언마운트될 때 정리 함수(clean-up function)가 호출됩니다. 이 역시 이전 렌더링의 hook 체인 내에서 관리됩니다.

---

### 3. 메모리와 생명주기 관점에서의 설명

- **메모리 관리:**  
  각 hook의 상태는 컴포넌트의 Fiber 내에 저장되며, 이 메모리는 컴포넌트의 생명주기 동안 유지됩니다. 함수형 컴포넌트 자체는 호출 후 스택에서 사라지지만, hook 상태는 Fiber에 의해 지속적으로 관리되어 다음 렌더링 시 재사용됩니다.

- **생명주기와 재연결:**  
  함수형 컴포넌트가 재호출되면, 이전 렌더링 시 생성된 hook 체인의 상태와 새로 실행되는 함수의 hook 호출 순서가 일치합니다. 이렇게 해서 각 hook은 “연결(연관)”되어, 이전 상태를 그대로 유지한 채 새로운 렌더링 로직과 연결됩니다.  
  이 메커니즘 덕분에, useState나 useEffect 등에서 선언한 상태와 부수 효과가 컴포넌트의 생명주기 동안 올바르게 동작하게 됩니다.

---

### 4. 요약

- **Hook 체인:**  
  React는 각 컴포넌트 Fiber에 hook 체인을 유지하여, hook들이 호출된 순서대로 상태를 저장합니다.

- **재렌더링 시 동작:**  
  컴포넌트 함수가 재호출될 때, hook 호출 순서에 따라 이전에 저장된 상태를 재사용하며, 새로운 상태 업데이트 및 부수 효과를 적용합니다.

- **메모리 유지:**  
  함수형 컴포넌트 자체는 스택에 존재했다가 호출이 끝나면 사라지지만, hook 상태는 컴포넌트 Fiber에 저장되어 다음 렌더링 시 재사용되므로, 컴포넌트의 전체 생명주기 동안 유지됩니다.

이러한 구조 덕분에 함수형 컴포넌트와 Hook은 가볍고 효율적으로 상태를 관리하면서도, 재렌더링 시에도 이전 상태를 안정적으로 유지할 수 있습니다.

---

#  Hook 자세한 설명

아래는 함수형 컴포넌트에서 Hook이 메모리와 생명주기 측면에서 어떻게 동작하는지, 그리고 컴포넌트가 재렌더링될 때 Hook들이 어떻게 다시 연결되는지를 도식적으로 설명한 내용입니다.

---

### 1. 초기 렌더링 시 Hook 체인 구성

함수형 컴포넌트가 처음 렌더링될 때, React는 내부 Fiber 노드에 **Hook 체인(리스트)**를 생성합니다.  
예를 들어, 아래와 같이 작성된 컴포넌트가 있다고 가정합니다.

```jsx
function MyComponent() {
  const [count, setCount] = useState(0);       // Hook 1
  const memoValue = useMemo(() => computeExpensiveValue(count), [count]); // Hook 2
  useEffect(() => {                            // Hook 3
    // 부수 효과 (예: API 호출)
    return () => {
      // 정리(clean-up) 코드
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Memoized Value: {memoValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**도식 1: 초기 렌더링 시 Hook 체인**

```
+-----------------------------------------------+
|            MyComponent Fiber                  |
|  +-----------------------------------------+  |
|  | Hook Chain (순서대로 저장됨)           |  |
|  |---------------------------------------|  |
|  | Hook 1: useState(초기값 0)             |  |
|  | Hook 2: useMemo(..., [count])          |  |
|  | Hook 3: useEffect(..., [count])        |  |
|  +-----------------------------------------+  |
+-----------------------------------------------+
```

- **메모리 관점:**  
  함수형 컴포넌트 자체는 호출되고 나면 스택에서 사라지지만, 이때 생성된 Hook 상태는 Fiber 노드 내에 저장되어 컴포넌트의 전체 생명주기 동안 유지됩니다.

- **생명주기 관점:**  
  Hook 체인은 컴포넌트가 마운트된 이후 업데이트 및 언마운트 시에도 계속 유지되며, 각 Hook은 지정한 의존성 배열에 따라 재실행 혹은 정리(clean-up)됩니다.

---

### 2. 재렌더링 시 Hook의 재호출 및 연결 과정

상태 업데이트(예: `setCount` 호출)로 인해 컴포넌트가 다시 렌더링될 때, React는 **동일한 순서**로 Hook들을 다시 호출합니다.  
이때, 이전 렌더링 시 생성된 Hook 체인과 호출 순서가 일치해야 올바른 상태가 재사용됩니다.

**도식 2: 재렌더링 과정**

```
[렌더링 1]
MyComponent() 호출 → Hook 체인 생성: [H1, H2, H3]

   상태: H1(count)=0, H2(memoValue)=computedValue, H3(effect)=등록됨

   ────────── 상태 업데이트 (setCount 호출) ──────────

[렌더링 2]
MyComponent() 다시 호출 → 
React 내부에서는 Hook 포인터를 초기화하여,
   - 첫 번째 호출: useState → 기존 H1(count)의 값(예: 0 혹은 업데이트된 값) 반환
   - 두 번째 호출: useMemo → 의존성([count])에 따라 H2의 값을 재계산하거나 이전 값을 재사용
   - 세 번째 호출: useEffect → 의존성에 따라 H3의 효과를 재실행하거나 그대로 유지
```

- **메모리 관점:**  
  함수형 컴포넌트가 재호출되어 스택에 올라가고 실행이 끝나면 스택에서는 사라지지만, Hook 체인에 저장된 상태는 Fiber 내에서 그대로 남아 다음 렌더링 시 재사용됩니다.

- **생명주기 관점:**  
  각 Hook은 자신의 생명주기(마운트, 업데이트, 언마운트)를 Fiber 내 Hook 체인과 연결하여 관리됩니다. 예를 들어, `useEffect`는 의존성 배열이 변경되면 정리 함수를 호출하고 새로운 효과를 설정하며, 컴포넌트 언마운트 시 정리 함수가 실행됩니다.

---

### 3. 요약

- **초기 렌더링:**  
  - 컴포넌트 함수가 처음 호출될 때, React는 Hook 체인을 생성하여 각 Hook의 초기 상태를 Fiber에 저장합니다.
  
- **재렌더링:**  
  - 상태 업데이트 후 컴포넌트 함수가 다시 호출되면, Hook들이 호출된 순서에 따라 이전의 Hook 체인과 매핑되어 저장된 상태를 반환하거나 업데이트합니다.
  
- **메모리 관리:**  
  - 함수형 컴포넌트 함수는 호출 후 스택에서 사라지지만, Hook 상태는 Fiber에 저장되어 컴포넌트의 전체 생명주기 동안 유지됩니다.
  
- **생명주기 관리:**  
  - Hook들은 각각의 생명주기(마운트, 업데이트, 언마운트)를 관리하며, 정리 함수 등을 통해 리소스를 해제합니다.

이와 같이, React는 Hook 체인을 이용하여 함수형 컴포넌트의 상태와 부수 효과를 효과적으로 관리하며, 컴포넌트가 재렌더링될 때마다 이전 상태와 생명주기 정보를 안전하게 재사용합니다.

---

# 여러 Hook 의 동작 설명 

아래는 React에서 기본적으로 지원하는 주요 Hook들과 각 Hook의 예제 코드 및 동작 원리에 대한 자세한 설명입니다.

---

## 1. useState

**역할:**  
함수형 컴포넌트 내에서 상태 변수를 선언하고, 해당 상태를 업데이트하며 컴포넌트를 재렌더링합니다.

**예제 코드:**

```jsx
import React, { useState } from 'react';

function Counter() {
  // 초기 상태값 0을 가진 count 변수를 선언하고, setCount 함수를 통해 업데이트합니다.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

export default Counter;
```

**동작 원리:**  
- **초기 렌더링:**  
  - `useState`는 컴포넌트의 초기 상태를 설정하고, React 내부 Fiber에 해당 상태를 저장합니다.
- **업데이트:**  
  - `setCount`를 호출하면 새로운 상태가 Fiber에 업데이트되고, 컴포넌트가 재렌더링됩니다.
- **상태 유지:**  
  - 함수형 컴포넌트는 호출이 끝난 후 스택에서 사라지지만, hook 상태는 Fiber에 저장되어 컴포넌트의 전체 생명주기 동안 유지됩니다.

---

## 2. useEffect

**역할:**  
부수 효과(side effects)를 처리합니다. 예를 들어, 데이터 페칭, 구독, 타이머 설정 등이 해당됩니다.  
클래스형 컴포넌트의 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`를 통합한 역할을 합니다.

**예제 코드:**

```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  // 의존성 배열이 빈 배열이면 마운트/언마운트 시에만 실행됩니다.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 정리(clean-up) 함수: 컴포넌트 언마운트 시 타이머를 해제합니다.
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <p>타이머: {seconds}초</p>
    </div>
  );
}

export default Timer;
```

**동작 원리:**  
- **마운트 시:**  
  - 컴포넌트가 처음 렌더링되면 `useEffect`의 콜백이 실행되어 타이머가 설정됩니다.
- **업데이트 시:**  
  - 의존성 배열에 포함된 값이 변경되면 효과가 재실행됩니다.
- **언마운트 시:**  
  - `useEffect`에서 반환한 정리 함수가 호출되어 타이머와 같은 부수 효과가 정리됩니다.
- **메모리 관리:**  
  - 부수 효과에 의해 할당된 리소스(예: 타이머)는 정리 함수로 해제하여 메모리 누수를 방지합니다.

---

## 3. useContext

**역할:**  
React의 Context API를 사용하여 전역 상태를 쉽게 공유할 수 있도록 합니다.  
상위 컴포넌트에서 제공한 값을 하위 컴포넌트에서 간편하게 접근할 수 있습니다.

**예제 코드:**

```jsx
import React, { createContext, useContext } from 'react';

// Context 생성
const ThemeContext = createContext('light');

function ThemedComponent() {
  // useContext를 통해 상위에서 제공한 값을 읽어옵니다.
  const theme = useContext(ThemeContext);
  return <div>현재 테마: {theme}</div>;
}

function App() {
  return (
    // Provider를 통해 하위 컴포넌트에 값 제공
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}

export default App;
```

**동작 원리:**  
- **Provider:**  
  - 상위 컴포넌트에서 `ThemeContext.Provider`를 사용하여 전역 값을 설정합니다.
- **소비:**  
  - 하위 컴포넌트는 `useContext`를 호출하여 Provider로부터 전달된 값을 읽어옵니다.
- **메모리 관리:**  
  - Context 값은 React 트리 전체에 저장되어, 필요한 컴포넌트에서 재사용됩니다.

---

## 4. useReducer

**역할:**  
복잡한 상태 업데이트 로직을 보다 예측 가능하게 관리하기 위해 사용됩니다.  
Redux의 reducer 개념과 유사하며, 상태와 액션을 인자로 받아 새로운 상태를 반환하는 순수 함수를 사용합니다.

**예제 코드:**

```jsx
import React, { useReducer } from 'react';

// 상태 업데이트를 위한 리듀서 함수 정의
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>카운트: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>증가</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>감소</button>
    </div>
  );
}

export default Counter;
```

**동작 원리:**  
- **초기 상태 설정:**  
  - `useReducer`는 초기 상태와 리듀서 함수를 받아 내부 Fiber에 상태를 저장합니다.
- **상태 업데이트:**  
  - `dispatch`를 호출하면, 리듀서 함수가 현재 상태와 액션을 인자로 받아 새로운 상태를 반환하고, 컴포넌트가 재렌더링됩니다.
- **메모리 관리:**  
  - 리듀서에 의해 관리되는 상태는 컴포넌트의 전체 생명주기 동안 유지되며, 변경 시마다 업데이트됩니다.

---

## 5. useCallback

**역할:**  
함수의 재생성을 방지하여, 불필요한 렌더링이나 성능 저하를 막습니다.  
특히, 하위 컴포넌트에 콜백 함수를 props로 전달할 때 유용합니다.

**예제 코드:**

```jsx
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // useCallback을 사용하여 handleClick 함수의 참조가 변경되지 않도록 합니다.
  const handleClick = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <div>
      <p>카운트: {count}</p>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

function ChildComponent({ onClick }) {
  console.log('ChildComponent 렌더링');
  return <button onClick={onClick}>클릭</button>;
}

export default ParentComponent;
```

**동작 원리:**  
- **함수 메모이제이션:**  
  - `useCallback`은 의존성 배열이 변경되지 않는 한 동일한 함수 객체를 반환합니다.
- **성능 최적화:**  
  - 하위 컴포넌트에 props로 전달되는 콜백 함수가 변경되지 않으므로, 불필요한 재렌더링을 방지할 수 있습니다.
- **메모리 관리:**  
  - 함수 객체의 참조가 동일하게 유지되어, 매 렌더링 시 새로운 함수를 생성하지 않습니다.

---

## 6. useMemo

**역할:**  
연산 비용이 큰 함수의 결과를 메모이제이션하여, 불필요한 재계산을 방지합니다.

**예제 코드:**

```jsx
import React, { useMemo } from 'react';

function ExpensiveCalculation({ number }) {
  // number가 변경될 때만 계산을 다시 수행합니다.
  const computedValue = useMemo(() => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += number * i;
    }
    return result;
  }, [number]);

  return <div>계산 결과: {computedValue}</div>;
}

export default ExpensiveCalculation;
```

**동작 원리:**  
- **메모이제이션:**  
  - `useMemo`는 의존성 배열의 값이 변경되지 않는 한 이전에 계산된 값을 반환합니다.
- **성능 최적화:**  
  - 복잡한 계산을 반복하지 않고, 저장된 결과를 재사용하여 CPU 사용량을 줄입니다.
- **메모리 관리:**  
  - 계산 결과가 내부에 저장되어 컴포넌트 렌더링 간 유지됩니다.

---

## 7. useRef

**역할:**  
DOM 요소에 직접 접근하거나, 컴포넌트 전반에 걸쳐 변경되지만 렌더링에 영향을 주지 않는 값을 저장하는 데 사용됩니다.

**예제 코드:**

```jsx
import React, { useRef } from 'react';

function TextInput() {
  // useRef를 사용하여 DOM 요소에 대한 참조를 생성합니다.
  const inputRef = useRef(null);

  const focusInput = () => {
    // inputRef.current를 사용하여 실제 DOM 요소에 접근합니다.
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>포커스 주기</button>
    </div>
  );
}

export default TextInput;
```

**동작 원리:**  
- **참조 유지:**  
  - `useRef`로 생성된 객체는 `.current` 프로퍼티를 통해 값을 저장합니다.
- **재렌더링 영향 없음:**  
  - ref의 값이 변경되어도 컴포넌트는 재렌더링되지 않으므로, 상태 업데이트 없이도 데이터를 보관할 수 있습니다.
- **DOM 접근:**  
  - 주로 DOM 요소에 직접 접근하거나, 외부 라이브러리와의 연동에 사용됩니다.

---

## 8. useLayoutEffect

**역할:**  
`useEffect`와 유사하지만, 브라우저가 화면에 페인팅(paint)하기 전에 동기적으로 실행되어 DOM 변경 사항을 즉시 반영할 수 있습니다.

**예제 코드:**

```jsx
import React, { useLayoutEffect, useRef, useState } from 'react';

function LayoutComponent() {
  const divRef = useRef(null);
  const [width, setWidth] = useState(0);

  // useLayoutEffect는 브라우저 페인팅 전에 실행됩니다.
  useLayoutEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div>
      <div ref={divRef} style={{ width: '50%' }}>
        박스
      </div>
      <p>박스 너비: {width}px</p>
    </div>
  );
}

export default LayoutComponent;
```

**동작 원리:**  
- **동기적 실행:**  
  - `useLayoutEffect`는 DOM 변경 후 브라우저가 페인팅하기 전에 실행되므로, 레이아웃이나 측정값을 즉시 업데이트할 수 있습니다.
- **성능 고려:**  
  - 동기적으로 실행되므로, 렌더링 성능에 영향을 줄 수 있어 꼭 필요한 경우에만 사용하는 것이 좋습니다.

---

## 9. 요약 및 Hook 동작 원리

React는 각 함수형 컴포넌트 렌더링 시, 호출된 순서대로 Hook들을 **Hook 체인**에 저장합니다.  
- **초기 렌더링:**  
  - 각 Hook이 호출되어 초기 값(또는 계산된 값)을 내부 Fiber에 저장합니다.
- **재렌더링:**  
  - 컴포넌트 함수가 다시 호출되면, React는 동일한 순서의 Hook 호출을 통해 기존 상태(혹은 값)를 재사용하거나 업데이트합니다.
- **메모리와 생명주기:**  
  - 함수형 컴포넌트는 호출 후 스택에서 사라지지만, Hook 상태는 Fiber에 저장되어 컴포넌트의 전체 생명주기 동안 유지됩니다.
  - `useEffect`와 `useLayoutEffect`는 컴포넌트의 마운트, 업데이트, 언마운트 시에 필요한 부수 효과와 정리 작업을 관리합니다.
  - `useRef`는 재렌더링 간에 변경되어도 유지되는 값을 보관하여 DOM 접근이나 값 저장에 활용됩니다.

이와 같이, React의 Hook들은 각기 다른 용도로 상태, 부수 효과, 메모이제이션, DOM 참조 등을 관리하며, 컴포넌트의 효율적인 렌더링과 메모리 관리를 지원합니다.

