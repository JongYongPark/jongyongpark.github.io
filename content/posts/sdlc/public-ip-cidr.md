---
title: "Public IP & CIDR"
date: 2025-02-24
categories: ["ops"]
tags: ["IP","CIDR"]
---

# Windows Powershell 에서 public IP와 CIDR 얻기 - claude 

## 테스트 

``` powershell 
(base) PS C:\workspace\blog\ryanpark-devsecops> # 방법 1: ipify API 사용
(base) PS C:\workspace\blog\ryanpark-devsecops> (Invoke-WebRequest -Uri "https://api.ipify.org").Content
44.214.210.109                                                                                                                      (base) PS C:\workspace\blog\ryanpark-devsecops>                                                                                     (base) PS C:\workspace\blog\ryanpark-devsecops> # 방방법법 2: ifconfig.me 사사용용                                                          (base) PS C:\workspace\blog\ryanpark-devsecops> (Invoke-WebRequest -Uri "https://ifconfig.me/ip").Content                           
(base) PS C:\workspace\blog\ryanpark-devsecops> 
(base) PS C:\workspace\blog\ryanpark-devsecops> # 방법 3: ipinfo.io 사용 (더 자세한 정보)
(base) PS C:\workspace\blog\ryanpark-devsecops> (Invoke-WebRequest -Uri "https://ipinfo.io/json").Content | ConvertFrom-Json


ip       : 44.214.210.109
hostname : vpn-aws.blackduck.com
city     : Ashburn
region   : Virginia
country  : US
loc      : 39.0437,-77.4875
org      : AS14618 Amazon.com, Inc.
postal   : 20147
timezone : America/New_York
readme   : https://ipinfo.io/missingauth



(base) PS C:\workspace\blog\ryanpark-devsecops>


Start-Process "https://whois.domaintools.com/$ip"

 Quick Stats
IP Location	United States United States Ashburn Amazon Data Services Nova
ASN	United States AS14618 AMAZON-AES, US (registered Nov 04, 2005)
Resolve Host	vpn-aws.blackduck.com
Whois Server	whois.arin.net
IP Address	44.214.210.109
NetRange:       44.192.0.0 - 44.255.255.255
CIDR:           44.192.0.0/10


```
---

## 답변 
PowerShell에서 Public IP와 CIDR를 확인하는 방법을 알려드리겠습니다:

1. Public IP 확인:
```powershell
# 방법 1: ipify API 사용
(Invoke-WebRequest -Uri "https://api.ipify.org").Content

# 방법 2: ifconfig.me 사용
(Invoke-WebRequest -Uri "https://ifconfig.me/ip").Content

# 방법 3: ipinfo.io 사용 (더 자세한 정보)
(Invoke-WebRequest -Uri "https://ipinfo.io/json").Content | ConvertFrom-Json
```

2. CIDR 확인:
```powershell
# ipinfo.io를 통해 네트워크 정보 포함하여 조회
$ipInfo = (Invoke-WebRequest -Uri "https://ipinfo.io/json").Content | ConvertFrom-Json
Write-Host "IP: $($ipInfo.ip)"
Write-Host "CIDR: $($ipInfo.org)"

# 또는 whois 정보를 통해 확인
$ip = (Invoke-WebRequest -Uri "https://api.ipify.org").Content
$whois = (Invoke-WebRequest -Uri "https://whois.ipip.net/$ip").Content
$whois
```

추가 유용한 네트워크 정보 확인:
```powershell
# 로컬 네트워크 어댑터 정보
Get-NetIPConfiguration | Format-Table

# 상세 IP 구성 정보
Get-NetIPAddress | Format-Table

# 라우팅 테이블
Get-NetRoute | Format-Table
```

참고: whois 정보를 더 자세히 보려면 Windows에 별도의 whois 도구 설치가 필요할 수 있습니다.

# Windows 에서 public IP 와 CIDIR - chatgpt

## 테스트 

resolver1.opendns.com 에서 정상적인 답변이 나온다.

``` powershell
(base) PS C:\workspace\blog\ryanpark-devsecops> nslookup myip.opendns.com resolver1.opendns.com
DNS request timed out.
    timeout was 2 seconds.
Server:  UnKnown
Address:  208.67.222.222

Non-authoritative answer:
Name:    myip.opendns.com
Address:  44.214.210.109

```

## 답변 
Windows와 Linux에서 명령줄 인터페이스(CLI)를 통해 공인 IP 주소와 CIDR을 확인하는 방법은 다음과 같습니다:

**1. 공인 IP 주소 확인하기**

