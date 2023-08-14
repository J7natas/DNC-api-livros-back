const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            require: 'e obrigatorio'
        },
        descricao: {
            type: String,
            require: 'E obrigatorio'
        },
        numero_paginas: {
            type: Number,
            require: 'e obrigatorio'
        },
        editora: {
            type:String,
            require: 'e obrigatorio'
        },
        ISBN: {
            type: Number,
            require: 'e obrigatorio'
        }
    },
    {
        timestamps: true
    }
);

const EsquemaLivro = mongoose.models.Livro || mongoose.model('Livro', esquema);
module.exports = EsquemaLivro;