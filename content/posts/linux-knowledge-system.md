---
title: "Linux 完全知识体系"
date: "2025-05-30"
excerpt: "从入门到精通，涵盖基础命令、Shell脚本、系统管理、网络调优、安全加固、性能优化、Docker、eBPF等全部核心知识"
tags: ["Linux", "运维", "系统管理", "Shell", "Docker"]
---
**Linux 完全知识体系**

从入门到精通 · 理论与实操全涵盖  
  
涵盖：基础命令 · Shell脚本 · 系统管理 · 网络调优  
安全加固 · 性能优化 · Docker · eBPF · 运维实战

2025年5月

# 目录

**第一章 Linux 基础认知与环境搭建**

**第二章 命令行核心技能（60+ 高频命令）**

**第三章 文件系统与目录结构（FHS 标准）**

**第四章 权限、用户与组管理**

**第五章 进程管理与服务管理（systemd）**

**第六章 Shell 脚本编程（从入门到高级）**

**第七章 文本处理三剑客：grep · sed · awk**

**第八章 软件包管理与仓库配置**

**第九章 网络管理与诊断**

**第十章 Linux 安全加固实战**

**第十一章 性能监控与系统调优**

**第十二章 内核参数深度调优**

**第十三章 存储管理（LVM / RAID / NFS）**

**第十四章 服务部署实战（Nginx / MySQL / Redis）**

**第十五章 Docker 容器化实战**

**第十六章 eBPF / XDP 前沿技术**

**第十七章 高可用架构（Keepalived / LVS / HAProxy）**

**第十八章 运维监控体系（Prometheus + Grafana）**

**第十九章 DDoS 防御完整方案**

**第二十章 实操案例集（20+ 实战脚本）**

# 第一章 Linux 基础认知与环境搭建

## 1.1 Linux 是什么

Linux 并非单一的操作系统，而是一个由以下四层组成的生态系统：

- 内核（Kernel）：操作系统核心，管理硬件资源（CPU、内存、磁盘、网络）

- Shell：命令行解释器，用户与内核之间的桥梁（bash、zsh、fish）

- 文件系统：组织和管理数据的层次化目录树

- 应用程序：各种 GNU 工具、桌面环境、服务软件

## 1.2 核心哲学：一切皆文件

Linux 将一切资源都抽象为文件：

- 普通文件：文本、二进制程序

- 目录文件：文件夹

- 设备文件：/dev/sda（磁盘）, /dev/tty（终端）

- 特殊文件：/proc/cpuinfo（CPU信息）, /proc/meminfo（内存信息）

- 套接字文件：网络通信端点

- 管道文件：进程间通信

## 1.3 主流发行版选择指南

| **发行版** | **包管理** | **适用场景** | **推荐指数** |
|----|----|----|----|
| Ubuntu 24.04 LTS | apt / dpkg | 桌面入门、开发环境 | ★★★★★ |
| CentOS Stream / Rocky Linux 9 | dnf / rpm | 企业服务器（RHEL兼容） | ★★★★★ |
| Debian 12 | apt / dpkg | 稳定性要求极高的服务器 | ★★★★☆ |
| Arch Linux | pacman | 极客定制、滚动更新 | ★★★☆☆ |
| Kali Linux | apt / dpkg | 安全渗透测试 | ★★★★☆（专用） |
| Alpine Linux | apk | Docker 容器基础镜像 | ★★★★★（容器） |

## 1.4 环境搭建（3 种方式）

### 方式一：虚拟机（推荐学习用）

① 下载 VMware Workstation Player（免费）或 VirtualBox

② 下载 Ubuntu 24.04 LTS ISO 镜像

③ 新建虚拟机：内存 ≥ 4GB，硬盘 ≥ 20GB，网络选 NAT 模式

④ 启动安装，建议选择"最小安装"以获得纯净环境

### 方式一之VMware网络模式详解

| **模式** | **虚拟网卡** | **虚拟机 IP** | **宿主机访问** | **外网访问** | **适用场景** |
|----|----|----|----|----|----|
| 桥接模式 | VMnet0 | 与宿主机同网段 | ✅ | ✅ | 需要虚拟机对外提供服务 |
| NAT模式 | VMnet8 | 独立子网（DHCP） | ✅（单向） | ✅（通过NAT） | 日常学习开发（推荐） |
| 仅主机模式 | VMnet1 | 独立子网 | ✅ | ❌ | 隔离测试环境 |

### 方式二：WSL2（Windows 开发者首选）

> \# PowerShell 管理员
>
> wsl --install -d Ubuntu-24.04
>
> wsl --set-default-version 2
>
> \# 进入 Linux 子系统
>
> wsl
>
> \# 在 Windows 资源管理器中访问 Linux 文件
>
> explorer.exe \\wsl\$\Ubuntu-24.04

### 方式三：云服务器

阿里云 / 腾讯云 / 华为云购买 ECS，选择 Ubuntu 22.04/24.04，最低配置 1 核 2G 即可学习使用。

## 1.5 首次登录必做配置

> \# 1. 更新系统
>
> sudo apt update && sudo apt upgrade -y \# Ubuntu/Debian
>
> sudo dnf update -y \# Rocky/CentOS
>
> \# 2. 创建普通用户（禁止直接用 root 操作）
>
> sudo useradd -m -s /bin/bash devuser
>
> sudo passwd devuser
>
> sudo usermod -aG sudo devuser \# 加入 sudo 组
>
> \# 3. 配置 SSH 密钥登录（安全性提升）
>
> ssh-keygen -t ed25519 -C "your_email@example.com"
>
> ssh-copy-id devuser@your_server_ip
>
> \# 4. 修改主机名
>
> sudo hostnamectl set-hostname myserver
>
> \# 5. 设置时区
>
> sudo timedatectl set-timezone Asia/Shanghai
>
> \# 6. 安装常用工具
>
> sudo apt install -y vim curl wget git net-tools htop tree unzip jq

# 第二章 命令行核心技能

## 2.1 Shell 基础概念

Shell 是用户与 Linux 内核之间的命令解释器，常见的 Shell 有：

| **Shell** | **路径**  | **特点**                                |
|-----------|-----------|-----------------------------------------|
| bash      | /bin/bash | 最通用，绝大多数 Linux 默认 Shell       |
| zsh       | /bin/zsh  | 功能丰富，Oh My Zsh 插件生态强大        |
| fish      | /bin/fish | 开箱即用，自动补全和语法高亮出色        |
| dash      | /bin/dash | 轻量级，Debian/Ubuntu 的 /bin/sh 指向它 |
| sh        | /bin/sh   | POSIX 标准 Shell，兼容性最强            |

## 2.2 命令基本格式

> 命令 \[选项\] \[参数\]
>
> ls -la /home \# -l 长格式, -a 显示隐藏文件
>
> grep -rn "error" /var/log/ \# -r 递归, -n 显示行号
>
> \# 多个命令组合
>
> command1 && command2 \# command1 成功才执行 command2
>
> command1 \|\| command2 \# command1 失败才执行 command2
>
> command1 ; command2 \# 顺序执行，无论成败
>
> command1 \| command2 \# 管道：command1 输出作为 command2 输入

## 2.3 获取帮助

> man ls \# 查看命令手册（最权威）
>
> ls --help \# 简洁帮助
>
> info ls \# GNU Info 文档
>
> whatis ls \# 一行描述
>
> whereis ls \# 查找命令位置
>
> which ls \# 显示命令路径
>
> type ls \# 显示命令类型（内置/外部/别名）

## 2.4 文件与目录操作（20 个核心命令）

| **命令** | **功能** | **常用示例** |
|----|----|----|
| ls | 列出目录内容 | ls -la, ls -ltr, ls -lh |
| cd | 切换目录 | cd ~, cd -, cd .. |
| pwd | 打印当前路径 | pwd, pwd -P（显示物理路径） |
| mkdir | 创建目录 | mkdir -p a/b/c（递归创建） |
| touch | 创建空文件/更新时间戳 | touch file.txt |
| cp | 复制文件/目录 | cp -r src dest（递归复制） |
| mv | 移动/重命名 | mv old.txt new.txt |
| rm | 删除文件/目录 | rm -rf dir/（危险！需谨慎） |
| ln | 创建链接 | ln -s target linkname（软链接） |
| find | 搜索文件 | find / -name "\*.log" -mtime -7 |
| locate | 快速查找（需updatedb） | locate nginx.conf |
| which/whereis | 查找命令位置 | which python3 |
| stat | 查看文件详细属性 | stat /etc/passwd |
| file | 判断文件类型 | file unknown.bin |
| du | 查看目录/文件大小 | du -sh /\* 2\>/dev/null \| sort -rh \| head |
| df | 查看磁盘使用情况 | df -h, df -i（inode查看） |
| tree | 树状显示目录结构 | tree -L 2 /etc/ |
| wc | 统计行/词/字符数 | wc -l file.txt |
| sort | 排序 | sort -n -k 2 data.txt |
| uniq | 去重 | sort file.txt \| uniq -c（统计重复） |

## 2.5 文件内容查看（8 个核心命令）

| **命令** | **用途**            | **典型场景**                          |
|----------|---------------------|---------------------------------------|
| cat      | 显示全部内容        | cat file.txt                          |
| tac      | 反向显示            | tac file.txt（最后一行先显示）        |
| less     | 分页浏览（推荐）    | less /var/log/syslog（/搜索 n/N跳转） |
| more     | 基础分页            | more file.txt（仅支持向下）           |
| head     | 查看开头            | head -n 20 file.txt                   |
| tail     | 查看末尾 / 实时跟踪 | tail -f /var/log/nginx/access.log     |
| nl       | 带行号显示          | nl file.txt                           |
| od/xxd   | 二进制/十六进制查看 | xxd binary.bin                        |

## 2.6 管道与重定向

> \# 标准文件描述符：0=stdin 1=stdout 2=stderr
>
> \# 输出重定向
>
> command \> file \# 覆盖写入 stdout
>
> command \>\> file \# 追加写入 stdout
>
> command 2\> file \# 覆盖写入 stderr
>
> command &\> file \# stdout + stderr 都写入
>
> \# 输入重定向
>
> command \< file \# 从文件读取输入
>
> command \<\<\< "string" \# here-string
>
> command \<\<EOF \# here-document（多行输入）
>
> 多行文本内容
>
> EOF
>
> \# 管道（最重要的概念之一）
>
> cat access.log \| grep "404" \| awk '\{print \$1\}' \| sort \| uniq -c \| sort -rn \| head -10
>
> \# 解释：读取日志 → 过滤404 → 提取IP → 排序 → 去重统计 → 倒序排列 → 取前10

## 2.7 快捷键提升效率

| **快捷键**   | **作用**                                 |
|--------------|------------------------------------------|
| Ctrl + A / E | 跳到行首 / 行尾                          |
| Ctrl + U / K | 删除光标前 / 后所有内容                  |
| Ctrl + W     | 向前删除一个单词                         |
| Ctrl + L     | 清屏（等价 clear）                       |
| Ctrl + R     | 搜索历史命令（最常用）                   |
| Ctrl + C     | 终止当前运行的程序                       |
| Ctrl + Z     | 挂起当前程序（fg 恢复前台，bg 恢复后台） |
| Ctrl + D     | 退出当前 Shell（EOF）                    |
| !!           | 重复上一条命令                           |
| !\$          | 上一条命令的最后一个参数                 |
| !\*          | 上一条命令的所有参数                     |
| !nginx       | 执行最近以 nginx 开头的命令              |

## 2.8 Vim 编辑器速查

Vim 是 Linux 运维必备编辑器，三种模式：普通模式 → 插入模式（i/a/o）→ 命令模式（:）

### 常用命令速查

| **操作** | **命令** |
|----|----|
| 进入插入模式 | i（光标前）, a（光标后）, o（下一行）, O（上一行） |
| 保存退出 | :w（保存）, :q（退出）, :wq（保存退出）, :q!（强制退出） |
| 移动光标 | h/j/k/l（左下上右）, w（下一词）, b（上一词）, 0（行首）, \$（行尾） |
| gg / G | 跳到文件首 / 文件尾 |
| dd | 删除（剪切）当前行 |
| yy | 复制当前行 |
| p / P | 粘贴到下一行 / 上一行 |
| u / Ctrl+R | 撤销 / 重做 |
| /pattern | 搜索（n 下一个, N 上一个） |
| :%s/old/new/g | 全局替换 |
| v / V / Ctrl+V | 可视模式（字符/行/块选择） |
| \> / \< | 增加/减少缩进 |
| :set nu | 显示行号 |
| :split / :vsplit | 水平/垂直分屏 |

