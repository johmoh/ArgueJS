@ECHO off

SET BASE_DIR=%~dp0
SET ROOT_DIR=%BASE_DIR%..

CMD /C %BASE_DIR%\build-minimized-version-argue1.bat
CMD /C %BASE_DIR%\build-minimized-version-argue2.bat
