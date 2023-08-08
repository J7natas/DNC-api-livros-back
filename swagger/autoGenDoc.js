//const mongooseToSwagger = require('mongoose-to-swagger');
//const esquemaTarefa = require('../src/models/livros.js');
const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    lenguage: 'pt-BR'
});

const outputFile = './swagger_output.json';
const endpointsFile = ['../index.js', '../src/routes.js'];

let doc = {
    info: {
        version: "1.0.0",
        title: "API de livros",
        description: "Documentação da API de livros"
    },
    serves: [
        {
            ulr: "http://localhost:3000",
            descroption: "servidor localhost"
    },
    {
        url: "https://api-livros.vercel.app/",
        description: "Servidor de produção"
    }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
}

swaggerAutogen(outputFile, endpointsFile, doc).then(() => {
    console.log("Documetação do swagger gerada encontra-se no aquivo: " + outputFile);
    if(process.env.NODE_ENV !== 'production'){{
        require('../index.js');
    }}
})