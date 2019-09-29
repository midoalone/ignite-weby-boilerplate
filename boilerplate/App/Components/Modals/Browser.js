import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import ZadModal from './Modal'

export default class ZadBrowser extends Component {
    constructor (props) {
        super(props)
    }
    
    componentWillReceiveProps (nextProps) {
    
    }
    
    render () {
        return (
            <ZadModal
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                title={this.props.title}
                full={this.props.full}
                float={this.props.float}
            >
                {this.props.children}
            </ZadModal>
        )
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        height: 56,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 16,
    },
})

ZadBrowser.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string,
    full: PropTypes.bool,
    float: PropTypes.bool,
}

ZadBrowser.defaultProps = {
    title: undefined,
    onCancel: undefined,
    full: false,
    float: false
}
