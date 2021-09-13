prev=""
cnt=0
idx=0

while read line; do
  (( idx += 1 ))
  if [[ $line == FAIL* ]]; then
    (( cnt += 1))
  else
    if [[ $prev == FAIL* ]] && [ $cnt -ne 1 ]; then
      echo $cnt $prev
    fi
    cnt=0
  fi

  prev=$line
done < sorted.txt
