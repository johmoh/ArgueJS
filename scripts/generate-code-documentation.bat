@ECHO off

SET BASE_DIR=%~dp0
SET ROOT_DIR=%BASE_DIR%..

%ROOT_DIR%\node_modules\.bin\yuidoc --quiet --extension ".js" --exclude "_SYNCAPP,.deprecated,.prototyping,.idea,.git,doc,logs,node_modules,nppBackup,spec" -o .\docs .\
