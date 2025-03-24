# 카테고리에 게시물을 할당하는 방법

물론입니다! Hugo에서 블로그를 만들 때 특정 카테고리에 게시물을 할당하는 방법에 대해 단계별로 안내해드리겠습니다. Hugo는 **Taxonomies**라는 개념을 사용하여 카테고리와 태그를 관리합니다. 아래는 Hugo에서 카테고리를 설정하고 게시물에 할당하는 방법입니다.

---

## 1. Taxonomies 설정하기

먼저, Hugo 사이트의 설정 파일(`config.toml`, `config.yaml`, 또는 `config.json`)에 Taxonomies를 정의해야 합니다. 일반적으로 카테고리와 태그를 사용하므로 이를 설정합니다.

### `config.toml` 예시

```toml
[taxonomies]
  category = "categories"
  tag = "tags"
```

### `config.yaml` 예시

```yaml
taxonomies:
  category: categories
  tag: tags
```

### `config.json` 예시

```json
{
  "taxonomies": {
    "category": "categories",
    "tag": "tags"
  }
}
```

---

## 2. 게시물에 카테고리 할당하기

게시물의 메타데이터(front matter)에 카테고리를 지정하여 특정 카테고리에 게시물을 할당할 수 있습니다. Hugo는 기본적으로 Markdown 파일을 사용합니다.

### 예시: `content/posts/my-first-post.md`

```markdown
---
title: "나의 첫 번째 포스트"
date: 2025-01-31T12:00:00+09:00
categories:
  - "기술"
  - "프로그래밍"
tags:
  - "Hugo"
  - "블로그"
---

여기에 게시물의 내용이 들어갑니다.
```

위 예시에서 `categories` 필드에 `"기술"`과 `"프로그래밍"`이라는 두 개의 카테고리를 할당했습니다. 이는 게시물이 두 카테고리에 모두 속하게 합니다.

---

## 3. 카테고리 페이지 템플릿 설정하기

카테고리별로 게시물을 나열하려면 템플릿을 설정해야 합니다. Hugo는 기본적으로 카테고리 페이지를 지원하지만, 테마에 따라 다를 수 있습니다. 기본적인 방법을 설명드리겠습니다.

### `layouts/_default/list.html` 파일 생성 또는 수정

```html
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ range .Pages }}
    <article>
      <h2><a href="{{ .Permalink }}">{{ .Title }}</a></h2>
      <p>{{ .Summary }}</p>
    </article>
  {{ end }}
{{ end }}
```

이 템플릿은 카테고리별로 게시물을 나열하는 기본적인 구조를 제공합니다.

### 카테고리 페이지 URL 예시

Hugo는 Taxonomies 설정에 따라 자동으로 카테고리 페이지를 생성합니다. 예를 들어, `"기술"` 카테고리의 게시물을 보려면 다음과 같은 URL을 사용할 수 있습니다:

```
https://your-site.com/categories/기술/
```

---

## 4. 네비게이션에 카테고리 추가하기

사이트의 네비게이션 메뉴에 카테고리를 추가하여 방문자가 쉽게 접근할 수 있도록 설정할 수 있습니다.

### `config.toml` 예시

```toml
[[menu.main]]
  name = "기술"
  url = "/categories/기술/"
  weight = 1

[[menu.main]]
  name = "프로그래밍"
  url = "/categories/프로그래밍/"
  weight = 2
```

이 설정은 메인 메뉴에 `"기술"`과 `"프로그래밍"` 카테고리를 추가합니다.

---

## 5. 카테고리별 스타일링 및 커스터마이징

카테고리 페이지의 디자인을 커스터마이징하려면 테마의 CSS 파일을 수정하거나, 카테고리 전용 템플릿을 생성할 수 있습니다.

### 예시: `layouts/categories/list.html` 파일 생성

```html
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  <ul>
    {{ range .Pages }}
      <li><a href="{{ .Permalink }}">{{ .Title }}</a></li>
    {{ end }}
  </ul>
{{ end }}
```

이 템플릿은 카테고리 페이지에 게시물 목록을 간단하게 나열합니다.

---

## 6. Hugo 서버 실행 및 확인

설정을 완료한 후 Hugo 개발 서버를 실행하여 변경 사항을 확인할 수 있습니다.

```bash
hugo server
```

브라우저에서 `http://localhost:1313`에 접속하여 카테고리 페이지가 제대로 표시되는지 확인하세요.

---

## 추가 팁

- **다중 카테고리 지원**: 하나의 게시물을 여러 카테고리에 할당할 수 있습니다. 이는 관련 주제별로 게시물을 분류할 때 유용합니다.
  
