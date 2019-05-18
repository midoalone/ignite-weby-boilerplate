import React, { Component } from 'react'
import { View } from 'react-native'

// Styles
import styles from './Styles/CommonStyles'
import { Text } from 'native-base'

export default class MainScreen extends Component {
	render () {
		return (
			<View style={styles.mainContainer}>
				<Text style={{textAlign: 'left'}}>Main Screen</Text>
			</View>
		)
	}
}
