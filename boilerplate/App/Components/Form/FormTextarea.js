import { Textarea } from "native-base"
import styles from './FormsStyle'
import Colors from '../../Themes/Colors'
import React, {Component} from 'react'

export default class FormTextarea extends Component {
	render() {
		return (
			<Textarea
				placeholder={this.props.placeholder}
				style={[styles.input, styles.textarea]}
				placeholderTextColor={Colors.grayDark}
				{...this.props}
			/>
		)
	}
}
