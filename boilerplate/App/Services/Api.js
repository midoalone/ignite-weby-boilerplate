// a library to wrap and simplify api calls
import apisauce from "apisauce"
import { baseUrl } from "../Config/Globals"

// our "constructor"
const create = (baseURL = baseUrl) => {
	const api = apisauce.create({
		baseURL,
		headers: {
			"Cache-Control": "no-cache"
		},
		timeout: 10000
	})

	const getLaunchData = () => api.post("launch")

	const checkLogin = (data) => api.post('check_login', data)
	const verifyCode = (data) => api.post('verify_code', data)
	const registerAccount = (data) => api.post('register_account', {...data})
	const changePassword = (data) => api.post('change_password', data)

	const uploadPhoto = (photo, extras) => {
		const data = new FormData()

		data.append('photo', {
			uri: photo.uri,
			type: photo.type ? photo.type : 'image/jpeg',
			name: photo.fileName
		})

		if(extras) {
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
		getLaunchData,
		uploadPhoto,
	}
}

// let's return back our create method as the default.
export default {
	create
}
