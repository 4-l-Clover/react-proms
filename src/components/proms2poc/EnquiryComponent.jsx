import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import EnquiryDataService from '../../api/proms2poc/EnquiryDataService.js';
import AuthenticationService from '../../api/proms2poc/AuthenticationService.js'

class EnquiryComponent extends Component {


    
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.match.params.id,
            enquiry : ''
        }

        this.loadEnquiry = this.loadObligor.bind(this) 
        
    } 

    componentDidMount() {
        

        console.log('componentDidMount enquiryId: ' + this.state.id);
        if (this.state.id == -1) {
            return
        }
        this.loadEnquiry(this.state.id)

    }

    loadObligor(id) {

        
        console.log('Getting Enquiry from Server');
        EnquiryDataService.retrieveEnquiry(id)
        .then ( response => {

            console.log(`Ref: ${response.data.id}`)
            this.setState({enquiry : response.data})
        }
        )

    }


    getBuildings() {  

        if (this.state.enquiry.buildings)
        {           
            return (     
                this.state.enquiry.buildings.map (
                    (building) =>
                    <tr key={building.id}>
                        <td>{building.id}</td>
                        <td>{building.buildingRef}</td>
                    </tr>                                                                   

                )
            )
        }
        else
        {
            return (<tr><td>No buildings found</td></tr>)
        }
    }
       
    

    render() {

        let enquiry = this.state.enquiry
       
        return (
        <div>

            <h1>Enquiry</h1>
            <div className="container">
            <Formik initialValues={{enquiry}}
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize={true}>
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="snapshotStatusId" component="div" className="alert alert-warning"/>
                            
                            <fieldset className="form-group">
                                <label>Exposure Type</label>
                                <Field className="form-control" type="text" name="enquiry.investmentType"></Field>
                            </fieldset>

                            <fieldset className="form-group">
                                <label>High-level Asset Data</label>
                                <Field className="form-control" type="text" name="enquiry.simplifiedInputs"></Field>
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Loan Class</label>
                                <Field className="form-control" type="text" name="enquiry.vehicleId"></Field>
                            </fieldset>
                            
                            {/*<button type="submit" className="btn btn-success">Update</button>*/}

                            <table>
                                {this.getBuildings()}
                            </table>
                        </Form>
                    )
                }
            </Formik>
            </div>
            Viewing EnquiryId: {this.props.match.params.id}
            
        </div>
        )
    }


}


export default EnquiryComponent