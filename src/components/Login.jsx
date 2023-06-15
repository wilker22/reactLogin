import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';

class Login extends Component {

    state = {
        email: '',
        password: '',
        message: ''
    }

    // Login Form Submit 
    formSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/login', data)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                this.setState({
                    loggedIn: true
                })
                this.props.setUser(response.data.user);
            })
            .catch((error) => {
                this.setState({ message: error.response.data.message })
            });
    }



    render() {

        // After Login Redirect To Profile 
        if (this.state.loggedIn) {
            return <Redirect to={'/profile'} />
        }

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

        if (localStorage.getItem('token')) {
            return <Redirect to={'profile'} />
        }


        return (
            <div><br></br><br></br>
                <div class="row">
                    <div class="jumbotron col-lg-4 offset-lg-4">
                        <h3 class="text-center">Login Account</h3>

                        <form onSubmit={this.formSubmit} >
                            {error}
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" name="email" class="form-control" required onChange={(e) => { this.setState({ email: e.target.value }) }} />

                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" name="password" class="form-control" required onChange={(e) => { this.setState({ password: e.target.value }) }} />
                            </div>

                            <button type="submit" class="btn btn-primary btn-block">Login</button>
                            <br></br>
                            Forget My Password <Link to="/forget">Click Here</Link>
                        </form>

                    </div>

                </div>
            </div>
        )
    }
}

export default Login
