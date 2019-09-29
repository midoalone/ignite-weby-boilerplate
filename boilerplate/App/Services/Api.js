// a library to wrap and simplify api calls
import apisauce from "apisauce"
import {baseUrl} from "../Config/Globals"

// our "constructor"
const create = (baseURL = baseUrl) => {
	const api = apisauce.create({
		baseURL,
		headers: {
			"Cache-Control": "no-cache"
		},
		timeout: 10000
	})

	// Global get data
	const getData = (endpoint, params = {}, method = 'get') => api[method](endpoint, params)

	// Account API
	const checkLogin = (data) => api.post('login', data)
	const verifyCode = (data) => api.post('verify', data)
	const registerAccount = (data) => api.post('register_account', {...data})
	const changePassword = (data) => api.post('change_password', data)

	// Upload API
	const uploadPhoto = (photo, extras) => {
		const data = new FormData()

		data.append('photo', {
			uri: photo.uri,
			type: photo.type ? photo.type : 'image/jpeg',
			name: photo.fileName
		})

		if (extras) {
			extras.map((extra) => {
				data.append(extra.key, extra.value)
			})
		}

		return api.post('upload_photo', data)
	}

	return {
		checkLogin,
		verifyCode,
		registerAccount,
		changePassword,
		getData,
		uploadPhoto,
	}
}

// let's return back our create method as the default.
export default {
	create
}
