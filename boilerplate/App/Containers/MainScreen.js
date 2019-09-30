import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container} from 'native-base'
import {Colors} from '../Themes'
import LoginActions from "../Redux/LoginRedux"
import AppHeader from "../Components/Header"
import {Content} from "../Components/Content"

class MainScreen extends Component {

	render() {
		return (
			<Container>

				<AppHeader title={"Home Page"} />

				<Content padder>

				</Content>
			</Container>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		settings: state.settings.data,
		login: state.login.data
	}
}

const mapDispatchToProps = dispatch => {
	return {
		saveLoginData: data => {
			dispatch(LoginActions.loginSuccess(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