## 2.9 压缩与归档

> \# tar 归档（最常用）
>
> tar -cvf archive.tar dir/ \# 创建 tar 包
>
> tar -xvf archive.tar \# 解包
>
> tar -czvf archive.tar.gz dir/ \# 创建 gzip 压缩包
>
> tar -xzvf archive.tar.gz \# 解压 gzip
>
> tar -cjvf archive.tar.bz2 dir/ \# 创建 bzip2 压缩（更高压缩比）
>
> tar -xzvf archive.tar.gz -C /opt/ \# 解压到指定目录
>
> tar -tzvf archive.tar.gz \# 不解压查看内容
>
> \# gzip / bzip2 / xz 单独使用
>
> gzip file \# 压缩为 file.gz
>
> gunzip file.gz \# 解压
>
> xz -9 file \# 最高压缩比
>
> unxz file.xz \# 解压 xz
>
> \# zip（跨平台兼容）
>
> zip -r archive.zip dir/
>
> unzip archive.zip -d /opt/

# 第三章 文件系统与目录结构（FHS 标准）

## 3.1 FHS 标准目录结构

Filesystem Hierarchy Standard（FHS）定义了 Linux 目录结构的统一标准：

| **目录** | **用途** | **重要内容** |
|----|----|----|
| / | 根目录，一切文件的起点 | 整个文件系统的入口 |
| /bin | 基本用户命令 | ls, cp, cat, bash 等（现代系统通常软链接到 /usr/bin） |
| /sbin | 系统管理命令 | fdisk, mkfs, sysctl（需 root 权限） |
| /boot | 内核和启动文件 | vmlinuz-\*, initrd.img-\*, grub/ |
| /dev | 设备文件 | sda（硬盘）, tty（终端）, null, zero, random |
| /etc | 系统配置文件 | passwd, fstab, ssh/, nginx/, systemd/ |
| /home | 普通用户家目录 | /home/username/（用户的个人文件和配置） |
| /root | root 用户家目录 | 超级管理员专属 |
| /lib | 共享库和内核模块 | /lib/modules/ |
| /media | 可移动设备挂载点 | U盘、光盘自动挂载到此 |
| /mnt | 临时挂载点 | 手动挂载磁盘 |
| /opt | 第三方软件安装目录 | 手动安装的大型软件（如 Google Chrome） |
| /proc | 进程和内核信息（虚拟） | cpuinfo, meminfo, loadavg, mounts |
| /sys | 内核和设备信息（虚拟） | block/, class/, devices/ |
| /run | 运行时变量数据 | 系统启动以来的运行时信息 |
| /srv | 服务数据目录 | Web 服务、FTP 服务的数据文件 |
| /tmp | 临时文件 | 重启后可能被清理 |
| /usr | 用户程序和数据 | /usr/bin, /usr/lib, /usr/share, /usr/local/ |
| /var | 可变数据 | log/, spool/, cache/, lib/ |

## 3.2 /etc 配置文件重点解读

> /etc/passwd \# 用户账号信息
>
> /etc/shadow \# 用户加密密码（仅 root 可读）
>
> /etc/group \# 用户组信息
>
> /etc/fstab \# 开机自动挂载的文件系统
>
> /etc/hostname \# 主机名
>
> /etc/hosts \# 本地 DNS 解析
>
> /etc/resolv.conf \# DNS 服务器配置
>
> /etc/sudoers \# sudo 权限配置（必须用 visudo 编辑）
>
> /etc/crontab \# 系统级定时任务
>
> /etc/ssh/sshd_config \# SSH 服务端配置
>
> /etc/sysctl.conf \# 内核参数配置
>
> /etc/systemd/ \# systemd 服务和配置

## 3.3 /proc 虚拟文件系统详解

> cat /proc/cpuinfo \# CPU 详细信息（型号、核心数、缓存）
>
> cat /proc/meminfo \# 内存使用详情
>
> cat /proc/loadavg \# 系统负载（1/5/15分钟）
>
> cat /proc/version \# 内核版本信息
>
> cat /proc/uptime \# 系统运行时间和空闲时间
>
> cat /proc/mounts \# 当前挂载的文件系统
>
> ls /proc/sys/net/ \# 网络相关内核参数
>
> \# 查看 CPU 核心数
>
> grep -c ^processor /proc/cpuinfo
>
> \# 查看内存总量
>
> grep MemTotal /proc/meminfo
>
> \# 查看进程信息
>
> ls /proc/\<PID\>/
>
> cat /proc/\<PID\>/cmdline \# 进程启动命令
>
> cat /proc/\<PID\>/status \# 进程状态
>
> cat /proc/\<PID\>/limits \# 进程资源限制

## 3.4 文件系统类型

| **文件系统** | **特点**                     | **适用场景**               |
|--------------|------------------------------|----------------------------|
| ext4         | 稳定成熟，单文件最大16TB     | Linux 通用默认文件系统     |
| xfs          | 高性能，支持大文件，不能缩小 | CentOS/RHEL 7+ 默认        |
| btrfs        | 快照、压缩、子卷，功能丰富   | 高级用户和 NAS             |
| ZFS          | 数据完整性校验，快照，去重   | FreeBSD/Ubuntu，大容量存储 |
| NTFS         | Windows 文件系统             | 双系统数据共享             |
| exFAT        | 跨平台大文件支持             | U盘、移动硬盘              |
| tmpfs        | 内存文件系统                 | /tmp, /dev/shm             |
| NFS          | 网络文件系统                 | 分布式存储共享             |

## 3.5 实操：磁盘挂载全流程

> \# 1. 查看磁盘
>
> lsblk \# 列出块设备
>
> sudo fdisk -l \# 磁盘分区信息
>
> \# 2. 分区
>
> sudo fdisk /dev/sdb
>
> \# n → p → 1 → Enter → Enter → w（创建新分区）
>
> \# 3. 格式化
>
> sudo mkfs.ext4 /dev/sdb1
>
> \# 或 sudo mkfs.xfs /dev/sdb1
>
> \# 4. 创建挂载点并挂载
>
> sudo mkdir /data
>
> sudo mount /dev/sdb1 /data
>
> \# 5. 设置开机自动挂载
>
> sudo blkid /dev/sdb1 \# 获取 UUID
>
> sudo vim /etc/fstab
>
> \# 添加：UUID=xxxxxxxx /data ext4 defaults 0 2
>
> \# 6. 验证
>
> sudo mount -a \# 测试 fstab 配置
>
> df -h /data \# 查看挂载结果

# 第四章 权限、用户与组管理

## 4.1 Linux 权限模型

> -rwxr-xr-- 1 alice developers 4096 May 30 10:00 script.sh
>
> └─┬─┘└──┬──┘ ┌─┬─┐ └──┬──┘
>
> │ │ │ │ │ └─ 文件名
>
> │ │ │ │ └─────── 所属组（developers）
>
> │ │ │ └───────── 所有者（alice）
>
> │ │ └─────────── 硬链接数
>
> │ └─────────────────── 权限位（3组×3位）
>
> └───────────────────────── 文件类型（-普通, d目录, l链接, c字符, b块）

## 权限数字表示

| **数字** | **权限** | **含义**   |
|----------|----------|------------|
| 0        | ---      | 无任何权限 |
| 1        | --x      | 仅执行     |
| 2        | -w-      | 仅写入     |
| 3        | -wx      | 写入+执行  |
| 4        | r--      | 仅读取     |
| 5        | r-x      | 读取+执行  |
| 6        | rw-      | 读取+写入  |
| 7        | rwx      | 全部权限   |

## 4.2 权限管理命令

> \# 修改权限（chmod）
>
> chmod 755 script.sh \# rwxr-xr-x
>
> chmod u+x script.sh \# 所有者加执行权限
>
> chmod g-w script.sh \# 组去掉写权限
>
> chmod o= file.txt \# 其他用户无任何权限
>
> chmod -R 755 /var/www \# 递归修改
>
> \# 修改所有者/所属组（chown / chgrp）
>
> chown alice:developers file.txt
>
> chown -R www-data:www-data /var/www/
>
> chgrp developers file.txt
>
> \# 特殊权限
>
> \# SUID（4）：以文件所有者身份执行
>
> chmod u+s /usr/bin/passwd
>
> \# SGID（2）：继承目录组权限
>
> chmod g+s /shared/
>
> \# Sticky（1）：只有所有者能删除自己文件（如 /tmp）
>
> chmod +t /shared/

## 4.3 用户管理命令

> \# 创建用户
>
> sudo useradd -m -s /bin/bash -G sudo,docker username
>
> \# -m: 创建家目录 -s: 指定Shell -G: 附加组
>
> \# 设置密码
>
> sudo passwd username
>
> echo "username:password" \| sudo chpasswd \# 脚本批量设置
>
> \# 查看用户信息
>
> id username \# UID、GID、组
>
> whoami \# 当前用户
>
> who \# 当前登录用户列表
>
> w \# 更详细的登录信息
>
> last \# 最近登录记录
>
> \# 修改用户
>
> sudo usermod -aG docker username \# 追加到附加组
>
> sudo usermod -s /bin/zsh username \# 修改默认Shell
>
> sudo usermod -L username \# 锁定用户
>
> sudo usermod -U username \# 解锁用户
>
> \# 删除用户
>
> sudo userdel username \# 仅删用户
>
> sudo userdel -r username \# 同时删除家目录
>
> \# 查看所有用户
>
> cat /etc/passwd \| awk -F: '\{print \$1, \$3, \$7\}' \| column -t

## 4.4 组管理

> \# 创建组
>
> sudo groupadd developers
>
> \# 查看组
>
> cat /etc/group \| grep developers
>
> \# 将用户加入组
>
> sudo usermod -aG developers username
>
> \# 切换当前组
>
> newgrp developers
>
> \# 修改文件所属组
>
> chgrp developers file.txt

## 4.5 sudo 配置详解

> \# 编辑 sudoers（必须用 visudo，不要直接编辑 /etc/sudoers）
>
> sudo visudo
>
> \# 常用配置示例：
>
> \# 用户 alice 完全权限
>
> alice ALL=(ALL:ALL) ALL
>
> \# 无需密码执行特定命令
>
> bob ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx
>
> \# 组 dev 所有权限
>
> %dev ALL=(ALL:ALL) ALL
>
> \# 查看当前用户 sudo 权限
>
> sudo -l
>
> \# sudo 日志
>
> sudo journalctl -u sudo

## 4.6 ACL 访问控制列表（超越传统 rwx）

> \# 安装 ACL 工具
>
> sudo apt install acl \# Ubuntu/Debian
>
> \# 查看 ACL
>
> getfacl file.txt
>
> \# 给特定用户授权
>
> setfacl -m u:alice:rwx file.txt
>
> \# 给特定组授权
>
> setfacl -m g:developers:rx file.txt
>
> \# 删除权限
>
> setfacl -x u:alice file.txt
>
> \# 递归设置
>
> setfacl -R -m u:alice:rw /shared/
>
> \# 设置默认 ACL（新文件/目录自动继承）
>
> setfacl -d -m u:alice:rwx /shared/

# 第五章 进程管理与服务管理（systemd）

## 5.1 进程基础概念

| **概念**  | **说明**                                            |
|-----------|-----------------------------------------------------|
| PID       | 进程 ID，唯一标识一个进程                           |
| PPID      | 父进程 ID                                           |
| UID/GID   | 进程所属用户/组                                     |
| 进程状态  | R(运行), S(睡眠), D(不可中断), Z(僵尸), T(停止)     |
| 前台/后台 | 前台占用终端，后台（&）不占用                       |
| 孤儿进程  | 父进程先退出，由 init（PID=1）收养                  |
| 僵尸进程  | 子进程已退出但父进程未回收（wait），占 PID 不占内存 |
| 守护进程  | 后台运行的服务进程（通常以 d 结尾，如 sshd、nginx） |

