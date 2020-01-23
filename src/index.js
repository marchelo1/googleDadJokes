import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '', // store input search value
      jokes: [], // store the jokes
      isFetchingJoke: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  // Call Search Joke EndPoint
  searchJokes(limit = 20) {
    this.setState({ isFetchingJoke: true });
    // Trigger search on form subbmision
    fetch(
      `https://icanhazdadjoke.com/search?term=${this.state.searchTerm}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        const jokes = json.results;
        console.log('jokes', jokes);
        this.setState({
          jokes,
          isFetchingJoke: false
        });
      });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.searchJokes();
  }

  renderJokes() {
    return (
      <ul>
        {this.state.jokes.map(item => (
          <li key={item.id}>{item.joke}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSearchSubmit}>
          <input
            type='text'
            placeholder='Enter search term...'
            onChange={this.onSearchChange}
          />
          <button>Search</button>

          <button
            onClick={() => this.searchJokes(1)}
            disabled={this.state.isFetchingJoke}
          >
            I'm feeling Funny
          </button>
        </form>

        {this.state.isFetchingJoke
          ? 'searching for jokes...'
          : this.renderJokes()}

        <p>search term: {this.state.searchTerm}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

serviceWorker.unregister();
