import axios from 'axios';
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Register extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    message: ''
  }

  //register form submit
  formSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,

    }

    axios.post('/register', data)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        this.setState({
          loggedIn: true
        })
        this.props.setUser(response.data.user)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {

    //after register redirect to profile
    if (this.state.loggedIn) {
      return <Redirect to={'/profile'} />
    }

    return (
      <div>
        <br /><br />
        <div className="row">

          <div className="jumbotron col-lg-4 offset-lg-4">

            <h3 className="text-center">
              Registrar Conta
            </h3>

            <form onSubmit={this.formSubmit}>
              <div class="form-group">
                <label >Nome de Usuário</label>
                <input type="text" name='name'
                  class="form-control"
                  placeholder="Nome"
                  required onChange={(e) => { this.setState({ name: e.target.value }) }} />

              </div>
              <div class="form-group">
                <label >Endereço de email</label>
                <input type="email" name='email'
                  class="form-control"
                  placeholder="Seu email"
                  required onChange={(e) => { this.setState({ email: e.target.value }) }} />

              </div>
              <div class="form-group">
                <label >Senha</label>
                <input type="password" class="form-control"
                  placeholder="Senha" name='password'
                  required onChange={(e) => { this.setState({ password: e.target.value }) }} />
              </div>
              <div class="form-group">
                <label>Confirmação da Senha</label>
                <input type="password" class="form-control"
                  placeholder="Confirme a Senha" name='password_confirmation'
                  required onChange={(e) => { this.setState({ password_confirmation: e.target.value }) }} />
              </div>

              <button type="submit" class="btn btn-primary btn-block">Registrar</button>
              Já possui conta ? <Link to='/login'>clique aqui</Link> <br />
              Esqueci minha senha <Link to='/forget'>clique aqui</Link>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register