## 5.2 进程查看命令

> \# ps 查看进程快照
>
> ps aux \# 所有用户进程，BSD 风格
>
> ps -ef \# 所有进程，Unix 风格
>
> ps aux --sort=-%mem \| head -10 \# 按内存占用排序 TOP 10
>
> \# 进程树
>
> pstree -p \# 树状显示进程父子关系
>
> pstree -p init \# 从某个进程开始显示
>
> \# 动态查看（实时交互）
>
> top \# 基础实时监控
>
> htop \# 增强版（需安装，更直观）
>
> 快捷键: F1 帮助, F2 设置, F3 搜索, F5 树状, F6 排序, F9 结束进程
>
> \# 按名称查找进程
>
> pgrep -fa nginx \# 根据名称找到 PID
>
> pidof nginx \# 更简洁的 PID 查找
>
> \# 查看进程详细信息
>
> cat /proc/\<PID\>/status
>
> ls -l /proc/\<PID\>/fd/ \# 进程打开的文件描述符
>
> lsof -p \<PID\> \# 列出进程打开的所有文件

## 5.3 进程控制

> \# 终止进程
>
> kill \<PID\> \# 发送 SIGTERM（优雅退出）
>
> kill -9 \<PID\> \# 发送 SIGKILL（强制杀死，不给清理机会）
>
> kill -15 \<PID\> \# 同 kill，SIGTERM
>
> \# 常用信号
>
> \# SIGHUP(1) - 重新加载配置
>
> \# SIGINT(2) - Ctrl+C 中断
>
> \# SIGKILL(9) - 强制终止（不可捕获）
>
> \# SIGTERM(15)- 优雅终止（默认）
>
> \# SIGSTOP(19)- 暂停（不可捕获）
>
> \# SIGCONT(18)- 继续运行
>
> kill -HUP \<PID\> \# 重新加载配置（常用于 nginx reload）
>
> \# 按名称杀进程
>
> pkill -f "python app.py" \# 杀匹配的进程
>
> killall nginx \# 杀死所有同名进程
>
> \# 后台运行
>
> your_command & \# 放入后台
>
> nohup your_command & \# 忽略 SIGHUP，关闭终端不中断
>
> disown -h %1 \# 从当前 Shell 作业列表中移除
>
> \# 前台/后台切换
>
> jobs \# 查看当前 Shell 的后台作业
>
> fg %1 \# 作业 1 回前台
>
> bg %1 \# 作业 1 在后台继续运行
>
> Ctrl+Z \# 挂起当前前台进程

## 5.4 systemd 服务管理

systemd 是现代 Linux（CentOS 7+, Ubuntu 16.04+）的初始化系统和服务管理器。

> \# 服务管理
>
> systemctl start nginx \# 启动
>
> systemctl stop nginx \# 停止
>
> systemctl restart nginx \# 重启
>
> systemctl reload nginx \# 重新加载配置（不中断服务）
>
> systemctl enable nginx \# 开机自启
>
> systemctl disable nginx \# 禁止开机自启
>
> systemctl status nginx \# 查看状态
>
> \# 查看日志
>
> journalctl -u nginx -f \# 实时跟踪某个服务的日志
>
> journalctl -u nginx --since "1 hour ago"
>
> journalctl -u nginx -n 100 \# 最近 100 条
>
> journalctl -xe \# 查看最近的错误日志
>
> \# 系统状态
>
> systemctl list-units --type=service --state=running \# 所有运行中的服务
>
> systemctl list-unit-files --type=service \# 所有服务（含未启用的）
>
> systemctl list-units --failed \# 启动失败的服务
>
> systemctl get-default \# 查看默认启动目标
>
> systemctl set-default multi-user.target \# 设置默认启动模式

## 5.5 编写 systemd 服务文件

实操：将自定义程序注册为系统服务

> \# 创建服务文件
>
> sudo vim /etc/systemd/system/myapp.service
>
> \[Unit\]
>
> Description=My Custom Application
>
> After=network.target
>
> \[Service\]
>
> Type=simple
>
> User=myapp
>
> Group=myapp
>
> WorkingDirectory=/opt/myapp
>
> ExecStart=/opt/myapp/bin/start.sh
>
> ExecStop=/opt/myapp/bin/stop.sh
>
> Restart=on-failure
>
> RestartSec=10
>
> StandardOutput=journal
>
> StandardError=journal
>
> Environment="APP_ENV=production"
>
> Environment="PORT=8080"
>
> \[Install\]
>
> WantedBy=multi-user.target
>
> \# 启用服务
>
> sudo systemctl daemon-reload \# 重载配置
>
> sudo systemctl enable --now myapp \# 启用并立即启动
>
> sudo systemctl status myapp \# 验证

## 5.6 定时任务 Crontab

> \# crontab 格式：分 时 日 月 周 命令
>
> \# 示例：
>
> 0 2 \* \* \* \# 每天凌晨 2 点
>
> \*/5 \* \* \* \* \# 每 5 分钟
>
> 0 9-18 \* \* 1-5 \# 工作日 9-18 点每小时
>
> 0 1 1 \* \* \# 每月 1 号凌晨 1 点
>
> \# 编辑当前用户定时任务
>
> crontab -e
>
> crontab -l \# 列出定时任务
>
> crontab -r \# 删除所有定时任务（危险！）
>
> \# 系统级定时
>
> sudo vim /etc/crontab
>
> ls /etc/cron.d/ \# 独立配置文件
>
> ls /etc/cron.daily/ \# 每天执行的脚本
>
> ls /etc/cron.hourly/ \# 每小时执行
>
> ls /etc/cron.weekly/ \# 每周执行
>
> ls /etc/cron.monthly/ \# 每月执行

# 第六章 Shell 脚本编程

## 6.1 脚本基础

> \#!/bin/bash
>
> \# 安全选项（推荐始终添加）
>
> set -euo pipefail
>
> \# -e: 任何命令失败立即退出
>
> \# -u: 使用未定义变量时退出
>
> \# -o pipefail: 管道中任一命令失败视为失败
>
> \# 变量
>
> name="world"
>
> readonly PI=3.14159
>
> echo "Hello, \$\{name\}!"
>
> echo "Script name: \$0"
>
> echo "First arg: \$1"
>
> echo "All args: \$@"
>
> echo "Arg count: \$#"
>
> echo "Exit status: \$?"
>
> echo "Current PID: \$\$"

## 6.2 条件判断

> \#!/bin/bash
>
> \# 数字比较
>
> if \[ "\$a" -gt "\$b" \]; then
>
> echo "\$a \> \$b"
>
> elif \[ "\$a" -eq "\$b" \]; then
>
> echo "\$a = \$b"
>
> else
>
> echo "\$a \< \$b"
>
> fi
>
> \# 常用比较符号
>
> \# -eq 等于 -ne 不等于 -gt 大于 -lt 小于 -ge 大于等于 -le 小于等于
>
> \# 字符串比较
>
> if \[ -z "\$str" \]; then echo "空字符串"; fi
>
> if \[ -n "\$str" \]; then echo "非空"; fi
>
> if \[ "\$a" = "\$b" \]; then echo "相等"; fi
>
> if \[ "\$a" != "\$b" \]; then echo "不相等"; fi
>
> \# 文件判断
>
> \[ -f file \] && echo "普通文件存在" \# -d 目录 -e 存在 -r 可读 -w 可写 -x 可执行
>
> \[ -s file \] && echo "非空文件"
>
> \[ -L file \] && echo "符号链接"
>
> \# 逻辑运算
>
> \[ "\$a" -gt 0 \] && \[ "\$b" -lt 100 \] \# AND
>
> \[ "\$a" -gt 0 \] \|\| \[ "\$b" -lt 100 \] \# OR
>
> \[\[ \$a -gt 0 && \$b -lt 100 \]\] \# 双括号支持 && \|\|
>
> \# case 多分支
>
> case "\$1" in
>
> start) echo "Starting...";;
>
> stop) echo "Stopping...";;
>
> restart) echo "Restarting...";;
>
> \*) echo "Usage: \$0 \{start\|stop\|restart\}"; exit 1;;
>
> esac

## 6.3 循环结构

> \#!/bin/bash
>
> \# for 循环
>
> for i in \{1..10\}; do echo "Number: \$i"; done
>
> for file in \*.txt; do echo "Processing \$file"; done
>
> for ((i=0; i\<10; i++)); do echo "\$i"; done
>
> \# while 循环
>
> count=0
>
> while \[ \$count -lt 10 \]; do
>
> echo "Count: \$count"
>
> ((count++))
>
> done
>
> \# until 循环（条件为假时执行）
>
> until ping -c 1 google.com &\>/dev/null; do
>
> echo "Waiting for network..."
>
> sleep 5
>
> done
>
> \# 遍历数组
>
> fruits=("apple" "banana" "cherry")
>
> for fruit in "\$\{fruits\[@\]\}"; do echo "\$fruit"; done
>
> \# break / continue
>
> for i in \{1..100\}; do
>
> \[ \$i -eq 50 \] && break \# 跳出循环
>
> \[ \$((i%2)) -eq 0 \] && continue \# 跳过偶数
>
> echo "\$i"
>
> done

## 6.4 函数

> \#!/bin/bash
>
> \# 函数定义
>
> greet() \{
>
> local name="\$1" \# local 限定局部变量
>
> echo "Hello, \$name!"
>
> return 0
>
> \}
>
> \# 调用
>
> greet "World"
>
> result=\$(greet "Alice") \# 捕获输出
>
> \# 带返回值的函数
>
> is_even() \{
>
> \[ \$((\$1 % 2)) -eq 0 \] && return 0 \|\| return 1
>
> \}
>
> if is_even 10; then echo "Even"; fi

## 6.5 字符串处理高级技巧

