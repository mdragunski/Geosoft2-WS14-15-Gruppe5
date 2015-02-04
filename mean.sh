#!/usr/bin/env bash
#install nodejs
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs
#install and start mongodb
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo apt-get install gcc make build-essential
npm install -g node-gyp
npm install -g bower
npm install -g grunt-cli
cd /vagrant
npm install
sudo sed -i 's/bind_ip/#bind_ip/g' /etc/mongod.conf
sudo service mongod restart
