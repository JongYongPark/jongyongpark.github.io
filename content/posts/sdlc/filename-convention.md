


# _ 와 - 

Ubuntu(또는 Linux)에서 파일 이름에 `_`(언더스코어)와 `-`(하이픈)를 사용할 때, 어떤 것을 선택할지 고민할 수 있습니다. **가독성, 일관성, 그리고 명령줄 사용 편의성**을 고려하여 다음과 같이 정리할 수 있습니다.

---

## **🔹 `_`(언더스코어) vs `-`(하이픈) 비교**

| **구분** | **언더스코어 (`_`)** | **하이픈 (`-`)** |
|---------|----------------|----------------|
| **가독성** | 일반적으로 더 눈에 띄고 가독성이 좋음 | 단어를 구분할 때 직관적이나 길게 사용하면 가독성이 떨어질 수 있음 |
| **터미널 사용 편의성** | 자동완성(Tab)에서 문제가 없음 | `cd`나 `ls` 등에서 자동완성 시 `_`보다 편리함 |
| **스크립트 호환성** | 변수명과 동일하게 사용 가능 (ex: `my_file.txt`) | 일부 명령어에서 `-`를 옵션과 혼동할 수 있음 (ex: `rm -rf my-file`) |
| **웹 URL 호환성** | 웹 URL에서 잘 쓰이지 않음 (`%5F`로 변환됨) | URL에서도 표준적으로 사용됨 (`my-file` 형태 유지) |
| **POSIX 규칙 준수** | POSIX 표준이 아님 (일부 시스템에서 비권장) | POSIX 파일명 표준 준수 |
| **Unix/Linux 전통** | 내부적으로 변수명처럼 쓰일 때 좋음 (ex: `my_var_name`) | Unix/Linux 파일 및 디렉터리명에서 더 많이 사용됨 |

---

## **🔹 추천 방법**
- ✅ **파일명에는 하이픈(`-`)을 추천**  
  - `my-file-name.txt`
  - 이유: **가독성이 좋고, POSIX 표준**이며 **웹과도 호환성이 높음**.

- ✅ **스크립트나 코드 변수명에는 언더스코어(`_`)를 추천**  
  - `my_variable_name` (Python, Bash, 환경변수 등)
  - 이유: 언더스코어는 변수명에서 표준적으로 사용되며, `-`는 연산자로 혼동될 수 있음.

- ✅ **특정한 경우는 언더스코어(`_`) 사용**
  - `log_2024_03_14.txt` (날짜처럼 숫자를 포함하는 경우 `_` 사용)
  - `backup_db_01.sql` (숫자와 조합할 때 `_`이 가독성 좋음)

---

## **🔹 예제**
| 상황 | 추천 파일명 | 추천하지 않는 파일명 |
|------|------------|----------------|
| 일반적인 파일 | `project-report-2025.pdf` | `project_report_2025.pdf` |
| 로그 파일 | `server-log-2025-03-14.txt` | `server_log_2025_03_14.txt` |
| 스크립트 파일 | `backup-database.sh` | `backup_database.sh` |
| 웹 URL | `my-website-logo.png` | `my_website_logo.png` |
| 환경변수 (Shell/Bash) | `MY_ENV_VARIABLE=1` | `MY-ENV-VARIABLE=1` |

---

## **🔹 결론**
1. **일반적인 파일명** → `-` (하이픈) 추천 (ex: `my-file.txt`)
2. **스크립트, 환경변수, 코드 변수명** → `_` (언더스코어) 추천 (ex: `my_variable`)
3. **날짜가 포함된 파일** → `_` 사용 가능 (ex: `backup_2025_03_14.sql`)
4. **웹 관련 파일 (URL, HTML, CSS, JS 등)** → `-` 사용 추천

즉, **파일명은 하이픈(`-`), 변수명은 언더스코어(`_`)**를 사용하는 것이 가장 일반적이고 가독성이 좋습니다. 🚀



# **1. Ubuntu 파일 이름 규칙**


## **✅ 파일 이름의 기본 규칙**
1. **대소문자 구분**  
   - `file.txt`, `File.txt`, `FILE.txt`는 각각 다른 파일로 취급됨.
  
2. **최대 길이 제한**  
   - 파일 이름 최대 길이: **255자**  
   - 전체 경로 포함 최대 길이: **4096자**  

3. **숨김 파일**  
   - `.`(점)으로 시작하면 숨김 파일 (`.bashrc`, `.gitignore`)  

4. **공백 포함 가능하지만 추천되지 않음**  
   - `My Document.txt` ❌  
   - `my_document.txt` ✅  

