#! /bin/bash

basePath=/01factory/01dao
docker load --input ${basePath}/01factory-web.tar
# docker load --input ${basePath}/01factory-db.tar
# docker load --input ${basePath}/01factory-doccode.tar
# docker load --input ${basePath}/01factory-nginx.tar
docker-compose -f ${basePath}/docker-compose.yml up -d

# docker load --input 01factory-web.tar
# docker load --input 01factory-db.tar
# docker load --input 01factory-nginx.tar
