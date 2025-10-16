

---
title: "docker windows"
date: 2024-07-22
author: zebraoo
tags:
  - docker
  - windows
---

安装教程
https://blog.csdn.net/HYP_Coder/article/details/141753300

## 关于Windows端口没被占用提示An attempt was made to access a socket in a way forbidden by its access permissions

https://blog.csdn.net/tian2342/article/details/108934646

问题
某软件启动日志一直提示：An attempt was made to access a socket in a way forbidden by its access permissions。
我百度发现全是“netstat -aon|findstr “49157””这种，但是我试了发现没有进程占用。

原因
后来好不容易找到了TCP动态端口起始端口,发现很多人说改这个可以解决问题。

然后查到Windows Vista 和 Windows Server 2008 中，TCP/IP 默认动态端口范围已更改,通过里面的命令“netsh int ipv4 show dynamicport tcp”发现起始端口变成了1024。

最后Hyper-V和IDEA运行端口占用问题发现可能是因为开启了Hyper-V，导致ipv4的动态起始端口变成了1024。

解决方案
关闭Hyper-V
Microsoft Windows [版本 10.0.18363.752]
© 2019 Microsoft Corporation。保留所有权利。
C:\WINDOWS\system32>dism.exe /Online /Disable-Feature:Microsoft-Hyper-V

或者采用传统方式，在控制面板的“程序和功能”中，找到“Windows功能”，取消Hyper-V的勾选。这两种方法都会要求重启。

修改动态端口范围
使用管理员身份运行cmd

C:\WINDOWS\system32>netsh int ipv4 set dynamicport tcp start=49152 num=16383
确定。

C:\WINDOWS\system32>netsh int ipv4 set dynamicport udp start=49152 num=16383
确定。

然后检查结果

C:\Users\Chirius>netsh int ipv4 show dynamicport tcp
协议 tcp 动态端口范围
启动端口 : 49152
端口数 : 16383

开启Hyper-V
C:\WINDOWS\system32>dism.exe /Online /Enable-Feature:Microsoft-Hyper-V /All
部署映像服务和管理工具
版本: 10.0.18362.1
映像版本: 10.0.18363.752
启用一个或多个功能
[100.0%]
操作成功完成。
重新启动 Windows 以完成该操作。
是否立即重新启动计算机? (Y/N)

输入Y进行重启之后就解决了。