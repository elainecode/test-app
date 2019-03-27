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
   console.log('inside form')
  const data = {...this.state}
if (data.username  != '' && data.password != '') {
   fetch('/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(user => {
        console.log(user, user.token)
        if (!user.message) {
        localStorage.setItem('tkn', user.token)
        this.props.updateIsLoggedIn()
        this.props.displayLoginModal()
      }
      })
    }
      // .then(this.props.updateIsLoggedIn() )
  }

//  register = (e) => {
//   e.preventDefault()
//   const data = { 
//     email: "bfgheantailnyy@pbjkids.com",
//     username: "tafghilbnubeanjobb",
//     password: "nhjjhghjyyailnbeanommybujj",
//     tags: ["mistake..."]
//     }
//    fetch('/api/v1/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json'},
//       body: JSON.stringify(data)
//     }).then(res => res.json())
//       .then( resp => console.log("?????", resp))
// }


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