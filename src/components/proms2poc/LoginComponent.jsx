import React, { Component } from 'react'

import AuthenticationService from '../../api/proms2poc/AuthenticationService.js'

class LoginComponent extends Component {

    constructor(props) {
        
        super();
        this.state = {
            username : 'ronan',
            password : 'dummy',
            hasLoginFailed : false,
            showSuccessMessage : false
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {

        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    loginClicked() {

       AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
       .then (
           (response) => {


console.log('Login success ' + response.data.token)

               AuthenticationService.registerSuccessfulLoginForJWT(this.state.username, response.data.token);
               this.props.history.push(`/welcome/${this.state.username}`);

               console.log('Login success 1 ' + response.data.token)

               this.setState({showSuccessMessage:true})
           this.setState({hasLoginFailed:false})

           console.log('Login success 2 ' + response.data.token)
           }
       )
       .catch ( () => {    
           
        console.log('Login fail')

           this.setState({showSuccessMessage:false})
           this.setState({hasLoginFailed:true})
        })
       
        console.log(this.state);
    }

    render() {
        return (
            <>
            <h1>Login</h1>
            <div className="container">
            {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />
            <ShowLoginSuccessful showSuccessMessage={this.state.showSuccessMessage} />*/}

            {this.state.hasLoginFailed && <div>Invalid Login</div>}
            {this.state.showSuccessMessage && <div>Login Success</div>}
          

            User name:<input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
            Password: <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
            <input className="btn btn-success" type="button" value="Login" onClick={this.loginClicked}/>
            </div>
            </>
        )
    }
}
export default LoginComponent