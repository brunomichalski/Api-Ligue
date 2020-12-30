const express = require('express')
const app = express();
const bodyParser = require('body-parser')

const rotas = require('./Routes/routes');

const mysql = require('mysql');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.use('/desenvolvedor', rotas);

//não encontra rota
app.use((req, res, next) =>{
    const erro = new Error('Não encontrado');
    erro.status = 404 ;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    })
});

module.exports = app;