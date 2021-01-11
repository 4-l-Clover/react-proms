import React, { Component } from 'react'
import ObligorSummaryDataService from '../../api/proms2poc/ObligorSummaryDataService.js'
import HelloWorldService from '../../api/proms2poc/HelloWorldService.js'

import {convertObligorStatusToString} from './HelperComponent'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from '../../constants/axios'

class WelcomeComponent extends Component {

    constructor(props) {

        super(props);
        this.state = {
            welcomeMessage : '',
            recentObligors : ''
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.searchRecent = this.searchRecent.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleErrorResponse = this.handleErrorResponse.bind(this);

        this.getRecent = this.getRecent.bind(this);
        this.viewObligorDashboard = this.viewObligorDashboard.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);    
        this.validate = this.validate.bind(this);
 
    }

    
    componentDidMount() {

        axios.get('jpa/obligorsummaries/findtop3byid')
        // ObligorSummaryDataService.retrieve3MostRecentObligors()
        .then ( response => {

            console.log(`Setting Obligors to response in welcome screen: ${response.data.content}`)
            this.setState({recentObligors : response.data.content})
        }
        )
    }

    render() {

        let searchString = this.state.searchString

        return (
            <>

            <div className="container">
                Welcome 
            </div>
            <div className="container">
                <button onClick={this.retrieveWelcomeMessage} className="button btn-success">Test Backend Connection</button>
            </div>
            <div className="container">
                {this.state.welcomeMessage}
            </div>

            <h1>Search Form</h1>
            <div className="container">

            <Formik initialValues={{searchString}}
                onSubmit={this.onSubmit} 
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="searchString" component="div" className="alert alert-warning"/>
                        
                            <fieldset className="form-group">
                                <label>Search string</label>
                                <Field className="form-control" type="text" name="searchString"></Field>
                            </fieldset>
                            <button type="submit" className="btn btn-success">Search</button>
                        </Form>
                    )
                }
            </Formik>
            </div>



            {/*Recent deals*/}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ObligorRef</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.getRecent()
                    }
                </tbody>
            </table>

            </>
        )
    }

    getRecent() {

        if (this.state.recentObligors)
        {           
            return (     
                this.state.recentObligors.map (
                    (obligor) =>
                    <tr key={obligor.id}>
                        <td>{obligor.id}</td>
                        <td>{obligor.ref}</td>
                        <td>{convertObligorStatusToString(obligor.obligorStatusId)}</td>
                        <td><button className="btn btn-success" onClick={() => this.viewObligorDashboard(obligor.id)}>View</button></td> 
                    </tr>
                                                                  

                )
            )
        }
        else
        {
            return (<tr><td>No drafts found</td></tr>)
        }
 
    }

    validate(values) {

        let errors = {}
        
        if (!values.searchString) {
            errors.ref = 'Enter a search string'
        } 

        return errors;
    }

    onSubmit(values) {

        let searchString = values.searchString;
        this.props.history.push(`/search/${searchString}`)
    
    }

    searchRecent() {

        ObligorSummaryDataService.retrieve10MostRecentObligors()
        .then(
            response => this.handleSuccessfulSearchResponse(response)
        )
        .catch(
            error => this.handleErrorResponse(error)
        )
    }

    retrieveWelcomeMessage() {


        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then(
            response => this.handleSuccessfulResponse(response)
        )
        .catch(
            error => this.handleErrorResponse(error)
        )
    }

    handleSuccessfulResponse(response) {

        this.setState(
            {
                welcomeMessage : response.data.message
            }
        )
    }

    viewObligorDashboard(id) {
        this.props.history.push(`/obligors/${id}`)
    }
    
    handleSuccessfulSearchResponse(response) {

        /*
        this.setState(
            {
                welcomeMessage : 
            }
        )
        */
    }

    handleErrorResponse(error) {

        let errorMessage = '';

        if (error.message)
            errorMessage +=error.message;

        if (error.response && error.response.data)
        errorMessage += error.response.data.message;
        
        this.setState(
            {
                welcomeMessage : errorMessage
            }
        )
    }
}


export default WelcomeComponent