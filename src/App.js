import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';

import Question from './Question';

class App extends Component {
  render() {
    return (
      <main>
        <Question />
      </main>
    );
  }
}

export default App;
