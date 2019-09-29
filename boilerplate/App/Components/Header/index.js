import React, { Component } from 'react'
import { Body, Button, Header as BaseHeader, Left, Right, Title } from 'native-base'
import { StatusBar, I18nManager } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Colors from '../../Themes/Colors'
import Icon from '../Icon'
import NavigationService from "../../Navigation/NavigationService"

export default class AppHeader extends Component {

	constructor (props) {
		super(props)
	}

	render () {
		return (
			<BaseHeader style={{ backgroundColor: '#176198' }} androidStatusBarColor='#176198' noShadow hasTabs>
				<StatusBar barStyle='light-content'/>
				{this.props.back ? <Left>
					<Button
						transparent
						onPress={() => {
							const { dispatch } = this.props.navigation
							dispatch(NavigationActions.back())
						}}>
						<Icon name={'arrow-back'} color={'white'}/>
					</Button>
				</Left> : null}
				<Body>
				<Title>{this.props.title}</Title>
				</Body>
				<Right>
					{this.props.children}
				</Right>
			</BaseHeader>
		)
	}
}
