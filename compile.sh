runner="./node_modules/.bin/babel"
in="test262/test"
out="compiled-test"

date +%"T"
$runner $in --out-dir $out
date +%"T"
