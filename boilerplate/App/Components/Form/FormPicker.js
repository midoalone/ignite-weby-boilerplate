import { Text, TouchableOpacity, View } from 'react-native'
import styles from './FormsStyle'
import Colors from '../../Themes/Colors'
import { Icon } from "native-base"
import MultiPickerMaterialDialog from '../MaterialDialog/MultiPickerMaterialDialog'
import SinglePickerMaterialDialog from '../MaterialDialog/SinglePickerMaterialDialog'
import React, {Component} from 'react'

export default class FormPicker extends Component {
	state = {
		formPickerVisible: false,
		selectedItem:
			this.props.selectedItem && this.props.selectedItem.label
				? this.props.selectedItem
				: null,
		selectedItems: this.props.selectedItems
			? this.props.selectedItems
			: null
	}

	render() {

		let selectedItems = []
		if (this.state.selectedItems) {
			this.state.selectedItems.map((item) => {
				selectedItems.push(item.label)
			})
		}

		let label = this.props.placeholder
		if (this.state.selectedItem && this.state.selectedItem.label) {
			label = this.state.selectedItem.label
		}

		if (this.state.selectedItems && this.state.selectedItems.length > 0) {
			label = selectedItems.join(", ")
		}

		return (
			<View>
				<TouchableOpacity
					onPress={() => this.setState({formPickerVisible: true})}>
					<Text
						style={[
							styles.pickerLabel,
							{
								color: label === this.props.placeholder
									? Colors.dark
									: Colors.accent
							}
						]}>
						{label}
					</Text>

					<Icon name={"ios-arrow-down"} style={styles.pickerArrow}/>
				</TouchableOpacity>

				{this.props.multiple ? (
					<MultiPickerMaterialDialog
						title={this.props.dialogTitle}
						subTitle={this.props.dialogSubTitle}
						items={
							this.props.objects
								? this.props.items
								: this.props.items.map((row, index) => ({
									value: index,
									label: row
								}))
						}
						selectedItems={this.state.selectedItems}
						visible={this.state.formPickerVisible}
						scrolled={true}
						cancelLabel={"إلغاء"}
						okLabel={"إختيار"}
						titleColor={Colors.darkGray}
						colorAccent={Colors.accent}
						onCancel={() =>
							this.setState({formPickerVisible: false})
						}
						onOk={result => {
							this.setState({formPickerVisible: false})
							if (result.selectedItems) {
								this.setState({
									selectedItems: result.selectedItems
								})
								this.props.select(result.selectedItems)
							}
						}}
					/>
				) : (
					<SinglePickerMaterialDialog
						title={this.props.dialogTitle ? this.props.dialogTitle : this.props.placeholder}
						subTitle={this.props.dialogSubTitle}
						items={
							this.props.objects
								? this.props.items
								: this.props.items.map((row, index) => ({
									value: index,
									label: row
								}))
						}
						selectedItem={this.state.selectedItem}
						visible={this.state.formPickerVisible}
						scrolled={true}
						cancelLabel={"إلغاء"}
						okLabel={"إختيار"}
						titleColor={Colors.darkGray}
						colorAccent={Colors.accent}
						onCancel={() =>
							this.setState({formPickerVisible: false})
						}
						onOk={result => {
							this.setState({formPickerVisible: false})
							if (result.selectedItem) {
								this.setState({
									selectedItem: result.selectedItem
								})
								this.props.select(result.selectedItem.value)
							}
						}}
					/>
				)}
			</View>
		)
	}
}
