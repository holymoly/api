#!/bin/sh

#!/bin/bash

#mkdir /var/db/mysql/ssl

#Generate ca rsa key
openssl genrsa 2048 > /etc/mysql/ca-key.pem

#Generate ca cert
openssl req -new -x509 -nodes -days 365000 -key /etc/mysql/ca-key.pem -out /etc/mysql/ca-cert.pem

#Generate server rsa key
openssl req -newkey rsa:2048 -days 365000 -nodes -keyout /etc/mysql/server-key.pem -out /etc/mysql/server-req.pem

#Export the server RSA Public Key to a File
openssl rsa -in /etc/mysql/server-key.pem -out /etc/mysql/server-key.pem

#Sign server certificate
openssl x509 -req -in /etc/mysql/server-req.pem -days 365000 -CA /etc/mysql/ca-cert.pem -CAkey /etc/mysql/ca-key.pem -set_serial 01 -out /etc/mysql/server-cert.pem

#Generate client rsa key
openssl req -newkey rsa:2048 -days 365000 -nodes -keyout /etc/mysql/client-key.pem -out /etc/mysql/client-req.pem

#Export the client RSA Public Key to a File
openssl rsa -in /etc/mysql/client-key.pem -out /etc/mysql/client-key.pem

#Sign client certificate
openssl x509 -req -in /etc/mysql/client-req.pem -days 365000 -CA /etc/mysql/ca-cert.pem -CAkey /etc/mysql/ca-key.pem -set_serial 01 -out /etc/mysql/client-cert.pem

#Generate mariadb rsa key
openssl req -newkey rsa:2048 -days 365000 -nodes -keyout /etc/mysql/mariadb-key.pem -out /etc/mysql/mariadb-req.pem

#Export the mariadb RSA Public Key to a File
openssl rsa -in /etc/mysql/mariadb-key.pem -out /etc/mysql/mariadb-key.pem

#Sign mariadb certificate
openssl x509 -req -in /etc/mysql/client-req.pem -days 365000 -CA /etc/mysql/ca-cert.pem -CAkey /etc/mysql/ca-key.pem -set_serial 01 -out /etc/mysql/mariadb-cert.pem

#Verify certificates
openssl verify -CAfile /etc/mysql/ca-cert.pem /etc/mysql/server-cert.pem /etc/mysql/client-cert.pem /etc/mysql/mariadb-cert.pem
