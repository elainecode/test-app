import React, { Fragment, Component } from 'react';
import './css/signupmodal.css';

class SignupModal extends Component {

  state = {
    username: ''
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
    const {displaySignupModal} = this.props
    return (
      <>
        <div class="modal-background" onClick={displaySignupModal}></div>
      <div id="signup" class="card">
 
  <div class="card-content">
  <form>
  <a id="delete" class="delete is-small" onClick={displaySignupModal}></a>
  <p class="title is-4">Sign up</p>
  

<div class="field">
  <label class="label">Username</label>
  <div class="control">
    <input class="input" type="text" placeholder="username" value=""/>
</div>
</div>

<div class="field">
  <label class="label">Email</label>
  <div class="control">
    <input class="input" type="email" placeholder="Email" value=""/>
  </div>
</div>

<div class="field">
  <label class="label">Password</label>
  <div class="control">
    <input class="input" type="password" placeholder="Password" value=""/>
  </div>
</div>

   <a class="button form-button">Sign up</a>
     </form>
  </div>

</div>
      </>
    );
  }
}

export default SignupModal;