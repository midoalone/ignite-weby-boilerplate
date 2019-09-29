import React, { Component } from 'react'
import { View } from 'react-native'
import ZadModal from './Modal'

export default class ZadRoot extends Component {
	render () {
		return (
			<View style={{ flex: 1 }}>
				{this.props.children}
				<ZadModal
					ref={c => {
						if (c) ZadModal.zadModalInstance = c
					}}
				/>
			</View>
		)
	}
}