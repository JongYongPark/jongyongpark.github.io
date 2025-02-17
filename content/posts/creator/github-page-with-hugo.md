---
title: "Github Pages with Hugo"
date: 2025-02-14
draft: false
categories: ["Creator"]
tags: ["Github Pages","Hugo"]
---

# Github Pages

GitHub Pages는 GitHub 저장소를 사용하여 정적 웹사이트를 쉽게 배포할 수 있는 기능입니다.  
다음은 **GitHub Pages를 설정하고 사용하는 방법**을 단계별로 설명합니다.

---

## **1. GitHub Pages 활성화하기**
### **(1) GitHub 저장소 생성**
1. GitHub에 로그인하고 **새로운 저장소(New Repository)** 생성
2. 저장소 이름을 설정 (예: `my-blog`)
3. `Public`(공개) 저장소로 설정해야 GitHub Pages에서 무료로 사용할 수 있음
4. `README.md` 파일을 추가하는 것이 좋음
5. 저장소 생성 후 `git clone`으로 로컬에 다운로드

   ```bash
   git clone https://github.com/your-username/my-blog.git
   cd my-blog
   ```

---

## **2. GitHub Pages 활성화**
1. GitHub 저장소로 이동
2. **Settings > Pages** 탭으로 이동
3. **Branch 선택**: `main` 또는 `gh-pages` 브랜치를 선택하여 배포할 수 있음
4. 저장 후 몇 분 내로 GitHub Pages가 활성화됨
5. 배포된 사이트 URL 확인 (`https://your-username.github.io/my-blog/`)

---

## **3. HTML/CSS 파일 추가하여 웹사이트 배포**
1. 로컬 저장소에서 기본 웹페이지 생성:
   ```bash
   echo "<h1>Welcome to My GitHub Page</h1>" > index.html
   ```
2. 변경 사항을 커밋하고 푸시:
   ```bash
   git add index.html
   git commit -m "Add main page"
   git push origin main
   ```
3. GitHub Pages가 자동으로 `index.html`을 인식하여 배포함

---

## **4. Jekyll을 이용한 블로그 만들기**
GitHub Pages는 Jekyll을 지원하므로, Jekyll을 활용하여 정적 블로그를 쉽게 만들 수 있음.

### **(1) Jekyll 설치 (로컬에서 실행할 경우)**
   ```bash
   gem install bundler jekyll
   jekyll new my-blog
   cd my-blog
   ```

### **(2) `_config.yml` 수정**
GitHub Pages에서 Jekyll을 자동으로 인식하도록 설정:
```yaml
theme: minima
plugins:
  - jekyll-feed
```

### **(3) 로컬 서버 실행**
   ```bash
   bundle exec jekyll serve
   ```
   - `http://localhost:4000`에서 확인 가능

### **(4) GitHub에 업로드**
   ```bash
   git add .
   git commit -m "Deploy Jekyll site"
   git push origin main
   ```

---

## **5. 커스텀 도메인 설정 (선택 사항)**
GitHub Pages는 커스텀 도메인을 지원함.

1. **Settings > Pages** 에서 "Custom Domain" 설정
2. `CNAME` 파일을 저장소 루트에 추가:
   ```
   www.yourdomain.com
   ```
3. DNS 설정에서 GitHub IP 주소 추가:
   ```
   A 185.199.108.153
   A 185.199.109.153
   A 185.199.110.153
   A 185.199.111.153
   ```

---

## **6. GitHub Actions을 활용한 자동 배포**
GitHub Actions을 이용하면 웹사이트를 자동으로 빌드하고 배포 가능.

