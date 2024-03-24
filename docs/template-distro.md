---
title: 发行版镜像文档模板
sidebar_label: 发行版镜像文档模板
cname: 'template-distro'
---

## $DISTRO_NAME 简介与软件管理

> 此处介绍发行版及其包管理工具的基本信息、包管理工具的基本使用方式等。

Ubuntu 是一个基于 Debian 的 Linux 发行版,发布包括桌面版、服务器版以及适用于物联网设备和机器人等多个版本。Ubuntu 每六个月将发布一次版本，每两年发布一次长期支持版本（LTS），目前最新的长期支持版本是 Ubuntu 22.04（"Jammy Jellyfish"）。Ubuntu 目前由英国公司 Canonical 以及其他开发者社区共同开发，采用一种以功绩为基础的治理模式。Canonical 提供每个Ubuntu版本的安全更新和支持，从发布日期开始直至达到指定的终止生命周期（EOL）日期。

Ubuntu 使用软件包管理工具 `APT` 来管理 DEB 软件包。具体来说，Ubuntu 通过修改 `/etc/apt/sources.list` 配置文件来管理系统软件源。一般情况下，用户可直接将该配置文件中的默认源地址 <http://archive.ubuntu.com/> 替换为本软件镜像站。

## $DISTRO_NAME 软件源替换

> 此处介绍对应发行版替换软件源的基本方式。

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

> 此处请给出可供用户复制的软件源文件配置，请使用 varcode 呈现软件源配置。  
> 如有必要，请给出更新软件源所需要的指令，如 `apt update`、`pacman -Syy`  
> 注意根据发行版特性区分描述，如 arch 系发行版一般需要在配置文件顶部增加一条镜像链接。  

1. 根据个人喜好做出选择，使用以下内容替换 `（相应的配置文件路径，如 /etc/apt/sources.list）`

> debian 系参考如下

```plaintext varcode
[ ] (version) { jammy:22.04 LTS, lunar:23.04 } Ubuntu 版本
[ ] (proposed) 启用预发布软件源
[ ] (src) 启用源码镜像
---
const SRC_PREFIX = src ? "" : "# ";
const PROPOSED_PREFIX = proposed ? "" : "# ";
---
deb ${_http}://${_domain}/ubuntu/ ${version} main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version} main restricted universe multiverse
deb ${_http}://${_domain}/ubuntu/ ${version}-updates main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version}-updates main restricted universe multiverse

${PROPOSED_PREFIX}deb ${_http}://${_domain}/ubuntu/ ${version}-proposed main restricted universe multiverse
${PROPOSED_PREFIX || SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version}-proposed main restricted universe multiverse

deb ${_http}://${_domain}/ubuntu/ ${version}-backports main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version}-backports main restricted universe multiverse

# 默认使用官方的 security 源
deb http://security.ubuntu.com/ubuntu/ ${version}-security main restricted universe multiverse
${SRC_PREFIX}deb-src http://security.ubuntu.com/ubuntu/ ${version}-security main restricted universe multiverse
```

> 请检查链接的连通性，如 ubuntu 的 security 源不支持 https 协议，请不要在上面的 security 源链接中使用 `${_http}` 变量

> 红帽系发行版参考如下

