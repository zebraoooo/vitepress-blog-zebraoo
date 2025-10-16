[docker pull apache/rocketmq:5.3.2](https://rocketmq.apache.org/zh/docs/quickStart/02quickstartWithDocker)

1.拉取RocketMQ镜像
这里以dockerhub上 RocketMQ 5.3.2 版本的镜像为例，介绍部署过程。

docker pull apache/rocketmq:5.3.2

2.创建容器共享网络
RocketMQ 中有多个服务，需要创建多个容器，创建 docker 网络便于容器间相互通信。
创建一个名为 rocketmq 的自定义 Docker 网络
docker network create rocketmq

3.启动NameServer
# 启动 NameServer
docker run -d --name rmqnamesrv -p 9876:9876 --network rocketmq apache/rocketmq:5.3.2 sh mqnamesrv

# 验证 NameServer 是否启动成功
docker logs -f rmqnamesrv

信息
我们可以看到 'The Name Server boot success..'， 表示NameServer 已成功启动。

4.启动 Broker+Proxy
NameServer 成功启动后，我们启动 Broker 和 Proxy。

# 配置 Broker 的 IP 地址
此处ip为宿主机ip，不是docker的ip
echo "brokerIP1=127.0.0.1" > broker.conf

# 启动 Broker 和 Proxy
docker run -d ^
--name rmqbroker ^
--net rocketmq ^
-p 10912:10912 -p 10911:10911 -p 10909:10909 ^
-p 8080:8080 -p 8081:8081 \
-e "NAMESRV_ADDR=rmqnamesrv:9876" ^
# 在PowerShell中请将 %cd% 替换为 $pwd
-v %cd%\broker.conf:/home/rocketmq/rocketmq-5.3.2/conf/broker.conf ^
apache/rocketmq:5.3.2 sh mqbroker --enable-proxy \
-c /home/rocketmq/rocketmq-5.3.2/conf/broker.conf

# 验证 Broker 是否启动成功
docker exec -it rmqbroker bash -c "tail -n 10 /home/rocketmq/logs/rocketmqlogs/proxy.log"


docker run -d --name rmqbroker --net rocketmq -p 10912:10912 -p 10911:10911 -p 10909:10909 -p 8080:8080 -p 8081:8081 -e "NAMESRV_ADDR=rmqnamesrv:9876" -v D:/Software/Rocketmq/conf/broker.conf:/home/rocketmq/rocketmq-5.3.2/conf/broker.conf apache/rocketmq:5.3.2 sh mqbroker --enable-proxy -c /home/rocketmq/rocketmq-5.3.2/conf/broker.conf


启动之前，你需要在 D:/other/tmp/conf 目录下创建 broker.conf 文件，若没有文件路径则自己创建一下

brokerClusterName = DefaultCluster
brokerName = broker-a
brokerId = 0
deleteWhen = 04
fileReservedTime = 48
brokerRole = ASYNC_MASTER
flushDiskType = ASYNC_FLUSH
brokerIP1 = 10.11.12.189//本机的ip地址


装docker，拉取 rocketmq-dashboard 镜像

docker pull apacherocketmq/rocketmq-dashboard:latest

② docker 容器中运行 rocketmq-dashboard

docker run -d --name rocketmq-dashboard -e "JAVA_OPTS=-Drocketmq.namesrv.addr=127.0.0.1:9876" -p 8080:8080 -t apacherocketmq/rocketmq-dashboard:latest



服务器 双主

部署目标（单机模拟双主机）
1 个 NameServer（端口 9876）
2 个 Broker（Broker-a 主，Broker-b 从，组成 Master-Slave）
Broker-a：10911（服务端口）、10909（HA端口）
Broker-b：10921（服务端口）、10919（HA端口）

mkdir -p /etc/rocketmq/{namesrv,master,slave}/{store,logs}

broker-master.conf

# 集群名称
brokerClusterName = DefaultCluster
# Broker 名称，主从必须相同
brokerName = broker-a
# Broker ID，0 表示 Master
brokerId = 0
# 删除时间
deleteWhen = 04
# 文件保留时间
fileReservedTime = 48
# 角色：异步主节点
brokerRole = ASYNC_MASTER
# 刷盘方式：异步刷盘
flushDiskType = ASYNC_FLUSH
# NameServer 地址
namesrvAddr = 172.16.177.60:9876
# 存储路径
storePathRootDir = /home/rocketmq/store
# 监听端口
listenPort = 10911
# 自动创建主题
autoCreateTopicEnable = true

broker-slave.conf

brokerClusterName = DefaultCluster
# 与主节点相同
brokerName = broker-a  
 # >0 表示 Slave
brokerId = 1          
deleteWhen = 04
fileReservedTime = 48
  # 角色：从节点
brokerRole = SLAVE   
flushDiskType = ASYNC_FLUSH
namesrvAddr = 172.16.177.60:9876
storePathRootDir = /home/rocketmq/store
 # 使用不同端口
listenPort = 10912    
autoCreateTopicEnable = true


部署 NameServer

docker run -d --name rmqnameserver \
  -p 9876:9876 \
  -v /etc/rocketmq/nameserver/logs:/home/rocketmq/logs \
  -v /etc/rocketmq/nameserver/store:/home/rocketmq/store \
  apache/rocketmq:5.3.3 \
  sh mqnamesrv

启动 Broker Master

docker run -d --name rmqbroker-master \
  -p 10911:10911 \
  -p 10909:10909 \
  -v /etc/rocketmq/broker-master/logs:/home/rocketmq/logs \
  -v /etc/rocketmq/broker-master/store:/home/rocketmq/store \
  -v /etc/rocketmq/broker-master.conf:/home/rocketmq/rocketmq-5.3.3/conf/broker.conf \
  --link rmqnameserver:nameserver \
    --restart=always \
  apache/rocketmq:5.3.3 \
  sh mqbroker -c /home/rocketmq/rocketmq-5.3.3/conf/broker.conf

启动 Broker-B

  docker run -d --name rmqbroker-slave \
  -p 10912:10912 \
  -p 10910:10910 \
  -v /etc/rocketmq/broker-slave/logs:/home/rocketmq/logs \
  -v /etc/rocketmq/broker-slave/store:/home/rocketmq/store \
  -v /etc/rocketmq/broker-slave.conf:/home/rocketmq/rocketmq-5.3.3/conf/broker.conf \
  --link rmqnameserver:nameserver \
    --restart=always \
  apache/rocketmq:5.3.3 \
  sh mqbroker -c /home/rocketmq/rocketmq-5.3.3/conf/broker.conf

查找你的内网 IP：
ip a
# 或
hostname -I

# 777 文件所属者、文件所属组和其他人有读取 & 写入 & 执行全部权限。rwxrwxrwx
chmod 777 -R /apps/rocketmq/nameserver/*

启动 Broker Master（加入网络 + 使用容器名通信）
docker run -d \
  --name rmq-broker-a-m \
  --restart=unless-stopped \
  --network rocketmq-net \
  -p 10911:10911 \
  -p 10912:10912 \
  -p 10909:10909 \
  -v /etc/rocketmq/master/store:/home/rocketmq/store \
  -v /etc/rocketmq/master/logs:/home/rocketmq/logs \
  -v /etc/rocketmq/broker-master.conf:/home/rocketmq/rocketmq-5.3.3/conf/broker.conf \
  -e "NAMESRV_ADDR=rmq-namesrv:9876" \
  apache/rocketmq:5.3.3 \
  sh mqbroker \
  -c /home/rocketmq/rocketmq-5.3.3/conf/broker.conf

启动 Broker Slave

docker run -d \
  --name rmq-broker-a-s \
  --restart=unless-stopped \
  --network rocketmq-net \
  -p 10912:10912 \
  -v /etc/rocketmq/slave/store:/home/rocketmq/store \
  -v /etc/rocketmq/slave/logs:/home/rocketmq/logs \
  -v /etc/rocketmq/broker-slave.conf:/home/rocketmq/rocketmq-5.3.3/conf/broker.conf \
  -e "NAMESRV_ADDR=rmq-namesrv:9876" \
  apache/rocketmq:5.3.3 \
  sh mqbroker \
  -c /home/rocketmq/rocketmq-5.3.3/conf/broker.conf