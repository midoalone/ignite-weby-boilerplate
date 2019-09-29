import React, {Component} from 'react'
import {Animated, Dimensions, Modal, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native'
import {Button, Text, View} from 'native-base'
import I18n from "../../I18n"
import {boldFont, regularFont} from "../../Config/Globals"
import Colors from "../../Themes/Colors"
import {photoURL} from "../../Lib/functions"


const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window')

export default class ZadAlert extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalVisible: false,
			fadeAnim: new Animated.Value(0),
			height: new Animated.Value(0),
		}
	}

	static zadAlertInstance

	static show(data) {
		this.zadAlertInstance.showToast(data)
	}

	showToast(data) {
		this.setState({
			...data,
			modalVisible: true,
		})
	}

	close() {
		this.setState({
			modalVisible: false,
		})
	}

	getToastStyle() {
		return {
			width: (viewportWidth - 30),
			maxWidth: 300,
			backgroundColor: '#f4f4f4',
			elevation: 3,
			padding: 20,
			alignItems: 'center'
		}
	}

	render() {
		if (this.state.modalVisible) {
			let {title, message, notification, navigate, onPress} = this.state

			// Push notification
			let AlertIcon = require('./bell.png'),
				AlertIconStyle,
				AlertCallback = onPress

			if(notification) {
				if (notification.type === 'news' || notification.type === 'videos') {
					if (notification.message) {
						AlertIcon = {uri: photoURL(notification.message, `clubs/${notification.type}`)}
						AlertIconStyle = {width: '100%', height: 100, resizeMode: 'cover'}
					}

					AlertCallback = () => {
						navigate(notification.type === 'news' ? 'SingleNews' : 'SingleVideo', {item: notification.item})
					}
				}

				if(notification.type === 'vote') {
					if (notification.club) {
						AlertIcon = {uri: photoURL(notification.club.logo, `clubs`)}
						AlertIconStyle = {width: '100%', height: 100}
					}

					AlertCallback = () => {
						navigate('SingleVote', {item: notification.item})
					}
				}
			}


			return (
				<Modal
					animationType={'fade'}
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.close()
					}}
				>
					<TouchableOpacity
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: 'rgba(0,0,0,0.3)',
						}}
						onPress={() => {
							this.close()
						}}
						activeOpacity={1}
					>
						<TouchableWithoutFeedback>
							<View style={{flex: 1, justifyContent: 'center'}}>
								<View style={{
									width: (viewportWidth - 30),
									maxWidth: 300,
									justifyContent: 'center',
									alignItems: 'center',
									backgroundColor: notification ? Colors.white : Colors.main,
									borderTopRightRadius: 7,
									borderTopLeftRadius: 7,
									padding: 20,
								}}>

									<Image source={AlertIcon} style={[{height: 60, marginBottom: 20, resizeMode: 'contain'}, AlertIconStyle]}/>

									<Text style={{
										fontSize: 18,
										fontFamily: boldFont,
										color: notification ? Colors.black : Colors.white,
										marginBottom: 10,
										lineHeight: 26
									}}>{title}</Text>

									{!notification ? <Text style={{
										color: Colors.white,
										fontSize: 16,
										fontFamily: regularFont,
										textAlign: 'center',
										lineHeight: 26
									}}>{message}</Text> : null}
								</View>

								<View style={{
									height: 60,
									justifyContent: 'center',
									alignItems: 'center',
									backgroundColor: '#333',
									borderBottomRightRadius: 7,
									borderBottomLeftRadius: 7,
								}}>
									<Button
										transparent
										full
										onPress={() => {
											this.close()
											AlertCallback ? AlertCallback() : null
										}}
									>
										<Text
											style={{fontFamily: regularFont, color: Colors.white}}>{I18n.t('Ok')}</Text>
									</Button>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</TouchableOpacity>
				</Modal>
			)
		} else return null
	}
}
