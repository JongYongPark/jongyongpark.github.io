---
title: "React Native"
date: 2025-02-17
categories: ["Developer"]
tags: ["React", "Native"]
---

# React Native 와 React 의 차이 

React Native는 React의 개념과 철학을 기반으로 하지만, 주로 모바일 앱 개발(안드로이드와 iOS)을 위해 설계된 프레임워크입니다. 아래에서는 React Native의 주요 특징과 React(Web)와의 차이점을 자세히 설명합니다.

---

## 1. React Native란?

- **목적:**  
  React Native는 JavaScript와 React의 컴포넌트 기반 아키텍처를 활용하여 네이티브 모바일 앱(안드로이드, iOS)을 개발할 수 있도록 해줍니다.  
  웹 브라우저가 아닌, 모바일 기기의 네이티브 UI 컴포넌트(예: `View`, `Text`, `Image`)를 사용하여 사용자 인터페이스를 구성합니다.

- **구조 및 실행 방식:**  
  - **JS 코드와 네이티브 브리지:**  
    React Native 앱은 JavaScript 코드로 작성되며, 이 코드는 JavaScript 엔진(V8, Hermes 등)에서 실행됩니다.  
    JavaScript와 네이티브 플랫폼 간의 통신은 "브리지(Bridge)"를 통해 이뤄지며, 이로 인해 JavaScript 코드에서 네이티브 UI 컴포넌트나 기능을 호출할 수 있습니다.
  - **플랫폼별 네이티브 컴포넌트:**  
    React Native는 플랫폼에 최적화된 네이티브 UI 컴포넌트를 사용하여, 높은 성능과 원활한 사용자 경험을 제공합니다.

---

## 2. React (Web)와 React Native의 차이점

### 2.1 렌더링 대상

- **React (Web):**  
  - 웹 브라우저의 DOM(Document Object Model)을 대상으로 렌더링합니다.
  - HTML, CSS, JavaScript를 사용하여 UI를 구성합니다.

- **React Native:**  
  - 웹 브라우저 대신 모바일 기기의 네이티브 UI 컴포넌트를 대상으로 렌더링합니다.
  - HTML/CSS 대신, 스타일 시트(스타일 객체)를 사용하여 `View`, `Text`, `Image` 등 네이티브 컴포넌트로 UI를 구성합니다.

### 2.2 스타일링 및 레이아웃

- **React (Web):**  
  - CSS를 사용하여 레이아웃과 스타일을 지정합니다.
  - Flexbox, Grid 등의 다양한 CSS 레이아웃 시스템을 활용합니다.

- **React Native:**  
  - CSS 문법과 유사한 스타일 객체를 사용하지만, 실제 구현은 네이티브 스타일 시스템에 매핑됩니다.
  - Flexbox를 주로 사용하여 레이아웃을 구성하며, CSS의 일부 기능(예: 미디어 쿼리)은 지원하지 않습니다.

### 2.3 네이티브 기능 접근

- **React (Web):**  
  - 브라우저 API(예: DOM API, Fetch API 등)를 통해 기능을 구현합니다.
  - 직접적으로 기기 하드웨어(카메라, 센서 등)에 접근하기 어렵습니다.

- **React Native:**  
  - 네이티브 모듈이나 서드파티 라이브러리를 통해 카메라, 위치 서비스, 센서 등 기기 하드웨어에 접근할 수 있습니다.
  - Java, Swift, Objective-C 등 네이티브 코드와 연동이 용이하며, 필요에 따라 커스텀 모듈을 작성할 수 있습니다.

### 2.4 성능과 사용자 경험

- **React (Web):**  
  - 웹 브라우저 환경에서 동작하므로, 브라우저의 성능 한계와 네트워크 속도에 의존합니다.
  - 웹 앱은 데스크톱과 모바일 브라우저에서 동일한 UI를 사용하지만, 모바일 웹 앱은 네이티브 앱에 비해 성능 및 UX에서 제약이 있을 수 있습니다.

- **React Native:**  
  - 네이티브 앱과 유사한 성능을 제공하기 위해 최적화되어 있으며, 네이티브 UI 컴포넌트를 사용합니다.
  - 앱의 응답성, 애니메이션, 제스처 처리 등이 네이티브 수준에 가깝습니다.

### 2.5 코드 재사용성

- **React (Web):**  
  - 웹 기반의 UI와 로직을 작성하며, 플랫폼에 특화된 브라우저 API와 기술을 사용합니다.
  
