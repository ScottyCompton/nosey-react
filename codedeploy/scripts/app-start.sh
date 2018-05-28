#!/usr/bin/env bash

cd /var/www/releases/nosey.com

MODE=$(cat deploy-mode)

cd /home/nosey.com/nosey.com

npm cache clean #John (Mediatemple) suggested to prevent certain issues with packages
npm install

if [[ $MODE == "staging" ]]; then
  HOST=127.0.0.1 APIHOST=127.0.0.1 GEOBLOCK=false STAGING=true npm run build
	HOST=127.0.0.1 APIHOST=127.0.0.1 GEOBLOCK=false STAGING=true pm2 start npm -- start
else
  HOST=127.0.0.1 APIHOST=127.0.0.1 npm run build
	HOST=127.0.0.1 APIHOST=127.0.0.1 pm2 start npm -- start
fi

exit 0
