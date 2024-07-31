import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  CardHeader,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Dashboard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: []
  });
  const [detailsModal, setDetailsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ taskTitle: "", taskDescription: "", taskStatus: "" });
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState("");

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get("http://localhost:5000/api/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
    })
    .then(response => {
      const data = response.data;
      const categorizedTasks = {
        todo: data.filter(task => task.status === "To Do"),
        inProgress: data.filter(task => task.status === "In Progress"),
        done: data.filter(task => task.status === "Done")
      };
      setTasks(categorizedTasks);
    })
    .catch(error => {
      console.error("Error fetching tasks:", error);
    });
  };

  const handleAddTaskOpen = () => setAddTaskModal(true);
  const handleAddTaskClose = () => {
    setAddTaskModal(false);
    setNewTask({ taskTitle: "", taskDescription: "", taskStatus: "" });
    setError("");
  };

  const handleNewTaskChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreateTask = () => {
    axios.post("http://localhost:5000/api/", newTask, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
    })
    .then(response => {
      const addedTask = response.data.task;
      const statusCategory = addedTask.status.toLowerCase().replace(" ", ""); // Normalize status key
      setTasks(prevTasks => ({
        ...prevTasks,
        [statusCategory]: [...prevTasks[statusCategory], addedTask]
      }));
      setAddTaskModal(false);
    })
    .catch(error => {
      console.error("Error adding task:", error);
      setError("Failed to create task. Please try again.");
    });
  };

  const openDetailsModal = (taskId) => {
    const task = findTaskById(taskId);
    setSelectedTask(task);
    setDetailsModal(true);
  };

  const editDetailsModal = (taskId) => {
    const task = findTaskById(taskId);
    setSelectedTask(task);
    setEditModal(true);
  };

  const findTaskById = (taskId) => {
    return Object.values(tasks).flat().find(task => task._id === taskId);
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:5000/api/${taskId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
    })
    .then(() => {
      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        for (const status in newTasks) {
          newTasks[status] = newTasks[status].filter(task => task._id !== taskId);
        }
        return newTasks;
      });
    })
    .catch(error => {
      console.error("Error deleting task:", error);
      setError("Failed to delete task. Please try again.");
    });
  };

  const handleUpdateTask = () => {
    if (selectedTask) {
      axios.put(`http://localhost:5000/api/${selectedTask._id}`, selectedTask, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      })
      .then(response => {
        const updatedTask = response.data.task;
        const statusCategory = updatedTask.status.toLowerCase().replace(" ", "");
        setTasks(prevTasks => {
          const newTasks = { ...prevTasks };
          for (const status in newTasks) {
            newTasks[status] = newTasks[status].filter(task => task._id !== updatedTask._id);
          }
          newTasks[statusCategory] = [...newTasks[statusCategory], updatedTask];
          return newTasks;
        });
        setEditModal(false);
      })
      .catch(error => {
        console.error("Error updating task:", error);
        setError("Failed to update task. Please try again.");
      });
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceTasks = Array.from(tasks[source.droppableId]);
      const destinationTasks = Array.from(tasks[destination.droppableId]);

      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.status = destination.droppableId === 'todo' ? 'To Do' : destination.droppableId === 'inProgress' ? 'In Progress' : 'Done';
      destinationTasks.splice(destination.index, 0, movedTask);

      setTasks(prevTasks => ({
        ...prevTasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks
      }));

      axios.patch(`http://localhost:5000/api/${movedTask._id}/move`, { newStatus: movedTask.status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      })
      .catch(error => {
        console.error("Error moving task:", error);
      });
    }
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddTaskOpen}>
            Add Task
          </Button>
          <TextField variant="outlined" placeholder="Search..." size="small" />
          <TextField
            select
            label="Sort By"
            variant="outlined"
            size="small"
            defaultValue="Recent"
          >
            <MenuItem value="Recent">Recent</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </TextField>
        </Box>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Grid container spacing={3} mt={2}>
            {Object.entries(tasks).map(([status, taskList]) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <Grid item xs={12} md={4} key={status} ref={provided.innerRef} {...provided.droppableProps}>
                    <Card>
                      <Typography variant="h6" align="center" color="primary">
                        {status.toUpperCase()}
                      </Typography>
                      {taskList.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              variant="outlined"
                              sx={{ m: 2, backgroundColor: "#ADD8E6" }}
                            >
                              <CardContent>
                                <CardHeader title={task.title} />
                                <Typography variant="body2" color="textSecondary">
                                  {task.description}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  Created at: {task.createdAt}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button
                                  variant="contained"
                                  size="small"
                                  color="primary"
                                  onClick={() => editDetailsModal(task._id)}
                                >
                                  Edit
                                </Button>
                                <Button variant="contained" size="small" color="error" onClick={() => handleDeleteTask(task._id)}>
                                  Delete
                                </Button>
                                <Button
                                  variant="contained"
                                  size="small"
                                  color="info"
                                  onClick={() => openDetailsModal(task._id)}
                                >
                                  View Details
                                </Button>
                              </CardActions>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Card>
                  </Grid>
                )}
              </Droppable>
            ))}
          </Grid>
        </DragDropContext>

        {/* Add Task Modal */}
        <Modal open={addTaskModal} onClose={handleAddTaskClose}>
          <Box sx={modalStyle}>
            <Typography variant="h5" fontWeight="bold">
              Add New Task
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
              fullWidth
              label="Title"
              name="taskTitle"
              value={newTask.taskTitle}
              onChange={handleNewTaskChange}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              name="taskDescription"
              multiline
              rows={4}
              value={newTask.taskDescription}
              onChange={handleNewTaskChange}
              sx={{ mt: 2 }}
            />
            <TextField
              select
              label="Status"
              name="taskStatus"
              value={newTask.taskStatus}
              onChange={handleNewTaskChange}
              fullWidth
              sx={{ mt: 2 }}
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </TextField>
            <Box sx={{ mt: 2 }}>
              <Button onClick={handleCreateTask} color="primary" variant="contained">Create</Button>
              <Button onClick={handleAddTaskClose} color="error" variant="contained" sx={{ ml: 2 }}>Cancel</Button>
            </Box>
          </Box>
        </Modal>

        {/* Details Modal */}
        <Modal open={detailsModal} onClose={() => setDetailsModal(false)}>
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Title: {selectedTask?.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Description: {selectedTask?.description}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Created at: {selectedTask?.createdAt}
            </Typography>
            <Button
              onClick={() => setDetailsModal(false)}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Modal>

        {/* Edit Task Modal */}
        <Modal open={editModal} onClose={() => setEditModal(false)}>
          <Box sx={modalStyle}>
            <Typography variant="h5" fontWeight="bold">
              Edit Task
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={selectedTask?.title}
              onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={selectedTask?.description}
              onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
              sx={{ mt: 2 }}
            />
            <TextField
              select
              label="Status"
              name="status"
              value={selectedTask?.status}
              onChange={(e) => setSelectedTask({ ...selectedTask, status: e.target.value })}
              fullWidth
              sx={{ mt: 2 }}
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </TextField>
            <Button onClick={handleUpdateTask} variant="contained" color="primary" sx={{ mt: 2 }}>
              Save
            </Button>
            <Button
              onClick={() => setEditModal(false)}
              variant="contained"
              color="error"
              sx={{ mt: 2, ml: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default Dashboard;
