set -e

for f in `find test/e2e/*.js`; do
  echo $f
  
  name=`basename $f .js`
  if [[ $name == "preview" ]]; then
    continue
  fi

  esmeta view-minify $f | tail -n+19 | tee result/$name.result
done
