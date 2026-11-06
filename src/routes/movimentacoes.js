const express = require('express');
const controller = require('../controllers/movimentacoesController');

const router = express.Router();

router.get('/', controller.listar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);

module.exports = router;
