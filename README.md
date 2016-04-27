# Yew
A next generation MUD server built with Node, Mongo, Rabbit, Docker and Vagrant.

## Development

### Windows

1. Download [Vagrant](https://www.vagrantup.com/) >= 1.8
2. Install Vagrant, making sure it's tools get added to your PATH
3. At a command prompt, type ``vagrant plugin install vagrant-vbguest``
4. At the root of the yew project, type ``vagrant up``. **The first time you do this will take some time.**
5. When you are ready to run the server type ``vagrant ssh``. Once you are in the VM enter ``cd /vagrant``
6. Navigate to the directory where you have cloned the yew repository
7. Start the development shell, at the root of the project, enter ``fuge ./fuge/compose-dev.yml``. This will bring up several infrastructure containers, including Mongo and RabbitMQ
8. At the Fuge shell type ``start all`` to bring up all the servers. The server should initialze and be ready for login.

### Linux

1. Install Node.js >= 5.0. You may need to follow the instructures [here](https://github.com/nodesource/distributions)
2. Install Docker >= 1.10. See Dockers instructions [here](https://docs.docker.com/engine/installation/)
3. Enter the following command ``npm install node-inspector fuge gulp jshint -g``
4. Navigate to the directory where you have cloned the yew repository
5. Start the development shell, at the root of the project, enter ``fuge ./fuge/compose-dev.yml``. This will bring up several infrastructure containers, including Mongo and RabbitMQ
6. At the Fuge shell type ``start all`` to bring up all the servers. The server should initialze and be ready for login.

### OS X

Coming soon.
