const express = require('express');
const router = express.Router();
const unAuthControllers = require('../controllers/unAuthControllers');

router.post('/login',unAuthControllers.login);
router.post('/register', unAuthControllers.register);


module.exports = router;