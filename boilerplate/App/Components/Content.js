import {Platform, StyleSheet, View, ImageBackground, TouchableOpacity, StatusBar} from 'react-native'
import React, {Component} from 'react'
import {Content as BaseContent} from 'native-base'
import {Colors} from "../Themes"
import {viewportHeight, viewportWidth} from "../Config/Globals"
import LoaderHud from "./LoaderHud"

export const Content = ({children, background, loading = false, padder = false, styles}) => (
	<View style={{flex: 1}}>
		<BaseContent style={{...styles, backgroundColor: background ? background : Colors.transparent}} padder={padder}>
			{children}
		</BaseContent>

		<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
			<LoaderHud show={loading}/>
		</View>
	</View>
)
