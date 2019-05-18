// Styles
import { Button, Container, Content, Form, Text, View } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormInput, FormItem, FormMobile } from "../Components/Form";
import LoaderHud from "../Components/LoaderHud";
import { TWAlert } from "../Lib/functions";
import LoginActions from '../Redux/LoginRedux';
import API from '../Services/Api';
import Header from '../Components/Header'
import Colors from '../Themes/Colors'
import I18n from '../I18n'

const api = API.create()

class LoginScreen extends Component {

    state = {
        mobile: false,
        password: false,
        loading: false
    }

    constructor (props) {
        super(props)
    }

    checkLogin = async () => {

        if(!this.state.mobile || !this.state.password) {
            TWAlert(I18n.t("Alert"), I18n.t("You have to fill the mobile and password fields first!"))
            return
        }

        this.setState({loading: true})

        let checkLogin = await api.checkLogin(this.state)
        let data = checkLogin.data

        this.setState({loading: false})

        if(data.error) {
            TWAlert(I18n.t("Alert"), data.message)
            return
        }

        // Save data
        this.props.saveLoginData(data)

        // Navigate to logged in screen
        if(data.confirmed){
            this.props.navigation.navigate('MainNavigator')
        }else{
            this.props.navigation.navigate('CodeVerificationScreen')
        }
    }

    render() {
        return (
            <Container>

                <Header {...this.props} title={I18n.t("Login")} />

                <Content style={{backgroundColor: Colors.transparent}} padder>

                    <Form style={{padding: 20}}>
                        <FormItem label={I18n.t("Mobile")} required>
                            <FormMobile onChangeText={(mobile) => {
                                this.setState({mobile})
                            }}/>
                        </FormItem>

                        <FormItem label={I18n.t("Password")} required>
                            <FormInput secureTextEntry={true} onChangeText={(password) => {
                                this.setState({password})
                            }}/>
                        </FormItem>

                        <View style={{marginTop: 10}}>
							<Button full style={{marginTop: 20}} onPress={() => {
								this.checkLogin().done()
							}}>
								<Text style={{color: Colors.main, fontSize: 15}}>{I18n.t("Login")}</Text>
							</Button>

                            <Button full transparent style={{marginTop: 20}} onPress={() => {
                                this.props.navigation.navigate('RegisterScreen')
                            }}>
                                <Text style={{color: Colors.main, fontSize: 15}}>{I18n.t("Don't have account? Create new account")}</Text>
                            </Button>
                        </View>
                    </Form>

                </Content>

                <LoaderHud show={this.state.loading}/>

            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveLoginData: (data) => {
            dispatch(LoginActions.loginSuccess(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