1. `.github/workflows/deploy.yml` 파일 생성:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches:
         - main

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout Repository
           uses: actions/checkout@v2
         - name: Setup Pages
           uses: actions/configure-pages@v2
         - name: Upload Artifact
           uses: actions/upload-pages-artifact@v1
         - name: Deploy to GitHub Pages
           uses: actions/deploy-pages@v1
   ```
2. 이 파일을 `main` 브랜치에 푸시하면 GitHub Actions이 자동으로 실행됨

---

## **7. GitHub Pages의 주요 제한사항**
- **무료 플랜에서는 Public 저장소만 지원**
- **Jekyll 외의 정적 사이트 빌더 사용 가능 (Hugo, Gatsby 등)**
- **커스텀 도메인 사용 가능**
- **CI/CD와 연동하여 자동 배포 가능**

---

## **📌 결론**
GitHub Pages는 정적 웹사이트를 쉽게 배포할 수 있는 강력한 기능을 제공하며, Jekyll을 활용하면 블로그도 손쉽게 운영할 수 있습니다. 🚀

---

# 정적 사이트 빌더 비교 

Jekyll, Hugo, Gatsby는 모두 정적 사이트 생성기(Static Site Generator, SSG)로, 웹사이트를 미리 빌드하여 빠르게 제공하는 방식으로 작동합니다. 하지만 사용 방식, 속도, 기능 확장성 등에서 차이점이 있습니다.

---

## **1. Jekyll**
### **📌 개요**
- Ruby 기반의 정적 사이트 생성기
- GitHub Pages에서 기본적으로 지원 (설치 없이 사용 가능)
- Markdown을 사용하여 블로그 작성 가능
- YAML 기반의 `_config.yml` 설정 파일 사용

### **✔️ 장점**
✅ **GitHub Pages와 완벽 호환**  
✅ **Markdown 기반으로 간편한 블로깅**  
✅ **플러그인 시스템 지원 (SEO, Sitemap, RSS 등)**  
✅ **커뮤니티가 크고, 공식 테마가 많음**

### **❌ 단점**
⛔ **빌드 속도가 느림** (특히 포스트 개수가 많아질수록)  
⛔ **Ruby 환경 필요** (Windows에서 설정이 번거로울 수 있음)  
⛔ **동적 기능이 부족** (검색, 필터링 등을 JavaScript로 직접 구현해야 함)  

### **✅ 적합한 사용 사례**
- GitHub Pages를 이용한 **개인 블로그**
- **기본적인 정적 사이트** (회사 소개, 포트폴리오 등)

---

## **2. Hugo**
### **📌 개요**
- Go 언어 기반의 초고속 정적 사이트 생성기
- 단일 실행 파일로 실행 가능 (별도 설치 불필요)
- YAML, TOML, JSON 기반의 설정 파일 지원

### **✔️ 장점**
✅ **빌드 속도가 가장 빠름** (수천 개의 페이지도 수 초 내 빌드)  
✅ **설치가 간단** (단일 실행 파일)  
✅ **Go 템플릿을 활용한 강력한 테마 및 레이아웃 시스템**  
✅ **Multilingual(다국어 지원) 기능이 기본 내장됨**  
✅ **개발 환경이 간편함 (`hugo server` 실행 후 바로 미리보기 가능)**  

### **❌ 단점**
⛔ **테마 커스터마이징이 어렵다** (Go 템플릿이 다소 복잡)  
⛔ **동적 기능 부족** (검색 기능 등이 기본적으로 없음)  
⛔ **플러그인 시스템 없음** (모든 기능을 자체적으로 구현해야 함)

### **✅ 적합한 사용 사례**
- **빠른 정적 사이트** (문서 사이트, 기술 블로그, 포트폴리오 등)
- **대량의 콘텐츠 관리** (문서, 뉴스 사이트 등)

---

## **3. Gatsby**
### **📌 개요**
- React 기반의 정적 사이트 생성기
- GraphQL을 활용하여 다양한 데이터 소스를 연결 가능
- 플러그인 및 테마 시스템을 통해 확장성 뛰어남

### **✔️ 장점**
✅ **React 기반으로 동적 기능 추가 용이**  
✅ **GraphQL을 통해 데이터 소스를 자유롭게 조작 가능**  
✅ **SEO 친화적 (정적 렌더링 + 클라이언트 사이드 네비게이션 지원)**  
✅ **강력한 플러그인 생태계** (이미지 최적화, 검색 기능 등)  
✅ **PWA(Progressive Web App) 지원**  

### **❌ 단점**
⛔ **빌드 속도가 느림** (특히 페이지가 많아질수록)  
⛔ **학습 곡선이 가파름** (React와 GraphQL을 알아야 함)  
⛔ **서버 리소스가 많이 필요함** (빌드 및 배포 과정이 무겁다)  
⛔ **초기 설정이 복잡**  

### **✅ 적합한 사용 사례**
- **React 개발자가 운영하는 정적 웹사이트**
- **블로그 + 동적 기능이 필요한 웹사이트**
- **대규모 데이터 사이트 (GraphQL로 다양한 데이터 소스를 활용 가능)**

---

## **4. Jekyll vs Hugo vs Gatsby 비교 정리**

| 특징            | **Jekyll** | **Hugo** | **Gatsby** |
|----------------|-----------|----------|------------|
| **언어**       | Ruby      | Go       | JavaScript (React) |
| **속도**       | 느림      | 매우 빠름 | 중간 (빌드 속도 느림) |
| **설치 간편성** | 보통      | 매우 쉬움 | 어려움 (Node.js 필요) |
| **사용 난이도** | 쉬움      | 보통     | 어려움 (React + GraphQL 필요) |
| **GitHub Pages** | 기본 지원 | 별도 설정 필요 | 별도 설정 필요 |
| **플러그인 지원** | 있음 | 없음 | 매우 많음 |
| **동적 기능** | 없음 | 없음 | 가능 (React 기반) |
| **SEO 최적화** | 기본 지원 | 기본 지원 | 최적화 강력 |
| **주요 사용 사례** | 블로그, 개인 사이트 | 빠른 정적 사이트, 다국어 사이트 | 블로그, 데이터 연동 웹사이트 |

---

## **📌 결론**
| **사용 목적** | **추천 SSG** |
|--------------|-------------|
| **빠르고 간단한 블로그** | Jekyll |
| **정적 문서 사이트 (빠른 빌드 필요)** | Hugo |
| **React 기반 블로그 및 동적 웹사이트** | Gatsby |
| **PWA 및 다양한 데이터 소스 연동** | Gatsby |
| **GitHub Pages에서 무료로 운영** | Jekyll |

### 🚀 **추천**
- **Jekyll** → **초보자에게 적합**, GitHub Pages에서 간편하게 블로그 운영 가능
- **Hugo** → **빠른 정적 사이트 구축**이 필요한 경우 최적
- **Gatsby** → **React 기반의 동적 기능이 필요한 경우** 추천

✅ **간단한 블로그 & 문서 사이트**라면 → **Jekyll**  
✅ **속도가 중요하고 대량 콘텐츠 관리**라면 → **Hugo**  
✅ **React 개발자이거나, 동적 기능을 추가할 웹사이트**라면 → **Gatsby**

---

# Github Pages with Hugo

**Hugo를 이용하여 GitHub Pages에 블로그 작성하는 방법 (Step-by-Step)**
Hugo를 사용하여 GitHub Pages에 블로그를 배포하는 전체 과정을 상세하게 설명해 드릴게요.

---

## **📌 1. Hugo 및 GitHub 환경 준비**
### **(1) Hugo 설치**
먼저, Hugo를 설치해야 합니다.

#### **Windows**
```powershell
choco install hugo
```
또는 [Hugo 공식 사이트](https://gohugo.io/getting-started/installing/)에서 다운로드하여 설치할 수 있습니다.

#### **Mac (Homebrew)**
```bash
brew install hugo
```

#### **Linux**
```bash
sudo apt install hugo
```

설치 확인:
```bash
hugo version
```
👉 정상적으로 설치되었다면 `hugo v0.xx.x` 와 같은 버전이 출력됩니다.

---

### **(2) GitHub 저장소 생성**
GitHub에서 **새 저장소(New Repository)** 를 만듭니다.

- **이름(Repository Name)**: `your-github-username.github.io`
- **공개(Public) 설정**: 필수 (GitHub Pages를 위해)
- **README 추가 여부**: 체크하지 않음

---

## **📌 2. Hugo 블로그 생성**
GitHub 저장소가 준비되었으면, 이제 로컬에서 Hugo 프로젝트를 생성합니다.

```bash
hugo new site my-blog
cd my-blog
```
이제 `my-blog` 폴더가 생성되었으며, Hugo 프로젝트의 기본 구조가 잡혀 있습니다.

---

## **📌 3. 테마 설치**
Hugo는 테마를 사용하여 블로그의 스타일을 결정합니다.

### **(1) Hugo 테마 목록 확인**
Hugo 테마는 [Hugo 테마 갤러리](https://themes.gohugo.io/)에서 찾을 수 있습니다.

### **(2) 테마 다운로드 및 적용**
예를 들어 `PaperMod` 테마를 사용하려면:
```bash
git init
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

