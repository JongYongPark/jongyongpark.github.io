---
title: "SSHFS Debugging"
date: 2025-03-10
categories: ["SDLC"]
tags: ["sshfs"]
---

# 내 작업 

아래 명령어로 중복된 sshfs 가 있다면 
mount | grep sshfs

아래 명령어로 제거하 다시 시도
sudo umount ~/work_jonpark

mount_jonpark


```bash
(base) jonpark@BD-82898:~/workspace/jonpark-work/cnc-umbrella-chart-2025.3.maint/local-dev$ ssh -vvv jonpark@aws-sig-ts-jonpark.aws.internalal
OpenSSH_9.6p1 Ubuntu-3ubuntu13.8, OpenSSL 3.0.13 30 Jan 2024
debug1: Reading configuration data /home/jonpark/.ssh/config
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: /etc/ssh/ssh_config line 19: include /etc/ssh/ssh_config.d/*.conf matched no files
debug1: /etc/ssh/ssh_config line 21: Applying options for *
debug3: expanded UserKnownHostsFile '~/.ssh/known_hosts' -> '/home/jonpark/.ssh/known_hosts'
debug3: expanded UserKnownHostsFile '~/.ssh/known_hosts2' -> '/home/jonpark/.ssh/known_hosts2'
debug2: resolving "aws-sig-ts-jonpark.aws.internal" port 22
debug3: resolve_host: lookup aws-sig-ts-jonpark.aws.internal:22
debug3: channel_clear_timeouts: clearing
debug3: ssh_connect_direct: entering
debug1: Connecting to aws-sig-ts-jonpark.aws.internal [10.230.157.239] port 22.
debug3: set_sock_tos: set socket 3 IP_TOS 0x10
debug1: Connection established.
debug1: identity file /home/jonpark/.ssh/id_rsa type -1
debug1: identity file /home/jonpark/.ssh/id_rsa-cert type -1
debug1: identity file /home/jonpark/.ssh/id_ecdsa type -1
debug1: identity file /home/jonpark/.ssh/id_ecdsa-cert type -1
debug1: identity file /home/jonpark/.ssh/id_ecdsa_sk type -1
debug1: identity file /home/jonpark/.ssh/id_ecdsa_sk-cert type -1
debug1: identity file /home/jonpark/.ssh/id_ed25519 type -1
debug1: identity file /home/jonpark/.ssh/id_ed25519-cert type -1
debug1: identity file /home/jonpark/.ssh/id_ed25519_sk type -1
debug1: identity file /home/jonpark/.ssh/id_ed25519_sk-cert type -1
debug1: identity file /home/jonpark/.ssh/id_xmss type -1
debug1: identity file /home/jonpark/.ssh/id_xmss-cert type -1
debug1: identity file /home/jonpark/.ssh/id_dsa type -1
debug1: identity file /home/jonpark/.ssh/id_dsa-cert type -1
debug1: Local version string SSH-2.0-OpenSSH_9.6p1 Ubuntu-3ubuntu13.8
debug1: Remote protocol version 2.0, remote software version OpenSSH_8.9p1 Ubuntu-3ubuntu0.11
debug1: compat_banner: match: OpenSSH_8.9p1 Ubuntu-3ubuntu0.11 pat OpenSSH* compat 0x04000000
debug2: fd 3 setting O_NONBLOCK
debug1: Authenticating to aws-sig-ts-jonpark.aws.internal:22 as 'jonpark'
debug1: load_hostkeys: fopen /home/jonpark/.ssh/known_hosts2: No such file or directory
debug1: load_hostkeys: fopen /etc/ssh/ssh_known_hosts: No such file or directory
debug1: load_hostkeys: fopen /etc/ssh/ssh_known_hosts2: No such file or directory
debug3: order_hostkeyalgs: no algorithms matched; accept original
debug3: send packet: type 20
debug1: SSH2_MSG_KEXINIT sent
debug3: receive packet: type 20
debug1: SSH2_MSG_KEXINIT received
debug2: local client KEXINIT proposal
debug2: KEX algorithms: sntrup761x25519-sha512@openssh.com,curve25519-sha256,curve25519-sha256@libssh.org,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group-exchange-sha256,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512,diffie-hellman-group14-sha256,ext-info-c,kex-strict-c-v00@openssh.com
debug2: host key algorithms: ssh-ed25519-cert-v01@openssh.com,ecdsa-sha2-nistp256-cert-v01@openssh.com,ecdsa-sha2-nistp384-cert-v01@openssh.com,ecdsa-sha2-nistp521-cert-v01@openssh.com,sk-ssh-ed25519-cert-v01@openssh.com,sk-ecdsa-sha2-nistp256-cert-v01@openssh.com,rsa-sha2-512-cert-v01@openssh.com,rsa-sha2-256-cert-v01@openssh.com,ssh-ed25519,ecdsa-sha2-nistp256,ecdsa-sha2-nistp384,ecdsa-sha2-nistp521,sk-ssh-ed25519@openssh.com,sk-ecdsa-sha2-nistp256@openssh.com,rsa-sha2-512,rsa-sha2-256
debug2: ciphers ctos: chacha20-poly1305@openssh.com,aes128-ctr,aes192-ctr,aes256-ctr,aes128-gcm@openssh.com,aes256-gcm@openssh.com
debug2: ciphers stoc: chacha20-poly1305@openssh.com,aes128-ctr,aes192-ctr,aes256-ctr,aes128-gcm@openssh.com,aes256-gcm@openssh.com
debug2: MACs ctos: umac-64-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,hmac-sha1-etm@openssh.com,umac-64@openssh.com,umac-128@openssh.com,hmac-sha2-256,hmac-sha2-512,hmac-sha1
debug2: MACs stoc: umac-64-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,hmac-sha1-etm@openssh.com,umac-64@openssh.com,umac-128@openssh.com,hmac-sha2-256,hmac-sha2-512,hmac-sha1
debug2: compression ctos: none,zlib@openssh.com,zlib
debug2: compression stoc: none,zlib@openssh.com,zlib
debug2: languages ctos: 
debug2: languages stoc: 
debug2: first_kex_follows 0 
debug2: reserved 0 
debug2: peer server KEXINIT proposal
debug2: KEX algorithms: curve25519-sha256,curve25519-sha256@libssh.org,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group-exchange-sha256,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512,diffie-hellman-group14-sha256,kex-strict-s-v00@openssh.com
debug2: host key algorithms: rsa-sha2-512,rsa-sha2-256,ecdsa-sha2-nistp256,ssh-ed25519
debug2: ciphers ctos: chacha20-poly1305@openssh.com,aes128-ctr,aes192-ctr,aes256-ctr,aes128-gcm@openssh.com,aes256-gcm@openssh.com
debug2: ciphers stoc: chacha20-poly1305@openssh.com,aes128-ctr,aes192-ctr,aes256-ctr,aes128-gcm@openssh.com,aes256-gcm@openssh.com
debug2: MACs ctos: umac-128-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,umac-128@openssh.com,hmac-sha2-256,hmac-sha2-512
debug2: MACs stoc: umac-128-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,umac-128@openssh.com,hmac-sha2-256,hmac-sha2-512
debug2: compression ctos: none,zlib@openssh.com
debug2: compression stoc: none,zlib@openssh.com
debug2: languages ctos: 
debug2: languages stoc: 
debug2: first_kex_follows 0 
debug2: reserved 0 
debug3: kex_choose_conf: will use strict KEX ordering
debug1: kex: algorithm: curve25519-sha256
debug1: kex: host key algorithm: ssh-ed25519
debug1: kex: server->client cipher: chacha20-poly1305@openssh.com MAC: <implicit> compression: none
debug1: kex: client->server cipher: chacha20-poly1305@openssh.com MAC: <implicit> compression: none
debug3: send packet: type 30
debug1: expecting SSH2_MSG_KEX_ECDH_REPLY
debug3: receive packet: type 31
debug1: SSH2_MSG_KEX_ECDH_REPLY received
debug1: Server host key: ssh-ed25519 SHA256:5D1rxgnPZJQM+hxFvUM5lP6+jMATgvQgonw/F8TIRVA
debug1: load_hostkeys: fopen /home/jonpark/.ssh/known_hosts2: No such file or directory
debug1: load_hostkeys: fopen /etc/ssh/ssh_known_hosts: No such file or directory
debug1: load_hostkeys: fopen /etc/ssh/ssh_known_hosts2: No such file or directory
debug3: hostkeys_find_by_key_hostfile: trying user hostfile "/home/jonpark/.ssh/known_hosts"
debug3: hostkeys_foreach: reading file "/home/jonpark/.ssh/known_hosts"
debug1: hostkeys_find_by_key_cb: found matching key in ~/.ssh/known_hosts:1
debug3: hostkeys_find_by_key_hostfile: trying user hostfile "/home/jonpark/.ssh/known_hosts2"
debug1: hostkeys_find_by_key_hostfile: hostkeys file /home/jonpark/.ssh/known_hosts2 does not exist
debug3: hostkeys_find_by_key_hostfile: trying system hostfile "/etc/ssh/ssh_known_hosts"
debug1: hostkeys_find_by_key_hostfile: hostkeys file /etc/ssh/ssh_known_hosts does not exist
debug3: hostkeys_find_by_key_hostfile: trying system hostfile "/etc/ssh/ssh_known_hosts2"
debug1: hostkeys_find_by_key_hostfile: hostkeys file /etc/ssh/ssh_known_hosts2 does not exist
The authenticity of host 'aws-sig-ts-jonpark.aws.internal (10.230.157.239)' can't be established.
ED25519 key fingerprint is SHA256:5D1rxgnPZJQM+hxFvUM5lP6+jMATgvQgonw/F8TIRVA.
This host key is known by the following other names/addresses:
    ~/.ssh/known_hosts:1: us03-sig-ts-jonpark.nprd.sig.synopsys.com
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'aws-sig-ts-jonpark.aws.internal' (ED25519) to the list of known hosts.
debug3: send packet: type 21
debug1: ssh_packet_send2_wrapped: resetting send seqnr 3
debug2: ssh_set_newkeys: mode 1
debug1: rekey out after 134217728 blocks
debug1: SSH2_MSG_NEWKEYS sent
debug1: expecting SSH2_MSG_NEWKEYS
debug3: receive packet: type 21
debug1: ssh_packet_read_poll2: resetting read seqnr 3
debug1: SSH2_MSG_NEWKEYS received
debug2: ssh_set_newkeys: mode 0
debug1: rekey in after 134217728 blocks
debug3: send packet: type 5
debug3: receive packet: type 7
debug1: SSH2_MSG_EXT_INFO received
debug3: kex_input_ext_info: extension server-sig-algs
debug1: kex_ext_info_client_parse: server-sig-algs=<ssh-ed25519,sk-ssh-ed25519@openssh.com,ssh-rsa,rsa-sha2-256,rsa-sha2-512,ssh-dss,ecdsa-sha2-nistp256,ecdsa-sha2-nistp384,ecdsa-sha2-nistp521,sk-ecdsa-sha2-nistp256@openssh.com,webauthn-sk-ecdsa-sha2-nistp256@openssh.com>
debug3: kex_input_ext_info: extension publickey-hostbound@openssh.com
debug1: kex_ext_info_check_ver: publickey-hostbound@openssh.com=<0>
debug3: receive packet: type 6
debug2: service_accept: ssh-userauth
debug1: SSH2_MSG_SERVICE_ACCEPT received
debug3: send packet: type 50
debug3: receive packet: type 51
debug1: Authentications that can continue: publickey,gssapi-keyex,gssapi-with-mic,password
debug3: start over, passed a different list publickey,gssapi-keyex,gssapi-with-mic,password
debug3: preferred gssapi-with-mic,publickey,keyboard-interactive,password
debug3: authmethod_lookup gssapi-with-mic
debug3: remaining preferred: publickey,keyboard-interactive,password
debug3: authmethod_is_enabled gssapi-with-mic
debug1: Next authentication method: gssapi-with-mic
debug1: No credentials were supplied, or the credentials were unavailable or inaccessible
No Kerberos credentials available (default cache: FILE:/tmp/krb5cc_1000)


debug1: No credentials were supplied, or the credentials were unavailable or inaccessible
No Kerberos credentials available (default cache: FILE:/tmp/krb5cc_1000)


debug2: we did not send a packet, disable method
debug3: authmethod_lookup publickey
debug3: remaining preferred: keyboard-interactive,password
debug3: authmethod_is_enabled publickey
debug1: Next authentication method: publickey
debug1: Will attempt key: /home/jonpark/.ssh/id_rsa 
debug1: Will attempt key: /home/jonpark/.ssh/id_ecdsa 
debug1: Will attempt key: /home/jonpark/.ssh/id_ecdsa_sk 
debug1: Will attempt key: /home/jonpark/.ssh/id_ed25519 
debug1: Will attempt key: /home/jonpark/.ssh/id_ed25519_sk 
debug1: Will attempt key: /home/jonpark/.ssh/id_xmss 
debug1: Will attempt key: /home/jonpark/.ssh/id_dsa 
debug2: pubkey_prepare: done
debug1: Trying private key: /home/jonpark/.ssh/id_rsa
debug3: no such identity: /home/jonpark/.ssh/id_rsa: No such file or directory
debug1: Trying private key: /home/jonpark/.ssh/id_ecdsa
debug3: no such identity: /home/jonpark/.ssh/id_ecdsa: No such file or directory
debug1: Trying private key: /home/jonpark/.ssh/id_ecdsa_sk
debug3: no such identity: /home/jonpark/.ssh/id_ecdsa_sk: No such file or directory
debug1: Trying private key: /home/jonpark/.ssh/id_ed25519
debug3: no such identity: /home/jonpark/.ssh/id_ed25519: No such file or directory
debug1: Trying private key: /home/jonpark/.ssh/id_ed25519_sk
debug3: no such identity: /home/jonpark/.ssh/id_ed25519_sk: No such file or directory
debug1: Trying private key: /home/jonpark/.ssh/id_xmss
debug3: no such identity: /home/jonpark/.ssh/id_xmss: No such file or directory
debug1: Trying private key: /home/jonpark/.ssh/id_dsa
debug3: no such identity: /home/jonpark/.ssh/id_dsa: No such file or directory
debug2: we did not send a packet, disable method
debug3: authmethod_lookup password
debug3: remaining preferred: ,password
debug3: authmethod_is_enabled password
debug1: Next authentication method: password
jonpark@aws-sig-ts-jonpark.aws.internal's password: 
debug3: send packet: type 50
debug2: we sent a password packet, wait for reply
debug3: receive packet: type 52
Authenticated to aws-sig-ts-jonpark.aws.internal ([10.230.157.239]:22) using "password".
debug1: channel 0: new session [client-session] (inactive timeout: 0)
debug3: ssh_session2_open: channel_new: 0
debug2: channel 0: send open
debug3: send packet: type 90
debug1: Requesting no-more-sessions@openssh.com
debug3: send packet: type 80
debug1: Entering interactive session.
debug1: pledge: filesystem
debug3: client_repledge: enter
debug3: receive packet: type 80
debug1: client_input_global_request: rtype hostkeys-00@openssh.com want_reply 0
debug3: client_input_hostkeys: received RSA key SHA256:q5fXsdVe64oWpCs4iJ3FZVuPhCc0jVS1eaBnbodu4Ao
debug3: client_input_hostkeys: received ECDSA key SHA256:2CuF+VWAhjLWVdiq+DHjknUpY/qOCejEphFrHKZ0EUA
debug3: client_input_hostkeys: received ED25519 key SHA256:5D1rxgnPZJQM+hxFvUM5lP6+jMATgvQgonw/F8TIRVA
debug1: client_input_hostkeys: searching /home/jonpark/.ssh/known_hosts for aws-sig-ts-jonpark.aws.internal / (none)
debug3: hostkeys_foreach: reading file "/home/jonpark/.ssh/known_hosts"
debug3: hostkeys_find: found ssh-ed25519 key under different name/addr at /home/jonpark/.ssh/known_hosts:1
debug3: hostkeys_find: found ssh-rsa key under different name/addr at /home/jonpark/.ssh/known_hosts:2
debug3: hostkeys_find: found ecdsa-sha2-nistp256 key under different name/addr at /home/jonpark/.ssh/known_hosts:3
debug3: hostkeys_find: found ssh-ed25519 key at /home/jonpark/.ssh/known_hosts:8
debug1: client_input_hostkeys: searching /home/jonpark/.ssh/known_hosts2 for aws-sig-ts-jonpark.aws.internal / (none)
debug1: client_input_hostkeys: hostkeys file /home/jonpark/.ssh/known_hosts2 does not exist
debug3: client_input_hostkeys: 3 server keys: 2 new, 18446744073709551615 retained, 2 incomplete match. 0 to remove
debug1: client_input_hostkeys: host key found matching a different name/address, skipping UserKnownHostsFile update
debug3: client_repledge: enter
debug3: receive packet: type 91
debug2: channel_input_open_confirmation: channel 0: callback start
debug2: fd 3 setting TCP_NODELAY
debug3: set_sock_tos: set socket 3 IP_TOS 0x10
debug2: client_session2_setup: id 0
debug2: channel 0: request pty-req confirm 1
debug3: send packet: type 98
debug1: Sending environment.
debug3: Ignored env SHELL
debug3: Ignored env COLORTERM
debug3: Ignored env CVSROOT
debug3: Ignored env WSL2_GUI_APPS_ENABLED
debug3: Ignored env TERM_PROGRAM_VERSION
debug3: Ignored env CONDA_EXE
debug3: Ignored env _CE_M
debug3: Ignored env WSL_DISTRO_NAME
debug3: Ignored env IN_PROFILE
debug3: Ignored env MODULAR_HOME
debug3: Ignored env DOCKER_SYNOPSYS_USER
debug3: Ignored env SNYK_API_TOKEN
debug3: Ignored env LANGUAGE
debug3: Ignored env SWIP_CLI
debug3: Ignored env TI_CGT_C6000
debug3: Ignored env DOTNET_ROOT
debug3: Ignored env GRADLE_HOME
debug3: Ignored env SNYK_ORG_NAME
debug3: Ignored env PYDEVD_DISABLE_FILE_VALIDATION
debug3: Ignored env SDKMAN_CANDIDATES_DIR
debug3: Ignored env GOBIN
debug3: Ignored env NAME
debug3: Ignored env PWD
debug3: Ignored env LOGNAME
debug3: Ignored env CONDA_PREFIX
debug3: Ignored env BUNDLED_DEBUGPY_PATH
debug3: Ignored env VSCODE_GIT_ASKPASS_NODE
debug3: Ignored env SNYK_TOKEN
debug3: Ignored env HOME
debug1: channel 0: setting env LANG = "en_US.UTF-8"
debug2: channel 0: request env confirm 0
debug3: send packet: type 98
debug3: Ignored env WSL_INTEROP
debug3: Ignored env LS_COLORS
debug3: Ignored env WAYLAND_DISPLAY
debug3: Ignored env DOCKER_SYNOPSYS_PASS
debug3: Ignored env CONDA_PROMPT_MODIFIER
debug3: Ignored env GIT_ASKPASS
debug3: Ignored env M2_HOME
debug3: Ignored env GOROOT
debug3: Ignored env NVM_DIR
debug3: Ignored env VSCODE_GIT_ASKPASS_EXTRA_ARGS
debug3: Ignored env LESSCLOSE
debug3: Ignored env COVERITY_NO_LOG_ENVIRONMENT_VARIABLES
debug3: Ignored env TERM
debug3: Ignored env DEBUGPY_ADAPTER_ENDPOINTS
debug3: Ignored env _CE_CONDA
debug3: Ignored env LESSOPEN
debug3: Ignored env USER
debug3: Ignored env VSCODE_GIT_IPC_HANDLE
debug3: Ignored env CONDA_SHLVL
debug3: Ignored env MAVEN_HOME
debug3: Ignored env SDKMAN_DIR
debug3: Ignored env DISPLAY
debug3: Ignored env SHLVL
debug3: Ignored env COV_ROOT
debug3: Ignored env API_VERSION
debug3: Ignored env SONAR_SCANNER
debug3: Ignored env CVS_RSH
debug3: Ignored env SDKMAN_CANDIDATES_API
debug3: Ignored env IN_BASHRC
debug3: Ignored env CONDA_PYTHON_EXE
debug3: Ignored env CSA_DIR
debug3: Ignored env XDG_RUNTIME_DIR
debug3: Ignored env CONDA_DEFAULT_ENV
debug3: Ignored env ZIPINFO
debug3: Ignored env UNZIP
debug3: Ignored env WSLENV
debug1: channel 0: setting env LC_ALL = "en_US.UTF-8"
debug2: channel 0: request env confirm 0
debug3: send packet: type 98
debug3: Ignored env VSCODE_GIT_ASKPASS_MAIN
debug3: Ignored env SONAR_SCANNER_BIN_PATH
debug3: Ignored env COV_DIR
debug3: Ignored env XDG_DATA_DIRS
debug3: Ignored env PATH
debug3: Ignored env SRM_DIR
debug3: Ignored env USING_SRM_VERSION
debug3: Ignored env USING_CSA_BIN_PATH
debug3: Ignored env SNYK_API_VERSION
debug3: Ignored env DBUS_SESSION_BUS_ADDRESS
debug3: Ignored env SDKMAN_PLATFORM
debug3: Ignored env HOSTTYPE
debug3: Ignored env PULSE_SERVER
debug3: Ignored env OLDPWD
debug3: Ignored env GOPATH
debug3: Ignored env TERM_PROGRAM
debug3: Ignored env VSCODE_IPC_HOOK_CLI
debug3: Ignored env _
debug2: channel 0: request shell confirm 1
debug3: send packet: type 98
debug3: client_repledge: enter
debug1: pledge: fork
debug2: channel_input_open_confirmation: channel 0: callback done
debug2: channel 0: open confirm rwindow 0 rmax 32768
debug3: receive packet: type 99
debug2: channel_input_status_confirm: type 99 id 0
debug2: PTY allocation request accepted on channel 0
debug2: channel 0: rcvd adjust 2097152
debug3: receive packet: type 99
debug2: channel_input_status_confirm: type 99 id 0
debug2: shell request accepted on channel 0
Welcome to Ubuntu 22.04.4 LTS (GNU/Linux 5.15.0-131-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

Expanded Security Maintenance for Applications is not enabled.

144 updates can be applied immediately.
To see these additional updates run: apt list --upgradable

38 additional security updates can be applied with ESM Apps.
Learn more about enabling ESM Apps service at https://ubuntu.com/esm


The list of available updates is more than a week old.
To check for new updates run: sudo apt update
Failed to connect to https://changelogs.ubuntu.com/meta-release-lts. Check your Internet connection or proxy settings

*** System restart required ***
Last login: Sun Mar  9 19:52:44 2025 from 10.230.18.206


(base) jonpark@aws-sig-ts-jonpark:~$ hostname
aws-sig-ts-jonpark.aws.internal

```

```bash
```
---

# 디버깅 방법