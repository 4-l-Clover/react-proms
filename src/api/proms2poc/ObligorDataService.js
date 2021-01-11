import Axios from 'axios'

import { JPA_API_URL } from './Constants'

class ObligorDataService { 

    retrieve10MostRecentObligors() {
       return Axios.get(`${JPA_API_URL}/obligors/findtop10byid`)
    }

    retrieveObligor(id) {
        return Axios.get(`${JPA_API_URL}/obligors/getbyid/${id}`)
    }

    searchByRefContainingString(ref) {
        return Axios.get(`${JPA_API_URL}/obligors/contains/${ref}`)
    }
  
}

export default new ObligorDataService