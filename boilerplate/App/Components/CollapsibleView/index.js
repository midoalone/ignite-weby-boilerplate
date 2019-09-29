import {Text, View, Icon} from "native-base"
import {Colors} from "../../Themes"
import React, {Component} from "react"
import {TouchableOpacity} from "react-native"
import {APIWaiter} from "../../APIHelpers/APIWaiter"
import PropTypes from "prop-types"

export class CollapsibleView extends Component {

	state = {
		collapsed: false
	}

	render() {
		let {collapsed} = this.state
		let {title, subTitle, details} = this.props
		return (
			<View style={{marginBottom: 10, marginHorizontal: 10}}>
				<TouchableOpacity activeOpacity={0.8} onPress={() => {
					this.setState({collapsed: !collapsed})
				}} style={{backgroundColor: Colors.itemBackground, padding: 10}}>
					<View row>
						<Text bold style={{color: Colors.brand, top: -2, flex: 1}}>{title}</Text>

						<Icon name={`ios-arrow-${collapsed ? 'down' : 'up'}`} style={{color: Colors.white, fontSize: 24}} />
					</View>
				</TouchableOpacity>

				<View style={{backgroundColor: Colors.mainDark, height: collapsed ? 0 : null, overflow: 'hidden'}} padder={!collapsed}>
					<APIWaiter checker={subTitle}>
						<Text bold left style={{color: Colors.white, fontSize: 14}}>{subTitle}</Text>
					</APIWaiter>

					<APIWaiter checker={details}>
						<Text left style={{color: Colors.white, fontSize: 15, lineHeight: 22}}>{details}</Text>
					</APIWaiter>
				</View>
			</View>
		)
	}
}

CollapsibleView.propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
	details: PropTypes.string
}
