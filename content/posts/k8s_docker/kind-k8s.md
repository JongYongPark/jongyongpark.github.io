


# issue 1

## error
현재 다른 cluster 에 있어서 발생하는 문제임 

```bash
+ [[ true == true ]]
+ CNC_INSTALL_MINIO=true
++ kubectl get nodes '-o=jsonpath={.items[0].metadata.labels.pool-type}'
+ pool_type=
+ '[' '' '!=' cnc-custom-node-pool-label ']'
+ kubectl label nodes --overwrite kind-control-plane pool-type=cnc-custom-node-pool-label
Error from server (NotFound): nodes "kind-control-plane" not found
(base) jonpark@aws-sig-ts-jonpark:~/workspace/jonpark-work/cnc-umbrella-chart-2025.3.maint/local-dev$ ^C
(base) jonpark@aws-sig-ts-jonpark:~/workspace/jonpark-work/cnc-umbrella-chart-20                                                                              (base) jonpark@aws-sig-ts-jonpark:~/workspace/jonpark-work/cnc-umbrella-chart-2025.3.maint/local-dev$ kubectl get nodes
NAME                                                  STATUS   ROLES    AGE   VERSION
gke-jonpark-poc-clus-jonpark-poc-prim-6e8a38c0-nihf   Ready    <none>   8d    v1.30.9-gke.1127000
gke-jonpark-poc-clus-jonpark-poc-prim-6e8a38c0-tbzg   Ready    <none>   8d    v1.30.9-gke.1127000

```

## fix




---

# issue #2
## error
```bash
(base) jonpark@aws-sig-ts-jonpark:~/workspace/jonpark-work$ kind get clusters
kind
(base) jonpark@aws-sig-ts-jonpark:~/workspace/jonpark-work$
(base) jonpark@aws-sig-ts-jonpark:~/workspace/jonpark-work$ docker ps | grep kind
d14a3e645595   kindest/node:v1.25.2   "/usr/local/bin/entr…"   8 minutes ago   Up 8 minutes                                                                                                                          kind-worker
5b1fa9e58560   kindest/node:v1.25.2   "/usr/local/bin/entr…"   8 minutes ago   Up 8 minutes   0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp, 0.0.0.0:9090->9090/tcp, 127.0.0.1:33693->6443/tcp, 0.0.0.0:18080->8080/tcp   kind-control-plane
a6b81d3559cd   kindest/node:v1.25.2   "/usr/local/bin/entr…"   8 minutes ago   Up 8 minutes                                                                                                                          kind-worker2
(base) jonpark@aws-sig-ts-jonpark:~/workspace/jonpark-work$ kubectl cluster-info
E0310 06:34:49.335293 1159663 memcache.go:265] couldn't get current server API group list: Get "https://127.0.0.1:44491/api?timeout=32s": dial tcp 127.0.0.1:44491: connect: connection refused
E0310 06:34:49.335525 1159663 memcache.go:265] couldn't get current server API group list: Get "https://127.0.0.1:44491/api?timeout=32s": dial tcp 127.0.0.1:44491: connect: connection refused
E0310 06:34:49.336818 1159663 memcache.go:265] couldn't get current server API group list: Get "https://127.0.0.1:44491/api?timeout=32s": dial tcp 127.0.0.1:44491: connect: connection refused
E0310 06:34:49.337043 1159663 memcache.go:265] couldn't get current server API group list: Get "https://127.0.0.1:44491/api?timeout=32s": dial tcp 127.0.0.1:44491: connect: connection refused
E0310 06:34:49.338289 1159663 memcache.go:265] couldn't get current server API group list: Get "https://127.0.0.1:44491/api?timeout=32s": dial tcp 127.0.0.1:44491: connect: connection refused
To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
The connection to the server 127.0.0.1:44491 was refused - did you specify the right host or port?
(base) jonpark@aws-sig-ts-jonpark:~/workspace/jonpark-work$ kubectl cluster-info dump
The connection to the server 127.0.0.1:44491 was refused - did you specify the right host or port?
(base) jonpark@aws-sig-ts-jonpark:~/workspace/jonpark-work$ netstat -tulpn | grep 44491
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
(base) jonpark@aws-sig-ts-jonpark:~/workspace/jonpark-work$ kind get clusters
```

