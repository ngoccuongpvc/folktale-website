import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import {AppBar, Container, Box, Toolbar, Button, Typography, ButtonGroup} from '@mui/material'

import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';

ReactDOM.render(
  <Router>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        {/* <Container maxWidth='lg'> */}
          <Toolbar >
            <Button variant="h4" style={{ fontSize:"1.5rem"}}>
              Folktale
            </Button>

            <ButtonGroup variant="text" aria-label="large secondary button group" sx={{ flexGrow: 1 }}>
              
              <NavLink to="/home" activeClassName="selected" style={{ textDecoration: 'none' }}>
                <Button style={{ color:"white" }}>
                  <HomeIcon/>
                  Home
                </Button>
              </NavLink>
              
              <NavLink to="/blogs" activeClassName="selected" style={{ textDecoration: 'none' }}>
                <Button style={{ color:"white" }}>
                  <BookIcon/>
                  Blogs
                </Button>
              </NavLink>

              <NavLink to="/about" activeClassName="selected" style={{ textDecoration: 'none' }}>
                <Button style={{ color:"white" }}>
                  <InfoIcon/> 
                  About Us
                </Button>
              </NavLink>
            </ButtonGroup>
            
            <Button style={{ color:"white" }}><LoginIcon/> Login</Button>
          </Toolbar>
        {/* </Container> */}
      </AppBar>
    </Box>

    <Container>
      <Switch>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Container>
  </Router>,
  document.getElementById('root')
);

