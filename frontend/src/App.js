import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Compare from './Compare'

class App extends Component {
  render() {
    return (
      <div className="App">
        Pi Camera Image Comparer
        <Compare/>
      </div>
    );
  }
}

export default App;
