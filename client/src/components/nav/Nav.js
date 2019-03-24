import React, { Fragment, Component } from 'react';
import './nav.css';

class Nav extends Component {

  state = {
    isLoggedIn: false,
    username: ''
  }

 register = (e) => {
  e.preventDefault()
  const data = { 
    email: "bfgheantailnyy@pbjkids.com",
    username: "tafghilbnubeanjobb",
    password: "1nhjjhghjyyailnbeanommybujj",
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
    return (
      <>
      <nav className="navbar is-fixed-top nav-color has-shadow"
       role="navigation" aria-label="main navigation"
      >
      <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button nav-buttons" onClick={this.register}>
            <strong>Sign up</strong>
          </a>
          <a class="button nav-buttons">
            <strong>Log in</strong>
          </a>
        </div>
      </div>
    </div>
      </nav>
      </>
    );
  }
}

export default Nav;