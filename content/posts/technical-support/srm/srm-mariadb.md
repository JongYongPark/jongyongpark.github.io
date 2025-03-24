# database 크기가 중가하는지 체크하는 스크립트

MySQL에서 데이터베이스 크기를 주기적으로 확인하고 증가 여부를 체크하는 스크립트를 작성하려면, 데이터베이스의 크기를 측정하여 로그 파일에 기록하거나 다른 방식으로 저장해야 합니다. 아래는 MySQL에서 데이터베이스 크기를 확인하는 스크립트 예제입니다.

### 1. MySQL에서 데이터베이스 크기 조회
MySQL에서 특정 데이터베이스의 크기를 확인하려면 다음 SQL 쿼리를 사용할 수 있습니다:

```sql
SELECT table_schema AS `Database`,
       ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS `Size (MB)`
FROM information_schema.tables
WHERE table_schema = 'your_database_name'
GROUP BY table_schema;
```

여기서 `'your_database_name'`을 모니터링하고 싶은 데이터베이스 이름으로 변경하세요.

### 2. Bash 스크립트 예제
아래는 Linux 환경에서 데이터베이스 크기를 주기적으로 체크하여 로그 파일에 기록하는 Bash 스크립트 예제입니다:

```bash
#!/bin/bash

# MySQL 접속 정보 설정
DB_HOST="localhost"
DB_USER="your_username"
DB_PASS="your_password"
DB_NAME="your_database_name"
LOG_FILE="/path/to/your_log_file.log"

# 현재 날짜 및 시간 가져오기
CURRENT_DATE=$(date +"%Y-%m-%d %H:%M:%S")

# 데이터베이스 크기 조회
DB_SIZE=$(mysql -h $DB_HOST -u $DB_USER -p$DB_PASS -e \
    "SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size_mb FROM information_schema.tables WHERE table_schema='$DB_NAME';" \
    | grep -v "size_mb")

# 로그 파일에 결과 저장
echo "$CURRENT_DATE - $DB_NAME size: ${DB_SIZE} MB" >> $LOG_FILE
```

### 3. 스크립트 자동 실행 (크론탭 설정)
위 스크립트를 정기적으로 실행하려면 `cron`을 사용해 자동화할 수 있습니다. 예를 들어, 1시간마다 실행하려면 다음 명령어를 사용하세요:

```bash
crontab -e
```

그리고 아래 줄을 추가하세요:

```
0 * * * * /path/to/your_script.sh
```

이렇게 하면 매 시간마다 스크립트가 실행되어 데이터베이스 크기를 로그 파일에 기록합니다.

### 추가 기능: 크기 변화 감지
크기 변화 여부를 감지하려면 이전 크기와 비교하는 기능을 추가할 수 있습니다. 이를 위해 데이터베이스 크기를 기록한 파일을 읽고 비교하는 로직을 추가할 수 있습니다. 필요한 경우 이 부분도 안내해 드리겠습니다.


# 
