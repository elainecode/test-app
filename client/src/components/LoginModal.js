import React, { Fragment, Component } from 'react';
import './css/loginmodal.css';

class LoginModal extends Component {

  state = {
    username: '',
    password: ''
  }


  updateInput = (e) => {
   this.setState({[e.target.name]: e.target.value})
  }

  login = (e) => {
   e.preventDefault()
  const data = {...this.state}
if (data.username  != '' && data.password != '') {
   fetch('https://lit-dusk-44111.herokuapp.com/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(user => {
        if (!user.message) {
        localStorage.setItem('tkn', user.token)
        this.props.updateIsLoggedIn()
        this.props.displayLoginModal()
      }
      })
    }
  }

  render() {

    const { displayLoginModal } = this.props
    const { updateInput, login } = this
    return (
      <>
          <div class="modal-background" onClick={displayLoginModal}></div>
      <div id="login" class="card">
 
  <div class="card-content">
  <form onSubmit={login}>
  <a id="delete" class="delete is-small" onClick={displayLoginModal}></a>
  <p class="title is-4">Login</p>
  

<div class="field">
  <label class="label">Username</label>
  <div class="control">
    <input class="input" onChange={updateInput}  name="username" type="text" placeholder="Username" />
  </div>
</div>

<div class="field">
  <label class="label">Password</label>
  <div class="control">
    <input class="input" onChange={updateInput} name="password" type="password" placeholder="Password"/>
  </div>
</div>

   <input class="button form-button" type="submit"/>
     </form>
  </div>

</div>
      </>
    );
  }
}

export default LoginModal;