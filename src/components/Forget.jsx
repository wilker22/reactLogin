import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

class Forget extends Component {

    state = {
        email: '',
        message: ''
    }

    // Forget Form Submit 
    formSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email
        }

        axios.post('/forgetpassword', data)
            .then((response) => {
                this.setState({ message: response.data.message })
                document.getElementById("forgetform").reset();
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
                        <h3 class="text-center">Forget Password</h3>

                        <form onSubmit={this.formSubmit} id="forgetform">
                            {error}
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" name="email" class="form-control" required onChange={(e) => { this.setState({ email: e.target.value }) }} />

                            </div>


                            <button type="submit" class="btn btn-primary btn-block">Forget Password</button>
                            <br></br>
                            Have an Account? <Link to="/login">Login Here</Link>
                            <br></br>
                            Don't have Account? <Link to="/register">Register</Link>

                        </form>

                    </div>

                </div>
            </div>
        )
    }
}

export default Forget
