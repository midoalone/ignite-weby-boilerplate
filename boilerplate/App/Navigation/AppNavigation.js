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
import {regularFont} from "../Config/Globals"
import Colors from "../Themes/Colors"

//START Import Screens
//END Import Screens

//START Stack Navigators
//END Stack Navigators

const LoginNavigator = createStackNavigator({
	LoginScreen: {screen: LoginScreen},
	RegisterScreen: {screen: RegisterScreen},
},
	{
		headerMode: 'none',
	})


const MainNavigator = createBottomTabNavigator({
	HomeScreen: {
		screen: MainScreen,
		navigationOptions: ({ screenProps }) => {
			const tabBarLabel = 'الرئيسية'
			const tabBarIcon = ({ tintColor }) => (
				<Image source={require('../Images/Icons/home.png')}
			style={{ width: 24, height: 24, tintColor }}/>
		)

			return { tabBarLabel, tabBarIcon }
		}
	}
}, {
	tabBarOptions: {
		activeTintColor: '#fdef02',
		inactiveTintColor: Colors.white,
		labelStyle: {
			fontSize: 10,
			fontFamily: regularFont
		},
		style: {
			backgroundColor: '#333333',
		}
	},
	initialRouteName: 'HomeScreen',
})

const AppNavigator = createSwitchNavigator(
	{
		LaunchScreen: {screen: LaunchScreen},
		MainNavigator: {screen: MainNavigator},
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
