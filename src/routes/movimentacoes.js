const express = require('express');
const controller = require('../controllers/movimentacoesController');

const router = express.Router();

router.post('/', controller.criar);

module.exports = router;
