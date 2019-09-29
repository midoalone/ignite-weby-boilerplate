import { View } from 'native-base';
import React, { Component } from 'react';
import { PulseIndicator } from 'react-native-indicators';
import { ApplicationStyles } from '../../Themes';
import Colors from '../../Themes/Colors';

export default class LoaderHud extends Component {
    
    constructor(props) {
        super(props)
    }
    
    render () {
        if(this.props.show){
            return (
                <View style={[ApplicationStyles.screen.backgroundImage, {backgroundColor: 'rgba(255, 255, 255, 0.4)', zIndex: 100}]}>
                    <PulseIndicator color={Colors.black}/>
                </View>
            )
        }
        
        return null
    }
}
