
# CNC debug
## Access host
https://aws-sig-ts-jonpark.aws.internal/

### Return
This site can’t be reached
aws-sig-ts-jonpark.aws.internal refused to connect.
Try:

Checking the connection
Checking the proxy and the firewall
ERR_CONNECTION_REFUSED


### k9s > ingress > cnc-cim > Describe

### Kubernetes Ingress: cnc-cim

#### Basic Information
| Field | Value |
|-------|-------|
| **Name** | cnc-cim |
| **Namespace** | cnc |
| **Address** | 10.96.104.21 |
| **Default backend** | default-http-backend:80 (<error: endpoints "default-http-backend" not found>) |

#### TLS Configuration
cnc-cim-tls-nginx terminates aws-sig-ts-jonpark.aws.internal

#### Routing Rules

| Host | Path | Backend |
|------|------|---------|
| aws-sig-ts-jonpark.aws.internal | / | cnc-cim-cim:8443 (172.16.1.33:8443) |

#### Annotations
- meta.helm.sh/release-name: cnc-cim
- meta.helm.sh/release-namespace: cnc
- nginx.ingress.kubernetes.io/backend-protocol: HTTPS

#### Events
\<none\>


# Issue : SSL Certificate Mismatch
## error log

### k9s > pod > inggress controller > log

