@ECHO off

SET BASE_DIR=%~dp0
SET ROOT_DIR=%BASE_DIR%..

PUSHD %ROOT_DIR%\
CMD /C node_modules\.bin\uglifyjs "argue2.js" --stats --comments --mangle --compress unsafe=true,hoist_vars=true --define "ARGUEJS_PRODUCTION_READY=false,ARGUEJS_EXPORT_INTERNALS=false" --output "argue2.min.js"
CMD /C node_modules\.bin\uglifyjs "argue2.js" --stats --comments --mangle --compress unsafe=true,hoist_vars=true --define "ARGUEJS_PRODUCTION_READY=false,ARGUEJS_EXPORT_INTERNALS=true"  --output "spec/argue2.testable.min.js"
CMD /C node_modules\.bin\uglifyjs "argue2.js" --stats --comments --mangle --compress unsafe=true,hoist_vars=true --define "ARGUEJS_PRODUCTION_READY=true,ARGUEJS_EXPORT_INTERNALS=false"  --output "argue2.production.min.js"
CMD /C node_modules\.bin\uglifyjs "argue2.js" --stats --comments --mangle --compress unsafe=true,hoist_vars=true --define "ARGUEJS_PRODUCTION_READY=true,ARGUEJS_EXPORT_INTERNALS=true"   --output "spec/argue2.testable.production.min.js"
POPD
DIR "%ROOT_DIR%\argue2.*js*"
