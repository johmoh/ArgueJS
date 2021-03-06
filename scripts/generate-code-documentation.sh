#!/bin/bash

BASE_DIR=`dirname $0`
ROOT_DIR=$BASE_DIR/..

$ROOT_DIR/node_modules/bin/yuidoc --quiet --extension ".js" --exclude "_SYNCAPP,.deprecated,.prototyping,.idea,.git,.sonar,doc,logs,node_modules,nppBackup,spec" -o ./docs ./
