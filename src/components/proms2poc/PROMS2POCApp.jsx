import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import PropTypes from 'prop-types';


import HeaderComponent from './HeaderComponent'
// import FooterComponent from './FooterComponent'
import ErrorComponent from './ErrorComponent'
import LogoutComponent from './LogoutComponent'
import ListObligorsComponent from './ListObligorsComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import ObligorComponent from './ObligorComponent'
import EnquiryComponent from './EnquiryComponent'

import AuthenticatedRoute from './AuthenticatedRoute'

// import { render } from '@testing-library/react';
// import AuthenticationService from '../../api/proms2poc/AuthenticationService';

//PROMS2POCApp
class PROMS2POCApp extends Component {

    render() {
        return (
          <div className="PROMS2POCApp">

            <Router>
                <>
                <HeaderComponent />
                <Switch>
                    <Route path="/" exact component={LoginComponent} />
                    <Route path="/login" component={LoginComponent} />
                    <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                    <AuthenticatedRoute path="/obligors/:id" component={ObligorComponent} />
                    <AuthenticatedRoute path="/enquiries/:id" component={EnquiryComponent} />
                    <AuthenticatedRoute path="/search/:searchString" component={ListObligorsComponent} />
                    <AuthenticatedRoute path="/search" component={ListObligorsComponent} />
                    <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                    
                    <Route component={ErrorComponent} />
                </Switch>
                
                </>
            </Router>

          </div>
        );
      }
      
}


export default PROMS2POCApp;
  
