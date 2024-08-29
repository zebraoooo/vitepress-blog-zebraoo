docker run -p 9000:9000 \
-p 9090:9090 \
--name minio \
-d --restart=always \
-e "MINIO_ROOT_USER=minioadmin" \
-e "MINIO_ROOT_PASSWORD=minioadmin" \
-v /iot/minio/data:/data \
-v /iot/minio/config:/root/.minio \
minio/minio server \
 /data --console-address ":9090" --address ":9000"


 https://www.cnblogs.com/Chary/articles/18271409

 http://*****/:9090

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
