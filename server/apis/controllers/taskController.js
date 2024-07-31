// taskController.js

const express = require("express");
const userServices = require("../services/userServices");
const USER = require("../../models/userModel");
const TASK = require("../../models/taskModel");
const axios = require("axios");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { taskTitle, taskDescription, taskStatus } = req.body;
    const userId = req.user.id;

    if (!taskTitle || !taskDescription || !taskStatus) {
      return res.status(400).json({ msg: "Please provide all the details" });
    }

    const newTask = await TASK.create({
      title: taskTitle,
      description: taskDescription,
      userReference: userId,
      status: taskStatus
    });

    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// Get all tasks created by the user
const get_All_Task_Created_ByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await userServices.get_All_User_Tasks(userId);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get specific task by user
const get_Specific_Task_ByUser = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await TASK.findOne({ _id: taskId, userReference: userId });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Update specific task by user
const update_Specific_Task_ByUser = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;
    const { taskTitle, taskDescription, status } = req.body;

    const task = await TASK.findOneAndUpdate(
      { _id: taskId, userReference: userId },
      { title: taskTitle, description: taskDescription, status: status},
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Delete specific task by user
const delete_Specific_Task_ByUser = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await TASK.findOneAndDelete({ _id: taskId, userReference: userId });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Move task (drag and drop)
// taskController.js

const moveTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const userId = req.user.id;
      const { newStatus } = req.body;
  
      // Validate the newStatus
      if (!["To Do", "In Progress", "Completed"].includes(newStatus)) {
        return res.status(400).json({ msg: "Invalid status" });
      }
  
      // Update the task's status
      const task = await TASK.findOneAndUpdate(
        { _id: taskId, userReference: userId },
        { status: newStatus },
        { new: true }
      );
  
      if (!task) {
        return res.status(404).json({ msg: "Task not found" });
      }
  
      res.json({ message: "Task moved successfully", task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: error.message });
    }
  };
  

module.exports = {
  createTask,
  get_All_Task_Created_ByUser,
  get_Specific_Task_ByUser,
  update_Specific_Task_ByUser,
  delete_Specific_Task_ByUser,
  moveTask
};
