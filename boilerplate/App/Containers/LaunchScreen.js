import React, { Component } from 'react'
import { I18nManager, View } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/CommonStyles'
import SettingsActions from '../Redux/SettingsRedux'
import LoginActions from '../Redux/LoginRedux'
import RNRestart from 'react-native-restart'
import SplashScreen from 'react-native-splash-screen'
import API from '../Services/Api'
import I18n from 'react-native-i18n'

const api = API.create()

class LaunchScreen extends Component {

	async componentDidMount (): void {

		// Arabic only app
		if (!I18nManager.isRTL) {
			I18nManager.forceRTL(true)
			RNRestart.Restart()
		}

		I18n.locale = this.props.settings.language
		I18n.fallbacks = true
		I18n.translations = {
			en: require('../I18n/languages/english.json'),
			ar: require('../I18n/languages/ar.json'),
		}

		// Launch data
		let request  = await api.getLaunchData()
		let data = request.data
		this.props.saveSettings({...this.props.settings, ...data})

		// With login feature
		if(this.props.login) {
			let request  = await api.checkLogin(this.props.login.token)
			let data = request.data
			this.props.saveLogin(data)
			this.props.navigation.navigate("MainNavigator")
		}else{
			this.props.navigation.navigate("LoginNavigator")
		}

		// Without login feature
		// this.props.navigation.navigate("MainNavigator")

		SplashScreen.hide()
	}

	render () {
		return (
			<View style={styles.mainContainer} />
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	saveSettings: (data) => dispatch(SettingsActions.settingsData(data)),
	saveLogin: (data) => dispatch(LoginActions.loginSuccess(data)),
})

const mapStateToProps = state => {
	return {
		settings: state.settings.data,
		login: state.login.data
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
