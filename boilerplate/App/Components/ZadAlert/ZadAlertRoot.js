import React, { Component } from 'react'
import { View } from 'react-native'
import ZadAlert from './ZadAlert'

export default class ZadAlertRoot extends Component {
	render () {
		return (
			<View style={{ flex: 1 }}>
				{this.props.children}
				<ZadAlert
					ref={c => {
						if (c) ZadAlert.zadAlertInstance = c
					}}
				/>
			</View>
		)
	}
}