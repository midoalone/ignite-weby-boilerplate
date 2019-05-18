import React, { Component } from "react"
import { ScrollView, KeyboardAvoidingView, View } from "react-native"
import { connect } from "react-redux"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/MainStyles"
import { Container, Content, Text } from 'native-base';
import CodeVerification from "../Components/CodeVerification"
import FixedHeader from "../Components/FixedHeader"
import { Colors } from "../Themes"
import GradientButton from "../Components/GradientButton"
import LoaderHud from "../Components/LoaderHud";

import API from "../Services/Api";
import { TWAlert } from '../Lib/functions';
const api = API.create();

class CodeVerificationScreen extends Component {
	state = {
		verificationCode: false,
		loading: false
    }

    constructor (props) {
        super(props)
    }

    async verifyCode() {
        if(!this.state.verificationCode) {
            TWAlert('تنبيه', 'ادخل رمز التحقق اولا')
            return
        }

		this.setState({loading: true})

        let verificationResult = await api.verifyCode({
            code: this.state.verificationCode,
            token: this.props.login.token
        })

        let data = verificationResult.data

        this.setState({loading: false})

        if(data.error) {
            TWAlert('تنبيه', data.message)
            return
        }

        // Save data
        if(data.confirmed) {
            this.props.navigation.navigate('MainTabNavigator')
        }
	}
	
	render() {
		return (
			<Container>
				<FixedHeader show={true} />

				<Text style={styles.title}>رمز التحقق</Text>

				<LoaderHud show={this.state.loading} />

				<Content style={{ backgroundColor: Colors.transparent }} padder>
					<CodeVerification onChangeText={(verificationCode) => this.setState({verificationCode})} />
				</Content>

				<View style={{ height: 38 }}>
					<GradientButton title={"إرسال"} onPress={() => {
                        this.verifyCode().done()
                    }} />
				</View>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		login: state.login.data
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CodeVerificationScreen)
