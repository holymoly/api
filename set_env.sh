#!/bin/sh
export HAPIPORT=8080
export HAPIHOST=127.0.0.1
#export HAPIKEY=''
#export HAPICERT=''

export PGPORT=5432
export PGHOST=10.10.10.30
export PGUSER="pguser"
export PGPASSWORD="pgpass"
export PGDATABASE="items"

export DATABUSHOST=10.10.10.10
export DATABUSPORT=1883
export DATABUSUSER="guest"
export DATABUSPASSWORD="guest"
#export DATABUSSSLKEY = 
#export DATABUSSSLCERT = 
#export DATABUSSSLREJECTUNAUTHORIZED =  
#export DATABUSSSLCA =  
export DATABUSPROTOCOL="mqtt"

export LGAUTHLEVEL="debug"
export LGDBLEVEL="debug"
export LGROUTESLEVEL="debug"
export LGAPPLEVEL="debug"
export LGDATABUSLEVEL="debug"