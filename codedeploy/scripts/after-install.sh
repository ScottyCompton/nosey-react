#!/usr/bin/env bash

cd /var/www/releases/nosey.com

HASH=$(cat commit)
GIT_URL=$(cat git-remote)
CLONE_PATH=/tmp/nosey.com

rm -rf $CLONE_PATH || true

/usr/bin/git clone $GIT_URL $CLONE_PATH

cd $CLONE_PATH

/usr/bin/git checkout $HASH

/usr/bin/rsync -va --exclude='.git' $CLONE_PATH/ /home/nosey.com/nosey.com/


chown -R nosey.com:nosey.com /var/www/html/nosey.com
chown -R nosey.com:nosey.com /var/www/html/nosey.com/*
chmod -R 0755 /var/www/html/nosey.com


exit 0
