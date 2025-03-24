# 테디노트 스타일과 비슷하게 설정

테디노트 스타일과 비슷하게 설정하기 위해 config.toml 파일을 수정하겠습니다.

```toml:config.toml
baseURL = 'https://jongyongpark.github.io/'
languageCode = 'ko-kr'
title = "RyanPark's DevSecOps"
theme = 'PaperMod'

[params]
  defaultTheme = "auto"
  ShowReadingTime = true
  ShowShareButtons = true
  ShowPostNavLinks = true
  ShowBreadCrumbs = true
  ShowCodeCopyButtons = true
  mainSections = ["posts"]
  
[params.profileMode]
  enabled = true
  title = "RyanPark's DevSecOps"
  subtitle = "Security & DevOps Engineering Blog"
  imageUrl = "profile.jpg"
  imageTitle = "profile"
  
[params.homeInfoParams]
  Title = "RyanPark's DevSecOps Blog 👋"
  Content = "Security & DevOps Engineering Blog"

[params.assets]
  favicon = "favicon.ico"
  favicon16x16 = "favicon-16x16.png"
  favicon32x32 = "favicon-32x32.png"
  apple_touch_icon = "apple-touch-icon.png"
  
[taxonomies]
  category = "categories"
  tag = "tags"
  series = "series"

[menu]
  [[menu.main]]
    identifier = "search"
    name = "검색"
    url = "/search/"
    weight = 10
  [[menu.main]]
    identifier = "categories"
    name = "카테고리"
    url = "/categories/"
    weight = 20
  [[menu.main]]
    identifier = "tags"
    name = "태그"
    url = "/tags/"
    weight = 30
  [[menu.main]]
    identifier = "archives"
    name = "연도"
    url = "/archives/"
    weight = 40
  [[menu.main]]
    identifier = "about"
    name = "어바웃미"
    url = "/about/"
    weight = 50

[outputs]
  home = ["HTML", "RSS", "JSON"]
```
주요 변경사항:
1. 메뉴 구조를 테디노트와 유사하게 변경 (검색, 카테고리, 태그, 연도, 어바웃미)
2. 한글 메뉴명으로 변경
3. 프로필 이미지 설정 추가
4. 홈페이지 정보 섹션 추가
5. 파비콘 설정 추가
6. 시리즈 분류 추가
7. 검색 기능을 위한 JSON 출력 추가

이제 블로그의 전체적인 레이아웃이 테디노트와 비슷한 스타일로 표시될 것입니다. 추가로 필요한 수정사항이 있다면 말씀해 주세요.

참고로 다음 파일들도 필요할 수 있습니다:
1. 프로필 이미지 (`static/profile.jpg`)
2. 파비콘 파일들 (`static/favicon.ico`, `static/favicon-16x16.png` 등)
3. 검색 페이지 (`content/search.md`)
4. 어바웃미 페이지 (`content/about.md`)

이러한 파일들을 추가로 생성하시겠습니까?

---
#


---
#

---
#

---
#

---
#

---
#

---
#

---
#

---
#

---
#
