import React, { Fragment, Component } from 'react';
import './nav.css';

class Nav extends Component {
  render() {
    return (
      <>
      <nav className="navbar is-fixed-top nav-color has-shadow"
       role="navigation" aria-label="main navigation"
      >
      <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button nav-buttons">
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