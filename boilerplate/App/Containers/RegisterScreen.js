import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
import styles from './Styles/CommonStyles'
import { Button, Col, Container, Content, Form, Grid, Text, View } from 'native-base'
import LoaderHud from '../Components/LoaderHud'
import { FormInput, FormItem, FormMobile } from '../Components/Form'
import { Colors } from '../Themes'
import { TWAlert } from '../Lib/functions'
import API from '../Services/Api'
import { NavigationActions } from 'react-navigation'
import Header from '../Components/Header'
import I18n from '../I18n'

const api = API.create();

class RegisterScreen extends Component {
	state = {
		mobile: false,
		password: false,
		name: false,
		user_type: "seller",
		referred: 0,
		loading: false
	}

	constructor(props) {
		super(props)
	}

	validate () {
        const requiredFields = [
            'mobile',
            'password',
            'name',
        ]

        let valid = true
        requiredFields.map(field => {
            if (!this.state[field]) {
                valid = false
            }
        })

        if (!valid) {
            TWAlert(
                I18n.t("Alert"),
				I18n.t("You have to fill all required fields with * sign")
            )

			return false
        }

        return true
    }

	register = async () => {
		this.setState({ loading: true })
		let request = await api.registerAccount(this.state)
		let data = request.data
		this.setState({ loading: false })

		if (data.error) {
			TWAlert(I18n.t("Alert"), data.message)
			return
		}

		// Save data
		this.props.saveLoginData(data)

		// Navigate to code verification screen
		this.props.navigation.navigate("CodeVerificationScreen")
    }

	render() {
		return (
			<Container>
				<Header {...this.props} title={"Registration"} back />

				<LoaderHud show={this.state.loading} />

				<Content>
					<Form style={{ padding: 20 }}>
						<FormItem
							label={I18n.t("Name")}
							required>
							<FormMobile
								onChangeText={name => {
									this.setState({ name })
								}}
							/>
						</FormItem>

						<FormItem
							label={I18n.t("Mobile")}
							hint={I18n.t("You will receive a confirmation code")}
							required>
							<FormMobile
								onChangeText={mobile => {
									this.setState({ mobile })
								}}
							/>
						</FormItem>

						<FormItem label={I18n.t("Password")} required>
							<FormInput
								secureTextEntry={true}
								onChangeText={password => {
									this.setState({ password })
								}}
							/>
						</FormItem>
					</Form>
				</Content>

				<View style={{ height: 45 }}>
					<Grid>
						<Col>
                            <Button
                                full
                                style={{backgroundColor: "#D4D5D4"}}
                                onPress={() => {
                                    this.props.navigation.dispatch(NavigationActions.back())
                                }}
                            >
                                <Text style={{color: Colors.dark}}>
                                    { I18n.t('Cancel') }
                                </Text>
                            </Button>
						</Col>
						<Col>
							<Button
								full
								onPress={() => {
									if(this.validate()) {
										this.register().done()
									}
								}}
							>
								<Text>{ I18n.t('Register') }</Text>
							</Button>
						</Col>
					</Grid>
				</View>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		login: state.login.data,
		settings: state.settings.data,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		saveLoginData: data => {
			dispatch(LoginActions.loginSuccess(data))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterScreen)
