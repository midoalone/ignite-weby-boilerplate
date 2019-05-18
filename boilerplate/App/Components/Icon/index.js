import React, { Component } from 'react'
import { Icon as BaseIcon } from 'native-base'
import { I18nManager, StatusBar } from 'react-native'
import Colors from '../../Themes/Colors'

export default class Icon extends Component {

	constructor (props) {
		super(props)
	}

	render () {
		return (
			<BaseIcon
				name={this.props.name}
				style={{
					color: Colors[this.props.color ? this.props.color : 'main'],
					transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
				}}
			/>
		)
	}
}
