import {NavigationActions, StackActions} from 'react-navigation'
import {StatusBar} from "react-native"
import {isAndroid} from "../Config/Globals"

let _navigator

function setTopLevelNavigator(navigatorRef) {
	_navigator = navigatorRef
}

function navigate(routeName, params) {
	StatusBar.setBarStyle('dark-content')
	isAndroid && StatusBar.setBackgroundColor('#efbd8b')

	_navigator.dispatch(
		NavigationActions.navigate({
			type: 'Navigation/NAVIGATE',
			routeName,
			params,
		}),
	)
}

function navigateMainNavigator(routeName, params) {
	_navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		}),
	)
}

function goBack() {
	_navigator.dispatch(
		NavigationActions.back({
			key: null,
		})
	)
}

function reset(routeName, params) {
	_navigator.dispatch(
		StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName,
					params,
				}),
			],
		})
	)
}

export default {
	setTopLevelNavigator,
	navigateMainNavigator,
	reset,
	navigate,
	goBack,
}