```bash
I0310 10:51:25.487782      13 event.go:282] Event(v1.ObjectReference{Kind:"Pod", Namespace:"ingress-nginx", Name:"my-nginx-ingress-nginx-controller-7db7fdff4d-pdrsb", UID:"8b0e4a21-6378-4d21-8f1f-ed01ca8a48b8", APIVersion:"v1", ResourceVersion:"671", FieldPath:""}): type: 'Normal' reason: 'RELOAD' NGINX reload triggered due to a change in configuration
W0310 10:51:28.745556      13 controller.go:1083] Service "cnc/cnc-minio" does not have any active Endpoint.
W0310 10:51:28.745585      13 controller.go:1083] Service "cnc/cnc-cim-cnc-storage-proxy" does not have any active Endpoint.
W0310 10:51:28.745610      13 controller.go:1083] Service "cnc/cnc-cim-cim" does not have any active Endpoint.
W0310 10:51:28.745635      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:28.745648      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:51:28.745657      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:28.745667      13 controller.go:1327] Using default certificate
W0310 10:51:28.745706      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
W0310 10:51:32.078103      13 controller.go:1083] Service "cnc/cnc-minio" does not have any active Endpoint.
W0310 10:51:32.078130      13 controller.go:1083] Service "cnc/cnc-cim-cnc-storage-proxy" does not have any active Endpoint.
W0310 10:51:32.078151      13 controller.go:1083] Service "cnc/cnc-cim-cim" does not have any active Endpoint.
W0310 10:51:32.078176      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:32.078190      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:51:32.078199      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:32.078208      13 controller.go:1327] Using default certificate
W0310 10:51:32.078250      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
W0310 10:51:35.411303      13 controller.go:1083] Service "cnc/cnc-minio" does not have any active Endpoint.
W0310 10:51:35.411329      13 controller.go:1083] Service "cnc/cnc-cim-cnc-storage-proxy" does not have any active Endpoint.
W0310 10:51:35.411350      13 controller.go:1083] Service "cnc/cnc-cim-cim" does not have any active Endpoint.
W0310 10:51:35.411377      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:35.411390      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:51:35.411400      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:35.411410      13 controller.go:1327] Using default certificate
W0310 10:51:35.411457      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
W0310 10:51:38.745429      13 controller.go:1083] Service "cnc/cnc-minio" does not have any active Endpoint.
W0310 10:51:38.745454      13 controller.go:1083] Service "cnc/cnc-cim-cnc-storage-proxy" does not have any active Endpoint.
W0310 10:51:38.745475      13 controller.go:1083] Service "cnc/cnc-cim-cim" does not have any active Endpoint.
W0310 10:51:38.745504      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:38.745522      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:51:38.745536      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:38.745546      13 controller.go:1327] Using default certificate
W0310 10:51:38.745584      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
W0310 10:51:42.077570      13 controller.go:1083] Service "cnc/cnc-cim-cnc-storage-proxy" does not have any active Endpoint.
W0310 10:51:42.077604      13 controller.go:1083] Service "cnc/cnc-cim-cim" does not have any active Endpoint.
W0310 10:51:42.077637      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:42.077652      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:51:42.077662      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:42.077672      13 controller.go:1327] Using default certificate
W0310 10:51:42.077711      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
I0310 10:51:48.013671      13 status.go:299] "updating Ingress status" namespace="cnc" ingress="cnc-minio-api" currentValue=[] newValue=[{IP:10.96.104.21 Hostname: Ports:[]}]
I0310 10:51:48.013711      13 status.go:299] "updating Ingress status" namespace="cnc" ingress="cnc-cim" currentValue=[] newValue=[{IP:10.96.104.21 Hostname: Ports:[]}]
I0310 10:51:48.013724      13 status.go:299] "updating Ingress status" namespace="cnc" ingress="cnc-cim-storage-proxy" currentValue=[] newValue=[{IP:10.96.104.21 Hostname: Ports:[]}]
I0310 10:51:48.013733      13 status.go:299] "updating Ingress status" namespace="cnc" ingress="cnc-cim-crossbar" currentValue=[] newValue=[{IP:10.96.104.21 Hostname: Ports:[]}]
I0310 10:51:48.016055      13 event.go:282] Event(v1.ObjectReference{Kind:"Ingress", Namespace:"cnc", Name:"cnc-cim", UID:"6fae7458-0baf-40a2-bd16-4359f5ae4746", APIVersion:"networking.k8s.io/v1", ResourceVersion:"5375", FieldPath:""}): type: 'Normal' reason: 'Sync' Scheduled for sync
W0310 10:51:48.016479      13 controller.go:1083] Service "cnc/cnc-cim-cnc-storage-proxy" does not have any active Endpoint.
W0310 10:51:48.016520      13 controller.go:1083] Service "cnc/cnc-cim-cim" does not have any active Endpoint.
W0310 10:51:48.016551      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:48.016563      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:51:48.016571      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:48.016582      13 controller.go:1327] Using default certificate
W0310 10:51:48.016632      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
I0310 10:51:48.017281      13 event.go:282] Event(v1.ObjectReference{Kind:"Ingress", Namespace:"cnc", Name:"cnc-minio-api", UID:"b39d4bfe-f9b8-4710-8e6e-b221dc75b58d", APIVersion:"networking.k8s.io/v1", ResourceVersion:"5376", FieldPath:""}): type: 'Normal' reason: 'Sync' Scheduled for sync
I0310 10:51:48.017627      13 event.go:282] Event(v1.ObjectReference{Kind:"Ingress", Namespace:"cnc", Name:"cnc-cim-crossbar", UID:"3ff5a02c-d3e1-4b4e-b1c4-b49f0bf0dcb9", APIVersion:"networking.k8s.io/v1", ResourceVersion:"5377", FieldPath:""}): type: 'Normal' reason: 'Sync' Scheduled for sync
I0310 10:51:48.017896      13 event.go:282] Event(v1.ObjectReference{Kind:"Ingress", Namespace:"cnc", Name:"cnc-cim-storage-proxy", UID:"23f93f96-2bc9-4645-947b-b3d5d30e0bb9", APIVersion:"networking.k8s.io/v1", ResourceVersion:"5378", FieldPath:""}): type: 'Normal' reason: 'Sync' Scheduled for sync
W0310 10:51:51.350611      13 controller.go:1083] Service "cnc/cnc-cim-cnc-storage-proxy" does not have any active Endpoint.
W0310 10:51:51.350647      13 controller.go:1083] Service "cnc/cnc-cim-cim" does not have any active Endpoint.
W0310 10:51:51.350673      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:51.350687      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:51:51.350696      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:51.350705      13 controller.go:1327] Using default certificate
W0310 10:51:51.350751      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
W0310 10:51:54.685843      13 controller.go:1083] Service "cnc/cnc-cim-cnc-storage-proxy" does not have any active Endpoint.
W0310 10:51:54.685878      13 controller.go:1083] Service "cnc/cnc-cim-cim" does not have any active Endpoint.
W0310 10:51:54.685906      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:54.685918      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:51:54.685927      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:51:54.685934      13 controller.go:1327] Using default certificate
W0310 10:51:54.685975      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
W0310 10:52:09.784430      13 controller.go:1083] Service "cnc/cnc-cim-cnc-storage-proxy" does not have any active Endpoint.
W0310 10:52:09.784473      13 controller.go:1083] Service "cnc/cnc-cim-cim" does not have any active Endpoint.
W0310 10:52:09.784508      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:52:09.784524      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:52:09.784537      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:52:09.784550      13 controller.go:1327] Using default certificate
W0310 10:52:09.784601      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
W0310 10:52:23.157152      13 controller.go:1083] Service "cnc/cnc-cim-cim" does not have any active Endpoint.
W0310 10:52:23.157190      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:52:23.157202      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:52:23.157211      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:52:23.157221      13 controller.go:1327] Using default certificate
W0310 10:52:23.157258      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
W0310 10:52:26.492455      13 controller.go:1083] Service "cnc/cnc-cim-cim" does not have any active Endpoint.
W0310 10:52:26.492492      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:52:26.492505      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:52:26.492514      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:52:26.492524      13 controller.go:1327] Using default certificate
W0310 10:52:26.492563      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
W0310 10:52:53.011604      13 controller.go:1083] Service "cnc/cnc-cim-cim" does not have any active Endpoint.
W0310 10:52:53.011648      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:52:53.011665      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:52:53.011676      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:52:53.011690      13 controller.go:1327] Using default certificate
W0310 10:52:53.011739      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
W0310 10:53:01.805354      13 controller.go:1320] Unexpected error validating SSL certificate "cnc/cnc-cim-tls-nginx" for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:53:01.805377      13 controller.go:1321] Validating certificate against DNS names. This will be deprecated in a future version
W0310 10:53:01.805388      13 controller.go:1326] SSL certificate "cnc/cnc-cim-tls-nginx" does not contain a Common Name or Subject Alternative Name for server "aws-sig-ts-jonpark.aws.internal": x509: certificate is valid for local.connect.example.com, not aws-sig-ts-jonpark.aws.internal
W0310 10:53:01.805430      13 controller.go:1327] Using default certificate
W0310 10:53:01.805478      13 controller.go:395] Error getting Service "cnc-cim/cim-cim": no object matching key "cnc-cim/cim-cim" in local store
Stream closed EOF for ingress-nginx/my-nginx-ingress-nginx-controller-7db7fdff4d-pdrsb (controller)

```

