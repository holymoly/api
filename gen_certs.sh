#!/bin/sh

#!/bin/bash

mkdir /var/db/mysql/ssl

#Generate ca rsa key
openssl genrsa 2048 > /var/db/mysql/ssl/ca-key.pem

#Generate ca cert
openssl req -new -x509 -nodes -days 365000 -key /var/db/mysql/ssl/ca-key.pem -out /var/db/mysql/ssl/ca-cert.pem

#Generate server rsa key
openssl req -newkey rsa:2048 -days 365000 -nodes -keyout /var/db/mysql/ssl/server-key.pem -out /var/db/mysql/ssl/server-req.pem

#Export the server RSA Public Key to a File
openssl rsa -in /var/db/mysql/ssl/server-key.pem -out /var/db/mysql/ssl/server-key.pem

#Sign server certificate
openssl x509 -req -in /var/db/mysql/ssl/server-req.pem -days 365000 -CA /var/db/mysql/ssl/ca-cert.pem -CAkey /var/db/mysql/ssl/ca-key.pem -set_serial 01 -out /var/db/mysql/ssl/server-cert.pem

#Generate client rsa key
openssl req -newkey rsa:2048 -days 365000 -nodes -keyout /var/db/mysql/ssl/client-key.pem -out /var/db/mysql/ssl/client-req.pem

#Export the client RSA Public Key to a File
openssl rsa -in /var/db/mysql/ssl/client-key.pem -out /var/db/mysql/ssl/client-key.pem

#Sign client certificate
openssl x509 -req -in /var/db/mysql/ssl/client-req.pem -days 365000 -CA /var/db/mysql/ssl/ca-cert.pem -CAkey /var/db/mysql/ssl/ca-key.pem -set_serial 01 -out /var/db/mysql/ssl/client-cert.pem

#Generate mariadb rsa key
openssl req -newkey rsa:2048 -days 365000 -nodes -keyout /var/db/mysql/ssl/mariadb-key.pem -out /var/db/mysql/ssl/mariadb-req.pem

#Export the mariadb RSA Public Key to a File
openssl rsa -in /var/db/mysql/ssl/mariadb-key.pem -out /var/db/mysql/ssl/mariadb-key.pem

#Sign mariadb certificate
openssl x509 -req -in /var/db/mysql/ssl/client-req.pem -days 365000 -CA /var/db/mysql/ssl/ca-cert.pem -CAkey /var/db/mysql/ssl/ca-key.pem -set_serial 01 -out /var/db/mysql/ssl/mariadb-cert.pem

#Verify certificates
openssl verify -CAfile /var/db/mysql/ssl/ca-cert.pem /var/db/mysql/ssl/server-cert.pem /var/db/mysql/ssl/client-cert.pem /var/db/mysql/ssl/mariadb-cert.pem