## fix 
```bash
kind export kubeconfig --name kind
```
# issue #2 - doc 
kind 클러스터는 실행 중이지만, kubectl이 클러스터에 연결할 수 없는 상황입니다. 이는 일반적으로 kubeconfig 설정이 잘못되었거나 다른 포트를 가리키고 있는 경우에 발생합니다.

## 해결 방법

1. **kubeconfig 재설정하기**:
   ```bash
   # kind 클러스터의 kubeconfig 가져오기
   kind export kubeconfig --name kind
   ```

   이 명령은 현재 실행 중인 kind 클러스터에 연결할 수 있는 올바른 kubeconfig를 생성하고 기본 경로(~/.kube/config)에 저장합니다.

2. **클러스터 IP와 포트 확인하기**:
   Docker 컨테이너 정보를 보면 kind-control-plane이 33693 포트를 사용하고 있는데, 
   kubectl은 44491 포트에 접속하려고 합니다. 올바른 포트로 수정해야 합니다.

   ```bash
   # 컨테이너 포트 확인
   docker ps | grep kind-control-plane
   ```

3. **명시적으로 kubeconfig 파일 지정하기**:
   ```bash
   # 새 kubeconfig 생성
   kind get kubeconfig > ~/kind-config
   export KUBECONFIG=~/kind-config
   
   # 연결 테스트
   kubectl cluster-info
   ```

4. **kubeconfig 백업 후 재설정**:
   ```bash
   # 기존 config 백업
   cp ~/.kube/config ~/.kube/config.bak
   
   # 새 config 생성
   kind get kubeconfig > ~/.kube/config
   ```

5. **context 이름 문제 해결**:
   `kind-kind` 대신 기본 이름인 `kind`로 설정된 것 같습니다.
   ```bash
   kubectl config get-contexts
   kubectl config use-context kind
   ```

6. **마지막 방법으로 클러스터 재생성**:
   문제가 지속된다면 클러스터를 다시 생성해볼 수 있습니다:
   ```bash
   kind delete cluster
   kind create cluster
   ```

위 방법 중에서 가장 간단하고 효과적인 것은 1번 방법입니다. 이 명령 하나로 대부분의 구성 문제가 해결됩니다. 실행 후 `kubectl cluster-info`를 통해 연결이 정상적으로 되는지 확인하세요.


# 내 작업
```bash

```

# Kind / k8s 에서 cluster 변경하는 방법


---
현재 GKE 클러스터를 보고 있습니다. Kind 클러스터를 확인하고 전환하는 방법을 알려드리겠습니다.

## Kind 클러스터 확인 방법

```bash
# Kind 클러스터 목록 확인
kind get clusters
```

## Kubernetes 컨텍스트 관리 및 전환

```bash
# 사용 가능한 모든 컨텍스트 확인
kubectl config get-contexts

# kind 클러스터로 전환
kubectl config use-context kind-kind

# 현재 컨텍스트 확인
kubectl config current-context

# 전환 후 노드 확인
kubectl get nodes
```

## k9s에서 클러스터 전환하는 방법

1. k9s 실행:
   ```bash
   k9s
   ```

2. k9s 내에서 클러스터 전환:
   - `:` 키를 눌러 명령어 모드로 전환
   - `context` 입력 후 Enter
   - 클러스터 목록이 표시되면, 방향키로 `kind-kind` 선택 후 Enter

3. 단축키로 바로 컨텍스트 전환:
   - `Ctrl+Shift+C` 키를 눌러 컨텍스트 목록 직접 표시
   - 원하는 컨텍스트 선택

## Kind 클러스터가 없는 경우 생성

만약 kind 클러스터가 없다면 다음 명령으로 생성할 수 있습니다:

```bash
# 기본 클러스터 생성
kind create cluster

# 또는 설정 파일로 클러스터 생성
kind create cluster --config=kind-config.yaml --name=kind
```

이렇게 하면 Kind 클러스터를 확인하고 전환하여 원래 명령을 실행할 수 있습니다.