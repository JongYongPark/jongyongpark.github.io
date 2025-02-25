---
title: "Coverity Performance"
date: 2025-02-21
categories: ["ops"]
tags: ["Coverity","PerformPerformanceace"]
---

# Expected a [COVJSESSIONID-build] cookie in the response, but it was missing
추가 로그 분석을 통해 더 자세한 상황을 파악할 수 있습니다:

원래 문제:
```
Expected a [COVJSESSIONID-build] cookie in the response, but it was missing
```

추가 로그 분석:

1. 인증 상태:
```
Authentication=CovUsernameAuthenticationToken [
    Principal=admin (Admin User),
    Authenticated=true,
    RemoteIpAddress=10.2.150.57,
    SessionId=69FB1C3437377E29D3B887C9FDFA5403,
    Granted Authorities=[ROLE_AUTHENTICATED_USER]
]
```
- 서버 측에서는 admin 사용자가 성공적으로 인증됨
- 세션이 정상적으로 생성됨

2. 백그라운드 프로세스:
```
com.coverity.ces.service.GarbageCollectionServiceImpl.runGarbageCollection
```
- GarbageCollection 서비스가 정상적으로 동작 중

수정된 해결 방안:

1. 세션 관련:
   - 서버는 정상적인 세션을 생성하고 있으므로, 클라이언트 측 세션 처리 로직 확인 필요
   - 클라이언트가 기대하는 'COVJSESSIONID-build' 쿠키와 서버가 제공하는 세션 ID 형식의 불일치 확인

2. 버전 호환성:
   - 서버 버전: 2024.12.0
   - 클라이언트와 서버 간의 세션 처리 방식이 변경되었을 수 있음
   - 최신 클라이언트 버전으로 업데이트 고려

3. 설정 확인:
   - Coverity Connect 서버의 security.properties 파일에서 세션 관련 설정 확인
   - 클라이언트의 연결 설정에서 세션 처리 관련 구성 확인

4. 임시 해결책:
   - 서버에서 호환성 모드 활성화 가능 여부 확인
   - 클라이언트 측에서 세션 쿠키 이름 설정 변경 가능 여부 확인


이러한 문제를 해결하기 위해서는 Coverity Connect 관리자와 협력하여 서버 설정을 확인하고, 필요한 경우 버전 업그레이드나 설정 변경을 수행하는 것이 좋습니다.

---

# Garbage Collection

네, GC(Garbage Collection) 관련 로그를 보면 시스템 리소스와 관련이 있을 수 있습니다.

로그에서 주목할 부분:
```
com.coverity.ces.service.GarbageCollectionServiceImpl.withGarbageCollectionQueue
RenewableLockImpl{lockRegistry=com.coverity.ces.spring.ObservableJdbcLockRegistry@bbb489b, lockId=775589792, lockKey=com.coverity.ces.service.GarbageCollectionServiceImpl
```

가능한 문제점들:

1. 디스크 공간:
   - Coverity Connect는 분석 데이터를 저장하기 위해 상당한 디스크 공간이 필요
   - 디스크 공간 부족 시 GC 작업이 제대로 수행되지 않을 수 있음
   
2. 메모리 이슈:
   - Java 힙 메모리가 부족할 경우 GC가 자주 발생
   - 세션 관리에 영향을 미칠 수 있음

해결 방안:

1. 시스템 리소스 확인:
```bash
# 디스크 공간 확인
df -h

# 메모리 사용량 확인
free -h

# Java 프로세스 메모리 사용량
jmap -heap <java_pid>
```

2. Coverity Connect 설정 조정:
   - `coverity.conf` 파일에서 메모리 설정 확인
   - GC 관련 Java 옵션 조정 (-Xmx, -Xms 등)

3. 데이터 정리:
   - 오래된 분석 데이터 정리
   - 임시 파일 정리
   - 불필요한 프로젝트/스트림 제거

4. 모니터링 설정:
   - 시스템 리소스 모니터링 도구 설정
   - GC 로그 활성화하여 상세 분석

