import axios from 'axios'

const obj = {
	headers: {}
}

const token = localStorage.getItem('token')

if (token) {
	obj.headers.authorization = `Bearer ${token}`
}

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	...obj
})

export default instance
