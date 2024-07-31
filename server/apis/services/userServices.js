// userServices.js

const bcrypt = require("bcrypt");
const USER = require("../../models/userModel");
const TASK = require("../../models/taskModel");

//------------------------------------------------------------XX Register User  XX-----------------------------------------------------------
const registerUser = async (email, name, password) => {
  try {
    // Check if the email already exists
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new USER({
      email,
      name,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Error registering user");
  }
};

//------------------------------------------------------------XX Authenticate User  XX-----------------------------------------------------------
const authenticateUser = async (email, password) => {
  try {
    const user = await USER.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    return user;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw new Error("Authentication failed");
  }
};

//------------------------------------------------------------XX Get User By ID XX-----------------------------------------------------------
const getUserById = async (id) => {
  try {
    const user = await USER.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Error fetching user");
  }
};

//------------------------------------------------------------XX Get All Tasks By User XX-----------------------------------------------------------
const get_All_User_Tasks = async (userId) => {
  try {
    const tasks = await TASK.find({ userReference: userId });
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Error fetching tasks by user");
  }
};

//------------------------------------------------------------XX Get Specific Task XX-----------------------------------------------------------
const get_Specific_Task = async (taskId, userId) => {
  try {
    const task = await TASK.findOne({ _id: taskId, userReference: userId });
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw new Error(`Couldn't find task by taskId: ${taskId}`);
  }
};

//------------------------------------------------------------XX Create Task XX-----------------------------------------------------------
const taskCreate = async (title, description, userId) => {
  try {
    const newTask = new TASK({
      title,
      description,
      userReference: userId
    });

    await newTask.save();
    return newTask;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Error creating task");
  }
};

module.exports = {
  registerUser,
  authenticateUser,
  getUserById,
  get_All_User_Tasks,
  get_Specific_Task,
  taskCreate
};
