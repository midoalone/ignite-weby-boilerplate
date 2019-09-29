import API from "../Services/Api"
import {TWAlert} from "../Lib/functions"

export default class APICaller {
	constructor() {
		this.api = API.create()
	}

	async call({onLoad, endpoint, params, api_token, method, beforeCall, endCall}) {
		beforeCall ? beforeCall() : null

		let request = await this.api.getData(endpoint, {...params, api_token}, method)
		let data = request.data

		if(data.error) {
			TWAlert("تنبيه", data.errors ? data.errors.join("\n") : 'حدث خطأ اثناء اتمام العملية!')
			endCall ? endCall() : null
			return
		}

		onLoad(data.data)

		endCall ? endCall() : null
	}
}
