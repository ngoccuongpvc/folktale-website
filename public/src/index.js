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

import { Button, Container, Navbar, Nav } from 'react-bootstrap'

import { Home as HomeIcon, Book as BookIcon, Info as InfoIcon, Login as LoginIcon } from '@mui/icons-material';

ReactDOM.render(
  <Router>
    <Navbar variant="light" fixed="top">
    <Container>
      <Navbar.Brand href="/home">Folktale</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link>
          <Link to="/home" style={{ textDecoration: 'none' }}>
              <HomeIcon/> Home
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/blogs" style={{ textDecoration: 'none' }}>
            <BookIcon/> Blogs
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <InfoIcon/> About Us
          </Link>
        </Nav.Link> 
      </Nav>
      <Nav>
        <Link to="/login"  style={{ textDecoration: 'none' }}>
          <LoginIcon/> Login
        </Link>
      </Nav>
    </Container>
  </Navbar>

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

