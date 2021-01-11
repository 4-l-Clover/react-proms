import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import AuthenticationService from '../../api/proms2poc/AuthenticationService';
import { withRouter } from 'react-router';

class HeaderComponent extends Component {

    render() {

        let isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log('U: ' + isUserLoggedIn)

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/ronan">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/search">Obligor Search</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        );
      }
      
}

export default withRouter(HeaderComponent)