공인 IP 주소는 인터넷에 직접 연결된 장치에 할당되는 고유한 주소입니다. 내부 네트워크에서 사용하는 사설 IP 주소와 달리, 공인 IP 주소는 외부에서 접근 가능한 주소를 의미합니다.

- **Windows에서 확인하기:**

  1. 명령 프롬프트를 엽니다: `Win + R` 키를 눌러 실행 창을 열고, `cmd`를 입력한 후 Enter 키를 누릅니다.
  2. 다음 명령을 입력하여 공인 IP 주소를 확인합니다:

     ```bash
     nslookup myip.opendns.com resolver1.opendns.com
     ```

     명령을 실행하면 `Name:`과 `Address:` 항목이 표시되며, `Address:` 옆에 나타나는 IP 주소가 현재 장치의 공인 IP 주소입니다.

- **Linux에서 확인하기:**

  1. 터미널을 엽니다.
  2. 다음 명령을 입력하여 공인 IP 주소를 확인합니다:

     ```bash
     curl ifconfig.me
     ```

     이 명령을 실행하면 현재 장치의 공인 IP 주소가 출력됩니다.

**2. CIDR 표기법 이해하기**

CIDR(Classless Inter-Domain Routing)은 IP 주소와 서브넷 마스크를 결합하여 네트워크를 효율적으로 표현하는 방법입니다. CIDR 표기법은 IP 주소 뒤에 슬래시(`/`)와 숫자를 붙여 사용하며, 이 숫자는 서브넷 마스크에서 1로 설정된 비트의 수를 나타냅니다.

공인 IP 주소의 CIDR 표기법을 확인하려면, 해당 IP 주소의 서브넷 마스크를 알아야 합니다. 그러나 공인 IP 주소의 서브넷 마스크는 일반적으로 ISP(인터넷 서비스 제공자)에 의해 관리되며, 개인 사용자가 직접 확인하기는 어렵습니다. 대부분의 가정용 네트워크에서는 공인 IP 주소가 단일 IP로 할당되므로, CIDR 표기법은 `/32`로 표현됩니다.

정확한 서브넷 마스크 정보를 확인하려면 ISP에 문의하거나, 네트워크 관리자에게 확인하는 것이 좋습니다.

**참고 자료:**

