import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { StyleProvider } from 'native-base'
import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'

// Styles
import styles from './Styles/RootContainerStyles'
import ZadRoot from "../Components/Modals/ZadRoot"

class RootContainer extends Component {
	componentDidMount () {
		// if redux persist is not active fire startup action
		if (!ReduxPersist.active) {
			this.props.startup()
		}
	}

	render () {
		return (
			<StyleProvider style={getTheme(material)}>
				<View style={styles.applicationView}>
					<StatusBar barStyle='light-content'/>

					<ZadRoot>
						<ReduxNavigation/>
					</ZadRoot>
				</View>
			</StyleProvider>
		)
	}
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
	startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
