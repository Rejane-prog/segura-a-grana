const express = require('express');
const controller = require('../controllers/movimentacoesController');
const validarMovimentacao = require('../middlewares/validarMovimentacao');

const router = express.Router();

router.get('/saldo', controller.saldo);
router.get('/', controller.listar);
router.post('/', validarMovimentacao, controller.criar);
router.put('/:id', validarMovimentacao, controller.atualizar);
router.delete('/:id', controller.excluir);

module.exports = router;
