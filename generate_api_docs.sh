#!/bin/bash

rm -r docs/Plugin\ API
mkdir docs/Plugin\ API

PLUGINAPISRC="$HOME/Documents/Projects/Sources/PostalPoint_Retail/src/js/pluginapi/*.js"
node jsdoc2md.js "$PLUGINAPISRC"
