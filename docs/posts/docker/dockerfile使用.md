---
title: "dockerfile 使用"
date: 2024-06-07
author: zebraoo
tags:
  - docker
  - dockerfile
---

```text
# 1 先指定当前镜像的基础镜像是什么
FROM openjdk:8

# 2 描述这个镜像的作者，以及联系方式（可选）
MAINTAINER ljx<邮箱>

# 3 镜像的标签信息（可选）
LABEL version="1.0"
LABEL description="这是我的第一个Dockerfile"

# 4 环境变量配置
ENV JAVA_ENV=dev

# 5 在构建镜像的时候，需要执行的shell命令
RUN ls -al

# 6 将主机中指定的文件复制到容器的目标位置
ADD /etc/hosts /etc/hosts

# 7 设置容器中的工作目录，如果该目录不存在，那么会自己创建
WORKDIR /app

# 8 镜像数据卷绑定，将主机中的指定目录挂载到容器中
VOLUME ["/path/to/dir"]

# 9 设置容器启动后要暴露的端口
EXPOSE 80

#CMD 和 ENTRYPOINT 选择其一即可，作用是描述镜像构建完成后，默认执行的命令和参数
```