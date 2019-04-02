import React, { Fragment, Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
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
    input: '',
    favorites: [],
    isLoggedIn: false,
    userID: null,
    signupModal: false,
    loginModal: false

  }

  fetchGifs = ()  => {
  return fetch('https://lit-dusk-44111.herokuapp.com/api/v1/gifs')
  .then(response => response.json())
}

fetchTags = ()  => {
  return fetch('https://lit-dusk-44111.herokuapp.com/api/v1/tags')
  .then(response =>  response.json())
}

fetchFavorites = () => {
const tkn = localStorage.getItem('tkn')
 return fetch('https://lit-dusk-44111.herokuapp.com/api/v1/auth/favorites', {
  method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tkn}`
    }
 })
 .then(response => response.json())
 
}

SaveOrDeleteFavorites = (gif_uid) => {
  let favorites  = [...this.state.favorites]
  if (favorites.includes(gif_uid)) {
    favorites.splice(favorites.indexOf(gif_uid), 1)
  } else {
  favorites.push(gif_uid)
  }
  this.setState({favorites})
const  data = {uid: gif_uid}
const tkn = localStorage.getItem('tkn')

  
  fetch('https://lit-dusk-44111.herokuapp.com/api/v1/auth/favorites/toggle', {
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
  return fetch('https://lit-dusk-44111.herokuapp.com/api/v1/auth', {
      method: 'GET',
      headers: { 
      'Authorization': `Bearer ${tkn}`
    }
    }).then(res => res.json())
  } 

 updateInput = (e) => {
    this.setState({ input: e.target.value})
  }

  setIsLoggedIn = () => {
    this.setState({isLoggedIn: false})
  }

  tagOnlySearch = (e) => {
    this.setState({input: e.target.innerText})
  }

filteredGifs = () => {
    const { gifs, input } = this.state
    return input === ''
    ? gifs.filter(gif => gif.title.toLowerCase().includes(input.toLowerCase()))
    : gifs.filter(gif => gif.title.toLowerCase().includes(input.toLowerCase()) ||
      gif.tags.includes(input.toLowerCase()))
  }

  filteredFavorites = () => {
    const { gifs, favorites } = this.state
    return favorites.length > 0 
    ? gifs.filter(gif => favorites.includes(gif.uid))
    : null 
  }

displaySignupModal = (e) => {
  this.setState({signupModal: !this.state.signupModal})
}

displayLoginModal = (e) => {
  this.setState({loginModal: !this.state.loginModal})
}

updateIsLoggedIn = (e) => {
  this.setState({isLoggedIn: !this.state.isLoggedIn})
}

componentDidMount = () => {
  const tkn = localStorage.getItem('tkn')
  if (tkn != null || undefined) {
  this.fetchTags()
  .then(tags => this.setState({tags})) 
   this.fetchFavorites()
   .then(response => {
    if (response.length) {
    const favorites = response.map(data => data.uid)
    this.setState({favorites})
  }
  }).then(() => this.fetchGifs())
    .then(gifs => this.setState({gifs}))
    .then(() => this.fetchUser())
    .then(user => {
    if (user) {
    this.setState({userID: user.id})
    this.updateIsLoggedIn()
  }
  })

  } else {
      this.fetchTags()
     .then(tags => this.setState({tags}))
     this.fetchGifs()
    .then(gifs => this.setState({gifs}))
  }  
  
}
  render() {
    const { 
      displaySignupModal, 
      displayLoginModal,
       updateIsLoggedIn, 
       updateInput,
       setIsLoggedIn,
       fetchFavorites,
       tagOnlySearch,
       filteredFavorites,
       filteredGifs,
       SaveOrDeleteFavorites 
     } = this
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
       updateInput={updateInput}
       isLoggedIn={isLoggedIn}
       setIsLoggedIn={setIsLoggedIn}
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
        <Route exact path='/' render={(props) => 
          <HomeView {...props}  
            SaveOrDeleteFavorites={SaveOrDeleteFavorites} 
            updateInput={updateInput} 
            tagOnlySearch={tagOnlySearch} 
            favorites={favorites} 
            tags={tags} 
            gifs={filteredGifs()} 
            />
          } 
          />
         <Route path='/gifs/:title' render={(props) => <GifView {...props} favorites={favorites} SaveOrDeleteFavorites={SaveOrDeleteFavorites} gifs={gifs} />} />
          isLoggedIn
          <Route path='/user/:id/favorites' render={(props) => 
            isLoggedIn === true
            ? <FavoritesView {...props} 
            SaveOrDeleteFavorites={SaveOrDeleteFavorites}
            favorites={favorites} 
            gifs={filteredFavorites()} 
            isLoggedIn={isLoggedIn}
             />
            : <Redirect to='/'/>
          } 
            />
       </Switch>
       </>
    );
  }
}

export default App;
