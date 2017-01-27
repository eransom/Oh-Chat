import React, { Component } from 'react';
import base from './config'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state={
      messages: [],
      userName: ""
    }
    this.auth = base.auth()
  }

  componentDidMount() {
    base.syncState(`messages`, {
    context: this,
    state: 'messages',
    asArray: true
  });
}


    signUp(e) {
      e.preventDefault()
      var password = this.password.value
    if (password.length < 6) {
     alert('Password must be 6 or more characters')
    } else {
     base.createUser({
        email: this.email.value,
        password: this.password.value
      }, this.authStateChanged.bind(this))
      console.log(this.email.value)
    }
      this.email.value = ''
      this.password.value = ''
    }

    signIn(e) {
      e.preventDefault()
      base.authWithPassword({
       email: this.email.value,
       password: this.password.value
     }, this.authStateChanged.bind(this)).catch(err => console.error(err))

      }

    signOut(){
      base.unauth()
    }

    authStateChanged (error, user) {
      if (error) {
        console.log(error)
        alert('wrong password')
      } else if (user) {
        console.log(user.email)
            this.setState({
              userName: user.email
            })
          }
        }

    addMessage (e) {
        e.preventDefault()
        let text = this.input.value
        let newMessage = {
          text: text,
          email: this.state.userName
        }
        let newMessageArray = this.state.messages.concat(newMessage)
        console.log('Message is: ', newMessage)
        this.setState({
          messages: newMessageArray
        })
      }




  render() {
    return (
      <form className="App">
          <h2>Please Login</h2>
          <input ref={element => this.email = element} placeholder="Email Address"/>
          <input ref={element => this.password = element} placeholder="Password"/>
          <button onClick={this.signIn.bind(this)} hidden={this.state.userName} className="log-in">Login</button>

          <h2>No Account?Please Sign Up</h2>
          <button onClick={this.signUp.bind(this)} hidden={this.state.userName} className="signUp">Sign Up!!</button>
          <button onClick={this.signOut.bind(this)} hidden={!this.state.userName} className="log-in">Sign Out</button>

          <h2 hidden={!this.state.userName}>Oh User</h2>
          <div hidden={!this.state.userName}>{this.state.messages.map((message, index) => {
            return <p key={index}>{message.text}</p>})
            }
          </div>
          <input ref={input => this.input = input} hidden={!this.state.userName} placeholder="Message"/>
          <button onClick={this.addMessage.bind(this)} hidden={!this.state.userName} className="msg-btn">Say Something</button>
      </form>
    );
  }
}

export default App;
