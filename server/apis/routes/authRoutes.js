const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');

router.get('/:taskID', userControllers.getSpecificTaskByUser); // 
router.get('/tasks', userControllers.getAllTaskCreatedByUser); // this route is working fine


module.exports = router;