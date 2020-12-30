const express = require('express');
const router = express.Router();

const desenvolvedorController = require('../controller/desenvolvedor-controler');
//Retorna todos os desenvolvedores
router.get('/', desenvolvedorController.getDesenvolvedores);

//Retorna um desenvolvedor pelo seu ID
router.get('/:id_dev', desenvolvedorController.getIdDesenvolvedores);

//Insere um Desenvolvedor
router.post('/', desenvolvedorController.postDesenvolvedores);

//Altera um Desenvolvedor
router.put('/:id_dev', desenvolvedorController.putDesenvolvedores);

//Deleta um Desenvolvedor
router.delete('/:id_dev', desenvolvedorController.deleteDesenvolvedores);

module.exports = router;