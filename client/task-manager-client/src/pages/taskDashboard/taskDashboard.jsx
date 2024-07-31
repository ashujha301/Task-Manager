// src/pages/Dashboard.jsx
import React from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const tasks = {
    todo: [
      { id: '1', title: 'Task 1', description: 'Description 1', createdAt: '01/01/2021, 05:34:00' },
      { id: '2', title: 'Task 2', description: 'Description 2', createdAt: '01/01/2021, 05:34:00' },
      { id: '3', title: 'Task 3', description: 'Description 3', createdAt: '01/01/2021, 05:34:00' },
    ],
    inProgress: [
      { id: '4', title: 'Task 4', description: 'Description 4', createdAt: '01/01/2021, 05:34:00' },
      { id: '5', title: 'Task 5', description: 'Description 5', createdAt: '01/01/2021, 05:34:00' },
    ],
    done: [
      { id: '6', title: 'Task 6', description: 'Description 6', createdAt: '01/01/2021, 05:34:00' },
    ],
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
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
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
        <Grid container spacing={3} mt={2}>
          {Object.entries(tasks).map(([status, tasks]) => (
            <Grid item xs={12} md={4} key={status}>
              <Typography variant="h6" align="center" color="primary">
                {status.toUpperCase()}
              </Typography>
              {tasks.map((task) => (
                <Card key={task.id} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h5">{task.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {task.description}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Created at: {task.createdAt}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                    <Button size="small" color="secondary">
                      Delete
                    </Button>
                    <Button size="small">View Details</Button>
                  </CardActions>
                </Card>
              ))}
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
