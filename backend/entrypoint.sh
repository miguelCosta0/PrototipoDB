#!/bin/bash
./wait-for-it.sh -h postgres -t 60 -p 5432 -s -- echo "O postgress esta conectavel!"
node app.js