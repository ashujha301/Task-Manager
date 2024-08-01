import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

const sentences = [
  "Personal Task Manager",
  "Seamless Drag and Drop Feature",
  "Transforming the Way You Manage Your Tasks",
];

const Home = () => {
  const [currentSentence, setCurrentSentence] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentence((prev) => (prev + 1) % sentences.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            TASK MANAGEMENT &lt;/&gt;
          </Typography>
          <Typography variant="h5" component="h4" sx={{ mb: 3 }}>
            <span>{sentences[currentSentence]}</span>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={NavLink}
            to="/login"
            sx={{ px: 4 }}
          >
            Login To Continue &nbsp;
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
