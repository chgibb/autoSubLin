./node_modules/.bin/eslint src/*.ts --fix
if [[ $? != 0 ]]; then
    exit 1
fi
./node_modules/.bin/eslint src/lib/*.ts --fix
if [[ $? != 0 ]]; then
    exit 1
fi