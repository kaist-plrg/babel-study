runner="./node_modules/.bin/babel"
in="test262/test"
out="compiled-test"

rm -r $out

date +%"T"
$runner $in --out-dir $out
date +%"T"
