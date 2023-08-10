const express = require('express');
const conectBancodeDados = require('../midllewares/conectarBD');
const router = express.Router();

/* GET users listing. */
router.get('/', conectBancodeDados, function(req, res, next) {
  res.send('Est funcionado corretamente: '+process.env.TEST);
});

module.exports = router;
