

# Get image list from the docker registry

``` bash
export KIND_CREATE_CLUSTER=${KIND_CREATE_CLUSTER:-true}
++ export KIND_CREATE_CLUSTER=true
++ KIND_CREATE_CLUSTER=true
export KIND_NODE_IMAGE=${KIND_NODE_IMAGE:-"kindest/node:v1.25.2"}
++ export KIND_NODE_IMAGE=kindest/node:v1.25.2
++ KIND_NODE_IMAGE=kindest/node:v1.25.2
export REGISTRY_IMAGE=${REGISTRY_IMAGE:-"docker.io/library/registry:2"}
++ export REGISTRY_IMAGE=docker.io/library/registry:2
++ REGISTRY_IMAGE=docker.io/library/registry:2
export REGISTRY_NAME=${REGISTRY_NAME:-'kind-registry'}
++ export REGISTRY_NAME=kind-registry
++ REGISTRY_NAME=kind-registry
export REGISTRY_PORT=${REGISTRY_PORT:-'5000'}
++ export REGISTRY_PORT=5000
++ REGISTRY_PORT=5000
```

WSL Ubuntu에서 설정된 로컬 Registry에서 이미지 리스트를 출력하는 방법을 알려드리겠습니다.

제공하신 환경 변수를 보니 `kind-registry`라는 이름의 로컬 레지스트리가 포트 5000에서 실행 중인 것 같습니다. 이 레지스트리에 등록된 이미지 리스트를 출력하는 방법은 다음과 같습니다:

## 로컬 레지스트리(kind-registry)의 이미지 리스트 출력

```bash
# 레지스트리 카탈로그 조회
curl -X GET http://localhost:5000/v2/_catalog
```

응답은 다음과 같은 JSON 형식으로 표시됩니다:
```json
{"repositories":["image1", "image2", ...]}
```

## 특정 이미지의 태그 목록 확인

특정 이미지의 모든 태그를 확인하려면:

```bash
# 이미지 이름을 지정하여 태그 목록 조회
curl -X GET http://localhost:5000/v2/[이미지이름]/tags/list
```

예를 들어, `nginx` 이미지의 태그를 확인하려면:

```bash
curl -X GET http://localhost:5000/v2/nginx/tags/list
```

## 포맷팅하여 보기 쉽게 출력

jq를 설치하여 JSON 결과를 보기 좋게 포맷팅할 수 있습니다:

```bash
# jq 설치
sudo apt install -y jq

# 포맷팅된 출력
curl -X GET http://localhost:5000/v2/_catalog | jq
```

## 레지스트리에 직접 이미지 푸시하는 방법

새 이미지를 이 레지스트리에 푸시하려면:

```bash
# 이미지에 태그 지정
docker tag [이미지이름]:[태그] localhost:5000/[이미지이름]:[태그]

# 레지스트리에 푸시
docker push localhost:5000/[이미지이름]:[태그]
```

## 참고: 레지스트리가 실행 중인지 확인

레지스트리가 실행 중인지 확인하려면:

```bash
docker ps | grep kind-registry
```

레지스트리가 실행되지 않은 경우 다음 명령으로 시작할 수 있습니다:

```bash
docker run -d --name kind-registry -p 5000:5000 docker.io/library/registry:2
```