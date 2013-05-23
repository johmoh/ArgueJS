@ECHO off

SET BASE_DIR=%~dp0
SET ROOT_DIR=%BASE_DIR%..

%ROOT_DIR%\node_modules\.bin\karma start %ROOT_DIR%\config\karma-argue.conf.js
