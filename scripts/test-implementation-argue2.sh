#!/bin/bash

BASE_DIR=`dirname $0`
ROOT_DIR=$BASE_DIR/..

$ROOT_DIR/node_modules/.bin/karma start config/karma-argue2.conf.js
