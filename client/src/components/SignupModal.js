import React, { Fragment, Component } from 'react';
import './css/signupmodal.css';

class SignupModal extends Component {

  state = {
    username: '',
    email: '',
    password: ''
  }

  updateInput = (e) => {
   this.setState({[e.target.name]: e.target.value})
  }

 register = (e) => {
  e.preventDefault()
  const data = { 
   ...this.state,
    tags: ["mistake..."]
    }
    if(data.username != '' && data.email != '' && data.password != '' ) {
   fetch('https://lit-dusk-44111.herokuapp.com/api/v1/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then( resp => {
        this.props.displaySignupModal()
    })
    }
}



  render() {
    const {displaySignupModal} = this.props
    const { updateInput, register } = this

    return (
      <>
        <div class="modal-background" onClick={displaySignupModal}></div>
      <div id="signup" class="card">
 
  <div class="card-content">
  <form onSubmit={register}>
  <a id="delete" class="delete is-small" onClick={displaySignupModal}></a>
  <p class="title is-4">Sign up</p>
  

<div class="field">
  <label class="label">Username</label>
  <div class="control">
    <input class="input" name="username" onChange={updateInput} type="text" placeholder="username"/>
</div>
</div>

<div class="field">
  <label class="label">Email</label>
  <div class="control">
    <input class="input" onChange={updateInput} name="email" type="email" placeholder="Email"/>
  </div>
</div>

<div class="field">
  <label class="label">Password</label>
  <div class="control">
    <input class="input" onChange={updateInput} name="password" type="password" placeholder="Password"/>
  </div>
</div>
   <input type='submit' class="button form-button" value='Sign up'/>
     </form>
  </div>

</div>
      </>
    );
  }
}

export default SignupModal;