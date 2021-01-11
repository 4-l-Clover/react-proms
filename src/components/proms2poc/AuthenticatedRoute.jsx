
import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from '../../api/proms2poc/AuthenticationService.js'

class AuthenticatedRoute extends Component {

    render() {

        //console.log("AR: " + AuthenticationService.isUserLoggedIn())
        if (AuthenticationService.isUserLoggedIn()) {

           return <Route {...this.props} />
        } else {
           return  <Redirect to="/login" />
        }
    }
}

export default AuthenticatedRoute