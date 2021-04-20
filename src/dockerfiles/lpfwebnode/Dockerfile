FROM centos:7
RUN yum install wget -y \
    && rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm \ 
    && yum install nginx -y \
    && cd ~ \
    && mkdir node \
    && cd node \
    && wget https://nodejs.org/dist/v14.16.0/node-v14.16.0-linux-x64.tar.xz \
    && tar xf node-v14.16.0-linux-x64.tar.xz \
    && ln -s /root/node/node-v14.16.0-linux-x64/bin/npm   /usr/local/bin/ \
    && ln -s /root/node/node-v14.16.0-linux-x64/bin/node   /usr/local/bin/