```conf varcode
[ ] (version) { 22.03-LTS-SP3:22.03 LTS SP3, 23.09:23.09 } openEuler 版本
---
[OS]
name=OS
baseurl=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/OS/$basearch/
metalink=${_http}://mirrors.hust.edu.cn/openeuler/metalink?repo=$releasever/OS&arch=$basearch
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/OS/$basearch/RPM-GPG-KEY-openEuler

[everything]
name=everything
baseurl=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/everything/$basearch/
metalink=${_http}://mirrors.hust.edu.cn/openeuler/metalink?repo=$releasever/everything&arch=$basearch
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/everything/$basearch/RPM-GPG-KEY-openEuler

[EPOL]
name=EPOL
baseurl=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/EPOL/main/$basearch/
metalink=${_http}://mirrors.hust.edu.cn/openeuler/metalink?repo=$releasever/EPOL/main&arch=$basearch
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/OS/$basearch/RPM-GPG-KEY-openEuler

[debuginfo]
name=debuginfo
baseurl=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/debuginfo/$basearch/
metalink=${_http}://mirrors.hust.edu.cn/openeuler/metalink?repo=$releasever/debuginfo&arch=$basearch
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/debuginfo/$basearch/RPM-GPG-KEY-openEuler

[source]
name=source
baseurl=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/source/
metalink=${_http}://mirrors.hust.edu.cn/openeuler/metalink?repo=$releasever&arch=source
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/source/RPM-GPG-KEY-openEuler

[update]
name=update
baseurl=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/update/$basearch/
metalink=${_http}://mirrors.hust.edu.cn/openeuler/metalink?repo=$releasever/update&arch=$basearch
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/OS/$basearch/RPM-GPG-KEY-openEuler

[update-source]
name=update-source
baseurl=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/update/source/
metalink=${_http}://mirrors.hust.edu.cn/openeuler/metalink?repo=$releasever/update&arch=source
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://mirrors.hust.edu.cn/openeuler/openEuler-${version}/source/RPM-GPG-KEY-openEuler
```

2. 通过如下命令更新软件。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update
```

## 一键换源

> 该部分介绍如何使用如 `sed` 命令等进行一键换源的方法。  
> 一般需要附带以下提示：

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `sed` 命令将软件源配置文件中的默认源地址 <http://archive.ubuntu.com/> 直接替换为当前镜像源站：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|http://archive.ubuntu.com|${_http}://${_domain}|g' /etc/apt/sources.list
${SUDO}apt update
```

<div id="security"></div>

## （可选）关于 security 源

> 对于使用独立 security 源的发行版（如 ubuntu 和 debian），需要额外对 security 源进行描述。  
> 镜像站有发行版单独的 security 源时，需要将 security 源对应的文档链接至此处。  
> 使用 div 标签设置 anchor 以供在镜像站主页跳转使用，请不要直接使用 h2 标签，会导致生成文档目录时无法识别该标题。  
> 根据官方的建议附带以下警告：

:::caution
**为了及时地获得安全更新，防止因软件源更新而导致的安全补丁滞后问题，我们推荐直接使用官方安全更新软件源。**
:::

> 以 ubuntu 为例：

使用以下配置替换 `/etc/apt/sources.list` 中 security 源的配置：

```plaintext varcode
[ ] (version) { jammy:22.04 LTS, lunar:23.04 } Ubuntu 版本
[ ] (src) 启用源码镜像
---
const SRC_PREFIX = src ? "" : "# ";
---
deb ${_http}://${_domain}/ubuntu/ ${version}-security main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version}-security main restricted universe multiverse
```

也可以使用 `sed` 命令替换 security 源：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|http://security.ubuntu.com|${_http}://${_domain}|g' /etc/apt/sources.list
${SUDO}apt update
```

<div id="nonfree"></div>

## （可选）关于 nonfree 源

> 同 security

## 注意事项

> 一些其他的注意事项，因发行版情况而异

关于该模板的其他说明：

- 该模板中的 `$DISTRO_NAME` 需要替换为相应发行版的名称
- 注意修改文档头部的 `title`、`sidebar_label` 与 `cname` 字段
- 编写模板时请注意删除相关的说明与注释
- **不要直接复制该模板的代码内容**，在编写文档时请先调研发行版的实际情况并仔细思考，以免文档中的错误对镜像站用户造成难以 debug 的问题
- 编写完成后，请通读文档并按照文档指示的流程进行操作测试，与官方配置进行对比进行验证

## 引用

> 如实列出文档的引用，如无引用请删除本节标题

[^1] [中科大镜像源使用帮助](https://mirrors.ustc.edu.cn/help/ubuntu.html)
