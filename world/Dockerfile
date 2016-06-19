FROM node

ADD ./package.json /app
ADD . /app
ADD ../common /common

WORKDIR /common
RUN npm install

WORKDIR /app
RUN npm install
CMD node index.js
