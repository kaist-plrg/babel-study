f="node_modules/@babel/cli/lib/babel/dir.js"

sed "s/throw err;/console\.log(err); return FILE_TYPE\.IGNORED;/g" $f > __tmp__
mv __tmp__ $f
