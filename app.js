const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost:27017/tinnova');
const port = process.env.port || 3033;
const Veiculo = require('./models/veiculoModel');
const veiculoRouter = require('./routes/veiculoRouter')(Veiculo);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/', veiculoRouter);

app.get('/', (request, response) => {
  response.send('api-veiculos funcionando');
});

app.listen(port, () => {
  console.log('-----------------------------------');
  console.log(`REST service listening on port ${port}`);
});