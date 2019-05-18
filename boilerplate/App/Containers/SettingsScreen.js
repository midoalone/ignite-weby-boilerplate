import React, {Component} from 'react'
import {KeyboardAvoidingView, ScrollView} from 'react-native'
import {connect} from 'react-redux'
// Styles
import styles from './Styles/MainStyles'
import LoaderHud from '../Components/LoaderHud';
import FixedHeader from '../Components/FixedHeader';
import {Container, Content, ListItem, Text, List, Left, Right, Icon, Button, Body} from 'native-base';
import {Colors} from '../Themes';
import CompanyLabel from "../Components/CompanyLabel";
import LoginActions from "../Redux/LoginRedux";
import {regularFont} from "../Config/Globals";
import {ActionSheetCustom as ActionSheet} from "react-native-actionsheet";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

class SettingsScreen extends Component {

    render() {
        const {navigate} = this.props.navigation
        return (
            <Container>
                <FixedHeader show={true}/>

                <CompanyLabel/>

                <Content style={{backgroundColor: Colors.transparent}}>
                    <List>
                        <ListItem icon onPress={() => {
                            navigate("SettingsEditInfoScreen")
                        }}>
                            <Left>
                                <Button style={{backgroundColor: Colors.darkGray}}>
                                    <Icon name="md-create"/>
                                </Button>
                            </Left>
                            <Body>
                            <Text>تعديل البيانات</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-back"/>
                            </Right>
                        </ListItem>

                        <ListItem icon onPress={() => {
                            navigate("SettingsEditInfoScreen", {
                                password: true
                            })
                        }}>
                            <Left>
                                <Button style={{backgroundColor: Colors.darkGray}}>
                                    <Icon name="lock"/>
                                </Button>
                            </Left>
                            <Body>
                            <Text>تغيير كلمة المرور</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-back"/>
                            </Right>
                        </ListItem>

                        <ListItem icon onPress={() => {
                            navigate("SettingsQrCodeScreen")
                        }}>
                            <Left>
                                <Button style={{backgroundColor: Colors.darkGray}}>
                                    <Icon name="md-barcode"/>
                                </Button>
                            </Left>
                            <Body>
                            <Text>رمز المعرف الخاص</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-back"/>
                            </Right>
                        </ListItem>

                        <ListItem icon onPress={() => {
                            this.ActionSheet.show()
                        }}>
                            <Left>
                                <Button style={{backgroundColor: Colors.fire}}>
                                    <Icon name="md-exit"/>
                                </Button>
                            </Left>
                            <Body>
                            <Text>تسجيل خروج</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={<Text style={{color: '#000', fontSize: 16}}>هل أنت متأكد من تسجيل الخروج؟</Text>}
                    options={[
                        'نعم',
                        'إلغاء'
                    ]}
                    styles={{
                        buttonText: {
                            fontFamily: regularFont
                        }
                    }}
                    cancelButtonIndex={1}
                    destructiveButtonIndex={1}
                    onPress={(index) => {
                        if (index === 0) {
                            navigate("LoginStackNavigator")
                            this.props.saveLoginData(null)
                        }
                    }}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings.data,
        login: state.login.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveLoginData: data => {
            dispatch(LoginActions.loginSuccess(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