### **(3) `config.toml` 설정**
`config.toml` 파일을 열고 다음을 추가합니다.

```toml
baseURL = "https://your-github-username.github.io/"
languageCode = "en-us"
title = "My Hugo Blog"
theme = "PaperMod"

[params]
  author = "Your Name"
  description = "My awesome blog using Hugo and GitHub Pages"

[menu]
  [[menu.main]]
    identifier = "about"
    name = "About"
    url = "/about/"
```

---

## **📌 4. 첫 번째 글 작성**
```bash
hugo new content/posts/first-post.md
```
이제 `content/posts/first-post.md` 파일이 생성됩니다. 이를 열어서 내용을 추가합니다.

```markdown
---
title: "My First Post"
date: 2025-02-14T12:00:00
draft: false
---

Hello, world! This is my first blog post using Hugo and GitHub Pages.
```
📌 **주의**: `draft: false`로 설정해야 게시글이 실제로 배포됩니다.

---

## **📌 5. 로컬에서 테스트**
Hugo가 잘 작동하는지 확인하기 위해 로컬 서버를 실행합니다.

```bash
hugo server -D
```
🚀 이제 브라우저에서 `http://localhost:1313/` 에 접속하여 블로그를 확인하세요.

---

## **📌 6. 정적 사이트 빌드**
GitHub Pages에 배포할 정적 파일을 생성합니다.

