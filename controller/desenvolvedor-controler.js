const mysql = require('../mysql');

exports.getDesenvolvedores = (req, res, next) => {
    let sqlQuery = 'select * from desenvolvedores';
    if (req.query.nome) {
        sqlQuery += ` where nome like '%${req.query.nome}%'`
    }
 console.log(req.query.parametro, 1);
    mysql.connect((error) =>  {
        mysql.query(
            sqlQuery,
            
             (error, resultado, field) => {

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                const response = {
                    quantidade: resultado.length,
                    desenvolvedores: resultado.map(dev => {
                        return {
                            id_dev: dev.id_dev,
                            nome: dev.nome,
                            sexo: dev.sexo,
                            idade: dev.idade,
                            hobby: dev.hobby,
                            dt_nascimento: dev.dt_nascimento,
                            request:{
                                tipo: 'Get',
                                descricao: 'Retorna detalhes de um desenvolvedore',
                                url: 'http://localhost:3000/desenvolvedor/'+ dev.id_dev
                            }
                        }
                    }) 
                 }
 
                res.status(200).send({
                    res: response,
                    mensagem: 'Busca concluida com sucesso.'
                });
                
             }
        )
    });
};   

exports.getIdDesenvolvedores = (req, res, next) => {
    const id = req.params.id_dev
    mysql.connect((error) =>  {
        mysql.query(
            'select * from desenvolvedores where id_dev = ?',
            [req.params.id_dev],
            
             (error, resultado, field) => {

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                if (resultado.length == 0) {
                    return res.status(404).send({
                        mensagem: 'não foi encontrado desenvoldefor com esse ID'
                    })
                }
 
                const response = {
                    desenvolvedor: {
                            id_dev: resultado[0].id_dev,
                            nome:  resultado[0].nome,
                            sexo: resultado[0].sexo,
                            idade: resultado[0].idade,
                            hobby: resultado[0].hobby,
                            dt_nascimento: resultado[0].dt_nascimento,
                            request:{
                                tipo: 'Post',
                                descricao: 'Retorna um desenvolvedor',
                                url: 'http://localhost:3000/desenvolvedor/'
                            }
                        }
                    }
 
                return res.status(200).send(response);
             }
        )
    });
};

exports.postDesenvolvedores = (req, res, next) => {

    mysql.connect((error) =>  {
        mysql.query(
            'insert into desenvolvedores (nome, sexo, idade, hobby, dt_nascimento) values (?, ?, ?, ?, ?)',
            [req.body.nome,
             req.body.sexo,
             req.body.idade,
             req.body.hobby,
             req.body.dt_nascimento],
             (error, resultado, field) => {

                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }
                const response = {
                    mensagem: 'Desenvolvedor inserido com sucesso',
                    desenvolvedorCriado: {
                            id_dev: req.body.id_dev,
                            nome:  req.body.nome,
                            sexo: req.body.sexo,
                            idade: req.body.idade,
                            hobby: req.body.hobby,
                            dt_nascimento: req.body.dt_nascimento,
                            request:{
                                tipo: 'Get ',
                                descricao: 'Retorna todos os desenvolvedor',
                                url: 'http://localhost:3000/desenvolvedor/'
                            }
                        }
                    }
 
                return res.status(201).send(response);
             }
        )
    });   
};

exports.putDesenvolvedores =  (req, res, next) => {
    const id = req.params.id_dev

    mysql.connect((error) =>  {
        mysql.query(
            'update desenvolvedores set nome = ?, sexo = ?, idade = ?, hobby = ?,dt_nascimento = ? where id_dev = ?',
            [req.body.nome,
            req.body.sexo,
            req.body.idade,
            req.body.hobby,
            req.body.dt_nascimento,
            req.params.id_dev],
            
             (error, resultado, field) => {

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
 
                const response = {
                    mensagem: 'Desenvolvedor atualizado com sucesso',
                    desenvolvedorAtualizado: {
                            id_dev: req.body.id_dev,
                            nome:  req.body.nome,
                            sexo: req.body.sexo,
                            idade: req.body.idade,
                            hobby: req.body.hobby,
                            dt_nascimento: req.body.dt_nascimento,
                            request:{
                                tipo: 'Get',
                                descricao: 'Retorna todos os desenvolvedores',
                                url: 'http://localhost:3000/desenvolvedor/'+ req.body.id_dev
                            }
                        }
                    }
 
                return res.status(202).send(response);  
             }
        )
    });
};

exports.deleteDesenvolvedores = (req, res, next) => {
    const id = req.params.id_dev
    
    mysql.connect((error) =>  {
        mysql.query(
            'delete from desenvolvedores where id_dev = ?',
            [req.params.id_dev],
            
             (error, resultado, field) => {

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
 
                const response = {
                    mensagem: 'Desenvolvedor removido com sucesso',
                    request: {
                        tipo: 'Post',
                        descricao: 'Retorna um desenvolvedor',
                        url: 'http://localhost:3000/desenvolvedor/',
                        body: {
                            nome: 'string',
                            sexo: 'char',
                            idade: 'int',
                            hobby: 'string',
                            dt_nascimento: 'data'
                        }
                    }
                }
                return res.status(202).send(response)
             }
        )
    });
};