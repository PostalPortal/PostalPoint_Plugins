#!/bin/bash

echo "Switching to public branch, force-syncing with upstream, publishing version $1, and pushing to upstream"
git checkout public
git reset --hard origin/public
git pull
git checkout master
mike deploy $1
git checkout public
git push
git checkout master
