# make 실행 시 환경 변수 추적 예제

다음은 make 실행 시 환경 변수를 추적하는 다양한 방법에 대한 자세한 예제입니다:

## 1. Makefile에서 환경 변수 출력하기

```makefile
# 파일명: Makefile

# 기본 타겟
all: show-env

# 환경 변수 표시 타겟
show-env:
	@echo "===== 현재 환경 변수 ====="
	@echo "HOME: $${HOME}"
	@echo "PATH: $${PATH}"
	@echo "USER: $${USER}"
	@echo "CUSTOM_VAR: $${CUSTOM_VAR}"
	@echo "=========================="

# 특정 환경 변수만 사용하는 타겟
use-env:
	@echo "CUSTOM_VAR 값을 사용합니다: $${CUSTOM_VAR}"
	@if [ -z "$${CUSTOM_VAR}" ]; then \
		echo "경고: CUSTOM_VAR이 설정되지 않았습니다"; \
	fi

# 모든 환경 변수 출력
show-all-env:
	@echo "===== 모든 환경 변수 ====="
	@env | sort
	@echo "=========================="
```

실행 방법:
```bash
# 기본 실행
make

# 환경 변수 설정 후 실행
CUSTOM_VAR="Hello World" make

# 특정 타겟 실행
make show-all-env
```

## 2. Makefile 내에서 환경 변수 디버깅

```makefile
# 파일명: debug-env.mk

# 디버그용 변수
DEBUG ?= 0

# 모든 규칙에 대한 공통 디버그 기능
define debug-env
    $(if $(filter 1,$(DEBUG)), \
        $(info [DEBUG] 타겟: $(1)) \
        $(info [DEBUG] 환경 변수:) \
        $(foreach var,$(2),$(info [DEBUG]   $(var)=$(value $(var)))) \
    )
endef

# 디버그 정보를 출력하는 매크로
debug-rule = $(call debug-env,$@,HOME PATH USER PWD CUSTOM_VAR DEBUG)

# 소스 파일 컴파일 예제
%.o: %.c
	$(debug-rule)
	@echo "컴파일: $< -> $@"
	@if [ "$(DEBUG)" = "1" ]; then \
		gcc -g -o $@ $<; \
	else \
		gcc -O2 -o $@ $<; \
	fi

test:
	$(debug-rule)
	@echo "테스트 실행 중..."
	@echo "USER: $${USER}"
	@echo "CUSTOM_VAR: $${CUSTOM_VAR}"
```

실행 방법:
```bash
# 디버그 모드로 실행
DEBUG=1 make -f debug-env.mk test

# 환경 변수 추가하여 실행
DEBUG=1 CUSTOM_VAR="중요 설정" make -f debug-env.mk test
```

## 3. 환경 변수 전파 및 오버라이드 예제

```makefile
# 파일명: export-env.mk

# Makefile 내에서 환경 변수 설정
export INTERNAL_VAR = 내부 값
# 이미 정의된 환경 변수의 기본값 설정
export CUSTOM_VAR ?= 기본 값

# 환경 변수 확인 및 출력
check-vars:
	@echo "===== Makefile 변수 확인 ====="
	@echo "INTERNAL_VAR: $(INTERNAL_VAR)"
	@echo "CUSTOM_VAR: $(CUSTOM_VAR)"
	@echo "=============================="
	@echo
	@echo "===== 하위 셸에서의 환경 변수 ====="
	@echo "INTERNAL_VAR: $${INTERNAL_VAR}"
	@echo "CUSTOM_VAR: $${CUSTOM_VAR}"
	@echo "================================="

# 하위 명령어 실행
sub-make:
	@echo "서브 Makefile 실행:"
	@$(MAKE) -f sub.mk

# 환경 변수 오버라이드 확인
override-check:
	@echo "원래 CUSTOM_VAR: $(CUSTOM_VAR)"
	$(eval override CUSTOM_VAR = 오버라이드됨)
	@echo "오버라이드 후 CUSTOM_VAR: $(CUSTOM_VAR)"
```

서브 Makefile (sub.mk):
```makefile
# 파일명: sub.mk

all:
	@echo "===== 서브 Makefile에서의 환경 변수 ====="
	@echo "INTERNAL_VAR: $(INTERNAL_VAR)"
	@echo "CUSTOM_VAR: $(CUSTOM_VAR)"
	@echo "======================================"
```

실행 방법:
```bash
# 기본 실행
make -f export-env.mk check-vars

# 환경 변수 설정 후 실행
CUSTOM_VAR="외부 값" make -f export-env.mk check-vars

# 서브 Makefile 실행
make -f export-env.mk sub-make

# 환경 변수 출력과 함께 디버그 모드로 실행
make --debug=v -f export-env.mk check-vars
```

## 4. make --trace를 사용한 명령어 추적 예제

다음과 같은 Makefile이 있을 때:
```makefile
# 파일명: trace-example.mk

VAR1 = 값1
export VAR2 = 값2

all: step1 step2

step1:
	@echo "스텝 1: VAR1=$(VAR1), VAR2=$${VAR2}"
	@VAR3="로컬 값" && echo "로컬 VAR3: $${VAR3}"

step2:
	@echo "스텝 2: USER=$${USER}"
```

다음 명령으로 실행하면 모든 명령어와 변수 확장을 추적할 수 있습니다:
```bash
make --trace -f trace-example.mk
```

출력 예시:
```
make[1]: Entering directory '/path/to/directory'
Makefile:8: target 'step1' does not exist
echo "스텝 1: VAR1=값1, VAR2=값2"
스텝 1: VAR1=값1, VAR2=값2
VAR3="로컬 값" && echo "로컬 VAR3: ${VAR3}"
로컬 VAR3: 로컬 값
Makefile:12: target 'step2' does not exist
echo "스텝 2: USER=username"
스텝 2: USER=username
make[1]: Leaving directory '/path/to/directory'
```

## 5. strace를 사용한 환경 변수 추적 예제

```bash
# strace를 사용하여 make 명령의 환경 변수 접근 추적
strace -f -e trace=process,exec,environ make

# 특정 변수에 대한 접근만 추적
strace -f -e trace=environ -e environ=PATH,HOME,USER make
```

이 명령은 make와 그 하위 프로세스가 어떤 환경 변수에 접근하는지 보여줍니다.

이러한 예제들을 통해 make 실행 시 환경 변수가 어떻게 설정되고, 사용되며, 변경되는지 추적할 수 있습니다.


# 1.1 
