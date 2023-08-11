const express = require('express');
const conectBancodeDados = require('../midllewares/conectarBD');
const tratarErrosInesperados = require('../function/tratrarErrosInesperados');
const EsquemaLivro = require('../models/livro');
const router = express.Router();

router.post('/adicionar', conectBancodeDados, async function(req, res) {
    try {
      // #swagger.tags = ['Livro']
      let {titulo, descricao, numero_paginas, editora, ISBN } = req.body;
      const respostaBD = await EsquemaLivro.create({ titulo, descricao, numero_paginas, editora, ISBN });

      res.status(200).json({
        status: 'ok',
        statusMensaagem: "Livro adicionado!",
        resposta: respostaBD
      })

    } catch (error) {
      return tratarErrosInesperados(res, error)
    }
});

router.put('/editar/:id', conectBancodeDados, async function(req, res) {
  try {
    // #swagger.tags = ['Livro']
    let idLivro = req.params.id;
    let {titulo, descricao, numero_paginas, editora, ISBN } = req.body;

    const checkLivro = await EsquemaLivro.findOne({ _id: idLivro });
    if(!checkLivro){
      throw new Error("Livro não encontrado");
    }

    const respostaBD = await EsquemaLivro.updateOne( {_id: idLivro }, {  titulo, descricao, numero_paginas, editora, ISBN } );

    res.status(200).json({
      status: 'ok',
      statusMensaagem: "Livro atualzada com suceso!",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosInesperados(res, error)
  }
});


module.exports = router;
