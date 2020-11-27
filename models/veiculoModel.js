const mongoose = require('mongoose');

const {Schema} = mongoose;

const veiculoModel = new Schema({
    veiculo: {type:String},
    marca:  {type:String},
    ano:  {type:Number},
    descricao:  {type:String},
    vendido:  {type:Boolean, default: false},
    created: {type:String},
    updated: {type:String}
});

module.exports = mongoose.model('Veiculo', veiculoModel);