- **React Native:**  
  - 대부분의 React 컴포넌트와 로직은 공유할 수 있지만, UI 렌더링과 스타일링, 플랫폼 별 네이티브 기능에 따라 별도의 코드 분기가 필요할 수 있습니다.
  - 동일한 비즈니스 로직은 공유하면서, 뷰와 스타일 부분만 플랫폼별로 다르게 구현하는 접근 방식을 취할 수 있습니다.

---

## 3. 요약

- **React Native**는 React의 컴포넌트 기반 구조를 유지하면서, 모바일 기기용 네이티브 UI 컴포넌트를 사용하여 높은 성능과 네이티브 사용자 경험을 제공합니다.
- **React (Web)**은 HTML, CSS, DOM을 사용하여 웹 브라우저에서 UI를 렌더링합니다.
- 주요 차이점은 **렌더링 대상, 스타일링 방식, 네이티브 기능 접근성, 성능, 그리고 플랫폼 특화 코드 관리**에 있습니다.
- React Native는 **브리지(Bridge)**를 통해 JavaScript와 네이티브 코드 간의 통신을 관리하며, 이를 통해 모바일 앱 개발에 최적화된 환경을 제공합니다.

이러한 차이점을 이해하면, 프로젝트 요구사항에 맞춰 React와 React Native 중 적절한 선택을 할 수 있습니다.

---

# Bridge 와 통신 방법 

아래는 React Native에서 JavaScript 코드와 네이티브 코드가 **Bridge**를 통해 어떻게 통신하는지 구체적인 예와 도표를 통해 설명한 내용입니다.

---

## 1. React Native Bridge 개요

React Native는 **Bridge**라는 중간 계층을 두어, JavaScript 코드와 네이티브 코드(안드로이드의 Java/Kotlin, iOS의 Objective-C/Swift) 간의 통신을 처리합니다.  
이 통신은 **비동기적**으로 이루어지며, 메시지 큐를 통해 직렬화된 데이터를 교환합니다.

### 주요 구성 요소

- **JS 스레드:**  
  JavaScript 코드가 실행되는 스레드로, React 컴포넌트의 로직, 상태 관리, 렌더링 관련 코드를 수행합니다.

- **Bridge:**  
  JS 스레드와 네이티브 스레드 사이의 메시지 교환 역할을 하며, 직렬화(Serialization)와 역직렬화(Deserialization)를 통해 데이터를 전달합니다.

- **네이티브 모듈:**  
  플랫폼 별 네이티브 기능(예: 카메라, 위치, 파일 시스템 등)을 제공하는 모듈로, JavaScript에서 호출하면 Bridge를 통해 네이티브로 전달되어 처리되고 결과를 다시 JS에 반환합니다.

---

## 2. 통신 과정 예시

### 예제 시나리오

**예시:** JavaScript에서 네이티브 모듈의 `getDeviceName` 함수를 호출하여 기기 이름을 받아오는 경우

### JavaScript 코드 (React Native)

```javascript
// JavaScript에서 네이티브 모듈을 불러옴
import { NativeModules } from 'react-native';
const { DeviceInfoModule } = NativeModules;

async function fetchDeviceName() {
  try {
    const deviceName = await DeviceInfoModule.getDeviceName();
    console.log('Device Name:', deviceName);
  } catch (error) {
    console.error('Error fetching device name:', error);
  }
}

fetchDeviceName();
```

### 네이티브 코드 (예: iOS Objective-C)

```objective-c
// DeviceInfoModule.h
#import <React/RCTBridgeModule.h>

@interface DeviceInfoModule : NSObject <RCTBridgeModule>
@end

// DeviceInfoModule.m
#import "DeviceInfoModule.h"
#import <UIKit/UIKit.h>

@implementation DeviceInfoModule

// React Native에 노출할 모듈 이름
RCT_EXPORT_MODULE();

// getDeviceName 함수를 JavaScript에서 호출할 수 있도록 등록
RCT_EXPORT_METHOD(getDeviceName:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    // 네이티브 방식으로 기기 이름 가져오기
    NSString *deviceName = [[UIDevice currentDevice] name];
    resolve(deviceName);
  }
  @catch (NSException *exception) {
    reject(@"device_error", @"Unable to fetch device name", nil);
  }
}

@end
```

---

## 3. Bridge를 통한 통신 도식

다음 도표는 JS 스레드와 네이티브 모듈 간의 통신 과정을 간략하게 나타냅니다.

```
+-----------------+       Message (Serialized JSON)        +-----------------------+
|                 |  ------------------------------------>   |                       |
|   JS Thread     |                                        |       Bridge          |
|  (React Code)   |  <------------------------------------   |                       |
|                 |           Response Message             +-----------------------+
+-----------------+                                         ^          |
                                                           |          |
                                                           |          v
                                                   +-----------------------+
                                                   |                       |
                                                   |  Native Module        |
                                                   |  (Objective-C/Swift   |
                                                   |   or Java/Kotlin)     |
                                                   +-----------------------+
```

