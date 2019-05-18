import { View } from 'react-native'
import { BaseText, Button, Grid, Icon } from 'native-base'
import styles from './FormsStyle'
import React, {Component} from 'react'

export default class FormMultipleOptions extends Component {
	render() {
		return (
			<View>
				<Grid>
					{this.props.options.map(option => {
						return this.props.renderRow(option)
					})}
				</Grid>

				<Button
					small
					dark
					iconLeft
					style={styles.addOptionButton}
					onPress={() => this.props.onAdd()}>
					<Icon name={"add"}/>
					<BaseText>{this.props.addTitle}</BaseText>
				</Button>
			</View>
		)
	}
}
