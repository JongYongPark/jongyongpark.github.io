---
title: "KinD for k8s"
date: 2025-02-14
categories: ["k8s"]
tags: ["KinD"]
---

---

# KinD로 3개의 worker node를 포함한 클러스터를 만드는 Bash 스크립트

다음은 `KinD`(Kubernetes in Docker)를 사용하여 프라이빗 클라우드를 생성하고, 3개의 worker node를 포함한 클러스터를 만드는 Bash 스크립트입니다. 이 스크립트는 필요한 유틸리티를 다운로드하고 설치하며, `kind` 클러스터를 구성합니다.

### **Bash Script: `setup_kind_cluster.sh`**

```bash
#!/bin/bash

# 스크립트 실행 중 오류 발생 시 중단
set -e

# 변수 정의
KIND_VERSION="v0.20.0"
KUBECTL_VERSION="v1.28.0"
DOCKER_COMPOSE_VERSION="v2.22.0"

# 필요한 유틸리티 다운로드 및 설치
install_utilities() {
  # Docker 설치 (Docker가 설치되어 있지 않을 경우)
  if ! command -v docker &> /dev/null; then
    echo "Docker를 설치 중입니다..."
    curl -fsSL https://get.docker.com | bash
    sudo usermod -aG docker $USER
    echo "Docker 설치 완료. 사용하려면 로그아웃 후 다시 로그인하세요."
  else
    echo "Docker가 이미 설치되어 있습니다."
  fi

  # kind 설치
  if ! command -v kind &> /dev/null; then
    echo "Kind를 설치 중입니다..."
    curl -Lo ./kind https://kind.sigs.k8s.io/dl/${KIND_VERSION}/kind-linux-amd64
    chmod +x ./kind
    sudo mv ./kind /usr/local/bin/kind
    echo "Kind 설치 완료."
  else
    echo "Kind가 이미 설치되어 있습니다."
  fi

  # kubectl 설치
  if ! command -v kubectl &> /dev/null; then
    echo "Kubectl을 설치 중입니다..."
    curl -LO "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl"
    chmod +x ./kubectl
    sudo mv ./kubectl /usr/local/bin/kubectl
    echo "Kubectl 설치 완료."
  else
    echo "Kubectl이 이미 설치되어 있습니다."
  fi

  # Docker Compose 설치 (필요한 경우)
  if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose를 설치 중입니다..."
    curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    echo "Docker Compose 설치 완료."
  else
    echo "Docker Compose가 이미 설치되어 있습니다."
  fi
}

# Kind 클러스터 설정 파일 생성
create_kind_cluster_config() {
  echo "Kind 클러스터 설정 파일을 생성합니다..."

  cat <<EOF > kind-cluster-config.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
  - role: worker
  - role: worker
  - role: worker
EOF

  echo "Kind 클러스터 설정 파일 생성 완료."
}

# Kind 클러스터 생성
create_kind_cluster() {
  echo "Kind 클러스터를 생성합니다..."

  kind create cluster --config kind-cluster-config.yaml

  echo "Kind 클러스터 생성 완료."
}

# 주요 함수 호출
install_utilities
create_kind_cluster_config
create_kind_cluster

# 클러스터 정보 출력
kubectl get nodes

echo "3개의 worker 노드를 포함한 Kind 클러스터가 성공적으로 생성되었습니다."
```

### **스크립트 설명**
1. **필수 유틸리티 설치**:
   - `Docker`, `kind`, `kubectl`, `docker-compose`가 설치되지 않은 경우 자동으로 다운로드하고 설치합니다.
2. **클러스터 구성 파일**:
   - `kind-cluster-config.yaml` 파일을 생성하며, 하나의 control-plane 노드와 3개의 worker 노드를 포함합니다.
3. **클러스터 생성**:
   - `kind`를 이용해 클러스터를 생성합니다.
4. **kubectl로 클러스터 상태 확인**:
   - `kubectl` 명령어를 통해 생성된 클러스터의 노드 상태를 확인할 수 있습니다.

### **사용 방법**:
1. 스크립트를 파일로 저장 (예: `setup_kind_cluster.sh`).
2. 파일에 실행 권한을 부여:
   ```bash
   chmod +x setup_kind_cluster.sh
   ```
3. 스크립트 실행:
   ```bash
   ./setup_kind_cluster.sh
   ```
4. 클러스터가 성공적으로 생성되면 `kubectl get nodes` 명령을 통해 노드 상태를 확인할 수 있습니다.

이 스크립트는 `KinD`를 활용하여 간단하게 3개의 worker 노드가 있는 클러스터를 설정할 수 있도록 도와줍니다.