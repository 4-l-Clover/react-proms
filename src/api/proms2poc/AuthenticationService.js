import axios from 'axios'
import { API_URL } from './Constants'

// export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'token'

class AuthenticationService {
	executeBasicAuthenticationService(username, password) {
		return axios.get(`${API_URL}/basicauth`, {
			headers: {
				authorization: this.createBasicAuthToken(username, password)
			}
		})
	}

	executeJwtAuthenticationService(username, password) {
		return axios.post(`${API_URL}/authenticate`, {
			username,
			password
		})
	}

	createBasicAuthToken(username, password) {
		let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
		return basicAuthHeader
	}

	createJWTToken(token) {
		return 'Bearer ' + token
	}

	registerSuccessfulLogin(username, password) {
		let basicAuthHeader = this.createBasicAuthToken(username, password)

		sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
		this.setupAxoisInterceptors(basicAuthHeader)
	}

	registerSuccessfulLoginForJWT(username, token) {
		sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
		this.setupAxoisInterceptors(this.createJWTToken(token))
	}

	logout() {
		sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
	}

	isUserLoggedIn() {
		let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)

		if (user === null) {
			console.log('User not logged in')
			return false
		}
		//console.log("User logged in")
		return true
	}

	getLoggedInUserName() {
		let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)

		if (user === null) {
			return 'Empty'
		}
		return user
	}

	setupAxoisInterceptors(token) {
		console.log('executed service')

		axios.interceptors.request.use(config => {
			if (this.isUserLoggedIn) {
				config.headers.authorization = token
			}
			return config
		})
	}
}

export default new AuthenticationService()
