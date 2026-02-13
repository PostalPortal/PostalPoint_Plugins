#!/bin/bash

./build.sh
mkdocs build

rsync -rv site/ webhost.netsyms.net:/var/www/dev.postalpoint.app/web