- **카테고리 이름 관리**: 카테고리 이름에 공백이나 특수 문자를 사용하면 URL에 영향을 줄 수 있으므로, 일관된 네이밍 규칙을 사용하는 것이 좋습니다. 예를 들어, 공백 대신 대시(`-`)를 사용할 수 있습니다.

- **카테고리 아이콘 및 이미지 추가**: 카테고리별로 아이콘이나 이미지를 추가하여 시각적으로 구분할 수 있습니다. 이를 위해 카테고리 템플릿을 수정하거나 CSS를 활용하세요.

---

## 참고 자료

- [Hugo 공식 문서 - Taxonomies](https://gohugo.io/content-management/taxonomies/)
- [Hugo 공식 문서 - Customizing Your Site](https://gohugo.io/templates/)

---

이 가이드가 Hugo에서 특정 카테고리에 게시물을 할당하고 관리하는 데 도움이 되길 바랍니다. 추가적인 질문이나 도움이 필요하시면 언제든지 문의해주세요!
---
# posts under the `/post` directory, assign each document to a specific category

Certainly! Below is a comprehensive guide on how to structure your Hugo blog with all posts under the `/post` directory and assign each document to a specific category. This guide includes setting up taxonomies, organizing your content, configuring permalinks, and customizing templates to achieve the desired structure.

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Configuring Taxonomies](#2-configuring-taxonomies)
3. [Organizing Content](#3-organizing-content)
4. [Assigning Categories to Posts](#4-assigning-categories-to-posts)
5. [Configuring Permalinks](#5-configuring-permalinks)
6. [Customizing Category Pages](#6-customizing-category-pages)
7. [Updating Navigation Menu](#7-updating-navigation-menu)
8. [Running the Hugo Server](#8-running-the-hugo-server)
9. [Additional Tips](#9-additional-tips)
10. [References](#10-references)

---

## 1. Project Structure

First, ensure that your Hugo project is set up correctly with the following structure:

```
your-hugo-site/
├── archetypes/
├── content/
│   └── post/
│       ├── category1/
│       │   └── your-first-post.md
│       └── category2/
│           └── your-second-post.md
├── layouts/
├── static/
├── config.toml
└── themes/
```

- **`content/post/`**: All your blog posts will reside here, organized by category.
- **`layouts/`**: Contains templates for your site.
- **`config.toml`**: Hugo configuration file.

---

## 2. Configuring Taxonomies

Hugo uses **Taxonomies** to categorize and tag content. To set up categories, you need to define them in your configuration file.

### Editing `config.toml`

Open your `config.toml` (or `config.yaml` / `config.json` depending on your setup) and add the following lines to define taxonomies:

```toml
[taxonomies]
  category = "categories"
  tag = "tags"
```

**Explanation:**

- **`category`**: Defines the taxonomy for categories.
- **`tag`**: Defines the taxonomy for tags (optional, but commonly used).

---

## 3. Organizing Content

Organize your content by placing all posts under the `/content/post/` directory. Within this directory, you can further organize posts into subdirectories based on categories.

**Example Directory Structure:**

```
content/
└── post/
    ├── technology/
    │   └── intro-to-hugo.md
    ├── programming/
    │   └── understanding-cycles.md
    └── lifestyle/
        └── healthy-living-tips.md
```

---

## 4. Assigning Categories to Posts

Each post should specify its category in the front matter. This allows Hugo to categorize the post appropriately.

### Example Front Matter

Create a Markdown file for your post, e.g., `content/post/technology/intro-to-hugo.md`, with the following front matter:

```markdown
---
title: "Introduction to Hugo"
date: 2025-02-01T10:00:00+09:00
categories: ["Technology"]
tags: ["Hugo", "Static Site Generator"]
description: "A beginner's guide to getting started with Hugo."
---

# Introduction to Hugo

Welcome to your first post about Hugo!
```

**Notes:**

- **`categories`**: Assigns the post to the "Technology" category.
- **`tags`**: Assigns relevant tags to the post.
- **`description`**: (Optional) A brief summary of the post.

### Multiple Categories

If a post belongs to multiple categories, list them as an array:

```markdown
categories: ["Technology", "Programming"]
```

---

## 5. Configuring Permalinks

To have a URL structure like `/post/category/post-name/`, you need to configure permalinks in your `config.toml`.

### Editing `config.toml`

Add the following to define the permalink structure for posts:

```toml
[permalinks]
  post = "/post/:categories/:slug/"
```

**Explanation:**

- **`:categories`**: Inserts the category of the post into the URL.
- **`:slug`**: Inserts the post's slug (typically derived from the filename).

**Full Example `config.toml`:**

```toml
baseURL = "https://your-site.com/"
languageCode = "en-us"
title = "Your Blog Title"

[taxonomies]
  category = "categories"
  tag = "tags"

[permalinks]
  post = "/post/:categories/:slug/"

[menu]
  [[menu.main]]
    name = "Home"
    url = "/"
    weight = 1
```

---

## 6. Customizing Category Pages

Hugo automatically generates category pages based on your taxonomies. However, to customize how these pages look, you can create specific templates.

### Creating a Category List Template

Create a file at `layouts/categories/list.html` with the following content:

```html
{{ define "main" }}
  <h1>Category: {{ .Title }}</h1>
  <ul>
    {{ range .Pages }}
      <li>
        <a href="{{ .Permalink }}">{{ .Title }}</a>
        <p>{{ .Summary }}</p>
      </li>
    {{ end }}
  </ul>
{{ end }}
```

**Explanation:**

- **`{{ .Title }}`**: Displays the category name.
- **`{{ range .Pages }}`**: Iterates over all posts in the category.
- **`{{ .Permalink }}`**: Links to the individual post.
- **`{{ .Summary }}`**: Displays a summary of the post.

### Styling the Category Pages

You can add CSS styles to your category pages by modifying your theme's CSS files or adding new styles specific to category pages.

---

## 7. Updating Navigation Menu

To make categories easily accessible from your site's navigation menu, add them to the menu in your `config.toml`.

### Editing `config.toml`

Add menu entries for each category:

```toml
[[menu.main]]
  name = "Technology"
  url = "/post/technology/"
  weight = 2

[[menu.main]]
  name = "Programming"
  url = "/post/programming/"
  weight = 3

[[menu.main]]
  name = "Lifestyle"
  url = "/post/lifestyle/"
  weight = 4
```

**Explanation:**

- **`name`**: The display name of the menu item.
- **`url`**: The URL path to the category page.
- **`weight`**: Determines the order of menu items (lower numbers appear first).

**Full Example `config.toml`:**

```toml
baseURL = "https://your-site.com/"
languageCode = "en-us"
title = "Your Blog Title"

[taxonomies]
  category = "categories"
  tag = "tags"

[permalinks]
  post = "/post/:categories/:slug/"

[[menu.main]]
  name = "Home"
  url = "/"
  weight = 1

[[menu.main]]
  name = "Technology"
  url = "/post/technology/"
  weight = 2

[[menu.main]]
  name = "Programming"
  url = "/post/programming/"
  weight = 3

[[menu.main]]
  name = "Lifestyle"
  url = "/post/lifestyle/"
  weight = 4
```

---

## 8. Running the Hugo Server

After setting up your content and configuration, run the Hugo development server to see your changes in action.

### Command to Start Hugo Server

```bash
hugo server
```

**Explanation:**

- **`hugo server`**: Builds your site and serves it locally with live reload enabled.

### Accessing the Site

Open your web browser and navigate to `http://localhost:1313`. You should see your blog with posts organized under the `/post` directory and categorized appropriately.

---

## 9. Additional Tips

### A. Using Aliases for Categories

If you want to have more readable URLs or aliases for your categories, you can use the `aliases` feature in Hugo.

**Example Front Matter with Alias:**

```markdown
---
title: "Introduction to Hugo"
date: 2025-02-01T10:00:00+09:00
categories: ["Technology"]
aliases: ["/tech/"]
tags: ["Hugo", "Static Site Generator"]
description: "A beginner's guide to getting started with Hugo."
---
```

**Explanation:**

- **`aliases`**: Provides alternative URLs that redirect to the main page of the post.

### B. Creating Category Sections

If you prefer to have category sections with their own list of posts, ensure your `layouts/categories/list.html` is properly set up as shown earlier.

### C. Using Shortcodes for Consistent Formatting

To maintain consistent formatting across posts, consider using Hugo **shortcodes** for elements like alerts, images, or code snippets.

### D. Leveraging Themes

Hugo has a vast collection of themes that support taxonomies out of the box. Choosing a theme that aligns with your desired structure can save time.

**Example:**

```bash
git clone https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
```

Update your `config.toml` to use the new theme:

```toml
theme = "ananke"
```

---

## 10. References

- [Hugo Official Documentation - Taxonomies](https://gohugo.io/content-management/taxonomies/)
- [Hugo Official Documentation - Configuration](https://gohugo.io/getting-started/configuration/)
- [Hugo Official Documentation - Templates](https://gohugo.io/templates/overview/)
- [Hugo Themes](https://themes.gohugo.io/)

---

By following this guide, you can effectively organize your Hugo blog with all posts under the `/post` directory and assign each document to specific categories. This structure not only improves the navigability of your site but also enhances SEO and user experience. If you encounter any issues or have further questions, feel free to ask!

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
