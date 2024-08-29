---
title: "docker mysql 基本使用"
date: 2024-08-20
author: zebraoo
tags:
  - docker
  - mysqljava
---

先创建一个临时镜像

docker run --name mysql -p 3306:3306  -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0.39

查看mysql 配置文件
docker cp mysql:/etc/my.cnf /iot/mysql/conf/

docker cp mysql:/etc/mysql/conf.d /iot/mysql/conf/



mysqld.log 

--restart=always --privileged=true

docker run --name mysql -p 3306:3306  -v /iot/mysql/data:/var/lib/mysql -v /iot/mysql/conf/conf.d:/etc/mysql/conf.d  -v /iot/mysql/log:/var/log -e TZ=Asia/Shanghai -e MYSQL_ROOT_PASSWORD=123456 -d mysql


bash后连接mysql
mysql -h 127.0.0.1 -P 3306 -u root -p


https://blog.csdn.net/bali16/article/details/139682264


/etc/mysql/conf.d
目录: 这是一个目录，而不是一个单一的文件。
包含多个配置文件: 该目录通常包含多个以 .cnf 结尾的配置文件。每个文件可以用于特定的配置目的。
模块化配置: 允许将不同的配置分散在多个文件中，从而使配置管理更加灵活。例如，可以将客户端和服务器的配置分开，或将插件的配置放在单独的文件中。
加载顺序: MySQL会按字母顺序加载 conf.d 目录下的所有 .cnf 文件。因此，文件的命名可能会影响配置的加载顺序。
示例: 例如，你可能会在这个目录中看到 mysqld_safe_syslog.cnf、mysql.cnf、mysqld.cnf 等文件，它们分别配置不同的MySQL功能。

/etc/my.cnf
单一文件: 这是一个单一的配置文件。
传统配置文件: 它是MySQL的主要配置文件，包含所有全局配置选项。
集中配置: 所有配置都集中在这个文件中，因此管理起来可能比较集中，但也可能使文件较大、较复杂。
优先级: 通常，/etc/my.cnf 会在其他配置文件（如 /etc/mysql/conf.d 下的文件）之前被读取。如果配置项在 my.cnf 和 conf.d 文件中都有设置，通常会以最后读取的配置为准，因此 conf.d 中的配置可能会覆盖 my.cnf 中的设置。


优先级和加载顺序
MySQL 读取配置文件时遵循一定的优先级和加载顺序。一般来说，MySQL 会按照以下顺序读取配置文件：

/etc/my.cnf
/etc/mysql/my.cnf
/etc/mysql/mysql.conf.d/ 目录下的所有 .cnf 文件
/etc/mysql/conf.d/ 目录下的所有 .cnf 文件
用户主目录下的 ~/.my.cnf
当前工作目录下的 my.cnf



iot#123666 
5bb3720dbbea1a4e743a482bf8d108ba8004a65601533d63e1d90d3343082e48


Ubuntu20.04彻底删除mysql,并重装mysql
https://blog.csdn.net/fanrongwoaini/article/details/107518693


当你看到提示“Skipping password set for root as authentication with auth_socket is used by default.”时，这意味着 MySQL 默认为本地 root 用户启用了 auth_socket 认证机制。这意味着 root 用户在本地连接时不需要使用密码，而是通过 Unix socket 进行认证。

如果你希望为 root 用户启用密码认证，可以使用 ALTER USER 命令来修改用户的认证方式。以下是详细的步骤：

步骤 1: 登录 MySQL
首先，使用 root 用户无密码登录到 MySQL 命令行：

sh
深色版本
sudo mysql -u root
由于启用了 auth_socket，你不需要提供密码即可登录。

步骤 2: 修改 root 用户的认证方式
在 MySQL 命令行中，使用 ALTER USER 命令为 root 用户设置密码认证，并设置一个新的密码：

sql
深色版本
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password';
这里的 'your_new_password' 是你要设置的新密码。请确保选择一个强密码。

步骤 3: 刷新权限
修改后，刷新权限以应用更改：

sql
深色版本
FLUSH PRIVILEGES;
步骤 4: 验证更改
退出 MySQL 命令行，并尝试使用新密码重新登录，以验证更改是否有效：

sh
深色版本
mysql -u root -p
输入你刚刚设置的新密码，如果一切正常，你应该能够成功登录。