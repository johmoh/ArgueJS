@ECHO off

SET BASE_DIR=%~dp0
SET ROOT_DIR=%BASE_DIR%..

PUSHD %ROOT_DIR%\
SET arguejs2=argue2.min.js
CMD /C node_modules\.bin\uglifyjs "argue2.js" --stats --comments --mangle --compress unsafe=true,hoist_vars=true --wrap --define "ARGUEJS_EXPORT_INTERNALS=false" --output "argue2.min.js" --source-map "argue2.min.js.map"
CMD /C node_modules\.bin\uglifyjs "argue2.js" --stats --comments --mangle --compress unsafe=true,hoist_vars=true --wrap --define "ARGUEJS_EXPORT_INTERNALS=true"  --output "argue2.testable.min.js" --source-map "argue2.testable.min.js.map"
POPD
DIR "%ROOT_DIR%\argue2.*min.js*"
