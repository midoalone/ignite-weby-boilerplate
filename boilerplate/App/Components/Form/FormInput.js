import { TouchableOpacity, View } from 'react-native'
import { Input } from "native-base"
import styles from './FormsStyle'
import Colors from '../../Themes/Colors'
import React, {Component} from 'react'

export default class FormInput extends Component {
	render() {
		return (
			<TouchableOpacity activeOpacity={1} onPress={() => {
				this.inputRef._root.focus();
			}}>
				<View pointerEvents="none">
					<Input
						ref={input => {
							this.inputRef = input;
						}}
						placeholder={this.props.placeholder}
						style={styles.input}
						placeholderTextColor={Colors.darkGray}
						{...this.props}
					/>
				</View>
			</TouchableOpacity>
		)
	}
}
