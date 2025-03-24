



# 설치

WSL(Ubuntu)에서 `cfssl` 및 `cfssljson`을 설치하는 방법을 단계별로 설명하겠습니다.

---

## 내 작업 
```bash
function cfssl_install(){
    # # https://coffeewhale.com/kubernetes/authentication/x509/2020/05/02/auth01/
    # wget -q --show-progress --https-only --timestamping \
    # https://storage.googleapis.com/kubernetes-the-hard-way/cfssl/linux/cfssl \
    # https://storage.googleapis.com/kubernetes-the-hard-way/cfssl/linux/cfssljson
    
    # chmod +x cfssl cfssljson
    # sudo mv cfssl cfssljson /usr/local/bin/

    # https://gist.github.com/guoyoujin/376bda5323b1d718d8d582f2efa5a8e6
    sudo curl -s -L -o /bin/cfssl https://pkg.cfssl.org/R1.2/cfssl_linux-amd64
    sudo curl -s -L -o /bin/cfssljson https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
    sudo curl -s -L -o /bin/cfssl-certinfo https://pkg.cfssl.org/R1.2/cfssl-certinfo_linux-amd64
    sudo chmod +x /bin/cfssl*
}

```
---

## **1. cfssl 및 cfssljson 다운로드 및 설치**
`cfssl`과 `cfssljson`은 `cloudflare/cfssl` 프로젝트에서 제공하는 인증서 관리 도구입니다.

### **1.1. 최신 버전 다운로드**

이것 동작 안함 
```sh
sudo curl -L -o /usr/local/bin/cfssl https://github.com/cloudflare/cfssl/releases/latest/download/cfssl-linux-amd64
sudo curl -L -o /usr/local/bin/cfssljson https://github.com/cloudflare/cfssl/releases/latest/download/cfssljson-linux-amd64
```

### **1.2. 실행 권한 부여**
```sh
sudo chmod +x /usr/local/bin/cfssl /usr/local/bin/cfssljson
```

### **1.3. 설치 확인**
```sh
cfssl version
cfssljson --version
```
이 명령을 실행했을 때, 버전 정보가 출력되면 정상적으로 설치된 것입니다.

---

## **2. PATH 확인 (필요한 경우)**
`/usr/local/bin`이 `PATH`에 포함되어 있지 않다면 다음 명령어를 실행하여 추가하세요.
```sh
echo 'export PATH=$PATH:/usr/local/bin' >> ~/.bashrc
source ~/.bashrc
```

---

## **3. 추가 패키지 설치 (필요한 경우)**
`cfssl` 사용 중 `jq`가 필요할 수 있으므로 설치하는 것이 좋습니다.
```sh
sudo apt update
sudo apt install -y jq
```

---

## **4. 테스트 실행**
`cfssl`이 정상적으로 작동하는지 확인하려면 다음 명령어를 실행하세요.
```sh
echo '{}' | cfssl genkey - | cfssljson -bare test
```
정상적으로 실행되면 `test-key.pem` 등의 파일이 생성됩니다.

이제 WSL Ubuntu에서 `cfssl`과 `cfssljson`을 사용할 수 있습니다! 🚀


---

# Issue 

## error log 
```bash

(base) jonpark@BD-82898:~/workspace/jonpark-work/cnc-umbrella-chart-2025.3.maint/local-dev/certs$ ./create-cert.sh cfssl_gen_interCA
function main(){
    [ -z "$1" ] && { main_task; } || $1
}

main "$@"
+ main cfssl_gen_interCA
+ '[' -z cfssl_gen_interCA ']'
+ cfssl_gen_interCA
+ cat
+ cfssl gencert -initca interCA-csr.json
+ cfssljson -bare interCA
2025/03/11 16:19:50 [INFO] generating a new CA key and certificate from CSR
2025/03/11 16:19:50 [INFO] generate received request
2025/03/11 16:19:50 [INFO] received CSR
2025/03/11 16:19:50 [INFO] generating key: rsa-2048
2025/03/11 16:19:51 [INFO] encoded CSR
2025/03/11 16:19:51 [INFO] signed certificate with serial number 605619770621654986611313199563130997638737198863
+ cfssl sign -ca rootCA.pem -ca-key rootCA-key.pem -config cfssl.json -profile intermediate_ca interCA.csr
+ cfssljson -bare interCA
Failed to load config file: {"code":5200,"message":"could not read configuration file"}Failed to parse input: unexpected end of JSON input

exit
+ exit


```

