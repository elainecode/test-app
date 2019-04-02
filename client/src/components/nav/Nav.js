import React, { Fragment, Component } from 'react';
import { Route, Link, withRouter } from "react-router-dom";
import logo from '../../logo.svg';
import './nav.css';

class Nav extends Component {

getFavoritesView = (e) => {
  e.preventDefault()
  this.props.isLoggedIn &&
  this.props.history.push(`/user/${this.props.userID}/favorites`);
}

getHomeView = (e) => {
 e.preventDefault()
 this.props.history.push('/') 
}


logout = (e) => {
e.preventDefault()
localStorage.removeItem('tkn');
 this.props.setIsLoggedIn()
}


  render() {
    const { displaySignupModal, displayLoginModal, updateInput } = this.props
    return (
      <>
      <nav className="navbar is-fixed-top nav-color has-shadow"
       role="navigation" aria-label="main navigation">
       <div class="navbar-brand">
       <div class="navbar-item">
       <Link to='/'>
       <img id='nav-logo' src={logo} alt="logo" />
       </Link>
       </div>
       </div>
      <div id='nav-form' class="navbar-item">
      <form onSubmit={this.getHomeView}>
       <div class="field has-addons">
      <div class="control is-expanded">
    <input id='nav-input' onChange={updateInput} class="input is-static" type="text" placeholder="  Search"/>
       </div>
      <div class="control">
      <input id='nav-button' type='submit' class="button" value='submit'/>
  </div>
</div>
  </form>
      </div>
      <div class="navbar-end">
      <div class="navbar-item">

    { !this.props.isLoggedIn  &&
        <div class="buttons">
          <a class="button nav-buttons" onClick={displaySignupModal}>
            Sign up
          </a>
          <a class="button nav-buttons" onClick={displayLoginModal}>
            Log in
          </a>
        </div> 
      }
         
        { this.props.isLoggedIn  &&

            <div class="buttons">
          <a href='#' class="button nav-buttons" onClick={this.getFavoritesView}>
            Favorites
          </a>
          <a href='#' class="button nav-buttons" onClick={this.logout}>
            Log out
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