> str="hello_world.txt"
>
> \# 长度
>
> echo \$\{#str\} \# 15
>
> \# 截取
>
> echo \$\{str:0:5\} \# hello
>
> echo \$\{str:6\} \# world.txt
>
> \# 删除
>
> echo \$\{str#\*.\} \# txt（最短匹配）
>
> echo \$\{str##\*.\} \# txt（最长匹配）
>
> echo \$\{str%.\*\} \# hello_world
>
> echo \$\{str%%.\*\} \# hello_world
>
> \# 替换
>
> echo \$\{str/world/linux\} \# hello_linux.txt
>
> echo \$\{str//l/L\} \# heLLo_worLd.txt（全局替换）
>
> \# 默认值
>
> echo \$\{var:-"default"\} \# var 未设置时返回 default
>
> echo \$\{var:="default"\} \# var 未设置时赋值
>
> echo \$\{var:?"error"\} \# var 未设置时报错退出

## 6.6 数组与关联数组

> \# 索引数组
>
> arr=(apple banana cherry)
>
> echo \$\{arr\[0\]\} \# apple
>
> echo \$\{arr\[@\]\} \# 所有元素
>
> echo \$\{#arr\[@\]\} \# 元素个数
>
> arr+=("date") \# 追加
>
> unset arr\[1\] \# 删除元素
>
> \# 关联数组（bash 4.0+）
>
> declare -A map
>
> map\["name"\]="Alice"
>
> map\["age"\]=30
>
> echo \$\{map\["name"\]\}
>
> for key in "\$\{!map\[@\]\}"; do
>
> echo "\$key =\> \$\{map\[\$key\]\}"
>
> done

## 6.7 错误处理与调试

> \# 错误处理
>
> set -euo pipefail
>
> trap 'echo "Error on line \$LINENO"' ERR
>
> trap 'echo "Script interrupted"; exit 1' INT TERM
>
> trap 'echo "Script exited with code \$?"' EXIT
>
> \# 调试技巧
>
> bash -x script.sh \# 执行时打印每条命令
>
> bash -n script.sh \# 语法检查（不执行）
>
> set -x \# 脚本内开启调试
>
> set +x \# 脚本内关闭调试
>
> \# 日志函数
>
> log() \{ echo "\[\$(date +'%Y-%m-%d %H:%M:%S')\] \$\*"; \}
>
> log_error() \{ echo "\[\$(date +'%Y-%m-%d %H:%M:%S')\] \[ERROR\] \$\*" \>&2; \}

## 6.8 I/O 重定向与文件描述符

> \# 3-9 号自定义文件描述符
>
> exec 3\<\> /tmp/test.log \# 打开文件描述符 3（读写）
>
> echo "line 1" \>&3 \# 写入 fd 3
>
> exec 3\>&- \# 关闭 fd 3
>
> \# 同时输出到终端和文件
>
> command \| tee output.log
>
> command \| tee -a output.log \# 追加模式
>
> \# 丢弃输出
>
> command \> /dev/null 2\>&1

# 第七章 文本处理三剑客：grep · sed · awk

## 7.1 grep 文本搜索

> \# 基本用法
>
> grep "pattern" file.txt
>
> grep -i "pattern" file.txt \# 忽略大小写
>
> grep -v "pattern" file.txt \# 反向匹配（排除）
>
> grep -rn "pattern" /path/ \# 递归搜索 + 行号
>
> grep -c "pattern" file.txt \# 统计匹配行数
>
> grep -l "pattern" \*.log \# 只显示匹配的文件名
>
> grep -A 3 "pattern" file.txt \# 匹配行及之后 3 行
>
> grep -B 3 "pattern" file.txt \# 匹配行及之前 3 行
>
> grep -C 3 "pattern" file.txt \# 匹配行及前后 3 行
>
> grep -E "pattern1\|pattern2" file.txt \# 扩展正则（或 egrep）
>
> grep -P "\d\{3\}-\d\{4\}" file.txt \# Perl 正则
>
> \# 常用组合
>
> grep -rn "ERROR" /var/log/ \| grep -v "DEBUG"
>
> ps aux \| grep nginx \| grep -v grep
>
> grep "^2025-05-30" access.log \| grep " 404 "

## 7.2 sed 流编辑器

> \# 替换（最常用）
>
> sed 's/old/new/' file.txt \# 替换每行第一个匹配
>
> sed 's/old/new/g' file.txt \# 全局替换
>
> sed 's/old/new/2' file.txt \# 替换每行第二个匹配
>
> sed 's/old/new/g' -i file.txt \# 直接修改文件（-i）
>
> sed 's/old/new/g' -i.bak file.txt \# 备份后修改
>
> \# 删除
>
> sed '3d' file.txt \# 删除第 3 行
>
> sed '3,10d' file.txt \# 删除 3-10 行
>
> sed '/pattern/d' file.txt \# 删除匹配行
>
> sed '/^\$/d' file.txt \# 删除空行
>
> sed '/^#/d' file.txt \# 删除注释行
>
> \# 打印
>
> sed -n '5p' file.txt \# 打印第 5 行
>
> sed -n '5,10p' file.txt \# 打印 5-10 行
>
> sed -n '/start/,/end/p' file.txt \# 打印匹配范围
>
> \# 插入/追加
>
> sed '1i\New first line' file.txt \# 第 1 行前插入
>
> sed '\$a\New last line' file.txt \# 最后一行后追加
>
> \# 多命令
>
> sed -e 's/a/A/g' -e 's/b/B/g' file.txt
>
> sed 's/^\[ \]\*//; s/\[ \]\*\$//' file.txt \# 去除首尾空格

## 7.3 awk 文本分析语言

> \# awk 基本结构：awk '条件 \{动作\}' 文件
>
> \# 打印列
>
> awk '\{print \$1, \$3\}' data.txt \# 打印第 1 和第 3 列
>
> awk '\{print \$NF\}' data.txt \# 打印最后一列
>
> awk -F: '\{print \$1, \$7\}' /etc/passwd \# 指定分隔符
>
> \# 条件过滤
>
> awk '\$3 \> 1000' data.txt
>
> awk '\$1 ~ /pattern/' data.txt \# 正则匹配
>
> awk '\$1 == "nginx"' data.txt
>
> awk 'NR\>=5 && NR\<=10' data.txt \# 行号范围
>
> \# 内置变量
>
> \# NR: 当前行号 NF: 当前行列数 FS: 输入分隔符 OFS: 输出分隔符
>
> \# 计算
>
> awk '\{sum+=\$3\} END \{print sum\}' data.txt
>
> awk '\{sum+=\$3\} END \{print sum/NR\}' data.txt \# 平均值
>
> \# BEGIN/END 块
>
> awk 'BEGIN \{print "Header"\} \{print \$0\} END \{print NR, "lines"\}' file.txt

## 7.4 三剑客组合实战

> \# 实战 1: Nginx 日志分析 - Top 10 IP
>
> awk '\{print \$1\}' access.log \| sort \| uniq -c \| sort -rn \| head -10
>
> \# 实战 2: 统计 HTTP 状态码分布
>
> awk '\{print \$9\}' access.log \| sort \| uniq -c \| sort -rn
>
> \# 实战 3: 统计某时段 PV
>
> grep "30/May/2025:1\[4-5\]:" access.log \| wc -l
>
> \# 实战 4: 提取配置文件非注释行
>
> grep -v '^#' /etc/ssh/sshd_config \| grep -v '^\$'
>
> \# 实战 5: 批量替换文件内容
>
> find . -name "\*.conf" -exec sed -i 's/old_server/new_server/g' \{\} \\
>
> \# 实战 6: 计算所有日志文件大小
>
> find /var/log -name "\*.log" -exec du -ch \{\} + \| tail -1

# 第八章 软件包管理与仓库配置

## 8.1 apt / dpkg（Debian/Ubuntu）

> \# apt 高级包管理工具
>
> sudo apt update \# 更新软件包索引
>
> sudo apt upgrade -y \# 升级所有包
>
> sudo apt full-upgrade -y \# 完整升级（可能删除冲突包）
>
> sudo apt install nginx -y \# 安装
>
> sudo apt remove nginx \# 卸载（保留配置）
>
> sudo apt purge nginx \# 完全卸载（含配置）
>
> sudo apt autoremove \# 清理无用依赖
>
> sudo apt search keyword \# 搜索包
>
> apt show nginx \# 查看包详情
>
> apt list --installed \# 列出已安装
>
> apt list --upgradable \# 列出可升级
>
> \# 锁定包版本（防止意外升级）
>
> sudo apt-mark hold nginx
>
> sudo apt-mark unhold nginx
>
> \# dpkg 底层包管理
>
> sudo dpkg -i package.deb \# 安装 deb 包
>
> dpkg -l \| grep nginx \# 查看包状态
>
> dpkg -L nginx \# 列出包安装的文件
>
> dpkg -S /usr/sbin/nginx \# 查找文件属于哪个包

## 8.2 dnf / yum（RHEL/CentOS/Rocky）

> \# dnf（新一代，CentOS 8+/Rocky Linux）
>
> sudo dnf check-update
>
> sudo dnf upgrade -y
>
> sudo dnf install nginx -y
>
> sudo dnf remove nginx
>
> sudo dnf autoremove
>
> dnf search keyword
>
> dnf info nginx
>
> dnf list installed
>
> dnf history \# 操作历史（可回滚）
>
> dnf history undo \<ID\> \# 回滚操作
>
> \# yum（旧版，CentOS 7）
>
> sudo yum update -y
>
> sudo yum install nginx -y
>
> sudo yum remove nginx
>
> \# rpm 底层
>
> rpm -qa \| grep nginx \# 查询已安装
>
> rpm -ql nginx \# 列出文件
>
> rpm -qf /usr/sbin/nginx \# 文件属于哪个包
>
> rpm -ivh package.rpm \# 安装
>
> rpm -e nginx \# 卸载

## 8.3 源码编译安装

> \# 典型流程：configure → make → make install
>
> wget https://example.com/software-1.0.tar.gz
>
> tar -xzvf software-1.0.tar.gz
>
> cd software-1.0
>
> \# 安装编译依赖
>
> sudo apt install build-essential -y \# Ubuntu
>
> sudo dnf groupinstall "Development Tools" -y \# CentOS
>
> \# 配置、编译、安装
>
> ./configure --prefix=/opt/software
>
> make -j\$(nproc)
>
> sudo make install
>
> \# 卸载（源码安装通常无包管理）
>
> sudo make uninstall \# 或手动删除 /opt/software

## 8.4 软件源配置

Ubuntu/Debian 源文件位置：/etc/apt/sources.list 和 /etc/apt/sources.list.d/

CentOS/Rocky 源文件位置：/etc/yum.repos.d/

> \# Ubuntu 更换为国内镜像（清华源示例）
>
> sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
>
> sudo sed -i 's@//.\*archive.ubuntu.com@//mirrors.tuna.tsinghua.edu.cn@g' /etc/apt/sources.list
>
> \# Rocky Linux 9 更换为阿里云镜像
>
> sudo sed -e 's\|^mirrorlist=\|#mirrorlist=\|g' \\
>
> -e 's\|^#baseurl=http://dl.rockylinux.org\|baseurl=https://mirrors.aliyun.com\|g' \\
>
> -i.bak /etc/yum.repos.d/rocky\*.repo

# 第九章 网络管理与诊断

## 9.1 网络配置查看

> \# 查看 IP 地址
>
> ip addr show \# 现代方式（推荐）
>
> ifconfig \# 传统方式（需net-tools）
>
> hostname -I \# 只显示 IP
>
> \# 查看路由
>
> ip route show
>
> route -n
>
> netstat -rn
>
> \# 查看 DNS
>
> cat /etc/resolv.conf
>
> resolvectl status \# systemd-resolved
>
> \# 查看 ARP 表
>
> ip neigh show
>
> arp -n
>
> \# 网络接口详情
>
> ethtool eth0 \# 网卡信息（速率、双工、驱动）
>
> ip -s link show eth0 \# 网卡统计信息
>
> \# 查看端口监听
>
> ss -tunap \# 现代（推荐）
>
> netstat -tunap \# 传统
>
> \# 查看连接状态统计
>
> ss -s \# 汇总
>
> ss -tan state time-wait \| wc -l \# TIME_WAIT 数量

## 9.2 网络连通性诊断

> \# ping - 基础连通性
>
> ping -c 4 google.com
>
> ping -i 0.2 192.168.1.1 \# 快速 ping（0.2 秒间隔）
>
> \# traceroute - 路由追踪
>
> traceroute google.com
>
> mtr google.com \# 动态路由追踪（更好用）
>
> \# dig / nslookup - DNS 诊断
>
> dig google.com
>
> dig google.com +short
>
> dig -x 8.8.8.8 \# 反向查询
>
> nslookup google.com
>
> \# curl - HTTP 测试
>
> curl -I https://example.com \# 查看响应头
>
> curl -v https://example.com \# 详细输出
>
> curl -o /dev/null -s -w "%\{http_code\}\n" https://example.com \# 只返回状态码
>
> curl -X POST -d '\{"key":"value"\}' -H "Content-Type: application/json" https://api.example.com
>
> \# wget - 文件下载
>
> wget https://example.com/file.tar.gz
>
> wget -c https://example.com/file.tar.gz \# 断点续传
>
> wget -r -l 2 https://example.com/ \# 递归下载
>
> \# nc (netcat) - TCP/UDP 测试
>
> nc -zv 192.168.1.1 22 \# TCP 端口扫描
>
> nc -uzv 192.168.1.1 53 \# UDP 端口扫描
>
> nc -l 8080 \# 监听端口
>
> echo "test" \| nc 192.168.1.1 8080 \# 发送数据
>
> \# telnet - 端口连通性测试
>
> telnet 192.168.1.1 3306 \# 测试 MySQL 端口

## 9.3 网络配置修改

### Ubuntu 24.04（netplan）

> \# 编辑 netplan 配置
>
> sudo vim /etc/netplan/01-netcfg.yaml
>
> network:
>
> version: 2
>
> renderer: networkd
>
> ethernets:
>
> eth0:
>
> dhcp4: no
>
> addresses:
>
> \- 192.168.1.100/24
>
> routes:
>
> \- to: default
>
> via: 192.168.1.1
>
> nameservers:
>
> addresses: \[8.8.8.8, 8.8.4.4\]
>
> \# 应用配置
>
> sudo netplan apply

### CentOS/Rocky（nmcli）

> \# 查看连接
>
> nmcli connection show
>
> nmcli device status
>
> \# 配置静态 IP
>
> nmcli con mod eth0 ipv4.addresses 192.168.1.100/24
>
> nmcli con mod eth0 ipv4.gateway 192.168.1.1
>
> nmcli con mod eth0 ipv4.dns "8.8.8.8 8.8.4.4"
>
> nmcli con mod eth0 ipv4.method manual
>
> nmcli con up eth0

## 9.4 防火墙管理

### ufw（Ubuntu 简易防火墙）

> sudo ufw enable \# 启用
>
> sudo ufw disable \# 禁用
>
> sudo ufw status verbose \# 查看状态
>
> sudo ufw allow 22/tcp \# 放行 SSH
>
> sudo ufw allow 80,443/tcp \# 放行 HTTP/HTTPS
>
> sudo ufw allow from 192.168.1.0/24 to any port 3306 \# 限制来源
>
> sudo ufw deny 25 \# 拒绝 SMTP
>
> sudo ufw delete 3 \# 按编号删除规则
>
> sudo ufw logging on \# 启用日志

### firewalld（CentOS/Rocky）

> sudo systemctl start firewalld
>
> sudo firewall-cmd --state
>
> sudo firewall-cmd --list-all
>
> sudo firewall-cmd --add-service=http --permanent
>
> sudo firewall-cmd --add-port=8080/tcp --permanent
>
> sudo firewall-cmd --reload

## 9.5 SSH 服务配置与安全

> \# 编辑 SSH 配置
>
> sudo vim /etc/ssh/sshd_config
>
> Port 22222 \# 修改默认端口
>
> PermitRootLogin no \# 禁止 root 远程登录
>
> PasswordAuthentication no \# 禁用密码登录（只用密钥）
>
> PubkeyAuthentication yes \# 启用密钥认证
>
> MaxAuthTries 3 \# 最大尝试次数
>
> ClientAliveInterval 300 \# 心跳间隔（秒）
>
> ClientAliveCountMax 2 \# 心跳最大次数
>
> AllowUsers alice bob \# 白名单用户
>
> \# 重启服务
>
> sudo systemctl restart sshd
>
> \# SSH 密钥管理
>
> ssh-keygen -t ed25519 -C "comment"
>
> ssh-copy-id -i ~/.ssh/id_ed25519.pub user@host
>
> \# ~/.ssh/config 简化连接
>
> Host myserver
>
> HostName 192.168.1.100
>
> Port 22222
>
> User alice
>
> IdentityFile ~/.ssh/id_ed25519
>
> \# 连接时直接使用
>
> ssh myserver

# 第十章 Linux 安全加固实战

## 10.1 安全加固清单

| **项目**         | **操作**                                 | **优先级** |
|------------------|------------------------------------------|------------|
| SSH 加固         | 禁用root登录、修改端口、仅密钥认证       | 最高       |
| 防火墙           | 默认拒绝、只放行必要端口                 | 最高       |
| 定期更新         | apt update && apt upgrade 或 dnf upgrade | 最高       |
| 最小权限         | 服务以专用用户运行、sudo 精细控制        | 高         |
| 密码策略         | 复杂密码、定期更换、锁定策略             | 高         |
| 审计日志         | auditd 审计关键文件和目录                | 高         |
| fail2ban         | 自动封禁暴力破解 IP                      | 高         |
| 禁用无用服务     | 减少攻击面                               | 中         |
| SELinux/AppArmor | 强制访问控制                             | 中         |
| 文件完整性       | aide 或 tripwire 校验                    | 中         |
| 内核参数加固     | 防止 IP 欺骗、SYN 攻击等                 | 高         |

## 10.2 fail2ban 防止暴力破解

> \# 安装
>
> sudo apt install fail2ban -y
>
> \# 配置 jail.local
>
> sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
>
> sudo vim /etc/fail2ban/jail.local
>
> \[sshd\]
>
> enabled = true
>
> port = 22222
>
> maxretry = 3
>
> bantime = 3600
>
> findtime = 600
>
> \# 启动并查看状态
>
> sudo systemctl enable --now fail2ban
>
> sudo fail2ban-client status
>
> sudo fail2ban-client status sshd
>
> \# 手动解封
>
> sudo fail2ban-client set sshd unbanip 192.168.1.100

## 10.3 审计系统 auditd

> \# 安装和启用
>
> sudo apt install auditd -y
>
> sudo systemctl enable --now auditd
>
> \# 添加审计规则
>
> \# 监控 /etc/passwd 的写入
>
> sudo auditctl -w /etc/passwd -p wa -k passwd_changes
>
> \# 监控 /etc/shadow 的访问
>
> sudo auditctl -w /etc/shadow -p rwa -k shadow_access
>
> \# 持久化规则
>
> sudo vim /etc/audit/rules.d/custom.rules
>
> -w /etc/passwd -p wa -k passwd_changes
>
> -w /etc/shadow -p rwa -k shadow_access
>
> -w /etc/sudoers -p wa -k sudoers_changes
>
> \# 查询审计日志
>
> sudo ausearch -k passwd_changes
>
> sudo ausearch -ts today -k shadow_access
>
> sudo aureport -x --summary \# 可执行文件报告

## 10.4 SELinux 基础

> \# 查看状态
>
> getenforce
>
> sestatus
>
> \# 临时切换
>
> sudo setenforce 0 \# Permissive（只记录不禁用）
>
> sudo setenforce 1 \# Enforcing（强制）
>
> \# 永久配置
>
> sudo vim /etc/selinux/config
>
> SELINUX=enforcing
>
> \# 常用排错
>
> sudo ausearch -m avc -ts recent \# 查看最近的 SELinux 拒绝
>
> sudo grep "denied" /var/log/audit/audit.log \# 查看拒绝日志
>
> sudo sealert -a /var/log/audit/audit.log \# 分析并提供解决方案
>
> \# 修改文件上下文
>
> sudo chcon -t httpd_sys_content_t /var/www/html/ -R
>
> sudo restorecon -Rv /var/www/html/

## 10.5 内核安全参数加固

> \# 编辑 /etc/sysctl.d/99-security.conf
>
> sudo tee /etc/sysctl.d/99-security.conf \<\<'EOF'
>
> \# IP 欺骗防护
>
> net.ipv4.conf.all.rp_filter = 1
>
> net.ipv4.conf.default.rp_filter = 1
>
> \# 忽略 ICMP 广播
>
> net.ipv4.icmp_echo_ignore_broadcasts = 1
>
> \# 忽略错误响应
>
> net.ipv4.icmp_ignore_bogus_error_responses = 1
>
> \# 不接收重定向
>
> net.ipv4.conf.all.accept_redirects = 0
>
> net.ipv6.conf.all.accept_redirects = 0
>
> \# 不发送重定向
>
> net.ipv4.conf.all.send_redirects = 0
>
> \# 不接收源路由包
>
> net.ipv4.conf.all.accept_source_route = 0
>
> \# SYN Cookie 防御
>
> net.ipv4.tcp_syncookies = 1
>
> \# 记录异常包
>
> net.ipv4.conf.all.log_martians = 1
>
> \# 避免 TCP 时间戳导致的指纹识别
>
> net.ipv4.tcp_timestamps = 0
>
> EOF
>
> sudo sysctl -p /etc/sysctl.d/99-security.conf

# 第十一章 性能监控与系统调优

## 11.1 CPU 监控与分析

> \# 查看 CPU 信息
>
> lscpu \# CPU 架构详情
>
> cat /proc/cpuinfo \| grep "model name" \| head -1
>
> nproc \# CPU 核心数
>
> \# 实时负载
>
> top \# 交互式
>
> htop \# 增强版
>
> uptime \# 1/5/15 分钟平均负载
>
> \# 负载含义：1.0 = 1个核心满负荷，4核CPU的4.0 = 全部满负荷
>
> \# 经验值：负载 \< CPU核心数 × 0.7 为健康
>
> \# 查看每个 CPU 核心使用率
>
> mpstat -P ALL 1 5 \# 每秒采集，共5次
>
> \# 进程 CPU 使用排行
>
> ps aux --sort=-%cpu \| head -11
>
> \# 上下文切换监控
>
> vmstat 1 10 \# cs 列为每秒上下文切换数

## 11.2 内存监控与分析

> \# 内存概览
>
> free -h \# 人类可读格式
>
> free -h -s 2 \# 每 2 秒刷新
>
> \# 解读 free 输出：
>
> \# total: 总内存
>
> \# used: 已使用（含 buffers/cache）
>
> \# free: 完全空闲
>
> \# available: 可分配给新进程的内存（更重要！）
>
> \# 详细内存信息
>
> cat /proc/meminfo
>
> vmstat 1 10 -S M \# 含内存列
>
> \# 进程内存排行
>
> ps aux --sort=-%mem \| head -11
>
> \# 查看内存占用最大的进程（含共享内存）
>
> sudo smem -rs pss \| head -20
>
> \# 检查 OOM Killer 历史
>
> dmesg \| grep -i "killed process"
>
> journalctl -k \| grep -i oom

## 11.3 磁盘 I/O 监控

> \# I/O 统计
>
> iostat -x 1 5 \# 扩展统计，每秒采集，5次
>
> \# 关注指标：
>
> \# %util: 磁盘忙碌时间占比（\>80% 需关注）
>
> \# await: 平均等待时间
>
> \# r/s, w/s: 读写吞吐
>
> \# 查看哪些进程在占用 IO
>
> sudo iotop \# 交互式，类似 top
>
> sudo iotop -o \# 只显示有 IO 的进程
>
> \# 磁盘性能测试
>
> dd if=/dev/zero of=test bs=1M count=1024 oflag=direct \# 顺序写
>
> dd if=test of=/dev/null bs=1M count=1024 \# 顺序读
>
> \# 更专业的测试
>
> sudo apt install fio -y \# Flexible I/O Tester
>
> \# 查看磁盘调度算法
>
> cat /sys/block/sda/queue/scheduler
>
> \# \[none\] mq-deadline kyber bfq

## 11.4 网络性能监控

> \# 实时网络流量
>
> sar -n DEV 1 10
>
> iftop -i eth0 \# 类似 top 的网络流量监控
>
> nethogs eth0 \# 按进程查看网络流量
>
> vnstat \# 历史流量统计
>
> \# 网络连接状态统计
>
> ss -s
>
> watch -n 1 'ss -tan \| awk '"'"'\{++S\[\$1\]\} END \{for(a in S) print a,S\[a\]\}'"'"''
>
> \# 带宽测试
>
> iperf3 -s \# 服务端
>
> iperf3 -c server_ip \# 客户端

## 11.5 全能监控工具 sar

> \# 启用 sar 数据采集
>
> sudo systemctl enable --now sysstat
>
> \# 查看历史性能数据
>
> sar -u \# CPU
>
> sar -r \# 内存
>
> sar -b \# IO
>
> sar -n DEV \# 网络
>
> sar -q \# 系统负载
>
> sar -f /var/log/sa/sa30 \# 指定日期文件
>
> \# 综合报告
>
> sar -A \| less

## 11.6 快速诊断流程图

> 1\. 系统整体: uptime → 看负载
>
> 2\. CPU: top → 看谁在吃 CPU → mpstat → 哪个核心
>
> 3\. 内存: free -h → 看 available → smem → 哪个进程
>
> 4\. IO: iostat -x 1 → %util → iotop → 哪个进程
>
> 5\. 网络: ss -s → sar -n DEV → iftop → nethogs

# 第十二章 内核参数深度调优

## 12.1 sysctl 核心调优体系

### 文件描述符与进程限制

> \# 查看当前限制
>
> ulimit -n \# 文件描述符限制
>
> ulimit -u \# 最大进程数
>
> ulimit -a \# 所有限制
>
> \# 永久配置
>
> sudo vim /etc/security/limits.conf
>
> \* soft nofile 65535
>
> \* hard nofile 65535
>
> \* soft nproc 65535
>
> \* hard nproc 65535
>
> \# systemd 服务的限制
>
> sudo mkdir -p /etc/systemd/system/nginx.service.d/
>
> sudo vim /etc/systemd/system/nginx.service.d/limits.conf
>
> \[Service\]
>
> LimitNOFILE=65535
>
> LimitNPROC=65535

## 12.2 网络内核参数（高性能场景）

> sudo tee /etc/sysctl.d/99-network-tuning.conf \<\<'EOF'
>
> \# === 连接队列 ===
>
> net.core.somaxconn = 32768
>
> net.ipv4.tcp_max_syn_backlog = 16384
>
> net.core.netdev_max_backlog = 50000
>
> \# === TCP 缓冲区（16MB） ===
>
> net.core.rmem_max = 16777216
>
> net.core.wmem_max = 16777216
>
> net.ipv4.tcp_rmem = 4096 131072 16777216
>
> net.ipv4.tcp_wmem = 4096 65536 16777216
>
> \# === 连接复用与快速回收 ===
>
> net.ipv4.tcp_tw_reuse = 1
>
> net.ipv4.tcp_fin_timeout = 15
>
> net.ipv4.tcp_max_tw_buckets = 262144
>
> \# === Keep-Alive ===
>
> net.ipv4.tcp_keepalive_time = 600
>
> net.ipv4.tcp_keepalive_intvl = 60
>
> net.ipv4.tcp_keepalive_probes = 3
>
> \# === 端口范围 ===
>
> net.ipv4.ip_local_port_range = 1024 65000
>
> \# === 拥塞控制 ===
>
> net.ipv4.tcp_congestion_control = bbr
>
> net.core.default_qdisc = fq
>
> \# === SYN Cookie ===
>
> net.ipv4.tcp_syncookies = 1
>
> net.ipv4.tcp_synack_retries = 2
>
> \# === 孤儿连接 ===
>
> net.ipv4.tcp_max_orphans = 65536
>
> net.ipv4.tcp_orphan_retries = 3
>
> EOF
>
> \# 启用 BBR（需内核 4.9+）
>
> sudo modprobe tcp_bbr
>
> lsmod \| grep bbr
>
> sudo sysctl -p /etc/sysctl.d/99-network-tuning.conf

## 12.3 内存与虚拟内存调优

> sudo tee /etc/sysctl.d/99-memory-tuning.conf \<\<'EOF'
>
> \# swappiness: 控制换出倾向（0-100，越小越避免 swap）
>
> vm.swappiness = 10
>
> \# 脏页比例（内存大的服务器适当调大）
>
> vm.dirty_ratio = 10
>
> vm.dirty_background_ratio = 5
>
> \# 内存过量分配策略
>
> vm.overcommit_memory = 1 \# 0=启发式 1=始终允许 2=不允许过量
>
> vm.overcommit_ratio = 50
>
> \# 启用大页（数据库专用）
>
> \# vm.nr_hugepages = 1024
>
> EOF
>
> sudo sysctl -p /etc/sysctl.d/99-memory-tuning.conf

# 第十三章 存储管理（LVM / RAID / NFS）

## 13.1 LVM 逻辑卷管理

> \# === 创建 LVM ===
>
> \# 1. 创建物理卷 PV
>
> sudo pvcreate /dev/sdb /dev/sdc
>
> sudo pvs \# 查看 PV
>
> \# 2. 创建卷组 VG
>
> sudo vgcreate vg_data /dev/sdb /dev/sdc
>
> sudo vgs \# 查看 VG
>
> \# 3. 创建逻辑卷 LV
>
> sudo lvcreate -L 100G -n lv_data vg_data
>
> sudo lvs \# 查看 LV
>
> \# 4. 格式化并挂载
>
> sudo mkfs.ext4 /dev/vg_data/lv_data
>
> sudo mkdir /data
>
> sudo mount /dev/vg_data/lv_data /data
>
> \# === 在线扩容（LVM 最大优势） ===
>
> \# 1. 扩容 LV
>
> sudo lvextend -L +50G /dev/vg_data/lv_data
>
> \# 或使用全部剩余空间：sudo lvextend -l +100%FREE /dev/vg_data/lv_data
>
> \# 2. 扩容文件系统
>
> sudo resize2fs /dev/vg_data/lv_data \# ext4
>
> sudo xfs_growfs /data \# xfs
>
> \# === 快照 ===
>
> sudo lvcreate -L 10G -s -n snap_data /dev/vg_data/lv_data
>
> sudo mount /dev/vg_data/snap_data /mnt/snap
>
> \# 使用完毕后
>
> sudo umount /mnt/snap
>
> sudo lvremove /dev/vg_data/snap_data

## 13.2 软 RAID（mdadm）

> \# 创建 RAID 1（镜像）
>
> sudo mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc
>
> cat /proc/mdstat \# 查看同步状态
>
> \# 持久化配置
>
> sudo mdadm --detail --scan \| sudo tee -a /etc/mdadm/mdadm.conf
>
> \# 格式化并挂载
>
> sudo mkfs.ext4 /dev/md0
>
> sudo mount /dev/md0 /data
>
> \# 故障模拟与恢复
>
> sudo mdadm --manage /dev/md0 --fail /dev/sdb \# 标记故障
>
> sudo mdadm --manage /dev/md0 --remove /dev/sdb \# 移除
>
> sudo mdadm --manage /dev/md0 --add /dev/sdd \# 添加新盘
>
> \# 查看状态
>
> sudo mdadm --detail /dev/md0

## 13.3 NFS 网络文件系统

> \# === 服务端配置 ===
>
> sudo apt install nfs-kernel-server -y
>
> sudo mkdir -p /srv/nfs/share
>
> sudo chown nobody:nogroup /srv/nfs/share
>
> sudo vim /etc/exports
>
> /srv/nfs/share 192.168.1.0/24(rw,sync,no_subtree_check,no_root_squash)
>
> sudo exportfs -a \# 应用配置
>
> sudo systemctl restart nfs-kernel-server
>
> \# === 客户端挂载 ===
>
> sudo apt install nfs-common -y
>
> sudo mkdir -p /mnt/nfs
>
> sudo mount 192.168.1.10:/srv/nfs/share /mnt/nfs
>
> \# 永久挂载
>
> sudo vim /etc/fstab
>
> 192.168.1.10:/srv/nfs/share /mnt/nfs nfs defaults 0 0

# 第十四章 服务部署实战

## 14.1 Nginx 安装与配置

> \# 安装
>
> sudo apt install nginx -y
>
> sudo systemctl enable --now nginx
>
> \# 基础站点配置
>
> sudo vim /etc/nginx/sites-available/myapp
>
> server \{
>
> listen 80;
>
> server_name example.com;
>
> root /var/www/myapp;
>
> index index.html index.htm;
>
> location / \{
>
> try_files \$uri \$uri/ =404;
>
> \}
>
> location /api/ \{
>
> proxy_pass http://localhost:8080/;
>
> proxy_set_header Host \$host;
>
> proxy_set_header X-Real-IP \$remote_addr;
>
> proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
>
> \}
>
> \}
>
> sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
>
> sudo nginx -t \# 测试配置
>
> sudo systemctl reload nginx \# 重载配置
>
> \# HTTPS 配置（Let's Encrypt）
>
> sudo apt install certbot python3-certbot-nginx -y
>
> sudo certbot --nginx -d example.com -d www.example.com
>
> sudo certbot renew --dry-run \# 测试自动续期

## 14.2 MySQL 安装与安全配置

> \# 安装
>
> sudo apt install mysql-server -y
>
> sudo systemctl enable --now mysql
>
> \# 安全初始化
>
> sudo mysql_secure_installation
>
> \# → 设置root密码 → 删除匿名用户 → 禁止root远程 → 删除test库
>
> \# 创建数据库和用户
>
> sudo mysql -u root -p
>
> CREATE DATABASE myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
>
> CREATE USER 'myapp'@'localhost' IDENTIFIED BY 'SecurePass123!';
>
> GRANT ALL PRIVILEGES ON myapp.\* TO 'myapp'@'localhost';
>
> FLUSH PRIVILEGES;
>
> \# 查看关键配置
>
> sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
>
> \[mysqld\]
>
> innodb_buffer_pool_size = 2G \# 设置为内存的 50%-70%
>
> max_connections = 200
>
> slow_query_log = 1
>
> slow_query_log_file = /var/log/mysql/slow.log
>
> long_query_time = 2

## 14.3 Redis 安装与配置

> \# 安装
>
> sudo apt install redis-server -y
>
> sudo systemctl enable --now redis-server
>
> \# 安全配置
>
> sudo vim /etc/redis/redis.conf
>
> bind 127.0.0.1 \# 仅本地访问
>
> requirepass YourStrongPassword123! \# 设置密码
>
> maxmemory 2gb \# 最大内存
>
> maxmemory-policy allkeys-lru \# 淘汰策略
>
> sudo systemctl restart redis-server
>
> \# 测试连接
>
> redis-cli -a YourStrongPassword123! ping
>
> \# 性能测试
>
> redis-benchmark -h 127.0.0.1 -p 6379 -a YourStrongPassword123! -t set,get -q

# 第十五章 Docker 容器化实战

## 15.1 安装 Docker

> \# Ubuntu/Debian
>
> sudo apt update
>
> sudo apt install -y ca-certificates curl
>
> sudo install -m 0755 -d /etc/apt/keyrings
>
> sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
>
> echo "deb \[arch=\$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc\] https://download.docker.com/linux/ubuntu \$(lsb_release -cs) stable" \| sudo tee /etc/apt/sources.list.d/docker.list
>
> sudo apt update
>
> sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
>
> \# 免 sudo 使用 Docker
>
> sudo usermod -aG docker \$USER
>
> newgrp docker
>
> docker run hello-world

## 15.2 Docker 核心命令

> \# 镜像管理
>
> docker images \# 列出本地镜像
>
> docker pull nginx:alpine \# 拉取镜像
>
> docker rmi nginx:alpine \# 删除镜像
>
> docker save -o nginx.tar nginx:alpine \# 导出镜像
>
> docker load -i nginx.tar \# 导入镜像
>
> \# 容器生命周期
>
> docker run -d --name web -p 80:80 nginx:alpine \# 后台运行
>
> docker run -it ubuntu bash \# 交互式运行
>
> docker ps -a \# 查看所有容器
>
> docker start/stop/restart web \# 启停
>
> docker rm web \# 删除容器
>
> docker rm -f web \# 强制删除
>
> docker exec -it web bash \# 进入容器
>
> \# 日志和调试
>
> docker logs -f --tail 100 web \# 实时日志
>
> docker inspect web \# 详细信息
>
> docker stats \# 资源使用
>
> docker cp web:/etc/nginx/nginx.conf ./ \# 拷贝文件
>
> \# 清理
>
> docker system prune -a --volumes \# 清理一切未使用资源

## 15.3 Dockerfile 编写

> \# Dockerfile 示例
>
> FROM node:18-alpine AS builder
>
> WORKDIR /app
>
> COPY package\*.json ./
>
> RUN npm ci --only=production
>
> COPY . .
>
> RUN npm run build
>
> FROM nginx:alpine
>
> COPY --from=builder /app/dist /usr/share/nginx/html
>
> COPY nginx.conf /etc/nginx/conf.d/default.conf
>
> EXPOSE 80
>
> HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ \|\| exit 1
>
> CMD \["nginx", "-g", "daemon off;"\]
>
> \# 构建和运行
>
> docker build -t myapp:1.0 .
>
> docker run -d -p 8080:80 --name myapp myapp:1.0

## 15.4 Docker Compose

> \# docker-compose.yml
>
> version: '3.8'
>
> services:
>
> web:
>
> build: ./app
>
> ports:
>
> \- "8080:80"
>
> environment:
>
> \- APP_ENV=production
>
> depends_on:
>
> \- db
>
> \- redis
>
> restart: unless-stopped
>
> volumes:
>
> \- ./app:/var/www/html
>
> db:
>
> image: mysql:8.0
>
> environment:
>
> MYSQL_ROOT_PASSWORD: rootpass
>
> MYSQL_DATABASE: myapp
>
> MYSQL_USER: myapp
>
> MYSQL_PASSWORD: userpass
>
> volumes:
>
> \- db_data:/var/lib/mysql
>
> ports:
>
> \- "3306:3306"
>
> redis:
>
> image: redis:7-alpine
>
> command: redis-server --requirepass redispwd
>
> volumes:
>
> \- redis_data:/data
>
> volumes:
>
> db_data:
>
> redis_data:
>
> \# 启动
>
> docker compose up -d
>
> docker compose ps
>
> docker compose logs -f
>
> docker compose down

# 第十六章 eBPF / XDP 前沿技术

## 16.1 eBPF 概述

eBPF（extended Berkeley Packet Filter）允许在无需修改内核源码或加载内核模块的情况下，在 Linux 内核中安全高效地运行沙盒程序。

核心应用场景：

- 网络：高性能数据包处理、负载均衡、DDoS 防御（Cilium）

- 可观测性：无侵入系统追踪、性能分析（bcc / bpftrace）

- 安全：运行时安全监控、系统调用过滤（Falco）

- 追踪：应用性能监控，替代传统 /proc 和 sysfs

## 16.2 bpftrace 实战

> \# 安装
>
> sudo apt install bpftrace -y
>
> \# 追踪所有系统调用（按进程统计）
>
> sudo bpftrace -e 'tracepoint:syscalls:sys_enter\_\* \{ @\[comm\] = count(); \}'
>
> \# 追踪文件打开
>
> sudo bpftrace -e 'tracepoint:syscalls:sys_enter_openat \{ printf("%s %s\n", comm, str(args-\>filename)); \}'
>
> \# 追踪进程执行
>
> sudo bpftrace -e 'tracepoint:syscalls:sys_enter_execve \{ printf("%s -\> %s\n", comm, str(args-\>filename)); \}'
>
> \# 统计磁盘 I/O 延迟
>
> sudo bpftrace -e 'kprobe:blk_mq_start_request \{ @start\[arg0\] = nsecs; \}
>
> kprobe:blk_update_request \{ if (@start\[arg0\]) \{ @usecs = hist((nsecs - @start\[arg0\]) / 1000); \} \}'
>
> \# 追踪 TCP 连接建立
>
> sudo bpftrace -e 'kprobe:tcp_connect \{ printf("TCP connect: %s\n", comm); \}

## 16.3 XDP 高性能数据包处理

> \# XDP 程序挂载点（最早处理点，在网卡驱动层）
>
> \# 优势：绕过内核网络栈，性能极高
>
> \# 查看 XDP 支持
>
> ethtool -i eth0 \| grep xdp
>
> ip link set dev eth0 xdpgeneric obj xdp_prog.o sec xdp \# 加载 XDP 程序
>
> \# 使用 xdp-tools
>
> sudo apt install xdp-tools -y
>
> sudo xdp-loader status
>
> sudo xdp-filter load eth0 -f udp -m port 53
>
> \# Cilium（基于 eBPF 的 CNI）
>
> \# 安装 Cilium CLI
>
> curl -L --remote-name-all https://github.com/cilium/cilium-cli/releases/latest/download/cilium-linux-amd64.tar.gz
>
> sudo tar xzvfC cilium-linux-amd64.tar.gz /usr/local/bin
>
> cilium install

# 第十七章 高可用架构

## 17.1 Keepalived + Nginx 高可用

> \# 拓扑：
>
> \# VIP 192.168.1.100
>
> \# Node1: 192.168.1.10 (MASTER)
>
> \# Node2: 192.168.1.20 (BACKUP)
>
> \# === 两台服务器都安装 ===
>
> sudo apt install keepalived nginx -y
>
> \# === Node1 配置（MASTER） ===
>
> sudo vim /etc/keepalived/keepalived.conf
>
> vrrp_instance VI_1 \{
>
> state MASTER
>
> interface eth0
>
> virtual_router_id 51
>
> priority 100
>
> advert_int 1
>
> authentication \{
>
> auth_type PASS
>
> auth_pass 1234
>
> \}
>
> virtual_ipaddress \{
>
> 192.168.1.100/24
>
> \}
>
> track_script \{
>
> chk_nginx
>
> \}
>
> \}
>
> vrrp_script chk_nginx \{
>
> script "/usr/bin/killall -0 nginx"
>
> interval 2
>
> weight -20
>
> \}
>
> \# === Node2 配置（BACKUP，priority 改为 90，state 改为 BACKUP） ===
>
> sudo systemctl enable --now keepalived
>
> ip addr show eth0 \# 验证 VIP

## 17.2 HAProxy 负载均衡

> sudo apt install haproxy -y
>
> sudo vim /etc/haproxy/haproxy.cfg
>
> global
>
> maxconn 50000
>
> user haproxy
>
> group haproxy
>
> defaults
>
> mode http
>
> timeout connect 5s
>
> timeout client 30s
>
> timeout server 30s
>
> frontend web_front
>
> bind \*:80
>
> default_backend web_back
>
> backend web_back
>
> balance roundrobin
>
> option httpchk GET /health
>
> server web1 192.168.1.11:80 check inter 3s
>
> server web2 192.168.1.12:80 check inter 3s
>
> server web3 192.168.1.13:80 check inter 3s
>
> \# 管理界面
>
> listen stats
>
> bind \*:8404
>
> stats enable
>
> stats uri /stats
>
> stats auth admin:password
>
> sudo systemctl enable --now haproxy

# 第十八章 运维监控体系

## 18.1 Prometheus + Node Exporter

> \# === 在所有被监控节点安装 Node Exporter ===
>
> wget https://github.com/prometheus/node_exporter/releases/latest/download/node_exporter-1.8.2.linux-amd64.tar.gz
>
> tar xzf node_exporter-\*.tar.gz
>
> sudo mv node_exporter-\*.linux-amd64/node_exporter /usr/local/bin/
>
> \# systemd 服务
>
> sudo tee /etc/systemd/system/node_exporter.service \<\<'EOF'
>
> \[Unit\]
>
> Description=Node Exporter
>
> After=network.target
>
> \[Service\]
>
> ExecStart=/usr/local/bin/node_exporter
>
> Restart=always
>
> \[Install\]
>
> WantedBy=multi-user.target
>
> EOF
>
> sudo systemctl enable --now node_exporter
>
> \# === Prometheus 服务器 ===
>
> wget https://github.com/prometheus/prometheus/releases/latest/download/prometheus-2.54.1.linux-amd64.tar.gz
>
> tar xzf prometheus-\*.tar.gz
>
> sudo mv prometheus-\*.linux-amd64 /opt/prometheus
>
> \# 配置
>
> sudo vim /opt/prometheus/prometheus.yml
>
> scrape_configs:
>
> \- job_name: 'nodes'
>
> static_configs:
>
> \- targets: \['192.168.1.10:9100', '192.168.1.11:9100', '192.168.1.12:9100'\]
>
> /opt/prometheus/prometheus --config.file=/opt/prometheus/prometheus.yml

## 18.2 Grafana 可视化

> \# 安装
>
> sudo apt install -y software-properties-common
>
> sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
>
> sudo apt update
>
> sudo apt install grafana -y
>
> sudo systemctl enable --now grafana-server
>
> \# 访问: http://server_ip:3000 (默认 admin/admin)
>
> \# 1. 添加 Prometheus 数据源
>
> \# 2. 导入 Node Exporter 仪表板（ID: 1860）

## 18.3 告警配置（Alertmanager）

> \# prometheus.yml 添加告警规则
>
> rule_files:
>
> \- 'alerts.yml'
>
> \# alerts.yml
>
> groups:
>
> \- name: node_alerts
>
> rules:
>
> \- alert: HighCPU
>
> expr: 100 - (avg(rate(node_cpu_seconds_total\{mode="idle"\}\[5m\])) \* 100) \> 80
>
> for: 5m
>
> labels:
>
> severity: warning
>
> annotations:
>
> summary: "High CPU usage on \{\{ \$labels.instance \}\}"
>
> \- alert: DiskFull
>
> expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) \* 100 \< 10
>
> for: 1m
>
> labels:
>
> severity: critical
>
> annotations:
>
> summary: "Disk almost full on \{\{ \$labels.instance \}\}"
>
> \- alert: OutOfMemory
>
> expr: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) \* 100 \> 90
>
> for: 2m
>
> labels:
>
> severity: critical

# 第十九章 DDoS 防御完整方案

## 19.1 五层防御体系

| **层次** | **防御手段** | **响应时间** |
|----|----|----|
| 第一层：上游清洗 | BGP Flowspec / RTBH / 运营商 ACL | 秒级 |
| 第二层：内核参数 | syncookies + backlog + 生命周期 + rp_filter | 即时生效 |
| 第三层：网卡驱动 | ring buffer + RSS 多队列 + 中断亲和 + GRO 控制 | 即时生效 |
| 第四层：应用层 | Nginx reuseport + backlog + 连接限速 + WAF | 分钟级 |
| 第五层：业务降级 | 灰度降级、只读模式、CDN 回源限流 | 分钟级 |

## 19.2 实战：SYN Flood 防御

> \# === 实时监控 ===
>
> watch -n 1 'ss -tan \| awk '"'"'\{++S\[\$1\]\} END \{for(a in S) print a,S\[a\]\}'"'"''
>
> watch -n 1 'netstat -s \| grep -i "listen\\SYN\\overflow\\cookie"'
>
> \# === 内核参数调优 ===
>
> sudo tee /etc/sysctl.d/99-ddos-mitigation.conf \<\<'EOF'
>
> \# 连接队列
>
> net.core.somaxconn = 32768
>
> net.ipv4.tcp_max_syn_backlog = 65535
>
> net.core.netdev_max_backlog = 100000
>
> \# SYN Cookie（核心防御）
>
> net.ipv4.tcp_syncookies = 1
>
> net.ipv4.tcp_synack_retries = 2
>
> net.ipv4.tcp_syn_retries = 3
>
> \# 连接生命周期
>
> net.ipv4.tcp_fin_timeout = 15
>
> net.ipv4.tcp_tw_reuse = 1
>
> net.ipv4.tcp_max_tw_buckets = 262144
>
> net.ipv4.tcp_max_orphans = 65536
>
> \# 防 IP 欺骗
>
> net.ipv4.conf.all.rp_filter = 2
>
> net.ipv4.tcp_rfc1337 = 1
>
> EOF
>
> sudo sysctl -p /etc/sysctl.d/99-ddos-mitigation.conf
>
> \# === 网卡层优化 ===
>
> sudo ethtool -G eth0 rx 4096 tx 4096 \# 增大 ring buffer
>
> sudo ethtool -K eth0 gro off \# 攻击期间关闭 GRO
>
> \# 长期优化：配置 RSS 多队列 + 中断 CPU 绑定
>
> \# === Nginx 加固 ===
>
> \# nginx.conf:
>
> \# worker_rlimit_nofile 65535;
>
> \# events \{ worker_connections 50000; multi_accept on; \}
>
> \# 添加 limit_req 和 limit_conn 模块限流
>
> \# === iptables 紧急防御 ===
>
> \# 限制单 IP 的 SYN 速率
>
> sudo iptables -A INPUT -p tcp --syn -m limit --limit 100/s --limit-burst 150 -j ACCEPT
>
> sudo iptables -A INPUT -p tcp --syn -j DROP

# 第二十章 实操案例集（20+ 实战脚本）

## 案例 1: 系统健康检查脚本

> \#!/bin/bash
>
> \# system_health.sh - 系统健康检查
>
> set -euo pipefail
>
> echo "========== System Health Report: \$(date) =========="
>
> echo ""
>
> \# 系统负载
>
> echo "--- Load Average ---"
>
> uptime
>
> echo ""
>
> \# CPU
>
> echo "--- CPU Usage ---"
>
> top -bn1 \| grep "Cpu(s)" \| awk '\{print "CPU: " \$2+\$4 "%"\}'
>
> echo ""
>
> \# 内存
>
> echo "--- Memory ---"
>
> free -h \| awk '/^Mem:/ \{print "Total:", \$2, "Used:", \$3, "Free:", \$4, "Available:", \$7\}'
>
> echo ""
>
> \# 磁盘
>
> echo "--- Disk ---"
>
> df -h \| grep -vE '^tmpfs\|^devtmpfs\|^Filesystem' \| awk '\{print \$6, \$5, \$4 " free"\}'
>
> echo ""
>
> \# 磁盘 Inode
>
> echo "--- Inode ---"
>
> df -i \| grep -vE '^tmpfs\|^devtmpfs\|^Filesystem' \| awk '\{print \$6, \$5\}'
>
> echo ""
>
> \# 进程
>
> echo "--- Top 5 CPU Processes ---"
>
> ps aux --sort=-%cpu \| head -6 \| awk '\{printf "%-10s %5s%% %5s%% %s\n", \$1, \$3, \$4, \$11\}'
>
> echo ""
>
> \# 网络
>
> echo "--- Network Connections ---"
>
> ss -s \| head -4
>
> echo ""
>
> \# 最近错误
>
> echo "--- Recent Errors (last 50 lines) ---"
>
> journalctl -p err -n 50 --no-pager 2\>/dev/null \|\| dmesg -T \| grep -iE "error\|fail\|critical" \| tail -10
>
> echo ""
>
> echo "========== Report End =========="

## 案例 2: Nginx 日志分析脚本

> \#!/bin/bash
>
> \# nginx_analyze.sh - Nginx 日志分析
>
> set -euo pipefail
>
> LOG_FILE="\$\{1:-/var/log/nginx/access.log\}"
>
> echo "========== Nginx Access Log Analysis =========="
>
> echo "File: \$LOG_FILE"
>
> echo ""
>
> echo "--- Top 10 IPs ---"
>
> awk '\{print \$1\}' "\$LOG_FILE" \| sort \| uniq -c \| sort -rn \| head -10
>
> echo ""
>
> echo "--- HTTP Status Code Distribution ---"
>
> awk '\{print \$9\}' "\$LOG_FILE" \| sort \| uniq -c \| sort -rn
>
> echo ""
>
> echo "--- Top 10 URLs ---"
>
> awk '\{print \$7\}' "\$LOG_FILE" \| sort \| uniq -c \| sort -rn \| head -10
>
> echo ""
>
> echo "--- Requests Per Hour ---"
>
> awk '\{print \$4\}' "\$LOG_FILE" \| cut -d: -f2 \| sort \| uniq -c \| sort -k2 -n
>
> echo ""
>
> echo "--- 404 Errors ---"
>
> grep " 404 " "\$LOG_FILE" \| awk '\{print \$7\}' \| sort \| uniq -c \| sort -rn \| head -10
>
> echo ""
>
> echo "====== Analysis Complete ======"

## 案例 3: 数据库备份脚本

> \#!/bin/bash
>
> \# mysql_backup.sh - MySQL 数据库备份
>
> set -euo pipefail
>
> BACKUP_DIR="/backup/mysql"
>
> DB_USER="root"
>
> DB_PASS="password"
>
> DB_NAME="myapp"
>
> RETENTION_DAYS=7
>
> DATE=\$(date +%Y%m%d\_%H%M%S)
>
> BACKUP_FILE="\$BACKUP_DIR/\$\{DB_NAME\}\_\$\{DATE\}.sql.gz"
>
> mkdir -p "\$BACKUP_DIR"
>
> \# 全量备份
>
> mysqldump -u"\$DB_USER" -p"\$DB_PASS" --single-transaction --routines --triggers "\$DB_NAME" \| gzip \> "\$BACKUP_FILE"
>
> \# 验证备份
>
> if \[ \$(stat -c%s "\$BACKUP_FILE") -lt 1024 \]; then
>
> echo "WARNING: Backup file is suspiciously small!"
>
> exit 1
>
> fi
>
> \# 清理旧备份
>
> find "\$BACKUP_DIR" -name "\$\{DB_NAME\}\_\*.sql.gz" -mtime +\$RETENTION_DAYS -delete
>
> echo "Backup completed: \$BACKUP_FILE (\$(du -h "\$BACKUP_FILE" \| cut -f1))"

## 案例 4: 日志轮转脚本

> \#!/bin/bash
>
> \# logrotate_custom.sh - 自定义日志轮转
>
> LOG_DIR="/var/log/myapp"
>
> MAX_SIZE_MB=100
>
> KEEP_DAYS=30
>
> for log_file in "\$LOG_DIR"/\*.log; do
>
> if \[ ! -f "\$log_file" \]; then continue; fi
>
> size_mb=\$(du -m "\$log_file" \| cut -f1)
>
> if \[ "\$size_mb" -gt "\$MAX_SIZE_MB" \]; then
>
> timestamp=\$(date +%Y%m%d\_%H%M%S)
>
> mv "\$log_file" "\$\{log_file\}.\$\{timestamp\}"
>
> touch "\$log_file"
>
> gzip "\$\{log_file\}.\$\{timestamp\}" &
>
> echo "Rotated: \$log_file (was \$size_mb MB)"
>
> fi
>
> done
>
> \# 清理过期日志
>
> find "\$LOG_DIR" -name "\*.gz" -mtime +\$KEEP_DAYS -delete
>
> echo "Cleanup complete: removed logs older than \$KEEP_DAYS days"

## 案例 5: SSL 证书过期监控

> \#!/bin/bash
>
> \# ssl_check.sh - SSL 证书过期检查
>
> set -euo pipefail
>
> DOMAINS=("example.com" "api.example.com" "admin.example.com")
>
> WARN_DAYS=30
>
> for domain in "\$\{DOMAINS\[@\]\}"; do
>
> expiry_date=\$(echo \| openssl s_client -servername "\$domain" -connect "\$domain:443" 2\>/dev/null \| openssl x509 -noout -enddate \| cut -d= -f2)
>
> expiry_epoch=\$(date -d "\$expiry_date" +%s)
>
> now_epoch=\$(date +%s)
>
> days_left=\$(( (expiry_epoch - now_epoch) / 86400 ))
>
> if \[ "\$days_left" -lt 0 \]; then
>
> echo "CRITICAL: \$domain SSL certificate EXPIRED!"
>
> elif \[ "\$days_left" -lt "\$WARN_DAYS" \]; then
>
> echo "WARNING: \$domain expires in \$days_left days"
>
> else
>
> echo "OK: \$domain - \$days_left days remaining"
>
> fi
>
> done

## 案例 6: 批量文件处理脚本

> \#!/bin/bash
>
> \# batch_rename.sh - 批量重命名
>
> \# 将 \*.jpeg 重命名为 \*.jpg
>
> find . -name "\*.jpeg" -type f \| while read -r file; do
>
> newname="\$\{file%.jpeg\}.jpg"
>
> mv "\$file" "\$newname"
>
> echo "Renamed: \$file -\> \$newname"
>
> done

## 案例 7: 进程守护脚本

> \#!/bin/bash
>
> \# process_guard.sh - 进程守护（确保关键进程运行）
>
> PROCESS="nginx"
>
> RESTART_CMD="sudo systemctl restart nginx"
>
> LOG="/var/log/process_guard.log"
>
> if ! pgrep -x "\$PROCESS" \> /dev/null; then
>
> echo "\[\$(date)\] \$PROCESS is down, restarting..." \>\> "\$LOG"
>
> \$RESTART_CMD
>
> sleep 5
>
> if pgrep -x "\$PROCESS" \> /dev/null; then
>
> echo "\[\$(date)\] \$PROCESS restarted successfully" \>\> "\$LOG"
>
> fi
>
> fi

## 案例 8: 服务器性能基线采集

> \#!/bin/bash
>
> \# perf_baseline.sh - 建立性能基线
>
> OUTPUT="/var/log/perf_baseline\_\$(date +%Y%m%d).log"
>
> \{
>
> echo "=== \$(date) ==="
>
> echo "--- uptime ---"; uptime
>
> echo "--- CPU ---"; mpstat 1 1
>
> echo "--- Memory ---"; free -h
>
> echo "--- IO ---"; iostat -x 1 2 \| tail -n +4
>
> echo "--- Network ---"; sar -n DEV 1 1 \| tail -5
>
> echo "--- Connections ---"; ss -s
>
> echo "--- Top CPU ---"; ps aux --sort=-%cpu \| head -6
>
> echo "--- Top MEM ---"; ps aux --sort=-%mem \| head -6
>
> \} \> "\$OUTPUT"
>
> echo "Baseline saved: \$OUTPUT"

## 案例 9: 一键部署 LAMP 环境

> \#!/bin/bash
>
> \# install_lamp.sh - 一键部署 LAMP
>
> set -euo pipefail
>
> echo "Installing LAMP stack..."
>
> sudo apt update && sudo apt upgrade -y
>
> \# Apache
>
> sudo apt install apache2 -y
>
> sudo systemctl enable --now apache2
>
> \# MySQL
>
> sudo apt install mysql-server -y
>
> sudo systemctl enable --now mysql
>
> sudo mysql_secure_installation
>
> \# PHP
>
> sudo apt install php8.3 php8.3-mysql php8.3-curl php8.3-mbstring php8.3-xml php8.3-zip -y
>
> sudo systemctl restart apache2
>
> \# 测试页面
>
> echo "\<?php phpinfo(); ?\>" \| sudo tee /var/www/html/info.php
>
> echo "LAMP installed. Visit http://\$(hostname -I \| awk '\{print \$1\}')/info.php"

## 案例 10: 用户行为审计脚本

> \#!/bin/bash
>
> \# user_audit.sh - 用户操作审计
>
> \# 记录所有 login shell 用户的命令
>
> sudo tee /etc/profile.d/audit.sh \<\<'INNER_EOF'
>
> export PROMPT_COMMAND='RETRN_VAL=\$?; logger -p local6.debug "\[\$(whoami)@\$(hostname)\]: \$(history 1 \| sed "s/^\[ \]\*\[0-9\]\\\[ \]\*//" ) \[\$RETRN_VAL\]"'
>
> readonly PROMPT_COMMAND
>
> INNER_EOF
>
> \# rsyslog 配置
>
> sudo tee /etc/rsyslog.d/audit.conf \<\<'INNER_EOF'
>
> local6.debug /var/log/user_audit.log
>
> INNER_EOF
>
> sudo systemctl restart rsyslog

## 案例 11: 快速排查高 CPU 问题

> \#!/bin/bash
>
> \# find_high_cpu.sh
>
> echo "=== Top 5 CPU consuming processes ==="
>
> ps aux --sort=-%cpu \| head -6
>
> \# 获取最高 CPU 进程的 PID
>
> high_pid=\$(ps aux --sort=-%cpu \| awk 'NR==2\{print \$2\}')
>
> echo "Highest CPU PID: \$high_pid"
>
> echo "Process: \$(cat /proc/\$high_pid/cmdline \| tr '\0' ' ')"
>
> echo "Threads: \$(ls /proc/\$high_pid/task \| wc -l)"
>
> echo "Open files: \$(ls /proc/\$high_pid/fd \| wc -l)"
>
> echo "Strace (5 seconds):"
>
> sudo timeout 5 strace -c -p \$high_pid 2\>&1 \|\| true

# 附录 A：学习路线图

| **阶段** | **时间** | **内容** | **检验标准** |
|----|----|----|----|
| 入门 | 1-2周 | 环境搭建 + 50个基础命令 + Vim | 能独立操作服务器 |
| 进阶 | 2-4周 | 权限体系 + 进程管理 + Shell脚本 | 写出 50 行以上的自动化脚本 |
| 中级 | 1-2月 | 网络管理 + 服务部署 + systemd + Docker | 搭建 Nginx+MySQL+Redis 环境 |
| 高级 | 2-3月 | 性能调优 + 安全加固 + 高可用架构 | 独立完成服务器调优和加固 |
| 专家 | 持续 | 内核参数 + eBPF + k8s + SRE | 能解决深层性能和安全问题 |

# 附录 B：推荐书籍与资源

| **类型** | **名称** | **说明** |
|----|----|----|
| 📖 | 《鸟哥的 Linux 私房菜》 | 经典入门（当字典查，不适合从头啃） |
| 📖 | 《Linux 内核设计与实现》(Robert Love) | 内核入门首选 |
| 📖 | 《UNIX 环境高级编程》(Stevens) | 系统编程圣经 |
| 📖 | 《BPF Performance Tools》(Brendan Gregg) | eBPF 性能分析权威指南 |
| 🌐 | Arch Linux Wiki | 最全面准确的 Linux 文档 |
| 🌐 | Linux Journey | 交互式在线学习 |
| 🎮 | OverTheWire Bandit | 命令行闯关游戏练习 |
| 📖 | 《Linux Command Line and Shell Scripting Bible》 | Shell 编程完整参考 |
