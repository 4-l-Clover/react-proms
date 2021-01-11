import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ObligorDataService from '../../api/proms2poc/ObligorDataService.js';
import AuthenticationService from '../../api/proms2poc/AuthenticationService.js'
import axios from '../../constants/axios'
class ObligorComponent extends Component {


    
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.match.params.id,
            obligor : ''
        }

        this.onSubmit = this.onSubmit.bind(this)        
        this.validate = this.validate.bind(this)
        this.loadObligor = this.loadObligor.bind(this)

        this.viewDraftPropertyEntry = this.viewDraftPropertyEntry.bind(this);
        
        
    } 

    componentDidMount() {
        

        console.log('componentDidMount id: ' + this.state.id);
        if (this.state.id == -1) {
            return
        }

        //let username = AuthenticationService.getLoggedInUserName();
        //console.log('username: ' + username);

        this.loadObligor(this.state.id)

    }

    loadObligor(id) {

        
        console.log('Getting Obligor from Server');
        // ObligorDataService.retrieveObligor(id)
        axios.get(`jpa/obligors/getbyid/${id}`)
        .then ( response => {

            console.log(`Ref: ${response.data.ref}`)
            this.setState({obligor : response.data})
        }
        )

    }

    validate(values) {

        let errors = {}
        
        if (!values.obligor.ref) {
            errors.ref = 'Enter a desc'
        } else if (values.obligor.ref.length<5) {
            errors.ref = 'Desc should be longer than 5 chars'
        } 


        //if (!moment(values.targetDate).isValid) {
        //    errors.description = 'Enter a valid date'
        //}
        return errors;
    }

    onSubmit(values) {

        let obligor = {
            id : this.state.id,
            ref : values.ref,
            obligorStatusId : values.obligorStatusId
        }
        if (this.state.id == -1) {
            //New
            ObligorDataService.createObligor(obligor).then( () => {
                this.props.history.push('/search')
            })
        } else {
            //Existing
            ObligorDataService.updateObligor(this.state.id, obligor).then( () => {
                this.props.history.push('/search')
            })

        }


    }

    viewDraftPropertyEntry(id) {
        this.props.history.push(`/enquiries/${id}`)
    }

    getDashboardEnquiries() {  

        if (this.state.obligor.enquiries)
        {           
            return (     
            this.state.obligor.enquiries.map (
                    (enquiry) =>
                    <tr key={enquiry.id}>
                        <td>{enquiry.id}</td>
                        <td>{enquiry.snapshotStatusId}</td>
                        <td>{enquiry.comments1}</td>
                        <td><button className="btn btn-success" onClick={() => this.viewDraftPropertyEntry(enquiry.id)}>View/Update</button></td>  
                    </tr>                                                                   

                )
            )
        }
        else
        {
            return (<tr><td>No drafts found</td></tr>)
        }
    }
       
    

    render() {
        let ref = this.state.obligor.ref
        let obligorStatusId = this.state.obligor.obligorStatusId

        let enquiries = this.state.obligor.enquiries
        let enquiriesMap = ''
        if (enquiries)
            enquiriesMap = enquiries.map;
        


        console.log(`ref: ${ref}`)
        console.log(`enquiries: ${enquiries}`)
        console.log(`enquiries: ${enquiriesMap}`)

        return (
        <div>

            <h1>Obligor</h1>
            <div className="container">
            <Formik initialValues={{ref, obligorStatusId}}
                onSubmit={this.onSubmit} 
                validate={this.validate}
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize={true}>
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="ref" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="obligorStatusId" component="div" className="alert alert-warning"/>
                            
                            <fieldset className="form-group">
                                <label>Obligor Ref</label>
                                <Field className="form-control" type="text" name="ref"></Field>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Status</label>
                                <Field className="form-control" type="text" name="obligorStatusId"></Field>
                            </fieldset>
                            
                            {/*<button type="submit" className="btn btn-success">Update</button>*/}
                        </Form>
                    )
                }
            </Formik>







            <h4>Drafts for this Obligor</h4>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.getDashboardEnquiries()
                            }
                            
                        </tbody>
                    </table>

                    {/*
                    <div className="row">
                        <button className="btn btn-success" onClick={this.createNewObligor}>Add</button>
                    </div>
                    */}

                </div>



            </div>
            Viewing ObligorId: {this.props.match.params.id}
            
        </div>
        )
    }


}


export default ObligorComponent