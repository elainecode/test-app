import React, { Fragment, Component } from 'react';
// import logo from './logo.svg';
import 'bulma/css/bulma.css'
import './App.css';
import Nav from './components/nav/Nav'
import HomeView from './components/HomeView'

class App extends Component {
  render() {
    return (
      <>
       <Nav />
       <HomeView />
       </>
    );
  }
}

export default App;
