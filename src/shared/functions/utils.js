export function createBasicAuthToken(username, password) {
	let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
	return basicAuthHeader
}

export function setLocalStorage(key, value) {
	localStorage.setItem(key, value)
}

export function getLocalStorage(key) {
	return localStorage.getItem(key)
}

export function removeLocalStorage(key) {
	localStorage.removeItem(key)
}

export function isAuthenticated() {
	const token = getLocalStorage('token')
	if (token) return true
	return false
}

export function convertObligorStatusToString(status) {
	if (status === 8) return 'Live'
	if (status === 1) return 'At Enquiry'
	return status
}
