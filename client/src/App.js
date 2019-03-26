import React, { Fragment, Component } from 'react';
import { Route, Switch } from "react-router-dom";
import 'bulma/css/bulma.css'
import './App.css';
import Nav from './components/nav/Nav'
import SignupModal from './components/SignupModal'
import LoginModal from './components/LoginModal'
import HomeView from './components/HomeView'
import GifView from './components/GifView'
import FavoritesView from './components/FavoritesView'

class App extends Component {

  state = {
    gifs: [],
    tags: [],
    favorites: [],
    isLoggedIn: false, // check for JWT Token on CDM() call
    userID: null,
    signupModal: false,
    loginModal: false

  }

  fetchGifs = ()  => {
  return fetch('/api/v1/gifs')
  .then(response => response.json())
}

fetchTags = ()  => {
  return fetch('/api/v1/tags')
  .then(response =>  response.json())
}

fetchFavorites = () => {
const tkn = localStorage.getItem('tkn')
 return fetch('/api/v1/auth/favorites', {
  method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tkn}`
    }
 })
 .then(response =>  response.json())
}

SaveOrDeleteFavorites = (gif_uid) => {
  
const  data = {uid: gif_uid}
const tkn = localStorage.getItem('tkn')

  console.log('adding favorites....: ', data.uid)
  
  fetch('/api/v1/auth/favorites/toggle', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tkn}`
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => console.log(data))
}

fetchUser = () => {
  const tkn = localStorage.getItem('tkn')
  console.log('tkn in app', tkn)
  return fetch('/api/v1/auth', {
      method: 'GET',
      headers: { 
      'Authorization': `Bearer ${tkn}`
    }
    }).then(res => res.json())    
}

displaySignupModal = (e) => {
  console.log('sign up modal opened')
  this.setState({signupModal: !this.state.signupModal})
}

displayLoginModal = (e) => {
  console.log('login modal open')
  this.setState({loginModal: !this.state.loginModal})
}

updateIsLoggedIn = (e) => {
  this.setState({isLoggedIn: !this.state.isLoggedIn})
}

componentDidMount = () => {
  this.fetchGifs()
  .then(gifs => this.setState({gifs}))
  this.fetchTags()
  .then(tags => this.setState({tags})) 
  this.fetchUser()
  .then(user => {
    this.setState({userID: user.id})
    this.updateIsLoggedIn()
  })
  this.fetchFavorites() 
  .then(response => {
    const favorites = response.map(data => data.uid)
    this.setState({favorites})
  })
}
  render() {
    const { displaySignupModal, displayLoginModal, updateIsLoggedIn, SaveOrDeleteFavorites } = this
    const {
      gifs,
      favorites, 
      tags,  
       isLoggedIn,
       signupModal,
       userID,
       loginModal
       } = this.state

    return (
      <>
       <Nav 
       displaySignupModal={displaySignupModal}
       displayLoginModal={displayLoginModal}
       isLoggedIn={isLoggedIn}
       userID={userID}
       />
       { signupModal &&
        <SignupModal
        displaySignupModal={displaySignupModal} />
     }
     { loginModal &&
        <LoginModal 
          displayLoginModal={displayLoginModal}
          updateIsLoggedIn={updateIsLoggedIn }
        />
     }
       <Switch>
        <Route exact path='/' render={(props) => <HomeView {...props}  SaveOrDeleteFavorites={SaveOrDeleteFavorites} favorites={favorites} tags={tags} gifs={gifs} />} />
         <Route path='/gifs/:title' render={(props) => <GifView {...props} favorites={favorites} SaveOrDeleteFavorites={SaveOrDeleteFavorites} gifs={gifs} />} />
          <Route path='/user/:id/favorites' render={(props) => <FavoritesView {...props} SaveOrDeleteFavorites={SaveOrDeleteFavorites} favorites={favorites} isLoggedIn={isLoggedIn} />} />
       </Switch>
       </>
    );
  }
}

export default App;
