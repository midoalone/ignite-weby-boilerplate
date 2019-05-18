import React, {Component} from 'react'
import Colors from "../../Themes/Colors";
import {Icon, Text, View} from "native-base";
import TextInputMask from "react-native-text-input-mask"
import LoginActions from '../../Redux/LoginRedux'
import {connect} from "react-redux";
import {boldFont, regularFont} from "../../Config/Globals";
import {phonecall, text} from "react-native-communications";
import {Linking, TouchableOpacity} from "react-native";
import {ActionSheetCustom as ActionSheet} from "react-native-actionsheet";

class CodeVerification extends Component {

    constructor (props) {
        super(props)
    }

    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Icon name={'lock'} style={{color: '#9E9F9E', fontSize: 60, marginBottom: 5}} />

                <View style={{flexDirection: 'row', borderWidth: 2, borderColor: '#9E9F9E', paddingVertical: 3, paddingHorizontal: 10, borderRadius: 20}}>
                    <Icon name={'ios-medical'} style={{color: '#9E9F9E', marginRight: 5}} />
                    <Icon name={'ios-medical'} style={{color: '#9E9F9E', marginRight: 5}} />
                    <Icon name={'ios-medical'} style={{color: '#9E9F9E', marginRight: 5}} />
                    <Icon name={'ios-medical'} style={{color: '#9E9F9E', marginRight: 5}} />
                </View>

                <Text style={{fontSize: 14, marginTop: 10}}>تم ارسال رمز التحقق برسالة نصية للجوال:</Text>
                <Text style={{fontSize: 14}}>+{this.props.login.mobile}</Text>

                <Text style={{fontFamily: boldFont, marginTop: 15, color: '#9E9F9E'}}>أدخل رمز التحقق</Text>

                <View style={{backgroundColor: '#fff', width: 200, marginVertical: 10}}>
                    <TextInputMask
                        onChangeText={(formatted, extracted) => this.props.onChangeText ? this.props.onChangeText(extracted) : {}}
                        mask={"[0] [0] [0] [0] [0]"}
                        underlineColorAndroid={Colors.transparent}
                        style={{fontSize: 28, textAlign: 'left', alignSelf: 'center', width: 120, marginRight: 9}}
                        placeholdertextColor={Colors.darkGray}
                        keyboardType={'numeric'}
                    />

                    <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: -20}}>
                        <Icon name={'md-remove'} style={{marginRight: 4, fontSize: 30, color: Colors.darkGray}} />
                        <Icon name={'md-remove'} style={{marginRight: 4, fontSize: 30, color: Colors.darkGray}} />
                        <Icon name={'md-remove'} style={{marginRight: 4, fontSize: 30, color: Colors.darkGray}} />
                        <Icon name={'md-remove'} style={{marginRight: 4, fontSize: 30, color: Colors.darkGray}} />
                        <Icon name={'md-remove'} style={{marginRight: 4, fontSize: 30, color: Colors.darkGray}} />
                    </View>
                </View>

                <TouchableOpacity onPress={() => {
                    this.ActionSheet.show()
                }}>
                    <Text style={{fontSize: 13, color: Colors.darkGray}}>اذا لم يصلك الرمز تواصل معنا بالاتصال <Icon name={'call'} style={{fontSize: 23, color: '#4AACFA'}} /> او واتساب <Icon name={'logo-whatsapp'} style={{fontSize: 23, color: '#28D300'}} /> </Text>
                </TouchableOpacity>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={<Text style={{color: '#000', fontSize: 16}}>يمكنك الاتصال بنا عبر الوسائل التالية</Text>}
                    options={[
                        'اتصال هاتفي',
                        'رسالة نصية قصيرة',
                        ' عبر تطبيق واتساب',
                        'إلغاء'
                    ]}
                    styles={{
                        buttonText: {
                            fontFamily: regularFont
                        }
                    }}
                    cancelButtonIndex={3}
                    destructiveButtonIndex={3}
                    onPress={(index) => {
                        let contactNumber = this.props.settings.contact_number
                        if(index === 0) {
                            phonecall(contactNumber, true)
                        }

                        if(index === 1) {
                            text(contactNumber, "")
                        }

                        if(index === 2) {
                            Linking.openURL(`whatsapp://send?phone=${contactNumber}`)
                        }
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings.data,
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

export default connect(mapStateToProps, mapDispatchToProps)(CodeVerification)
