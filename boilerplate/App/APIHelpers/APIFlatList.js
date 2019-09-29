import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text} from 'native-base'
import LoaderHud from "../Components/LoaderHud"
import API from '../Services/Api'
import {TWAlert} from "../Lib/functions"
import PropTypes from 'prop-types'
import {FlatList} from 'react-native'
import {BarIndicator} from "react-native-indicators"
import Colors from "../Themes/Colors"

class APIFlatList extends Component {

	state = {
		loading: false,
		refreshing: false,
		silentReload: false,
		page: 1,
		data: []
	}

	componentDidMount() {
		this.props.onRef ? this.props.onRef(this) : null

		this.getData().done()
	}

	componentWillUnmount() {
		this.props.onRef ? this.props.onRef(null) : null
	}

	refresh() {
		this.getData('silentReload').done()
	}

	async getData(refreshing) {
		const {endpoint, params, login} = this.props

		const api = API.create()

		refreshing ? this.setState({[refreshing]: true, page: 1}) : this.setState({loading: true})

		let request = await api.getData(endpoint, {...params, api_token: login ? login.api_token : null})
		let data = request.data

		if (data.error) {
			TWAlert("تنبيه", data.message)
			this.setState({loading: false, refreshing: false})
			return
		}

		this.setState({data: data.data.data, loading: false, [refreshing]: false})
	}

	render() {
		const {renderItem} = this.props
		let {loading, refreshing, silentReload} = this.state
		return (
			<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
				<FlatList
					{...this.props}
					showsVerticalScrollIndicator={false}
					data={this.state.data}
					renderItem={({item}) => renderItem(item)}
					keyExtractor={(item, index) => index}
					refreshing={refreshing}
					onRefresh={() => {
						this.getData('refreshing').done()
					}}
				/>

				<LoaderHud show={loading}/>

				{silentReload ? <View style={{
					position: 'absolute',
					bottom: 10,
					left: 0,
					right: 0
				}}>
					<View style={{
						backgroundColor: 'rgba(255,255,255,0.5)',
						paddingHorizontal: 15,
						paddingVertical: 5,
						borderRadius: 5,
						alignSelf: 'center',
						width: 130
					}} row>
						<BarIndicator color={Colors.black} size={15}/>
						<Text bold style={{fontSize: 12, marginLeft: 10}}>جاري التحديث</Text>
					</View>
				</View> : null}
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		login: state.login.data
	}
}

APIFlatList.propTypes = {
	onLoad: PropTypes.func.isRequired,
	renderItem: PropTypes.func.isRequired,
	endpoint: PropTypes.string.isRequired,
	params: PropTypes.object
}

APIFlatList.defaultProps = {
	params: {}
}

export default connect(mapStateToProps, null)(APIFlatList)
