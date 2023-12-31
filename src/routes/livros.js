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

    const livroAtualizado = await EsquemaLivro.updateOne( {_id: idLivro }, {  titulo, descricao, numero_paginas, editora, ISBN } );
    if(livroAtualizado?.modifiedCount > 0) {
      const dadosLivro = await EsquemaLivro.findOne({ _id: idLivro });

      res.status(200).json({
        status: 'ok',
        statusMensaagem: "Livro atualzada com suceso!",
        resposta: dadosLivro
      })
  
    }
    
  } catch (error) {
    return tratarErrosInesperados(res, error)
  }
});

router.get('/obter', conectBancodeDados, async function(req, res) {
  try {
    // #swagger.tags = ['Livro']
    const respostaBD = await EsquemaLivro.find();

    res.status(200).json({
      status: 'ok',
      statusMensaagem: "Livros listados com sucesso",
      resposta: respostaBD
    });
    

  } catch (error) {
    return tratarErrosInesperados(res, error)
  }
});

router.get('/obter/:id', conectBancodeDados, async function(req, res) {
  try {
    // #swagger.tags = ['Livro']
    let idLivro = req.params.id;
    let {titulo, descricao, numero_paginas, editora, ISBN } = req.body;

    const checkLivro = await EsquemaLivro.findOne({ _id: idLivro });
    if(!checkLivro){
      throw new Error("Livro não encontrado");
    }

    const livroEncontrado = await EsquemaLivro.findOne( {_id: idLivro } );
      res.status(200).json({
        status: 'ok',
        statusMensaagem: "Livro obtido com suceso!",
        resposta: livroEncontrado
      })
    
  } catch (error) {
    return tratarErrosInesperados(res, error)
  }
});

router.delete('/deletar/:id', conectBancodeDados, async function(req, res) {
  try {
    // #swagger.tags = ['Livro']
    let idLivro = req.params.id;
    let {titulo, descricao, numero_paginas, editora, ISBN } = req.body;

    const checkLivro = await EsquemaLivro.findOne({ _id: idLivro });
    if(!checkLivro){
      throw new Error("Livro não encontrado");
    }

    const livroDeletado = await EsquemaLivro.deleteOne( {_id: idLivro } );
      res.status(200).json({
        status: 'ok',
        statusMensaagem: "Livro com suceso!",
        resposta: livroDeletado
      })
    
  } catch (error) {
    return tratarErrosInesperados(res, error)
  }
});

module.exports = router;
