const mongoose = require('mongoose');
const tratarErrosInesperados = require('../function/tratrarErrosInesperados');

async function conectBancodeDados(req = null, res = null, next = null){
    try {
        await mongoose.connect(process.env.MONGOBD_URI, {  useNewUrlParser: true, useUnifiedTopology: true } )
        console.log('Conectado ao banco de dados')
        try { next(); } catch { };
        return mongoose
    } catch (error) {
        console.error(error);
        tratarErrosInesperados(res, 'Error: Erro ao conectar banco de dados')
        return error;
    }
}

module.exports = conectBancodeDados;