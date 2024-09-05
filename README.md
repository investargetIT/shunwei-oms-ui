# 基本操作
1.构建镜像
```
./build.sh
```
2.运行容器
```
./run.sh
```
3.生成静态文件，静态文件会生成在 `/dist` 目录下
```
docker run shunwei-oms-ui npm run build
```
4.上传静态页面
```
scp -r dist/* root@ip地址:/目录
```