```bash
hugo --minify
```
이 명령어를 실행하면 `public/` 폴더에 정적 HTML 파일들이 생성됩니다.

---

## **📌 7. GitHub Pages에 배포**
### **(1) `gh-pages` 브랜치 생성 및 배포**
```bash
cd public
git init
git add .
git commit -m "Deploy Hugo blog"
git branch -M main
git remote add origin https://github.com/your-github-username/your-github-username.github.io.git
git push -f origin main
```

---

## **📌 8. GitHub Pages 활성화**
1. **GitHub 저장소로 이동**
2. **Settings → Pages** 로 이동
3. **Branch** 에서 `main` 브랜치를 선택 후 **Save**

🚀 **몇 분 후 `https://your-github-username.github.io/`에서 블로그를 확인할 수 있습니다!** 🎉

---

## **📌 9. 이후 글을 추가하는 방법**
1. 새 글 작성
```bash
hugo new content/posts/new-post.md
```
2. 내용 추가 후 빌드
```bash
hugo --minify
```
3. 변경 사항을 GitHub에 푸시
```bash
cd public
git add .
git commit -m "New blog post"
git push origin main
```

---

## **📌 10. 블로그 유지보수 & 자동 배포 (GitHub Actions)**
GitHub Actions를 활용하면 Hugo 블로그를 자동으로 배포할 수 있습니다.

### **(1) GitHub Actions 설정**
`.github/workflows/hugo.yml` 파일을 생성하고 다음 내용을 추가합니다.

```yaml
name: Deploy Hugo Blog

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

이제 `git push`를 할 때마다 자동으로 GitHub Pages에 배포됩니다. 🚀

---

## **📌 11. 특정 `.md` 파일을 배포에서 제외하는 방법**
`.md` 파일을 배포에서 제외하려면 해당 파일의 front matter에서 `draft: true`로 설정하거나, `.gitignore`에 추가하는 방법이 있습니다.

**방법 1: `draft: true` 설정**
```markdown
---
title: "Draft Post"
date: 2025-02-14T12:00:00
draft: true
---
```
👉 `hugo --minify` 실행 시 `draft: true`인 파일은 포함되지 않음

**방법 2: `.gitignore`에 추가**
```bash
echo "content/posts/draft-post.md" >> .gitignore
```
👉 GitHub에 업로드되지 않도록 설정

---

## **📌 12. 요약**
| 단계 | 명령어 또는 설명 |
|------|----------------|
| **Hugo 설치** | `brew install hugo` (Mac), `choco install hugo` (Windows) |
| **Hugo 사이트 생성** | `hugo new site my-blog` |
| **테마 적용** | `git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod` |
| **글 작성** | `hugo new content/posts/my-post.md` |
| **로컬 서버 실행** | `hugo server -D` |
| **정적 사이트 빌드** | `hugo --minify` |
| **GitHub Pages 배포** | `cd public && git init && git add . && git commit -m "Deploy" && git push -f origin main` |
| **GitHub Actions 자동 배포** | `.github/workflows/hugo.yml` 생성 |

이제 Hugo로 손쉽게 GitHub Pages 블로그를 운영할 수 있습니다! 🚀 🎉

---

# How to hide your .md file
Hugo를 사용하여 GitHub Pages에서 정적 사이트를 운영할 때, 특정 `.md` 파일이 배포되지 않도록 하는 방법은 여러 가지가 있습니다.

---

## **1. `draft: true` 설정 (초안 상태로 유지)**
Hugo에서 특정 `.md` 파일을 배포하지 않으려면 **Front Matter**에서 `draft: true`를 설정하면 됩니다.  
이렇게 하면 `hugo` 빌드 시 해당 문서는 배포되지 않습니다.

```yaml
---
title: "Hidden Page"
date: 2025-02-14
draft: true
---
이 페이지는 빌드에서 제외됩니다.
```

📌 **주의**: `hugo --buildDrafts` 옵션을 사용하면 초안(`draft: true`) 상태인 파일도 포함되어 배포될 수 있음.

---

## **2. 특정 파일을 `ignoreFiles`에 추가하기 (`config.toml` 설정)**
`config.toml` 또는 `config.yaml`에서 `ignoreFiles` 설정을 추가하면, 해당 패턴과 일치하는 파일들이 빌드에서 제외됩니다.

📌 **예제 (`config.toml`에서 설정하기)**

```toml
ignoreFiles = ["content/secret-folder/.*", "content/private.md"]
```

📌 **예제 (`config.yaml`에서 설정하기)**
```yaml
ignoreFiles:
  - "content/secret-folder/.*"
  - "content/private.md"
