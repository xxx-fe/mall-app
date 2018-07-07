#!/bin/bash

#export PATH=/usr/local/bin:/bin:/usr/bin
#export NODE_PATH=/usr/local/lib/node_modules

pm2 start ecosystem.json --env production
