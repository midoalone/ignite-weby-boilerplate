import { View } from 'native-base';
import React, { Component } from 'react';
import { WaveIndicator } from 'react-native-indicators';
import { ApplicationStyles } from '../../Themes';
import Colors from '../../Themes/Colors';

export default class LoaderHud extends Component {
    
    constructor(props) {
        super(props)
    }
    
    render () {
        if(this.props.show){
            return (
                <View style={[ApplicationStyles.screen.backgroundImage, {backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 100}]}>
                    <WaveIndicator color={Colors.silver}/>
                </View>
            )
        }
        
        return null
    }
}
