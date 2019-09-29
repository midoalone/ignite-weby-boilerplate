import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View} from 'native-base'
import LoaderHud from "../Components/LoaderHud"
import API from '../Services/Api'
import {TWAlert} from "../Lib/functions"
import PropTypes from 'prop-types'

class APILoader extends Component {

	state = {
		loading: false
	}

	componentDidMount() {
		this.props.onRef(this)

		this.getData().done()
	}

	componentWillUnmount() {
		this.props.onRef(null)
	}

	async getData() {
		const {onLoad, endpoint, params, login} = this.props

		const api = API.create()

		this.setState({loading: true})

		let request = await api.getData(endpoint, {...params, api_token: login.api_token})
		let data = request.data

		if(data.error) {
			TWAlert("تنبيه", data.message)
			return
		}

		onLoad(data.data)

		this.setState({loading: false})
	}

	render() {
		return (
			<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
				<LoaderHud show={this.state.loading} />
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		login: state.login.data
	}
}

APILoader.propTypes = {
	onLoad: PropTypes.func.isRequired,
	endpoint: PropTypes.string.isRequired,
	params: PropTypes.object
}

APILoader.defaultProps = {
	params: {}
}

export default connect(mapStateToProps, null)(APILoader)
