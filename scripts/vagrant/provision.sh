#!/bin/bash

apt-get install curl
curl -sL https://deb.nodesource.com/setup_5.x | bash -
apt-get install -y nodejs python build-essential

npm install node-inspector -g
npm install fuge -g
npm install gulp -g
npm install jshint -g

(grep -qF $'{\n\t"web-host": "0.0.0.0"\n}' \
  || echo $'{\n\t"web-host": "0.0.0.0"\n}' >> /etc/node-inspectorrc) || exit 1
