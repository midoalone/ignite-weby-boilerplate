import React from 'react'
import { BackHandler, Platform } from 'react-native'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import {NavigationActions} from 'react-navigation'

const mapStateToProps = state => {
	return {
		nav: state.nav
	}
}

const ConnectedNavigator = connect(mapStateToProps)(AppNavigation)

class ReduxNavigation extends React.Component {
	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
	}

	onBackPress = () => {
		const { dispatch, nav } = this.props;
		if (nav.index === 0) {
			return false;
		}

		dispatch(NavigationActions.back());
		return true;
	};

	render () {
		return <ConnectedNavigator/>
	}
}

export default connect(mapStateToProps)(ReduxNavigation)