```

✅ **이 방법은 특정 파일 및 폴더를 빌드에서 완전히 제외할 때 유용합니다.**

---

## **3. 특정 디렉터리를 `draft`로 설정**
만약 특정 디렉터리 내 모든 `.md` 파일을 배포에서 제외하고 싶다면, 디렉터리 내 `_index.md`에서 `draft: true`를 설정하면 됩니다.

📌 **예제 (`content/private/_index.md`)**
```yaml
---
title: "Private Section"
draft: true
---
```

이렇게 하면 `content/private/` 디렉터리 내 모든 파일이 배포되지 않습니다.

---

## **4. `outputs` 설정을 이용하여 특정 파일만 HTML 생성을 막기**
Hugo는 `outputs` 설정을 활용하여 특정 페이지를 HTML로 변환하지 않도록 설정할 수 있습니다.

📌 **예제 (`content/private.md`)**
```yaml
---
title: "Hidden Page"
outputs: []
---
```
이렇게 하면 `private.md`는 HTML로 변환되지 않으며, 사이트에서 접근할 수 없게 됩니다.

---

## **5. `.gitignore`를 이용하여 GitHub Pages에서 배포되지 않도록 설정**
만약 특정 파일을 Hugo 빌드에는 포함하지만, GitHub Pages에 배포하지 않으려면 `.gitignore` 파일에서 제외할 수도 있습니다.

📌 **예제 (`.gitignore`에 추가)**
```
public/private/*
public/secret.md
```
이렇게 하면 해당 파일이 GitHub Pages에 푸시되지 않습니다.

---

## **6. `robots.txt` 설정으로 검색 엔진에서 제외**
배포는 하되 검색 엔진에 노출되지 않도록 하려면 `static/robots.txt`를 수정할 수도 있습니다.

📌 **예제 (`static/robots.txt`)**
```
User-agent: *
Disallow: /private/
Disallow: /hidden-page/
```
이렇게 하면 Google 등 검색 엔진이 해당 URL을 크롤링하지 않습니다.

---

## **📌 결론**
| 방법 | 적용 방식 | 장점 | 단점 |
|------|----------|------|------|
| `draft: true` | Front Matter | 간단한 설정, 빠르게 배포 제외 가능 | `hugo --buildDrafts` 실행 시 포함될 수 있음 |
| `ignoreFiles` | `config.toml` | 특정 파일을 완전히 무시 가능 | 특정 파일 패턴을 직접 관리해야 함 |
| `outputs: []` | Front Matter | HTML 생성 자체를 방지 | RSS 등에도 제외됨 |
| `.gitignore` | Git 설정 | GitHub Pages에 배포되지 않음 | Hugo 빌드 시 포함됨 |
| `robots.txt` | 검색 엔진 차단 | 검색 엔진에서 노출 방지 | GitHub Pages에는 여전히 배포됨 |

👉 **간단히 특정 파일을 배포에서 제외하려면 `draft: true`**  
👉 **완전히 Hugo 빌드에서 제외하려면 `ignoreFiles`**  
👉 **GitHub Pages 배포에서 제외하려면 `.gitignore`**  

필요한 목적에 맞게 방법을 선택하면 됩니다! 🚀

---

# Hugo CLI command list

Hugo를 사용하여 배포하거나 수정 사항을 확인할 때 사용할 수 있는 주요 CLI 명령어들을 정리해 보겠습니다.

---

## **1. 로컬 개발 서버 실행 (수정 사항 실시간 확인)**
```bash
hugo server
```
📌 **옵션**  
- `-D` 또는 `--buildDrafts` : `draft: true`인 문서도 포함하여 빌드  
- `--disableFastRender` : 변경 사항을 보다 정확하게 반영  
- `-F` 또는 `--buildFuture` : 미래 날짜의 게시물도 포함  

```bash
hugo server -D --disableFastRender
```
👉 **수정 사항을 실시간으로 확인하려면 `hugo server` 사용!**

---

## **2. 정적 사이트 빌드 (배포용)**
```bash
hugo
```
📌 **옵션**  
- `-D` : 초안(`draft: true`)도 포함하여 빌드  
- `-F` : 미래 날짜의 문서 포함  
- `--minify` : CSS/JS/HTML을 압축하여 최적화  

```bash
hugo --minify
```
👉 **배포할 정적 파일을 생성하려면 `hugo` 실행!**

---

## **3. 특정 경로에 빌드 결과 저장**
기본적으로 `hugo`는 `public/` 디렉터리에 결과물을 생성합니다.  
다른 경로에 저장하고 싶다면 `-d` 또는 `--destination` 옵션 사용

```bash
hugo -d /my/custom/path
```

---

## **4. Hugo 버전 확인**
```bash
hugo version
```
👉 **현재 설치된 Hugo 버전 확인 가능**

---

## **5. 사이트 구조 미리 보기**
```bash
hugo list drafts   # 초안(draft) 문서 목록 보기
hugo list future   # 미래 날짜의 문서 목록 보기
hugo list expired  # 만료된(expired) 문서 목록 보기
```

---

## **6. 새로운 콘텐츠 생성**
```bash
hugo new content/posts/my-first-post.md
```
👉 `content/posts/` 폴더에 `my-first-post.md` 파일이 생성됨.

📌 **초안 상태(`draft: true`)로 생성되므로, `hugo server -D`로 실행해야 보임!**

---

## **7. 특정 테마 사용하여 배포**
```bash
hugo --theme my-theme
```
👉 특정 테마(`themes/my-theme/`)를 지정하여 빌드 가능

---

## **8. GitHub Pages에 배포 (예: `public/`을 `gh-pages` 브랜치에 푸시)**
```bash
hugo
cd public
git init
git add .
git commit -m "Deploy site"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -f origin main
```
👉 **GitHub Pages에서 정적 사이트를 배포하는 경우 `public/`을 업로드하면 됨**

---

## **9. 특정 설정 파일(`config.toml`)을 변경하여 실행**
```bash
hugo server --config config.dev.toml
```
👉 다른 환경(`config.prod.toml` 등)에 맞춰 설정을 변경 가능

---

## **10. 기본 설정 확인**
```bash
hugo config
```
👉 현재 적용된 설정을 확인 가능

---

## **📌 요약**
| 목적 | 명령어 |
|------|-------|
| 로컬 서버 실행 | `hugo server` |
| 초안 포함하여 실행 | `hugo server -D` |
| 배포용 정적 파일 생성 | `hugo` |
| 정적 파일 생성 후 특정 경로에 저장 | `hugo -d /custom/path` |
| 새로운 게시글 생성 | `hugo new content/posts/my-post.md` |
| 초안 목록 확인 | `hugo list drafts` |
| 특정 테마로 빌드 | `hugo --theme my-theme` |
| GitHub Pages 배포 | `hugo && cd public && git add . && git commit -m "Deploy" && git push` |

👉 **빠르게 Hugo 사이트를 수정하고 배포하려면?**  
1. `hugo server -D` (수정 사항 실시간 확인)  
2. `hugo --minify` (최적화된 정적 파일 생성)  
3. `git push` (배포)  


___
aaa
***
***
aaa
---
aaa
<hr style="border: 3px solid black;">
aaa
<hr style="border: none; height: 5px; background-color: black;">
aaa

███████████████████████

aaa
===
aaa
