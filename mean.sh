#!/usr/bin/env bash

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y nodejs
apt-get install -y npm
apt-get install -y mongodb-org
sudo sed -i 's/bind_ip/#bind_ip/g' /etc/mongod.conf
sudo service mongod restart
