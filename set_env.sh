#!/bin/sh
export HAPIPORT=8080
export HAPIHOST="127.0.0.1"
#export HAPIKEY=''
#export HAPICERT=''

export PGPORT=5432
export PGHOST="pgapi.postgres.database.azure.com"
export PGUSER="ztl@pgapi"
export PGPASSWORD="ztl2019"
export PGDATABASE="api"
export PGSSLMODE="prefer"

export DATABUSHOST="ztl-mqtt.westeurope.azurecontainer.io"
export DATABUSPORT=1883
export DATABUSUSER="ztl"
export DATABUSPASSWORD="Ztl2019!"
#export DATABUSSSLKEY = 
#export DATABUSSSLCERT = 
#export DATABUSSSLREJECTUNAUTHORIZED =  
#export DATABUSSSLCA =  
export DATABUSPROTOCOL="mqtt"

export PLUGINLIGHT="1"

export LGAUTHLEVEL="debug"
export LGDBLEVEL="debug"
export LGROUTESLEVEL="debug"
export LGAPPLEVEL="debug"
export LGDATABUSLEVEL="debug"
export LGDPLUGINSLEVEL="debug"
