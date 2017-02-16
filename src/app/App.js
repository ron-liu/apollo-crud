import React, { Component } from 'react';
import logo from '../logo.svg';
import {PostList, Button, Link} from '../components'
import './App.css';

class App extends Component {
  render() {
    return (
    <div>
        <Link to="/add-post">Add Post</Link>
        <PostList />
    </div>
    );
  }
}

export default App;
