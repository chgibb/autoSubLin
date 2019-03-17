./node_modules/.bin/eslint src/*.ts
if [[ $? != 0 ]]; then
    exit 1
fi
./node_modules/.bin/eslint src/lib/*.ts
if [[ $? != 0 ]]; then
    exit 1
fi

./node_modules/.bin/tsc
if [[ $? != 0 ]]; then
    exit 1
fi
