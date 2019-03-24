./node_modules/.bin/eslint $(find src -name *.ts)
if [[ $? != 0 ]]; then
    exit 1
fi

./node_modules/.bin/tsc
if [[ $? != 0 ]]; then
    exit 1
fi

node scripts/rollup src/index.js tmp.js
./node_modules/.bin/browserify tmp.js --node -o dist.js
rm tmp.js