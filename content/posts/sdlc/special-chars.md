---
title: "Special characters"
date: 2025-03-14
categories: ["SDLC"]
tags: ["special chars","ubuntu"]
---

# **자주 사용되는 특수 문자 및 설명**  

### **1. 기본적인 특수 문자**
| **기호** | **이름 (영어)** | **설명 (한국어)** |
|---------|---------------|------------------|
| `_` | Underscore | 언더스코어 (밑줄) |
| `-` | Hyphen | 하이픈 (대시, 붙임표) |
| `–` | En dash | 엔 대시 (숫자 범위에서 사용, 예: 2020–2025) |
| `—` | Em dash | 엠 대시 (긴 대시, 문장 구분에 사용) |
| `=` | Equal sign | 등호 |
| `+` | Plus sign | 더하기 기호 |
| `*` | Asterisk | 별표, 곱셈 연산자 |
| `/` | Slash, Forward slash | 슬래시, 경로 구분자 |
| `\` | Backslash | 백슬래시, Windows 경로 구분자 |
| `|` | Vertical bar, Pipe | 수직선, 파이프 연산자 |
| `!` | Exclamation mark | 느낌표 |
| `@` | At sign | 골뱅이, 이메일에서 사용 |
| `#` | Hash, Pound sign | 해시, 샵 (SNS 태그, 주석 표시) |
| `$` | Dollar sign | 달러 기호, 변수 기호 (Bash, PHP) |
| `%` | Percent sign | 퍼센트 기호 |
| `^` | Caret | 캐럿 (지수 표현, 텍스트 강조) |
| `&` | Ampersand | 앰퍼샌드 (AND 연산자) |

---

### **2. 괄호 및 인용부호**
| **기호** | **이름 (영어)** | **설명 (한국어)** |
|---------|---------------|------------------|
| `()` | Parentheses | 소괄호 (괄호) |
| `[]` | Square brackets | 대괄호 |
| `{}` | Curly brackets, Braces | 중괄호 |
| `<>` | Angle brackets | 꺾쇠 괄호 |
| `'` | Single quote, Apostrophe | 작은따옴표, 아포스트로피 |
| `"` | Double quote | 큰따옴표 |
| `` ` `` | Backtick | 백틱 (역따옴표, Markdown, JavaScript 등에서 사용) |

---

### **3. 프로그래밍 및 명령어에서 자주 사용되는 특수 문자**
| **기호** | **이름 (영어)** | **설명 (한국어)** |
|---------|---------------|------------------|
| `~` | Tilde | 물결표 (홈 디렉토리 표현, 대략적인 의미) |
| `:` | Colon | 콜론 (경로, 시간, 네임스페이스에서 사용) |
| `;` | Semicolon | 세미콜론 (문장 구분자) |
| `.` | Period, Dot | 마침표 (파일 확장자, 숨김 파일) |
| `,` | Comma | 쉼표 |
| `?` | Question mark | 물음표 (쿼리스트링, 조건문) |
| `<` | Less than | 작다 (비교 연산자) |
| `>` | Greater than | 크다 (비교 연산자) |
| `<<` | Left shift | 비트 연산자, 리디렉션 (Bash) |
| `>>` | Right shift | 비트 연산자, 파일 추가 (Bash) |

---

### **4. 주요 사용 예시**
1. **프로그래밍**
   ```python
   print("Hello, World!")  # 큰따옴표 사용
   if x >= 10:
       print("x is greater than or equal to 10")  # 비교 연산자 `>=`
   ```
2. **Bash 명령어**
   ```bash
   echo "Hello, $USER"   # $ (변수)
   ls -l /home/user      # - (옵션)
   cd ~/Documents        # ~ (홈 디렉토리)
   ```
3. **Markdown**
   ```markdown
   **Bold Text**  # 굵은 글씨 (별표 사용)
   `Code`  # 인라인 코드 (백틱 사용)
   ```
---

### **🔹 결론**
- 파일명: `_`(언더스코어)와 `-`(하이픈) 사용 추천
- 변수명: `_`(언더스코어) 주로 사용
- 프로그래밍: `;`, `:` 등 문법적 기호 많이 사용
- 터미널/명령어: `$`, `~`, `|` 등 필수 기호 활용

📌 **상황에 따라 적절한 특수 문자를 사용하면 코드 가독성과 명령어 실행이 편리해집니다!** 🚀