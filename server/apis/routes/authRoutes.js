const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/', taskController.createTask); //create task
router.get('/', taskController.getAllTaskCreatedByUser); //get all tasks made by user
router.get('/:taskID', taskController.getSpecificTaskByUser); //get specific task by user
router.put('/:taskID', taskController.getSpecificTaskByUser); // update specific task
router.delete('/:taskID', taskController.getSpecificTaskByUser); // delete specific task
router.patch('/:taskID/move', taskController.moveTask); //move task drag and drop


module.exports = router;