**설명:**

1. **요청 단계:**  
   - JavaScript 코드에서 `DeviceInfoModule.getDeviceName()` 호출 시, 해당 호출이 직렬화되어 Bridge로 전송됩니다.
  
2. **Bridge 처리:**  
   - Bridge는 이 메시지를 네이티브 모듈이 이해할 수 있는 형식(보통 JSON 형태)으로 변환하여 네이티브 스레드로 전달합니다.

3. **네이티브 처리:**  
   - 네이티브 모듈(예: DeviceInfoModule)은 메시지를 받아 기기 이름을 조회한 후, 결과를 다시 직렬화하여 Bridge로 보냅니다.

4. **응답 단계:**  
   - Bridge는 네이티브 모듈에서 전달받은 응답 메시지를 역직렬화하여 JavaScript 스레드로 전달하고, Promise의 resolve를 통해 최종 결과가 반환됩니다.

---

## 4. 통신의 메모리 및 생명주기 관점

- **비동기 처리:**  
  - Bridge는 JS와 네이티브 간의 통신을 비동기적으로 처리하여, 두 스레드가 독립적으로 실행됩니다. 이로 인해 UI 스레드가 차단되지 않고 원활한 사용자 경험을 제공합니다.

- **메시지 큐:**  
  - JS 스레드와 네이티브 모듈은 각자 독립적인 메시지 큐를 가지며, Bridge는 이 큐 사이에서 메시지를 전달합니다. 각 메시지는 직렬화된 데이터로, 메모리 내에서 안전하게 관리됩니다.

- **라이프사이클 관리:**  
  - 네이티브 모듈은 앱의 생명주기(예: 앱 시작, 종료, 백그라운드 전환 등)에 따라 초기화 및 정리 과정을 거칩니다.  
  - JS 스레드 또한 컴포넌트의 생명주기(마운트, 업데이트, 언마운트)에 따라 Bridge를 통한 통신이 활성화되거나 정리됩니다.

---

## 5. 요약

React Native에서 **Bridge**는 JavaScript와 네이티브 코드 간의 **비동기 통신**을 담당하며, 메시지 큐를 통해 직렬화된 데이터를 교환합니다.  
- **JS 스레드**는 React 컴포넌트 로직을 실행하고, **네이티브 모듈**은 플랫폼 특화 기능을 제공합니다.  
- **Bridge**를 통해 양측이 데이터를 주고받으면서, Promise 기반의 비동기 처리로 앱의 성능과 응답성을 유지합니다.

이와 같은 구조 덕분에 React Native는 단일 코드베이스로 네이티브 모바일 앱을 개발할 수 있는 강력한 프레임워크가 됩니다.

----

# Android 예제 

아래는 React Native에서 Android 네이티브 모듈을 사용하여 Bridge를 통해 통신하는 예제를 Java 코드로 작성한 것입니다. 또한, 도표와 함께 자세히 설명하겠습니다.

---

## 1. Android 네이티브 모듈 예제 (Java)

**DeviceInfoModule.java**

```java
package com.example.deviceinfo;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import android.os.Build;

public class DeviceInfoModule extends ReactContextBaseJavaModule {

    public DeviceInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // React Native에서 모듈 이름으로 접근할 때 사용됨
    @Override
    public String getName() {
        return "DeviceInfoModule";
    }

    // JavaScript에서 호출할 수 있는 메서드
    @ReactMethod
    public void getDeviceName(Promise promise) {
        try {
            // 안드로이드의 기기 모델명을 가져옵니다.
            String deviceName = Build.MANUFACTURER + " " + Build.MODEL;
            promise.resolve(deviceName);
        } catch (Exception e) {
            promise.reject("DEVICE_ERROR", "Unable to fetch device name", e);
        }
    }
}
```

> **설명:**  
> - **ReactContextBaseJavaModule**: 이 클래스를 상속받아 네이티브 모듈을 정의합니다.  
> - **getName()**: JavaScript에서 이 모듈을 `NativeModules.DeviceInfoModule`로 접근할 수 있도록 이름을 반환합니다.  
> - **@ReactMethod**: 이 어노테이션이 붙은 메서드는 JavaScript에서 호출할 수 있습니다.  
> - **Promise**: 결과를 비동기적으로 반환하기 위해 사용됩니다.

---

## 2. JavaScript 코드 예제

**React Native에서 Android 네이티브 모듈을 호출하는 예시**

