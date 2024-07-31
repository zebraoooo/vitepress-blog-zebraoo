---
title: "docker-compose 使用"
date: 2024-06-07
author: zebraoo
tags:
  - docker
  - docker-compose
---

```text
version: “3.9” # 首先是版本号，和Docker版本对应
services: # services里面就是我们所有需要进行编排的服务
	spring: # 服务名称，随便起
		container_name: app_springboot #容器名称
		build: . #点 代表当前目录 表示使用当前目录下的DockerFile
		ports: #需要暴露的端口
			- "8080:8080"
		depends_on: #mysql可能启动慢，springboot启动快所以会有可能连接数据库失败，所以有个先后顺序
			-mysql
    mysql:
		container_name: app_mysql
		image: mysql:latest #直接使用docker的镜像
		enviroment: #设置环境变量
			MYSQL_ROOT_HOST: '%'
			MYSQL_ROOT_PASSWORD: '123456.ROOT' #root账号的密码
			MYSQL_DATABASE: '' #启动时自动创建数据库
			TZ: 'Asia/Shanghai' #时区
		ports:
			- "3306:3306"
		volumes: # 将主机的数据卷或者文件挂载到容器里。
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./html:/usr/share/nginx/html
	redis:
		container_name: app_redis
		image: redis:latest
        build:
            context:. #表示当前目录作为构建上下文
            dockerfile: redis-dockerfile #同级目录下的redis文件
```


```text

```
