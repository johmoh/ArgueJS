@ECHO off

SET BASE_DIR=%~dp0
SET ROOT_DIR=%BASE_DIR%..

PUSHD %ROOT_DIR%\
CMD /C node_modules\.bin\uglifyjs "argue.js" --stats --comments --mangle --compress unsafe=true,hoist_vars=true --define "ARGUEJS_EXPORT_INTERNALS=false" --output "argue.min.js"
CMD /C node_modules\.bin\uglifyjs "argue.js" --stats --comments --mangle --compress unsafe=true,hoist_vars=true --define "ARGUEJS_EXPORT_INTERNALS=true"  --output "spec/argue.testable.min.js"
POPD
DIR "%ROOT_DIR%\argue.*js*"
