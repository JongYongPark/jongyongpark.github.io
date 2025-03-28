---
title: "Rust Web"
date: 2025-02-21
categories: ["Developer"]
tags: ["Rust","Web"]
---

#

**Rust**는 시스템 프로그래밍 언어로 높은 성능과 안전성을 제공하지만, **웹 프레임워크** 측면에서는 여전히 **상대적으로 적은 선택지**가 있습니다. 그럼에도 불구하고 **Spring Boot**나 **NestJS**와 비슷한 **구조적 접근**을 제공하는 Rust 웹 프레임워크들이 있습니다. 이들 프레임워크는 **모듈화**, **라우팅**, **미들웨어 지원** 등을 제공하며, 일반적으로 **백엔드 API 서버**나 **웹 애플리케이션**을 구축할 수 있습니다.

다음은 **Rust**에서 Spring Boot나 NestJS처럼 **구조적이고 확장 가능한** 웹 애플리케이션을 구축할 수 있는 프레임워크들입니다:

### **1. Actix Web**
- **특징**:
  - **Actix Web**은 **고성능**과 **비동기 처리**를 지원하는 Rust의 가장 인기 있는 웹 프레임워크입니다. **Spring Boot**와 비슷하게, 매우 높은 성능을 자랑하면서도 유연한 미들웨어 및 라우팅 기능을 제공합니다.
  - **모듈화**된 **라우팅**과 **미들웨어**를 지원하며, **웹 소켓**, **API 서버** 등 다양한 서버 애플리케이션을 구현할 수 있습니다.
  - **Actors** 모델을 기반으로 한 **Actix 시스템**을 제공하여, 복잡한 상태 관리 및 비동기 처리를 유연하게 처리할 수 있습니다.
  - **Spring Boot**와 비슷한 방식으로 **동시성**을 처리하며, **REST API 서버**로 매우 적합합니다.
  - **타입 안전성**과 **비동기 I/O**를 지원하여, 성능과 안정성에서 우수한 결과를 도출할 수 있습니다.

- **장점**:
  - **높은 성능**과 **비동기 I/O**를 통한 빠른 처리
  - **미들웨어**를 통한 확장 가능성
  - **유연한 라우팅**과 **상태 관리**
  - **모듈화**된 코드 구조

- **단점**:
  - **학습 곡선**이 다소 있을 수 있으며, **Actors** 모델에 대한 이해가 필요합니다.
  - Rust의 문법적 특성상 **초기 개발 속도**가 다소 느릴 수 있습니다.

- **사용 사례**:
  - 고성능 **API 서버**
  - **마이크로서비스** 아키텍처
  - **실시간 애플리케이션** (예: 웹소켓, 실시간 데이터 처리)

---

### **2. Rocket**
- **특징**:
  - **Rocket**은 Rust에서 가장 **간단하고 직관적인** 웹 프레임워크로, **Spring Boot**처럼 빠르게 애플리케이션을 설정하고 실행할 수 있습니다.
  - **타입 안전성**을 제공하며, **고급 라우팅**, **폼 데이터 처리**, **템플릿 렌더링** 등의 기능을 쉽게 활용할 수 있습니다.
  - **Spring Boot**와 비슷하게, **컨트롤러**와 **라우팅**을 쉽게 관리할 수 있으며, **템플릿 엔진**과 **상태 관리** 기능도 잘 통합되어 있습니다.
  - **성능**은 Actix Web보다 약간 떨어지지만, 매우 **사용하기 쉬운** 프레임워크입니다.
  - **동기적 처리**를 기본으로 하며, 비동기 처리는 `async` 키워드를 사용해 구현할 수 있습니다.

- **장점**:
  - **간단한 API 서버**와 **빠른 개발**에 유리
  - **직관적인 API**와 **자동화된 검증**
  - **템플릿 엔진** 및 **폼 데이터 처리** 등의 웹 애플리케이션 기능 제공
  - **타입 안전성**이 높은 코드 작성 가능

- **단점**:
  - **비동기 처리**는 기본적으로 지원하지 않으며, 필요시 별도 설정이 필요합니다.
  - **성능**이 Actix Web보다는 약간 낮습니다.

- **사용 사례**:
  - **소규모 웹 애플리케이션** 및 **프로토타입**
  - **고급 라우팅** 및 **데이터 처리**가 필요한 서버
  - **웹 서버** 또는 **REST API 서버**

---

