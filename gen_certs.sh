#!/bin/sh

#!/bin/bash

###############################################################################
echo "Create CA cert"
#Generate ca rsa key
openssl genrsa 2048 > ./config/certs/ca-key.pem

#Generate ca cert
openssl req -new -x509 -nodes -days 365000 -key ./config/certs/ca-key.pem -out ./config/certs/ca-cert.pem

###############################################################################
echo "Create Server cert"
#Generate server rsa key
openssl req -newkey rsa:2048 -days 365000 -nodes -keyout ./config/certs/server-key.pem -out ./config/certs/server-req.pem

#Export the server RSA Public Key to a File
openssl rsa -in ./config/certs/server-key.pem -out ./config/certs/server-key.pem

#Sign server certificate
openssl x509 -req -in ./config/certs/server-req.pem -days 365000 -CA ./config/certs/ca-cert.pem -CAkey ./config/certs/ca-key.pem -set_serial 01 -out ./config/certs/server-cert.pem

###############################################################################
echo "Create Client cert"
#Generate client rsa key
openssl req -newkey rsa:2048 -days 365000 -nodes -keyout ./config/certs/client-key.pem -out ./config/certs/client-req.pem

#Export the client RSA Public Key to a File
openssl rsa -in ./config/certs/client-key.pem -out ./config/certs/client-key.pem

#Sign client certificate
openssl x509 -req -in ./config/certs/client-req.pem -days 365000 -CA ./config/certs/ca-cert.pem -CAkey ./config/certs/ca-key.pem -set_serial 01 -out ./config/certs/client-cert.pem

###############################################################################
echo "Create Mariadb cert"
#Generate mariadb rsa key
openssl req -newkey rsa:2048 -days 365000 -nodes -keyout ./config/certs/mariadb-key.pem -out ./config/certs/mariadb-req.pem

#Export the mariadb RSA Public Key to a File
openssl rsa -in ./config/certs/mariadb-key.pem -out ./config/certs/mariadb-key.pem

#Sign mariadb certificate
openssl x509 -req -in ./config/certs/mariadb-req.pem -days 365000 -CA ./config/certs/ca-cert.pem -CAkey ./config/certs/ca-key.pem -set_serial 01 -out ./config/certs/mariadb-cert.pem

###############################################################################
echo "Create Rabbitmq cert"
#Generate rabbitmq rsa key
openssl req -newkey rsa:2048 -days 365000 -nodes -keyout ./config/certs/rabbitmq-key.pem -out ./config/certs/rabbitmq-req.pem

#Export the rabbitmq RSA Public Key to a File
openssl rsa -in ./config/certs/rabbitmq-key.pem -out ./config/certs/rabbitmq-key.pem

#Sign rabbitmq certificate
openssl x509 -req -in ./config/certs/rabbitmq-req.pem -days 365000 -CA ./config/certs/ca-cert.pem -CAkey ./config/certs/ca-key.pem -set_serial 01 -out ./config/certs/rabbitmq-cert.pem

###############################################################################
echo "Verify all certs"
#Verify certificates
openssl verify -CAfile ./config/certs/ca-cert.pem ./config/certs/server-cert.pem ./config/certs/client-cert.pem ./config/certs/mariadb-cert.pem ./config/certs/rabbitmq-cert.pem
