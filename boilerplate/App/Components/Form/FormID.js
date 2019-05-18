import TextInputMask from 'react-native-text-input-mask'
import Colors from '../../Themes/Colors'
import React, {Component} from 'react'

export default class FormID extends Component {
	render() {
		return (
			<TextInputMask
				onChangeText={(formatted, extracted) =>
					this.props.onChangeText
						? this.props.onChangeText(extracted)
						: {}
				}
				mask={"D[000000]"}
				underlineColorAndroid={Colors.transparent}
				style={{fontSize: 18, textAlign: "right", height: 42}}
				placeholder={this.props.placeholder}
				placeholdertextColor={Colors.gray}
				keyboardType={"numeric"}
			/>
		)
	}
}
