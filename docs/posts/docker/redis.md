docker pull redis:7.4.0

# windows
docker run --restart=always  --name redis -p 6379:6379 -d redis:7.4.0

# linux
docker run --restart=always -p 6379:6379 --name redis \
-v /iot/redis/data:/data \
-v /iot/redis/conf/redis.conf:/etc/redis/redis.conf \
-d redis redis-server /etc/redis/redis.conf --appendonly yes
