runner="./test262-harness/bin/run.js"
tests="script/**/*.js"

date +%"T"
$runner "$tests" --test262Dir test262 -t 8
date +%"T"
