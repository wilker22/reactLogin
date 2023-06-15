import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';

class Reset extends Component {
     state = {
          token: '',
          email: '',
          password: '',
          password_confirmation: '',
          message: ''
     }

     // Reset Form Submit 
     formSubmit = (e) => {
          e.preventDefault();
          const data = {
               token: this.state.token,
               email: this.state.email,
               password: this.state.password,
               password_confirmation: this.state.password_confirmation
          }

          axios.post('/resetpassword', data)
               .then((response) => {
                    this.setState({ message: response.data.message })
                    document.getElementById("formsubmit").reset();
               })
               .catch((error) => {
                    this.setState({ message: error.response.data.message })
               });
     }



     render() {

          /// Show Error Message 
          let error = "";
          if (this.state.message) {
               error = (
                    <div>
                         <div class="alert alert-danger" role="alert" >
                              {this.state.message}
                         </div>
                    </div>
               )
          } // end error message 


          return (

               <div><br></br><br></br>
                    <div class="row">
                         <div class="jumbotron col-lg-4 offset-lg-4">
                              <h3 class="text-center">Reset Account</h3>

                              <form onSubmit={this.formSubmit} id="formsubmit">
                                   {error}
                                   <div class="form-group">
                                        <label for="exampleInputEmail1">Pin Code </label>
                                        <input type="text" name="token" class="form-control" required onChange={(e) => { this.setState({ token: e.target.value }) }} />
                                   </div>


                                   <div class="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" name="email" class="form-control" required onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                   </div>


                                   <div class="form-group">
                                        <label for="exampleInputPassword1">New Password</label>
                                        <input type="password" name="password" class="form-control" required onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                   </div>

                                   <div class="form-group">
                                        <label for="exampleInputPassword1">Confirm Password</label>
                                        <input type="password" name="password_confirmation" class="form-control" required onChange={(e) => { this.setState({ password_confirmation: e.target.value }) }} />
                                   </div>

                                   <button type="submit" class="btn btn-primary btn-block">Reset Password </button>
                                   <br></br>
                                   Have an Account? <Link to="/login">Login Here</Link><br></br>
                                   Forget My Password <Link to="/forget">Click Here</Link>
                              </form>

                         </div>

                    </div>
               </div>


          )
     }
}

export default Reset
