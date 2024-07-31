const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/', taskController.createTask); //create task
router.get('/', taskController.get_All_Task_Created_ByUser); //get all tasks made by user
router.get('/:taskId', taskController.get_Specific_Task_ByUser); //get specific task by user
router.put('/:taskId', taskController.update_Specific_Task_ByUser); // update specific task
router.delete('/:taskId', taskController.delete_Specific_Task_ByUser); // delete specific task
router.patch('/:taskId/move', taskController.moveTask); //move task drag and drop


module.exports = router;