## Analysis

I'll analyze the Kubernetes Ingress NGINX controller logs to identify and help solve the issues. Based on the logs, there are several problems that need to be addressed:

### Main Issues Identified

1. **SSL Certificate Mismatch**:
   - The certificate is valid for `local.connect.example.com` but is being used for `aws-sig-ts-jonpark.aws.internal`
   - This is causing the controller to fall back to the default certificate

2. **Missing Service Endpoints**:
   - Multiple services don't have active endpoints:
     - `cnc/cnc-minio`
     - `cnc/cnc-cim-cnc-storage-proxy`
     - `cnc/cnc-cim-cim`

3. **Service Not Found**:
   - Error getting Service `cnc-cim/cim-cim`: no object matching key in local store

### Recommended Solutions

#### 1. Fix the SSL Certificate Issue:

```bash
# Create a new TLS certificate that includes the correct domain
kubectl create secret tls cnc-cim-tls-nginx \
  --namespace cnc \
  --key=path/to/private.key \
  --cert=path/to/certificate.crt
```

Ensure the certificate includes `aws-sig-ts-jonpark.aws.internal` either as the Common Name (CN) or in the Subject Alternative Name (SAN) field.

#### 2. Check the Services and Their Endpoints:

```bash
# Check the service status
kubectl get svc -n cnc cnc-minio cnc-cim-cnc-storage-proxy cnc-cim-cim

# Check if pods backing these services are running
kubectl get pods -n cnc -l app=cnc-minio
kubectl get pods -n cnc -l app=cnc-cim-cnc-storage-proxy
kubectl get pods -n cnc -l app=cnc-cim-cim

# Check endpoints
kubectl get endpoints -n cnc cnc-minio cnc-cim-cnc-storage-proxy cnc-cim-cim
```

#### 3. Fix the Service Name Mismatch:

The logs show attempts to access `cnc-cim/cim-cim` but the service should be in the `cnc` namespace. Check if:

```bash
# Verify the service exists in the correct namespace
kubectl get svc -n cnc cim-cim
kubectl get svc -n cnc-cim cim-cim 2>/dev/null || echo "Service not found in cnc-cim namespace"

# If needed, create or modify the service reference in your Ingress
kubectl edit ingress cnc-cim -n cnc
```

In the Ingress definition, make sure the backend service is correctly defined as `cnc-cim-cim` in the `cnc` namespace, not `cim-cim` in the `cnc-cim` namespace.

Let me know if you need more specific guidance based on your environment's configuration!