```javascript
import { NativeModules } from 'react-native';
const { DeviceInfoModule } = NativeModules;

async function fetchDeviceName() {
  try {
    const deviceName = await DeviceInfoModule.getDeviceName();
    console.log('Device Name:', deviceName);
  } catch (error) {
    console.error('Error fetching device name:', error);
  }
}

fetchDeviceName();
```

> **설명:**  
> - JavaScript 코드에서는 `NativeModules`를 통해 네이티브 모듈을 가져옵니다.  
> - `getDeviceName()` 메서드를 호출하면, Bridge를 통해 Android 네이티브 모듈의 해당 메서드가 실행되고 결과가 Promise를 통해 반환됩니다.

---

## 3. React Native Bridge 통신 도식 (Android 기준)

아래 도표는 React Native의 JavaScript 코드와 Android 네이티브 모듈 간의 통신 과정을 나타냅니다.

```
+------------------+                     +-----------------------+                     +-------------------------+
|                  |  1. Call getDeviceName()   |                       |  2. 메시지 직렬화 및 전송  |                         |
|  JS Thread       | -------------------------> |       Bridge          | ----------------------> |   Android Native Module |
| (React Native JS)|                           | (메시지 큐, 직렬화 처리) |                     | (DeviceInfoModule.java)  |
|                  | <------------------------- |                       | <---------------------- |                         |
|                  |  4. 결과 역직렬화 및 반환  |                       |  3. 실행 후 결과 직렬화  |                         |
+------------------+                     +-----------------------+                     +-------------------------+
```

**도식 설명:**

1. **요청 단계 (JS Thread):**  
   - JavaScript 코드에서 `DeviceInfoModule.getDeviceName()` 메서드를 호출합니다.
   - 이 호출은 Promise를 반환하며, 내부적으로 메시지로 직렬화되어 Bridge로 전송됩니다.

2. **Bridge 처리:**  
   - Bridge는 JS 스레드와 Android 네이티브 스레드 간의 중간 계층으로, 메시지를 직렬화/역직렬화하여 전달합니다.
   - 메시지는 네트워크의 패킷처럼 큐에 저장되어 순차적으로 처리됩니다.

3. **네이티브 처리 (Android Native Module):**  
   - Android 네이티브 모듈(DeviceInfoModule)은 메시지를 수신하여 `getDeviceName` 메서드를 실행합니다.
   - 기기 이름을 가져와 Promise를 통해 결과를 직렬화합니다.

4. **응답 단계 (JS Thread):**  
   - Bridge는 네이티브 모듈에서 반환한 결과를 역직렬화하여 JS 스레드로 전달합니다.
   - JavaScript의 Promise가 resolve되어 최종 결과를 사용할 수 있게 됩니다.

---

## 4. 메모리 및 생명주기 관점에서의 설명

- **비동기 처리 및 메시지 큐:**  
  - Bridge는 JavaScript와 네이티브 모듈 간의 통신을 비동기적으로 처리하여, UI 스레드가 블로킹되지 않도록 합니다.
  - 각 메시지는 메모리 내의 큐에 저장되며, 직렬화된 데이터 형태로 안전하게 전송됩니다.

- **네이티브 모듈의 라이프사이클:**  
  - Android 네이티브 모듈은 앱의 생명주기에 따라 초기화되고 정리됩니다.  
  - 예를 들어, 앱이 실행될 때 모듈이 생성되고, 앱 종료 시 정리됩니다.

- **JavaScript와 네이티브의 분리:**  
  - 함수형 컴포넌트(또는 다른 React Native 코드)는 JS 스레드에서 실행되고, 네이티브 코드는 별도의 스레드에서 실행되어 메모리 및 리소스를 독립적으로 관리합니다.
  - Bridge를 통한 통신은 이 두 영역 사이의 경계를 넘나들며, 데이터만 전달합니다.

---

## 5. 요약

- React Native에서 **Bridge**는 JavaScript 코드와 Android 네이티브 모듈 간의 통신을 비동기적으로 처리합니다.
- Android 네이티브 모듈은 Java로 작성되며, ReactContextBaseJavaModule을 상속받아 정의됩니다.
- JavaScript와 네이티브 간의 메시지는 직렬화되어 Bridge를 통해 전달되고, Promise 기반으로 결과를 비동기적으로 반환합니다.
- 도식은 이 통신 과정을 단계별로 시각화하여, 각 단계에서 어떤 일이 일어나는지 쉽게 이해할 수 있도록 돕습니다.

이와 같은 구조 덕분에 React Native는 단일 코드베이스로 모바일 앱을 개발하면서, 네이티브 기능과 성능을 효과적으로 활용할 수 있습니다.

---