### **3. Tide**
- **특징**:
  - **Tide**는 **간결한 API**를 제공하며, Rust의 **asynchronous programming**을 활용한 **비동기 I/O**를 지원하는 프레임워크입니다.
  - **Spring Boot**나 **NestJS**와 유사하게 **모듈화된** 라우팅과 **미들웨어** 시스템을 제공하며, 애플리케이션의 확장성에 유리합니다.
  - **async/await**을 기반으로 비동기 작업을 처리하며, **라우팅**과 **미들웨어**를 매우 간단하게 설정할 수 있습니다.

- **장점**:
  - **간결한 코드**로 빠르게 애플리케이션을 개발할 수 있습니다.
  - **비동기 I/O** 및 **동시성 처리**에 유리한 아키텍처
  - **미들웨어**를 활용한 애플리케이션 확장 용이

- **단점**:
  - **비동기 처리**가 주요 방식이므로, **동기 처리**에 대한 설정이 필요할 수 있습니다.
  - **Tide**는 상대적으로 **작은 커뮤니티**를 가지고 있어, **문서화**와 **지원**이 다른 프레임워크에 비해 부족할 수 있습니다.

- **사용 사례**:
  - **REST API** 및 **마이크로서비스** 아키텍처
  - **비동기 처리**가 필요한 서버 애플리케이션

---

### **4. Axum**
- **특징**:
  - **Axum**은 **Tokio** 기반의 **Rust** 웹 프레임워크로, **비동기 I/O**와 **동시성 처리**를 지원합니다. 이 프레임워크는 **NestJS**와 비슷한 방식으로 모듈화된 **라우팅**을 지원하며, **미들웨어**와 **서비스 로직**을 잘 분리할 수 있는 구조를 제공합니다.
  - **Axum**은 **Tokio**와 **Tower** 라이브러리를 기반으로 하여 **미들웨어**를 활용한 **확장성**이 뛰어나며, 특히 **REST API** 및 **WebSocket**을 처리하는 데 강점을 가집니다.
  - **Axum**은 다른 Rust 웹 프레임워크와 비교해 **모듈화된 설계**로 더욱 **개발자 친화적**인 특징을 보입니다.

- **장점**:
  - **비동기 처리**와 **고성능**을 지원하여 **대규모 웹 애플리케이션** 및 **API 서버**에 적합합니다.
  - **Tokio** 기반의 높은 성능과 **미들웨어**를 활용한 확장성 제공
  - **유연한 라우팅** 및 **타입 안전성**

- **단점**:
  - **비동기 프로그래밍**을 다룰 때 학습 곡선이 있을 수 있습니다.
  - 아직 **커뮤니티**가 Actix나 Rocket에 비해 상대적으로 작은 편입니다.

- **사용 사례**:
  - **고성능 API 서버**와 **마이크로서비스**
  - **비동기 작업**을 많이 처리해야 하는 웹 애플리케이션

---

### **비교 요약**

| **특징**              | **Actix Web**                                      | **Rocket**                                           | **Tide**                                              | **Axum**                                            |
|---------------------|--------------------------------------------------|--------------------------------------------------|-----------------------------------------------------|---------------------------------------------------|
| **비동기 지원**        | 기본적으로 지원                                   | 비동기 지원 미비, `async`으로 처리 필요            | 기본적으로 비동기 지원                               | 기본적으로 비동기 지원                             |
| **성능**              | 매우 뛰어남                                        | 뛰어난 성능, 동기적 처리 주로 사용                 | 비동기 처리로 효율적, 성능은 괜찮음                   | 매우 뛰어난 성능, **Tokio** 기반 비동기 처리       |
| **유연성**            | 매우 유연, 상태 관리, 비동기 처리 강점            | **간단하고 직관적인** 코드, 사용하기 쉬움           | **간결하고 유연한 API** 제공                         | 매우 유연한 라우팅 및 **미들웨어** 시스템 지원    |
| **학습 곡선**          | 다소 높은 학습 곡선 (Actors 모델)                  | 낮음 (간단하고 직관적)                              | 낮음 (간단한 비동기 I/O)                              | 중간 (Tokio, Tower 기반 학습 필요)                |
| **주요 사용 사례**      | **API 서버**, **웹 소켓**, **고성능 서버**           | **REST API 서버**, **웹 애플리케이션**              | **마이크로서비스**,

#

**Actix Web**과 **Axum**은 둘 다 **Rust** 기반의 웹 프레임워크이지만, 그들의 철학, 아키텍처, 사용 사례에서 차이점이 있습니다. 아래에서 주요 차이점을 정리해보겠습니다.

### 1. **프레임워크 철학 및 목표**