- [CIDR 표기법 위키백과](https://ko.wikipedia.org/wiki/%EB%82%B4%ED%98%95_%EB%8F%99%EC%A0%84_%EB%9D%BC%EC%9A%B4%EB%94%A9)

위의 방법들을 통해 Windows와 Linux에서 CLI를 사용하여 공인 IP 주소를 확인하고, CIDR 표기법에 대한 이해를 높일 수 있습니다. 




# Linux에서 public IP의 CIDR을 찾는 방법 - claude

## 테스트 
```bash

(base) jonpark@BD-82898:~$ curl ifconfig.me
44.214.210.109
(base) jonpark@BD-82898:~$ curl ipinfo.io
{
  "ip": "44.214.210.109",
  "hostname": "vpn-aws.blackduck.com",
  "city": "Ashburn",
  "region": "Virginia",
  "country": "US",
  "loc": "39.0437,-77.4875",
  "org": "AS14618 Amazon.com, Inc.",
  "postal": "20147",
  "timezone": "America/New_York",
  "readme": "https://ipinfo.io/missingauth"
}(base) jonpark@BD-82898:~$ curl api.ipify.org
44.214.210.109
(base) jonparwhois $(curl -s ifconfig.me) | grep CIDRe) | grep CIDR
CIDR:           44.192.0.0/10
CIDR:           44.192.0.0/11
(base) jonpark@BD-82898:~$ whois $(curl -s ifconfig.me) | grep -i "route\|cidr\|netblock"
CIDR:           44.192.0.0/10
CIDR:           44.192.0.0/11
(base) jonpark@BD-82898:~$ curl ipinfo.io/$(curl -s ifconfig.me)/org
AS14618 Amazon.com, Inc.
(base) jonpark@BD-82898:~$ 

```

## 답변변
Linux에서 public IP의 CIDR을 찾는 방법을 알려드리겠습니다:

1. 먼저 public IP를 확인합니다:
```bash
curl ifconfig.me
# 또는
curl ipinfo.io
# 또는 
curl api.ipify.org
```

2. CIDR 확인을 위해 whois 명령어를 사용합니다:
```bash
whois $(curl -s ifconfig.me) | grep CIDR
# 또는
whois $(curl -s ifconfig.me) | grep -i "route\|cidr\|netblock"
```

더 간단한 방법으로는 다음과 같은 온라인 서비스를 이용할 수 있습니다:
```bash
curl ipinfo.io/$(curl -s ifconfig.me)/org
```

이 명령어들은 IP 주소와 해당 IP가 속한 네트워크의 CIDR 표기법을 보여줄 것입니다. CIDR 정보가 없는 경우도 있을 수 있는데, 이때는 다른 whois 서버를 사용하거나 IP 주소가 속한 ISP의 정보를 직접 확인해야 할 수 있습니다.


# qwen
## my test
```bash

(base) jonpark@BD-82898:~$ curl ifconfig.me
44.214.210.109

(base) jonpark@BD-82898:~$ curl ipinfo.io/ip
44.214.210.109

(base) jonpark@BD-82898:~$ curl ipinfo.io
{
  "ip": "44.214.210.109",
  "hostname": "vpn-aws.blackduck.com",
  "city": "Ashburn",
  "region": "Virginia",
  "country": "US",
  "loc": "39.0437,-77.4875",
  "org": "AS14618 Amazon.com, Inc.",
  "postal": "20147",
  "timezone": "America/New_York",
  "readme": "https://ipinfo.io/missingauth"
}

(base) jonpark@BD-82898:~$ sudo apt install whois

(base) jonpark@BD-82898:~$ whois $(curl -s ifconfig.me)

#
# ARIN WHOIS data and services are subject to the Terms of Use
# available at: https://www.arin.net/resources/registry/whois/tou/
#
# If you see inaccuracies in the results, please report at
# https://www.arin.net/resources/registry/whois/inaccuracy_reporting/
#
# Copyright 1997-2025, American Registry for Internet Numbers, Ltd.
#



# start

NetRange:       44.192.0.0 - 44.255.255.255
CIDR:           44.192.0.0/10
NetName:        AMAZO-4
NetHandle:      NET-44-192-0-0-1
Parent:         NET44 (NET-44-0-0-0-0)
NetType:        Direct Allocation
OriginAS:       
Organization:   Amazon.com, Inc. (AMAZO-4)
RegDate:        2019-07-18
Updated:        2019-07-18
Ref:            https://rdap.arin.net/registry/ip/44.192.0.0



OrgName:        Amazon.com, Inc.
OrgId:          AMAZO-4
Address:        Amazon Web Services, Inc.
Address:        P.O. Box 81226
City:           Seattle
StateProv:      WA
PostalCode:     98108-1226
Country:        US
RegDate:        2005-09-29
Updated:        2022-09-30
Comment:        For details of this service please see
Comment:        http://ec2.amazonaws.com
Ref:            https://rdap.arin.net/registry/entity/AMAZO-4


OrgNOCHandle: AANO1-ARIN
OrgNOCName:   Amazon AWS Network Operations
OrgNOCPhone:  +1-206-555-0000 
OrgNOCEmail:  amzn-noc-contact@amazon.com
OrgNOCRef:    https://rdap.arin.net/registry/entity/AANO1-ARIN

OrgRoutingHandle: IPROU3-ARIN
OrgRoutingName:   IP Routing
OrgRoutingPhone:  +1-206-555-0000 
OrgRoutingEmail:  aws-routing-poc@amazon.com
OrgRoutingRef:    https://rdap.arin.net/registry/entity/IPROU3-ARIN

OrgAbuseHandle: AEA8-ARIN
OrgAbuseName:   Amazon EC2 Abuse
OrgAbusePhone:  +1-206-555-0000 
OrgAbuseEmail:  trustandsafety@support.aws.com
OrgAbuseRef:    https://rdap.arin.net/registry/entity/AEA8-ARIN

OrgTechHandle: ANO24-ARIN
OrgTechName:   Amazon EC2 Network Operations
OrgTechPhone:  +1-206-555-0000 
OrgTechEmail:  amzn-noc-contact@amazon.com
OrgTechRef:    https://rdap.arin.net/registry/entity/ANO24-ARIN

OrgRoutingHandle: ARMP-ARIN
OrgRoutingName:   AWS RPKI Management POC
OrgRoutingPhone:  +1-206-555-0000 
OrgRoutingEmail:  aws-rpki-routing-poc@amazon.com
OrgRoutingRef:    https://rdap.arin.net/registry/entity/ARMP-ARIN

# end


# start

NetRange:       44.192.0.0 - 44.223.255.255
CIDR:           44.192.0.0/11
NetName:        AMAZON-IAD
NetHandle:      NET-44-192-0-0-2
Parent:         AMAZO-4 (NET-44-192-0-0-1)
NetType:        Reallocated
OriginAS:       
Organization:   Amazon Data Services NoVa (ADSN-1)
RegDate:        2019-08-01
Updated:        2019-08-01
Ref:            https://rdap.arin.net/registry/ip/44.192.0.0



OrgName:        Amazon Data Services NoVa
OrgId:          ADSN-1
Address:        13200 Woodland Park Road
City:           Herndon
StateProv:      VA
PostalCode:     20171
Country:        US
RegDate:        2018-04-25
Updated:        2019-08-02
Ref:            https://rdap.arin.net/registry/entity/ADSN-1


OrgTechHandle: ANO24-ARIN
OrgTechName:   Amazon EC2 Network Operations
OrgTechPhone:  +1-206-555-0000 
OrgTechEmail:  amzn-noc-contact@amazon.com
OrgTechRef:    https://rdap.arin.net/registry/entity/ANO24-ARIN

OrgAbuseHandle: AEA8-ARIN
OrgAbuseName:   Amazon EC2 Abuse
OrgAbusePhone:  +1-206-555-0000 
OrgAbuseEmail:  trustandsafety@support.aws.com
OrgAbuseRef:    https://rdap.arin.net/registry/entity/AEA8-ARIN

OrgNOCHandle: AANO1-ARIN
OrgNOCName:   Amazon AWS Network Operations
OrgNOCPhone:  +1-206-555-0000 
OrgNOCEmail:  amzn-noc-contact@amazon.com
OrgNOCRef:    https://rdap.arin.net/registry/entity/AANO1-ARIN

# end



#
# ARIN WHOIS data and services are subject to the Terms of Use
# available at: https://www.arin.net/resources/registry/whois/tou/
#
# If you see inaccuracies in the results, please report at
# https://www.arin.net/resources/registry/whois/inaccuracy_reporting/
#
# Copyright 1997-2025, American Registry for Internet Numbers, Ltd.
#

(base) jonpark@BD-82898:~$ whois $(curl -s ifconfig.me) | grep CIDR -C 1
NetRange:       44.192.0.0 - 44.255.255.255
CIDR:           44.192.0.0/10
NetName:        AMAZO-4
--
NetRange:       44.192.0.0 - 44.223.255.255
CIDR:           44.192.0.0/11
NetName:        AMAZON-IAD


(base) jonpark@BD-82898:~$ sudo apt install bind9-dnsutils

(base) jonpark@BD-82898:~$ dig -x $(curl -s ifconfig.me) +short
vpn-aws.blackduck.com.

(base) jonpark@BD-82898:~$ dig -x $(curl -s ifconfig.me) 

; <<>> DiG 9.18.30-0ubuntu0.24.04.2-Ubuntu <<>> -x 44.214.210.109
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 53417
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;109.210.214.44.in-addr.arpa.   IN      PTR

;; ANSWER SECTION:
109.210.214.44.in-addr.arpa. 292 IN     PTR     vpn-aws.blackduck.com.

;; Query time: 183 msec
;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
;; WHEN: Mon Feb 24 18:38:03 KST 2025
;; MSG SIZE  rcvd: 91

(base) jonpark@BD-82898:~$ code -r get_pubic_ip_cidr.py


(base) jonpark@BD-82898:~$ python get_pubic_ip_cidr.py 
Public IP: 44.214.210.109
CIDR: AS14618 Amazon.com, Inc.

```
---
## Answer
Linux 시스템에서 공인 IP 주소와 해당 CIDR을 찾으려면 여러 가지 방법이 있습니다. 기본적으로 Linux 자체에서는 네트워크 인터페이스나 로컬 네트워크 정보만 제공하며, 공인 IP 및 CIDR은 외부 서비스를 통해 확인해야 합니다.

아래는 공인 IP와 CIDR을 찾는 몇 가지 방법입니다:

---

### **1. 공인 IP 확인**
공인 IP 주소를 확인하는 가장 간단한 방법은 외부 웹 서비스를 사용하는 것입니다. 예를 들어:

```bash
curl ifconfig.me
```
또는
```bash
curl ipinfo.io/ip
```

이 명령어들은 현재 시스템의 공인 IP 주소를 반환합니다.

---

### **2. CIDR 확인**
CIDR(Classless Inter-Domain Routing) 정보는 일반적으로 공인 IP 주소와 함께 제공됩니다. 이를 확인하려면 다음과 같은 방법을 사용할 수 있습니다:

#### **(1) `ipinfo.io` 사용**
`ipinfo.io`는 공인 IP와 CIDR 정보를 포함한 자세한 정보를 제공합니다:
```bash
curl ipinfo.io
```

출력 예시:
```json
{
  "ip": "123.45.67.89",
  "hostname": "example.hostname.com",
  "city": "Seoul",
  "region": "Seoul",
  "country": "KR",
  "loc": "37.5665,126.9780",
  "org": "AS12345 Example ISP",
  "postal": "04524",
  "timezone": "Asia/Seoul",
  "readme": "https://ipinfo.io/missingauth"
}
```

여기서 CIDR 정보는 직접적으로 표시되지 않을 수 있지만, `org` 필드에서 ASN(Autonomous System Number) 정보를 통해 관련 CIDR 범위를 추적할 수 있습니다.

#### **(2) `whois` 명령어 사용**
`whois` 명령어를 사용하여 공인 IP 주소의 CIDR 정보를 조회할 수 있습니다. 먼저 공인 IP를 확인한 후, 이를 `whois`에 입력합니다.

예시:
```bash
whois $(curl -s ifconfig.me)
```

출력에서 `NetRange`, `CIDR` 또는 `inetnum` 필드를 찾아보세요. 예를 들어:
```
NetRange:       123.45.0.0 - 123.45.255.255
CIDR:           123.45.0.0/16
```

#### **(3) `dig` 명령어로 역방향 DNS 확인**
역방향 DNS 조회를 통해 CIDR 정보를 간접적으로 확인할 수도 있습니다:
```bash
dig -x $(curl -s ifconfig.me) +short
```

---

### **3. CIDR 계산 도구 사용**
CIDR을 직접 계산하거나 확인하려면 온라인 도구를 사용할 수도 있습니다. 예를 들어:
- [https://www.iplocation.net/ip-cidr-calculator](https://www.iplocation.net/ip-cidr-calculator)
- [https://cidr.xyz/](https://cidr.xyz/)

---

### **4. Python 스크립트로 자동화**
Python을 사용하여 공인 IP와 CIDR 정보를 자동으로 가져올 수 있습니다. 아래는 예제 코드입니다:

```python
import requests

# 공인 IP 확인
response = requests.get("https://api.ipify.org?format=json")
public_ip = response.json()["ip"]

# CIDR 정보 확인 (ipinfo.io 활용)
response = requests.get(f"https://ipinfo.io/{public_ip}/json")
data = response.json()

print("Public IP:", data.get("ip"))
print("CIDR:", data.get("org"))  # CIDR 정보가 없는 경우 ASN 정보 출력
```

---

### **요약**
1. 공인 IP는 `curl ifconfig.me` 또는 `curl ipinfo.io/ip`로 확인.
2. CIDR 정보는 `whois` 명령어 또는 `ipinfo.io` API를 통해 확인.
3. 필요 시 Python 스크립트를 작성하여 자동화.

이 방법들을 조합하면 공인 IP와 CIDR 정보를 쉽게 확인할 수 있습니다.

---

# deepseek

## 답변
리눅스 시스템에서 퍼블릭 IP의 CIDR(Classless Inter-Domain Routing)을 찾는 방법은 네트워크 환경에 따라 다릅니다. 다음 단계를 참고하세요:

### 1. **퍼블릭 IP 주소 확인**
```bash
curl ifconfig.me
# 또는
curl icanhazip.com
```

### 2. **직접 연결된 시스템 (예: VPS, 서버)**
인터페이스에 직접 퍼블릭 IP가 할당된 경우 `ip` 명령어로 CIDR 확인:
```bash
ip -o -f inet addr show | awk '/scope global/ {print $4}'
```
- 예시 출력: `203.0.113.45/24` (CIDR 포함)

### 3. **NAT 뒤에 있는 경우 (예: 가정용 네트워크)**
로컬 시스템에서는 퍼블릭 서브넷을 알 수 없으므로 **라우터 관리 페이지**에서 확인하거나 **ISP에 문의**해야 합니다.

### 4. **WHOIS 조회 (ISP 할당 블록 확인)**
퍼블릭 IP가 속한 대역을 추정할 때 사용:
```bash
sudo apt install whois  # 필요한 경우 설치
curl ifconfig.me > public_ip.txt
whois $(cat public_ip.txt) | grep -i "CIDR"
```
- 예시 출력: `CIDR: 203.0.113.0/24` (ISP의 광범위한 할당 블록)

---

### **요약**
- **직접 할당된 서버**: `ip addr show`로 CIDR 확인.
- **NAT 환경**: 라우터/ISP에서 정보 획득.
- **WHOIS**: ISP의 CIDR 블록 참고용으로 사용.

이 방법들은 네트워크 구성에 따라 정확도가 달라질 수 있습니다.