5. **특수 문자 사용 주의**  
   - ✅ 사용 가능: `_`, `-`, `.`  
   - ❌ 피해야 할 문자: `! @ # $ % ^ & * ( ) { } [ ] / \`  

6. **날짜 포맷**  
   - `YYYY-MM-DD` 또는 `YYYYMMDD` 형식 권장  
   - `backup_2024-03-14.tar.gz` ✅  
   - `backup_14-03-2024.tar.gz` ❌  

7. **확장자 명확하게 지정**  
   - `script.sh`, `config.json`, `data.csv` 등  

---

# **2. 프로그래밍 언어별 파일 네이밍 컨벤션**
### **📌 Python**
✅ 추천하는 파일 이름 규칙:
- 소문자 + 언더스코어(`_`) 사용 (PEP8 스타일 가이드 따름)  
- `.py` 확장자 사용  
- 테스트 파일은 `test_*.py` 형식으로 지정  

**예제**:
```bash
data_processing.py    # ✅ 좋은 예
my_script.py          # ✅ 좋은 예
myScript.py           # ❌ CamelCase 사용 X
MyScript.PY           # ❌ 대문자 사용 X
```

---

### **📌 Java**
✅ 추천하는 파일 이름 규칙:
- 클래스 이름과 파일 이름이 같아야 함 (대문자로 시작하는 CamelCase)  
- `.java` 확장자 사용  
- 패키지는 소문자로 작성 (예: `com.example.myapp`)  

**예제**:
```bash
UserService.java      # ✅ 좋은 예 (클래스와 일치)
user_service.java     # ❌ 언더스코어 사용 X
userService.java      # ❌ 파일명 소문자로 시작 X
```

---

### **📌 JavaScript**
✅ 추천하는 파일 이름 규칙:
- 소문자 + 하이픈(`-`) 또는 언더스코어(`_`) 사용  
- `.js`, `.mjs`, `.cjs` 확장자 사용  
- 모듈/클래스 파일은 PascalCase, 일반 파일은 kebab-case 또는 snake_case  

**예제**:
```bash
app.js               # ✅ 애플리케이션 메인 파일
config.js            # ✅ 설정 파일
UserController.js    # ✅ 클래스/모듈 파일 (PascalCase)
user_controller.js   # ✅ snake_case도 가능
```

---

### **📌 TypeScript**
✅ 추천하는 파일 이름 규칙:
- `.ts`, `.tsx` 확장자 사용  
- 소문자 + 하이픈(`-`) 또는 언더스코어(`_`) 사용  
- React 컴포넌트는 PascalCase  

**예제**:
```bash
main.ts              # ✅ 일반 TS 파일
user-service.ts      # ✅ 서비스 파일
UserComponent.tsx    # ✅ React 컴포넌트
```

---

### **📌 C / C++**
✅ 추천하는 파일 이름 규칙:
- `.c`, `.cpp`, `.h`, `.hpp` 확장자 사용  
- 소문자 + 언더스코어(`_`) 사용  
- 헤더 파일은 `.h` 또는 `.hpp`  

**예제**:
```bash
main.c               # ✅ 메인 프로그램
utilities.c          # ✅ 라이브러리 함수
my_library.h         # ✅ 헤더 파일
```

---

### **📌 C#**
✅ 추천하는 파일 이름 규칙:
- `.cs` 확장자 사용  
- 클래스 파일은 PascalCase, 일반 파일은 소문자+하이픈  

**예제**:
```bash
Program.cs           # ✅ 메인 파일
UserService.cs       # ✅ 서비스 클래스
database-config.cs   # ✅ 설정 파일
```

---

### **📌 Shell Script (Bash)**
✅ 추천하는 파일 이름 규칙:
- `.sh` 확장자 사용  
- 소문자 + 언더스코어(`_`) 사용  

**예제**:
```bash
backup_script.sh     # ✅ 백업 스크립트
install_dependencies.sh # ✅ 설치 스크립트
```

---

### **📌 HTML / CSS**
✅ 추천하는 파일 이름 규칙:
- `.html`, `.css` 확장자 사용  
- 소문자 + 하이픈(`-`) 사용 (kebab-case)  

**예제**:
```bash
index.html           # ✅ 메인 페이지
style.css            # ✅ 스타일 파일
user-profile.html    # ✅ 특정 페이지
```

---

### **📌 SQL**
✅ 추천하는 파일 이름 규칙:
- `.sql` 확장자 사용  
- 소문자 + 언더스코어(`_`) 사용  

**예제**:
```bash
create_users_table.sql   # ✅ 테이블 생성
backup_20240314.sql      # ✅ 백업 파일
```

---

## **3. 확장자별 추천 파일 이름**
| 확장자 | 추천 네이밍 규칙 | 예제 |
|--------|----------------|------|
| `.py` | snake_case 사용 | `data_processing.py` |
| `.java` | PascalCase (클래스명과 동일) | `UserService.java` |
| `.js` | kebab-case 또는 snake_case | `user-profile.js` |
| `.ts` | kebab-case 또는 PascalCase | `UserComponent.tsx` |
| `.c` / `.cpp` | snake_case 사용 | `memory_manager.c` |
| `.h` / `.hpp` | snake_case 사용 | `memory_manager.h` |
| `.cs` | PascalCase 사용 | `DataModel.cs` |
| `.sh` | snake_case 사용 | `install_script.sh` |
| `.html` | kebab-case 사용 | `user-profile.html` |
| `.css` | kebab-case 사용 | `main-style.css` |
| `.sql` | snake_case 사용 | `create_users_table.sql` |

---

## **4. 최적의 파일 이름 규칙 요약**
✅ **소문자 + 언더스코어(`_`) 또는 하이픈(`-`) 사용**  
✅ **공백 및 특수 문자 피하기 (`!@#$%^&*`)**  
✅ **날짜는 ISO 8601(`YYYY-MM-DD`) 형식 사용**  
✅ **파일 확장자는 반드시 포함 (`.py`, `.java`, `.sh` 등)**  
✅ **프로그래밍 언어의 스타일 가이드 준수 (PEP8, Java Code Conventions 등)**  

Ubuntu 및 Linux 환경에서는 **일관된 네이밍 컨벤션**을 유지하는 것이 가독성, 유지보수성, 자동화에 큰 도움이 됩니다. 🚀