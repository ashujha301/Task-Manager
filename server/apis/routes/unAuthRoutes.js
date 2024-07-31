const express = require('express');
const router = express.Router();
const unAuthControllers = require('../controllers/unAuthController');

router.post('/login',unAuthControllers.login);
router.post('/register', unAuthControllers.register);


module.exports = router;