import Axios from 'axios'

import { JPA_API_URL } from './Constants'

class EnquiryDataService { 

    retrieveEnquiry(id) {
        return Axios.get(`${JPA_API_URL}/enquiries/getbyid/${id}`)
    }
  
}

export default new EnquiryDataService