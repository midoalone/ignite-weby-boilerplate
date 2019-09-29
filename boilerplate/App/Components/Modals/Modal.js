import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Keyboard
} from 'react-native'
import { Text } from 'native-base'
import colors from './colors'
import { regularFont } from '../../Config/Globals'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

class ZadModal extends Component {
    constructor (props) {
        super(props)
        
        this.renderer = null
        this.options = {
            title: '',
            float: false,
            full: false,
            noPadding: false,
        }
        
        this.state = {
            visible: false,
            height: windowHeight,
            width: windowWidth,
        }
    }
    
    static zadModalInstance
    
    static show (options) {
        this.zadModalInstance.toggleModal(true, options)
    }
    
    static hide () {
        this.zadModalInstance.toggleModal(false)
    }
    
    static update (options) {
        this.zadModalInstance.updateContent(options)
    }
    
    componentWillMount () {
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
        //     this.setState({height: this.state.height - e.endCoordinates.height})
        // })
        //
        // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        //     this.setState({height: windowHeight})
        // })
    }
    
    componentWillUnmount () {
        // this.keyboardDidShowListener.remove()
        // this.keyboardDidHideListener.remove()
    }
    
    updateContent (options) {
        this.renderer = options.renderer
        this.options = {...options}
        
        this.setState({state: this.state})
    }
    
    toggleModal (visible, options) {
        if (visible) {
            this.renderer = options.renderer
            this.options = {...options}
        }
        
        this.setState({
            visible
        })
    }
    
    render () {
        let {
            title,
            float,
            full,
            noPadding,
        } = this.options
        
        let {visible, height, width} = this.state
        
        if (visible) {
            return (
                <View style={styles.overlay}>
                    <Modal
                        animationType={'slide'}
                        transparent
                        hardwareAccelerated
                        visible={visible}
                        onRequestClose={() => {
                            this.toggleModal(false)
                        }}
                        supportedOrientations={['portrait', 'landscape']}
                    >
                        <View style={styles.backgroundOverlay}>
                            <View style={styles.handlerContainer}>
                                <View style={styles.handler}/>
                            </View>
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
                                <View
                                    style={[
                                        styles.modalContainer,
                                        {
                                            height: full ? height - 120 : null,
                                            maxHeight: full ? height - 120 : height / 2,
                                            width: float ? width - 30 : width,
                                            marginLeft: float ? 15 : null,
                                            marginBottom: float ? 25 : null,
                                            padding: noPadding ? 0 : 10,
                                            paddingBottom: noPadding ? 0 : 30,
                                        }
                                    ]}
                                >
                                    {title ? <View style={styles.titleContainer}>
                                        <Text style={styles.title} bold>{title}</Text>
                                    </View> : null}
                                    <View>
                                        {this.renderer}
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </Modal>
                </View>
            )
        }
        
        return null
    }
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999
    },
    backgroundOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.backgroundOverlay,
    },
    modalContainer: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        elevation: 3,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        minHeight: 150,
    },
    handlerContainer: {
        height: 10,
        alignItems: 'center',
    },
    handler: {
        width: 40,
        height: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 4
    },
    titleContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingVertical: 5,
        borderColor: '#ccc',
        marginBottom: 10
    },
    title: {
        textAlign: 'center',
        color: '#474747',
		top: -5
    }
})

ZadModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string,
}

ZadModal.defaultProps = {
    title: undefined,
    onCancel: undefined,
}

export default ZadModal
