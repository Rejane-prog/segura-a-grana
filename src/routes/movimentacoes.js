const express = require('express');
const controller = require('../controllers/movimentacoesController');

const router = express.Router();

router.get('/saldo', controller.saldo);
router.get('/', controller.listar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.excluir);

module.exports = router;