## Act
### Check SVC
* K9s > svc > cnc-cim-cim > Describe

#### Describe

| | |
|-----|-------|
| **Name** | cnc-cim-cim |
| **Namespace** | cnc |
| **Labels** | app.kubernetes.io/component=cim<br>app.kubernetes.io/instance=cnc-cim<br>app.kubernetes.io/managed-by=Helm<br>app.kubernetes.io/name=cim<br>app.kubernetes.io/part-of=coverity<br>app.kubernetes.io/version=2025.3.0<br>helm.sh/chart=cnc-0.0.1 |
| **Annotations** | meta.helm.sh/release-name: cnc-cim |
| **meta.helm.sh/release-namespace** | cnc |
| **Selector** | app.kubernetes.io/component=cim,app.kubernetes.io/instance=cnc-cim,app.kubernetes.io/name=cim,app.kubernetes.io/part-of=coverity |
| **Type** | ClusterIP |
| **IP Family Policy** | SingleStack |
| **IP Families** | IPv4 |
| **IP** | 10.96.102.0 |
| **IPs** | 10.96.102.0 |
| **Port** | p8080  8080/TCP<br>p8443  8443/TCP |
| **TargetPort** | 8080/TCP<br>8443/TCP |
| **Endpoints** | 172.16.1.33:8080<br>172.16.1.33:8443 |
| **Session Affinity** | None |
| **Events** | <none> |


#### Log

```bash
Stream closed EOF for cnc/cnc-cim-cim-555c588b9d-p7wxb (cim-downloads)
Stream closed EOF for cnc/cnc-cim-cim-555c588b9d-p7wxb (otel-agent)
cnc-cim-cim-555c588b9d-p7wxb cim-webapp {
  "@type":"WebAccessEvent",
  "timestamp":"2025-03-11T01:14:42.152+0000",
  "level":"INFO",
  "hostname":"cnc-cim-cim-555c588b9d-p7wxb",
  "count":1,
  "ipv6":false,
  "remoteHost":"172.16.1.1",
  "userId":null,
  "url":"/login/login.htm",
  "userAgent":"kube-probe/1.25",
  "languages":[
  ],
  "duration":4
}
cnc-cim-cim-555c588b9d-p7wxb cim-webapp {
  "@type":"PerformanceLogEvent",
  "timestamp":"2025-03-11T01:14:44.308+0000",
  "level":"INFO",
  "hostname":"cnc-cim-cim-555c588b9d-p7wxb",
  "count":1,
  "metrics":{
    "backUpInProgress":0.0,
    "commitExecutorSize":5.0,
    "unixOneMinuteLoadAverage":-1.0,
    "cimCpuUsage":-1.0,
    "memoryUsed":1.974659168E9,
    "webRequestsPerSecond":0.0,
    "diskBytesRead":0.0,
    "activeCommitCount":0.0,
    "commitQueueSize":0.0,
    "memoryTotal":6.874464256E9,
    "wsRequestsPerSecond":0.0,
    "commitGateOpen":1.0,
    "diskBytesWritten":0.0,
    "skeletonizationInProgress":0.0
  }
}
cnc-cim-cim-555c588b9d-p7wxb cim-webapp {
  "timeMillis":1741655707365,
  "thread":"http-nio-8089-exec-4",
  "level":"WARN",
  "loggerName":"com.coverity.ces.web.servlet.CimMetricsServlet",
  "message":"Metrics endpoint is not accessible on this port.",
  "endOfBatch":false,
  "loggerFqcn":"org.apache.logging.slf4j.Log4jLogger",
  "threadId":99,
  "threadPriority":5
}
cnc-cim-cim-555c588b9d-p7wxb cim-webapp {
  "@type":"WebAccessEvent",
  "timestamp":"2025-03-11T01:15:27.152+0000",
  "level":"INFO",
  "hostname":"cnc-cim-cim-555c588b9d-p7wxb",
  "count":1,
  "ipv6":false,
  "remoteHost":"172.16.1.1",
  "userId":null,
  "url":"/login/login.htm",
  "userAgent":"kube-probe/1.25",
  "languages":[
  ],
  "duration":4
}
Stream closed EOF for cnc/cnc-cim-cim-555c588b9d-p7wxb (cim-webapp)
Stream closed EOF for cnc/cnc-cim-cim-555c588b9d-p7wxb (tls-sidecar)
Stream closed EOF for cnc/cnc-cim-cim-555c588b9d-p7wxb (cim-docs)
```