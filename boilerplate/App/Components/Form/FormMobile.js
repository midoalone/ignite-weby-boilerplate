import TextInputMask from 'react-native-text-input-mask'
import Colors from '../../Themes/Colors'
import React, {Component} from 'react'

export default class FormMobile extends Component {
	render() {
		return (
			<TextInputMask
				{...this.props}
				onChangeText={(formatted, extracted) =>
					this.props.onChangeText
						? this.props.onChangeText("9665" + extracted)
						: {}
				}
				mask={"+966 5[00000000]"}
				underlineColorAndroid={Colors.transparent}
				style={{fontSize: 13, textAlign: "right", height: 38, color: Colors.white}}
				placeholder={"+966 5XXXXXXX"}
				placeholderTextColor={Colors.mainLight}
				keyboardType={"numeric"}
			/>
		)
	}
}
