import Axios from 'axios'

import { JPA_API_URL } from './Constants'

class ObligorDataService {
	retrieve10MostRecentObligors() {
		return Axios.get(`${JPA_API_URL}/obligorsummaries/findtop10byid`)
	}

	retrieve3MostRecentObligors() {
		return Axios.get(`${JPA_API_URL}/obligorsummaries/findtop3byid`)
	}

	retrieveObligor(id) {
		return Axios.get(`${JPA_API_URL}/obligorsummaries/getbyid/${id}`)
	}

	searchByRefContainingString(ref) {
		return Axios.get(`${JPA_API_URL}/obligorsummaries/contains/${ref}`)
	}
}

export default new ObligorDataService()
