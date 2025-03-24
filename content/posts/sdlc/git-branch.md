---
title: "Git - Change Branch"
date: 2025-02-17
categories: ["SDLC"]
tags: ["GIT"]
---

# Clone with branch

특정 브랜치를 바로 클론하려면 다음 명령어를 사용하시면 됩니다:

```bash
git clone -b 2025.3.maint https://gitlab.host_name/group_name/repo_name.git
```

이 명령어는 지정된 URL에서 2025.3.maint 브랜치를 클론합니다. 기본적으로 로컬 디렉토리 이름은 저장소 이름(cnc-umbrella-chart)으로 생성됩니다.

다른 디렉토리 이름을 지정하고 싶다면 URL 뒤에 원하는 디렉토리 이름을 추가하면 됩니다:

```bash
git clone -b 2025.3.maint https://gitlab.host_name/group_name/repo_name.git custom-directory-name
```

이 명령어를 실행하면 2025.3.maint 브랜치만 가져오게 됩니다. 더 빠른 클론을 원한다면 `--single-branch` 옵션을 추가할 수 있습니다:

```bash
git clone -b 2025.3.maint --single-branch https://gitlab.host_name/group_name/repo_name.git
```

# Change branch

이미 main 브랜치를 clone하였다. 2025.3.maint 브랜치를 가져오는 방법은?

### 기존 저장소에서 원격 브랜치 가져오기

1. 기존 저장소로 이동합니다:
   ```bash
   cd your-repository-directory
   ```

2. 모든 원격 브랜치를 업데이트합니다:
   ```bash
   git fetch origin
   ```

3. 2025.3.maint 브랜치로 전환합니다:
   ```bash
   git checkout 2025.3.maint
   ```

### 새로 클론하기를 원하신다면:

1. 새로운 위치에 특정 브랜치만 클론하기:
   ```bash
   git clone -b 2025.3.maint --single-branch [repository-url] [directory-name]
   ```

2. 또는 모든 브랜치를 클론한 후 해당 브랜치로 전환:
   ```bash
   git clone [repository-url] [directory-name]
   cd [directory-name]
   git checkout 2025.3.maint
   ```

브랜치가 존재하지 않는다는 오류가 발생하면 `git branch -a` 명령어로 사용 가능한 모든 브랜치를 확인해보세요.