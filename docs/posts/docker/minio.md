
docker pull minio/minio:RELEASE.2025-04-22T22-12-26Z

docker run -p 9000:9000 \
-p 9090:9090 \
--name minio \
-d --restart=always \
-e "MINIO_ROOT_USER=minioadmin" \
-e "MINIO_ROOT_PASSWORD=minioadmin" \
minio/minio server \
 /data --console-address ":9090" --address ":9000"


 docker run -d --name minio -p 9000:9000 -p 9001:9001 --restart=always -e "MINIO_ROOT_USER=minioadmin" -e "MINIO_ROOT_PASSWORD=minioadmin"  minio/minio server /data --console-address ":9001"

docker run -p 9000:9000 -p 9001:9001 -e "MINIO_ACCESS_KEY=admin" -e "MINIO_SECRET_KEY=password" minio/minio server /data --console-address ":9001" # /Users/yunai/minio 存储目录；--console-address 是 UI 界面的端口


docker run -d \
  --name minio \
  --restart=always \
  -p 9000:9000 \
  -p 9090:9090 \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin" \
  -v /iot/minio/data:/data \
  -v /iot/minio/config:/root/.minio \
  minio/minio \
  server /data --console-address ":9000" --address ":9090"

 https://www.cnblogs.com/Chary/articles/18271409

 http://*****/:9090


 Web 控制台（UI）：
http://localhost:9090
登录账号：minioadmin / minioadmin
S3 API 地址：
http://localhost:9000
可用于 SDK、mc 客户端等连接

 配置key
minio
访问站点
43.138.9.96:9000
自定义域名
请输入自定义域名
accessKey
ruoyi
secretKey
••••••••
桶名称
ruoyi
前缀
请输入前缀
是否HTTPS
桶权限类型
域
请输入域
备注
