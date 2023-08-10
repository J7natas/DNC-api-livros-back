const mongoose = require('mongoose');
const tratarErrosInesperados = require('../function/tratrarErrosInesperados');

async function conectBancodeDados(req = null, res = null, nex = null){
    try{
        await mongoose.connect(process.env.MONGOBD_URI, { useNewUrlParser: true, useUnifiedTopoLogy: true })
        console.log('Conectado ao banco de dados')
        try { next(); } catch { };
        return mongoose
    }catch (error) {
        console.error(error);
        tratarErrosInesperados(res, 'Error: Erro ao conectar banco de dados')
        return error;
    }
}

module.exports = conectBancodeDados;