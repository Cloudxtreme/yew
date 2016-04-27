# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "debian/jessie64"
  config.vm.synced_folder ".", "/vagrant", type: "virtualbox"

  config.vm.network "forwarded_port", guest: 15672, host: 15672

  starting_debug_port = 8080
  total_debug_ports = 10
  for i in 0..total_debug_ports
      config.vm.network "forwarded_port", guest: starting_debug_port + i,
        host: starting_debug_port + i
  end

  config.vm.provision "shell", path: "scripts/vagrant/provision.sh"
  config.vm.provision "docker" do |d|
    #d.run "mongo", args: "-p 27017:27017"
    #d.run "rabbitmq", image: "rabbitmq:management",
    #  args: "-p 5672:5672 -p 15672:15672"
  end
end
