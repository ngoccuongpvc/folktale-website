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

import {AppBar, Box, Toolbar, Button, Typography, ButtonGroup} from '@mui/material'

ReactDOM.render(
  <Router>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <Typography variant="h4" style={{ border:"200px"}}>
            Folktale
          </Typography>

          <ButtonGroup variant="text" aria-label="large secondary button group" sx={{ flexGrow: 1 }}>
            <Button color="inherit">
              <NavLink to="/home" activeClassName="selected" style={{ textDecoration: 'none' }}>
                Home
              </NavLink>
            </Button>
            
            <Button color="inherit">
              <NavLink to="/blogs" activeClassName="selected" style={{ textDecoration: 'none' }}>
                Blogs
              </NavLink>
            </Button>

            <Button color="inherit">
              <NavLink to="/about" activeClassName="selected" style={{ textDecoration: 'none' }}>
                About Us
              </NavLink>
            </Button>
          </ButtonGroup>
          
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>


    <Switch>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