- **Actix Web**:
  - **성능 우선**: Actix Web은 **최고 성능**을 목표로 설계된 프레임워크입니다. 이는 **Actor 모델**을 기반으로 하며, 효율적인 비동기 I/O 및 멀티스레딩을 활용하여 높은 처리 성능을 제공합니다.
  - **기능 풍부**: Actix Web은 많은 내장 기능을 제공하며, 여러 가지 미들웨어와 설정 옵션이 있어 대규모 애플리케이션 구축에 적합합니다. 하지만, 기능이 많다 보니 설정과 구성이 다소 복잡할 수 있습니다.
  - **동시성 처리**: 기본적으로 비동기 코드 실행과 멀티스레딩을 적극적으로 활용하여 대규모 시스템을 처리하는 데 유리합니다.

- **Axum**:
  - **Rust의 `async/await` 친화적**: Axum은 Rust의 비동기 기능인 `async`/`await`를 **자연스럽게 지원**하는 프레임워크입니다. `async`/`await` 구문을 통한 **간결하고 직관적인 코드** 작성이 가능합니다.
  - **단순함과 유연성**: Axum은 **단순하고 직관적인 API**를 제공하는 것을 목표로 하고 있습니다. 많은 기능을 제공하기보다는, 필요한 경우 다른 라이브러리와 결합하여 사용할 수 있도록 설계되었습니다.
  - **Tower와의 통합**: Axum은 **Tower**라는 비동기 미들웨어 라이브러리와 잘 통합되며, 이를 통해 요청을 처리하는 데 있어 유연성과 확장성이 뛰어납니다.

### 2. **아키텍처**

- **Actix Web**:
  - **Actor 모델**: Actix Web은 **Actor 모델**을 활용하여 비동기적인 작업을 수행합니다. 이 모델은 각 작업을 독립적인 액터(작업 단위)로 처리하여 높은 동시성 처리를 지원합니다.
  - **복잡한 설정**: Actix Web은 기본적으로 더 많은 설정과 구성이 필요하며, 다양한 **미들웨어와 확장 기능**을 제공합니다. 다소 복잡하지만, 대규모 애플리케이션을 관리하는 데 유리합니다.
  
- **Axum**:
  - **직관적인 `async/await` 사용**: Axum은 **Rust의 `async/await` 패턴**을 적극적으로 채택하여 비동기 웹 요청 처리를 간단하게 만듭니다. 코드가 간결하고 이해하기 쉬운 구조를 제공합니다.
  - **미니멀한 설계**: Axum은 기본적으로 필요한 것만을 제공하며, 추가 기능을 위한 확장이 용이합니다. 예를 들어, 기본적인 HTTP 요청 및 응답 처리에만 집중하고, 더 복잡한 기능은 외부 라이브러리와 조합하여 사용합니다.

### 3. **비동기 처리 및 성능**

- **Actix Web**:
  - Actix Web은 **성능에 최적화**된 비동기 처리 모델을 제공하며, `tokio`와 같은 비동기 런타임을 사용합니다. 이 덕분에 매우 높은 동시성 처리 성능을 자랑합니다.
  - 멀티스레딩을 잘 활용하여 고성능의 애플리케이션을 지원합니다.

- **Axum**:
  - Axum은 **Tokio**와 함께 작동하는 **비동기 기반** 프레임워크로, 비동기 I/O를 매우 자연스럽게 지원합니다.
  - 비동기 처리는 `async/await` 구문을 사용하여 코드가 더 직관적이고 읽기 쉽습니다. 성능 면에서는 Actix Web보다는 다소 느릴 수 있지만, 대부분의 웹 애플리케이션에서는 충분히 빠릅니다.

### 4. **확장성 및 커스터마이징**

- **Actix Web**:
  - 매우 **확장성이 뛰어난** 프레임워크로, 다양한 내장 미들웨어와 커스터마이징 가능성을 제공합니다. 예를 들어, 웹소켓, 파일 업로드, 인증 처리 등 여러 기능을 지원합니다.
  - 설정이나 사용에 있어 더 많은 자유도를 제공하지만, 그만큼 복잡한 구조와 다루기 어려운 부분도 존재할 수 있습니다.

- **Axum**:
  - Axum은 **간단하고 직관적**인 아키텍처로, 빠르게 시작할 수 있고 필요한 경우에만 추가 라이브러리를 사용해 확장합니다.
  - 필요한 기능만큼 추가하여 유연성을 제공하므로, 작은 규모의 애플리케이션이나 간단한 웹 서비스 개발에 적합합니다. 복잡한 커스터마이징이 필요한 경우에는 외부 라이브러리나 패턴을 사용해야 할 수 있습니다.

