import TextInputMask from 'react-native-text-input-mask'
import Colors from '../../Themes/Colors'
import React, {Component} from 'react'

export default class FormPhone extends Component {
	render() {
		return (
			<TextInputMask
				{...this.props}
				onChangeText={(formatted, extracted) =>
					this.props.onChangeText
						? this.props.onChangeText("9665" + extracted)
						: {}
				}
				mask={"+966 [000000000]"}
				underlineColorAndroid={Colors.transparent}
				style={{fontSize: 13, textAlign: "right", height: 38}}
				placeholder={"+966 XXXXXXXX"}
				placeholdertextColor={Colors.gray}
				keyboardType={"numeric"}
			/>
		)
	}
}
