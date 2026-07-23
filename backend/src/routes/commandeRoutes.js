const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

router.post('/', commandeController.createCommande);

router.get('/', commandeController.getAllCommandes);
module.exports = router;