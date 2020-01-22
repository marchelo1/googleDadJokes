import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      joke: null
    };

    this.onTellJokes = this.onTellJokes.bind(this);
  }

  onTellJokes() {
    fetch('https://icanhazdadjoke.com/', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ joke: json.joke });
      });
  }

  render() {
    console.log('---RENDER---');
    return (
      <div>
        <button onClick={this.onTellJokes}> Tell me a joke </button>
        <p>{this.state.joke}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

serviceWorker.unregister();
