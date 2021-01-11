import React, { Component } from 'react'
import ObligorSummaryDataService from '../../api/proms2poc/ObligorSummaryDataService.js'

import {convertObligorStatusToString} from './HelperComponent'

class ListObligorsComponent extends Component {

    constructor(props) {


        
        super(props);
        this.state = {
            searchString : this.props.match.params.searchString,
            obligors : [], 
            message: null
        }

        console.log(`Con22Search: ${this.props.match.params.searchString}`)

        this.viewObligorDashboard = this.viewObligorDashboard.bind(this);
        this.createNewObligor = this.createNewObligor.bind(this);
        this.getRecentObligors = this.getRecentObligors.bind(this);
        this.searchObligorsContainingRef = this.searchObligorsContainingRef.bind(this);
    }

    componentDidMount() {

        console.log(`Search: ${this.state.searchString}`)
        if (this.state.searchString != null) {
            
            //Search for obligors with ref containing searchString
            this.searchObligorsContainingRef(this.state.searchString);

        } else {

            //Get 10 most recent obligors
            this.getRecentObligors();
        }
    }

    searchObligorsContainingRef(searchString) {

        console.log('Getting Obligors from using searchString: ' + searchString);
        ObligorSummaryDataService.searchByRefContainingString(searchString)
        .then ( response => {

            console.log(`Setting Obligors to response: ${response.data.content}`)
            this.setState({obligors : response.data.content})
        }
        )

    }

    getRecentObligors() {

        
        console.log('Getting Obligors from Server');
        ObligorSummaryDataService.retrieve10MostRecentObligors()
        .then ( response => {

            console.log(`Setting Obligors to response: ${response.data.content}`)
            this.setState({obligors : response.data.content})
        }
        )

    }

    viewObligorDashboard(id) {
        this.props.history.push(`/obligors/${id}`)
    }

    createNewObligor(id) {
        console.log('create ' + -1)
        this.props.history.push(`/obligors/-1`)
    }

    render() {
        return (
            <>

            <h1>Obligor Search Results</h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="container">

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ObligorRef</th>
                            <th>Status</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.obligors.map (
                                obligor =>
                                <tr key={obligor.id}>
                                    <td>{obligor.id}</td>
                                    <td>{obligor.ref}</td>
                                    <td>{convertObligorStatusToString(obligor.obligorStatusId)}</td>
                                    <td><button className="btn btn-success" onClick={() => this.viewObligorDashboard(obligor.id)}>View</button></td>                       
                                </tr>
        


                            )
                        }
                    </tbody>
                </table>

                {/*
                <div className="row">
                    <button className="btn btn-success" onClick={this.createNewObligor}>Add</button>
                </div>
                */}

            </div>
            </>
        )
    }

}

export default ListObligorsComponent