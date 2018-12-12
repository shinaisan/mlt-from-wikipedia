import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import reducer from './reducers';
import TopNav from './components/TopNav';
import MltContainer from './containers/MltContainer';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = createStore(reducer);

class App extends React.Component {

  render() {
    return (
      <Provider store={store} >
        <Router>
          <div>
            <TopNav />
            <Route exact path='/' component={ MltContainer } />
            <Route path='/mlt' component={ MltContainer } />
            <Route path='/test' component={ MltContainer } />
          </div>
        </Router>
      </Provider>
    );
  }

}

export default App;