## 해결 방법:

이 오류는 `cfssl.json` 구성 파일을 찾거나 읽지 못해서 발생하는 문제입니다. 오류 메시지 `Failed to load config file: {"code":5200,"message":"could not read configuration file"}`가 이를 명확하게 보여주고 있습니다.


### 1. cfssl.json 파일 확인

먼저 cfssl.json 파일이 존재하는지 확인하세요:

```bash
ls -la cfssl.json
```

### 2. cfssl.json 파일 생성

만약 파일이 없다면, 다음과 같이 생성할 수 있습니다:

```bash
cat > cfssl.json <<EOF
{
  "signing": {
    "default": {
      "expiry": "8760h"
    },
    "profiles": {
      "intermediate_ca": {
        "usages": [
          "signing",
          "digital signature",
          "key encipherment",
          "cert sign",
          "crl sign"
        ],
        "expiry": "43800h",
        "ca_constraint": {
          "is_ca": true,
          "max_path_length": 0
        }
      },
      "server": {
        "usages": [
          "signing",
          "digital signature",
          "key encipherment",
          "server auth"
        ],
        "expiry": "8760h"
      },
      "client": {
        "usages": [
          "signing",
          "digital signature",
          "key encipherment",
          "client auth"
        ],
        "expiry": "8760h"
      }
    }
  }
}
EOF
```

### 3. cfssl.json 파일 권한 확인

파일이 존재하더라도 읽기 권한이 없을 수 있습니다:

```bash
chmod 644 cfssl.json
```

### 4. 전체 파일 경로 지정

상대 경로 대신 절대 경로를 사용하여 시도:

```bash
cfssl sign -ca rootCA.pem -ca-key rootCA-key.pem -config $(pwd)/cfssl.json -profile intermediate_ca interCA.csr | cfssljson -bare interCA
```

### 5. cfssl_gen_interCA 함수 수정

스크립트 내의 함수를 다음과 같이 수정하여 사용할 수도 있습니다:

```bash
function cfssl_gen_interCA(){
    cat > interCA-csr.json <<EOF
{
  "CN": "interCA",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "O": "Kubernetes"
    }
  ]
}
EOF

    # cfssl.json 파일이 없으면 생성
    if [ ! -f cfssl.json ]; then
        cat > cfssl.json <<EOF
{
  "signing": {
    "default": {
      "expiry": "8760h"
    },
    "profiles": {
      "intermediate_ca": {
        "usages": [
          "signing",
          "digital signature",
          "key encipherment",
          "cert sign",
          "crl sign"
        ],
        "expiry": "43800h",
        "ca_constraint": {
          "is_ca": true,
          "max_path_length": 0
        }
      }
    }
  }
}
EOF
    fi

    cfssl gencert -initca interCA-csr.json | cfssljson -bare interCA
    cfssl sign -ca rootCA.pem -ca-key rootCA-key.pem -config cfssl.json -profile intermediate_ca interCA.csr | cfssljson -bare interCA
}
```

### 6. JSON 형식 문제 확인

만약 파일이 존재하지만 JSON 형식에 문제가 있을 수 있습니다:

```bash
cat cfssl.json | jq
```

위 명령으로 JSON 형식이 올바른지 확인하세요. `jq` 명령이 없다면 `sudo apt-get install jq`로 설치할 수 있습니다.

이 중 하나의 방법으로 문제를 해결할 수 있을 것입니다. 가장 간단한 방법은 필요한 형식으로 cfssl.json 파일을 다시 생성하는 것입니다.

