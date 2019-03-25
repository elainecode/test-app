import React, { Fragment, Component } from 'react';
import { withRouter } from "react-router-dom";
import './nav.css';

class Nav extends Component {

  state = {
    username: ''
  }

getFavoritesView = (e) => {
  e.preventDefault()
  this.props.isLoggedIn &&
  this.props.history.push(`/user/${this.props.userID}/favorites`);
}


 register = (e) => {
  e.preventDefault()
  const data = { 
    email: "bfgheantailnyy@pbjkids.com",
    username: "tafghilbnubeanjobb",
    password: "nhjjhghjyyailnbeanommybujj",
    tags: ["mistake..."]
    }
   fetch('/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then( resp => console.log("?????", resp))
}



  render() {
    const { displaySignupModal, displayLoginModal } = this.props
    return (
      <>
      <nav className="navbar is-fixed-top nav-color has-shadow"
       role="navigation" aria-label="main navigation">
      <div class="navbar-end">
      <div class="navbar-item">

    { !this.props.isLoggedIn  &&
        <div class="buttons">
          <a class="button nav-buttons" onClick={displaySignupModal}>
            <strong>Sign up</strong>
          </a>
          <a class="button nav-buttons" onClick={displayLoginModal}>
            <strong>Log in</strong>
          </a>
        </div> 
      }
         
        { this.props.isLoggedIn  &&

            <div class="buttons">
          <a class="button nav-buttons" onClick={this.getFavoritesView}>
            <strong>Favorites</strong>
          </a>
          <a class="button nav-buttons">
            <strong>Log out</strong>
          </a>
        </div>
        }
      </div>
    </div>
      </nav>
      </>
    );
  }
}

export default withRouter(Nav);