### 5. **사용 사례**

- **Actix Web**:
  - **대규모, 고성능** 시스템에 적합합니다. 예를 들어, **실시간 애플리케이션**, **게임 서버**, **고속 데이터 처리** 등에서 사용할 수 있습니다.
  - 높은 동시성 처리 성능과 멀티스레딩 지원 덕분에 **대규모 웹 애플리케이션**에 적합합니다.

- **Axum**:
  - **간단한 웹 애플리케이션**이나 **API 서버**를 구축할 때 적합합니다.
  - 기본적인 웹 애플리케이션, RESTful API, 비동기 HTTP 처리 등에 유리하며, 설계가 간단하고 코드가 직관적이기 때문에 빠른 프로토타이핑이 가능합니다.

### 6. **커뮤니티 및 문서화**

- **Actix Web**:
  - **성숙한 프레임워크**로서, 이미 많은 개발자들이 사용하고 있으며, 커뮤니티와 문서도 잘 마련되어 있습니다. 그러나 복잡한 기능이 많고, 배우기에는 약간의 시간이 걸릴 수 있습니다.
  
- **Axum**:
  - Axum은 **비교적 새로운 프레임워크**이지만, **Rust의 공식 웹 라이브러리**인 **Tokio**와 긴밀하게 통합되어 있어 빠르게 성장하고 있습니다.
  - 문서가 잘 작성되어 있으며, 커뮤니티가 빠르게 성장하고 있습니다.

---

### **차이점 요약**

| Feature                 | **Actix Web**                           | **Axum**                              |
|-------------------------|-----------------------------------------|---------------------------------------|
| **설계 철학**            | 성능 최우선, 고성능 대규모 시스템       | 직관적이고 단순한 비동기 웹 처리      |
| **비동기 처리**          | 고성능 비동기 처리, 멀티스레딩         | `async/await` 기반, 간결한 코드      |
| **확장성**               | 높은 확장성, 복잡한 커스터마이징 가능   | 미니멀리즘, 외부 라이브러리 활용     |
| **사용 사례**            | 고성능 애플리케이션, 대규모 시스템      | 간단한 웹 애플리케이션, API 서버    |
| **성능**                 | 매우 빠르며 동시성 처리 성능 뛰어남    | 빠르지만 Actix Web보다는 다소 느림  |
| **커뮤니티와 문서화**     | 성숙하고 문서가 잘 마련됨              | 새로운 프레임워크, 빠르게 성장 중    |

### 결론:
- **Actix Web**은 **고성능, 대규모 시스템**에서 강점을 보이며, **성능**을 최우선시하는 경우 적합합니다.
- **Axum**은 **간단하고 직관적인** 코드 작성을 지원하는 프레임워크로, **비동기 작업**을 쉽게 처리할 수 있으며, 빠른 프로토타이핑과 작은 규모의 애플리케이션에 유리합니다.
  
#

네, **Actix Web**에서도 **서비스**와 **컨트롤러**를 구분할 수 있습니다. 기본적으로 Actix Web은 프레임워크 자체에서 특정한 **서비스**와 **컨트롤러**를 구분하는 구조를 제공하지 않지만, 비즈니스 로직을 서비스 계층에, 요청 처리는 핸들러(컨트롤러)에서 처리하는 구조를 쉽게 구현할 수 있습니다.

여기서는 **서비스 계층**과 **컨트롤러 계층**을 분리하여 로그인 기능을 구현하는 예제를 보여드리겠습니다. 예제에서는 **서비스 계층**에서 로그인 비즈니스 로직을 처리하고, **컨트롤러**에서는 HTTP 요청을 처리하는 방식으로 구현할 것입니다.

### 1. **Actix Web에서 서비스와 컨트롤러 구분 예제**

#### **프로젝트 구조**:
```
src/
 ├── main.rs       # 메인 파일
 ├── controllers/  # 컨트롤러
 │    └── auth.rs  # 로그인 관련 컨트롤러
 ├── services/     # 서비스
 │    └── auth.rs  # 로그인 비즈니스 로직
 └── models/       # 데이터 모델
      └── user.rs  # 사용자 데이터 모델
```

#### **1. 모델 (models/user.rs)**

```rust
// 사용자 모델 (예시: 로그인 시 사용할 사용자 데이터 모델)
#[derive(Debug)]
pub struct User {
    pub username: String,
    pub password: String, // 실제로는 해시값을 저장해야 함
}
```

