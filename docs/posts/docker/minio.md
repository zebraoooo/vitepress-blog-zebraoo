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