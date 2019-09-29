import Colors from '../../Themes/Colors'
import styles from './FormsStyle'
import {Text, View} from "react-native"
import React, {Component} from 'react'

export default class FormItem extends Component {
	render () {
		let backgroundColor = this.props.clear ? 'transparent' : Colors.mainDark
		if (this.props.dark) {
			backgroundColor = Colors.background
		}

		return (
			<View style={{ marginBottom: 15, flex: 1 }}>
				{this.props.label ? (
					<Text style={styles.labelContainer}>
						{this.props.required ? (
							<Text style={styles.required}>*</Text>
						) : null}{' '}
						<Text style={styles.label}>{this.props.label}</Text>{' '}
						{this.props.hint ? (
							<Text style={styles.hint}>
								{'('} {this.props.hint} {')'}
							</Text>
						) : null}
					</Text>
				) : null}

				<View
					style={[
						styles.itemContainer,
						{ backgroundColor: backgroundColor }
					]}>
					{React.cloneElement(this.props.children, {
						label: this.props.label,
						title: this.props.title,
						placeholder: this.props.placeholder
							? this.props.placeholder
							: this.props.label
					})}
				</View>
			</View>
		)
	}
}
