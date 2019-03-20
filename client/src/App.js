import React, { Fragment, Component } from 'react';
import { Route, Switch } from "react-router-dom";
import 'bulma/css/bulma.css'
import './App.css';
import Nav from './components/nav/Nav'
import HomeView from './components/HomeView'
import GifView from './components/GifView'

class App extends Component {

  state = {
    gifs: [],
    tags: []
  }

  fetchGifs = ()  => {
  return fetch('/api/v1/gifs')
  .then(response => response.json())
}

fetchTags = ()  => {
  return fetch('/api/v1/tags')
  .then(response => response.json())
}

componentDidMount = () => {
  this.fetchGifs()
  .then(gifs => this.setState({gifs}))
  this.fetchTags()
  .then(tags => this.setState({tags}))  
}
  render() {

    const {gifs, tags} = this.state
    return (
      <>
       <Nav />
       <Switch>
        <Route exact path='/' render={(props) => <HomeView {...props}  tags={tags} gifs={gifs} />} />
         <Route path='/gifs/:title' render={(props) => <GifView {...props} gifs={gifs} />} />
       </Switch>
       </>
    );
  }
}

export default App;
