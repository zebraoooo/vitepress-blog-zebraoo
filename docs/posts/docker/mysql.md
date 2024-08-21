---
title: "docker mysql 基本使用"
date: 2024-08-20
author: zebraoo
tags:
  - docker
  - mysqljava
---


docker  run -d  --name mysql8.0.20  -p 3306:3306 -v /iot/mysql/conf:/etc/mysql/conf.d -v /iot/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456   mysql:8.0.20 