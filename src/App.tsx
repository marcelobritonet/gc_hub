import React, {useState} from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';

function App(props: any) {
  const [inputValue, setInputValue] = useState()

  const inputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const { newValue, clickButton } = props;

  return (
      <Router>
        <div>
          <Title>{newValue}</Title>


          <input
              onChange={inputChange}
              type='text'
              value={inputValue}
          />

          <button onClick={() => clickButton(inputValue)}>
            Click me!
          </button>

          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

const Title = styled.div`
    font-size: 20px
`;

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ clickButton }, dispatch);

const mapStateToProps = (store: any) => ({
  newValue: store.clickState.newValue
});

export default connect(mapStateToProps, mapDispatchToProps)(App);