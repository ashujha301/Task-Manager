const express = require('express');
const router = express.Router();
const unAuthControllers = require('../controllers/unAuthController');

router.get('/hey', (req,res)=>{
    res.json({msg:'Hey there!'});
});
router.post('/login',unAuthControllers.login);
router.post('/register', unAuthControllers.register);


module.exports = router;