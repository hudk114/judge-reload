const express = require('express');
const path = require('path');
const fs = require('fs');
const opn = require('opn');
const { example } = require('../config');

const app = express();

fs.copyFileSync(
  path.resolve(__dirname, `../dist/${example.libName}`),
  path.resolve(__dirname, `./public/js/${example.libName}`)
);

app.use(express.static(path.resolve(__dirname, './public')));

app.get('/', (req, res) => {
  console.log('123')
  res.redirect('/index.html');
});

app.listen(18040, _ => {
  console.log('listen to localhost:18040');
  opn('http://localhost:18040');
});