#### **2. 서비스 (services/auth.rs)**

```rust
use crate::models::user::User;
use jsonwebtoken::{encode, Header, EncodingKey};
use serde::{Serialize, Deserialize};
use std::time::{SystemTime, Duration};

// JWT 토큰에 사용할 Claims 구조체
#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,   // 사용자 이름
    pub exp: usize,    // 만료 시간
}

// 로그인 로직 처리하는 서비스 함수
pub fn login(username: &str, password: &str) -> Option<String> {
    // 실제 DB나 인증 로직을 사용해야 합니다.
    if username == "user123" && password == "password" {
        // 유효한 로그인이라면 JWT 토큰 생성
        let claims = Claims {
            sub: username.to_string(),
            exp: (SystemTime::now() + Duration::from_secs(3600)).duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs() as usize,
        };
        let secret = "mysecretkey";
        let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref())).unwrap();
        Some(token)
    } else {
        None // 로그인 실패
    }
}
```

#### **3. 컨트롤러 (controllers/auth.rs)**

```rust
use actix_web::{web, HttpResponse, Responder};
use crate::services::auth::login;
use serde::Deserialize;

// 요청에서 사용할 구조체 정의 (로그인 데이터)
#[derive(Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

// 로그인 요청을 처리하는 컨트롤러 핸들러
pub async fn login_handler(body: web::Json<LoginRequest>) -> impl Responder {
    match login(&body.username, &body.password) {
        Some(token) => {
            // 로그인 성공 시, JWT 토큰 반환
            HttpResponse::Ok().json(token)
        },
        None => {
            // 로그인 실패 시, Unauthorized 응답
            HttpResponse::Unauthorized().body("Invalid username or password")
        }
    }
}

// 라우터 생성 함수
pub fn create_auth_router() -> actix_web::web::ServiceConfig {
    actix_web::web::scope("/auth")
        .route("/login", web::post().to(login_handler)) // /login 엔드포인트 연결
}
```

#### **4. 메인 파일 (main.rs)**

```rust
use actix_web::{web, App, HttpServer};
use actix_web::middleware::Logger;
use crate::controllers::auth::create_auth_router;

mod controllers;
mod services;
mod models;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default()) // 로깅 미들웨어
            .configure(create_auth_router) // 인증 관련 라우터 등록
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
```

### **설명**:

1. **모델 (models/user.rs)**:
   - `User` 모델은 로그인 시 사용할 데이터를 표현합니다. 비밀번호는 실제로 해시값을 저장해야 하지만, 여기서는 단순히 문자열로 처리합니다.

2. **서비스 (services/auth.rs)**:
   - `login` 함수는 로그인 로직을 처리합니다. 실제로는 사용자 이름과 비밀번호를 DB에서 검증해야 하지만, 이 예제에서는 간단한 비교로 처리하고, 인증이 성공하면 **JWT 토큰**을 반환합니다.

3. **컨트롤러 (controllers/auth.rs)**:
   - `login_handler`는 HTTP 요청을 처리하는 핸들러입니다. 클라이언트로부터 받은 로그인 정보를 `login` 서비스에 전달하고, 결과에 따라 **JWT 토큰**을 반환하거나 **Unauthorized** 응답을 보냅니다.
   - `create_auth_router`는 `/auth` 경로에 대해 로그인 관련 라우팅을 설정합니다. `POST /auth/login` 요청이 `login_handler`와 연결됩니다.

4. **메인 파일 (main.rs)**:
   - `HttpServer::new`로 Actix 서버를 시작하고, 인증 관련 라우팅을 등록하는 `create_auth_router`를 호출합니다. 서버는 `127.0.0.1:8080`에서 실행됩니다.

### **장점**:
- **모듈화**: 서비스와 컨트롤러를 분리하여 각 계층의 역할을 명확히 할 수 있습니다.
- **유지보수 용이성**: 비즈니스 로직과 HTTP 요청 처리를 분리하므로 코드가 깔끔하고, 유지보수가 용이합니다.
- **확장성**: 비즈니스 로직을 서비스 계층에 두고, 나중에 더 복잡한 로직을 추가할 수 있습니다.

### **결론**:
- **Actix Web**에서 **서비스**와 **컨트롤러**를 구분하는 방식은 **NestJS**나 **Spring Boot**와 비슷한 구조를 제공합니다. 이렇게 구분함으로써, 각 계층의 책임을 명확히 하여 코드가 더 **모듈화**되고 **유지보수**가 용이해집니다.


#