이러한 리소스 관련 문제가 세션 관리에 영향을 미쳐 원래 보았던 쿠키 관련 에러가 발생했을 수 있습니다. 시스템 리소스를 확인하고 필요한 경우 정리나 업그레이드를 진행하는 것이 좋겠습니다.

---

# jhsdb jmap

이 오류는 `jmap` 명령어 사용 시 발생하는 문제입니다. 최신 Java 버전에서는 `jmap -heap` 대신 `jhsdb jmap` 을 사용하도록 권장합니다.

해결방법:

1. `jhsdb jmap` 사용:
```bash
# Java 프로세스 ID 찾기
pid=$(pgrep -f "java.*coverity.*bootstrap")

# heap 덤프 생성
jhsdb jmap --heap --pid $pid
```

2. 또는 다른 메모리 모니터링 방법:
```bash
# Java 프로세스 상태 확인
jps -l

# 상세 메모리 사용량 확인
ps -o pid,rss,command $(pgrep -f "java.*coverity.*bootstrap")

# 실시간 메모리 모니터링
top -p $(pgrep -f "java.*coverity.*bootstrap")
```

3. GC 로깅 활성화:
```bash
# Java 옵션에 다음 추가
-Xlog:gc*=debug:file=gc.log:time,uptime,level,tags
```

이렇게 메모리 상태를 확인한 후, 필요한 경우 Java 힙 크기 조정이나 시스템 리소스 확보를 진행할 수 있습니다.


---

# Java 힙 메모리
Java 힙 메모리를 그래픽으로 모니터링할 수 있는 도구들입니다:

1. JConsole (Java에 기본 내장):
```bash
# JConsole 실행
jconsole
```

2. VisualVM (별도 설치 필요):
```bash
# Ubuntu에 설치
sudo apt install visualvm

# 실행
visualvm
```

3. JMC (Java Mission Control):
```bash
# 설치
sudo apt install jmc

# 실행
jmc
```

4. jstat을 사용한 실시간 통계 (텍스트 기반이지만 주기적 업데이트):
```bash
# GC 통계를 1초마다 업데이트
jstat -gcutil $(pgrep -f "java.*coverity.*bootstrap") 1000
```

이 중에서 VisualVM이 가장 사용자 친화적이고 다양한 기능을 제공합니다:
- 메모리, CPU 사용량 실시간 그래프
- GC 활동 모니터링
- 힙 덤프 분석
- 스레드 모니터링
- 핫스팟 분석

일반적으로 Java 애플리케이션 모니터링에는 VisualVM을 추천합니다.


# VisualVM

이 오류는 VisualVM이 현재 설치된 OpenJDK 버전과 호환되지 않아 발생하는 문제입니다.

해결 방법:

1. default-jdk 설치 및 설정:
```bash
# default-jdk 설치
sudo apt-get install default-jdk

# 현재 설치된 Java 버전 확인
update-alternatives --list java

# Java 버전 선택
sudo update-alternatives --config java
```

2. VisualVM 재설치:
```bash
# 기존 VisualVM 제거
sudo apt remove visualvm

# 최신 버전 설치
sudo apt install visualvm
```

3. 대안 도구 사용:
   - JConsole (Java에 기본 내장):
   ```bash
   jconsole
   ```
   
   - Java Mission Control:
   ```bash
   # 설치
   sudo apt install jmc
   
   # 실행
   jmc
   ```

4. snap을 통한 설치 시도:
```bash
sudo snap install visualvm
```

5. 직접 다운로드 및 실행:
```bash
# VisualVM 다운로드 페이지에서 .zip 파일 다운로드
wget https://github.com/oracle/visualvm/releases/download/2.1.7/visualvm_217.zip

# 압축 해제
unzip visualvm_217.zip

# 실행
./visualvm_217/bin/visualvm
```

만약 위 방법들이 모두 실패한다면, JConsole을 사용하는 것이 가장 간단한 대안이 될 수 있습니다.


#



