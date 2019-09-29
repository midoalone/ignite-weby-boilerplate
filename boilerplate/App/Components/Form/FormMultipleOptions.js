import { Text, Button, Grid, Icon, View } from 'native-base'
import styles from './FormsStyle'
import React, {Component} from 'react'
import {Colors} from "../../Themes"
import {TouchableOpacity} from "react-native"

export default class FormMultipleOptions extends Component {

	state = {
		selectedOptions: this.props.selectedOptions ? this.props.selectedOptions : 0
	}

	render() {
		let {single} = this.props
		let {selectedOptions} = this.state
		return (
			<View padder>
				{this.props.options.map((option, index) => {
					let isSelected = selectedOptions.find(item => item.id === option.id)
					return (
						<TouchableOpacity key={index} onPress={() => {
							if(single) {
								this.setState({selectedOptions: [option]})
							}else{
								this.setState({selectedOptions: [...selectedOptions, option]})
							}
						}} style={{marginVertical: 5}}>
							<View row>
								<Icon name={isSelected ? 'md-checkbox-outline' : 'square-outline'} style={{color: Colors.grayDarker}}/>
								<Text style={{color: Colors.grayDarker, top: 2, marginLeft: 10}}>{option.text}</Text>
							</View>
						</TouchableOpacity>
					)
				})}
			</View>
		)
	}
}
