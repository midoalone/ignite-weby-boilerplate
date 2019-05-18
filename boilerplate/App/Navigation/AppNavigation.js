import React from 'react'
import {
	createAppContainer,
	createBottomTabNavigator,
	createStackNavigator,
	createSwitchNavigator
} from 'react-navigation'

import LaunchScreen from '../Containers/LaunchScreen'
import styles from './Styles/NavigationStyles'
import MainScreen from '../Containers/MainScreen'
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'

const LoginNavigator = createStackNavigator({
	LoginScreen: {screen: LoginScreen},
	RegisterScreen: {screen: RegisterScreen},
},
	{
		headerMode: 'none',
	})

const AppNavigator = createSwitchNavigator(
	{
		LaunchScreen: {screen: LaunchScreen},
		MainNavigator: {screen: MainScreen},
		LoginNavigator: {screen: LoginNavigator}
	},
	{
		headerMode: 'none',
		initialRouteName: 'LaunchScreen',
		defaultNavigationOptions: {
			headerStyle: styles.header
		}
	}
)

export default createAppContainer(AppNavigator)
