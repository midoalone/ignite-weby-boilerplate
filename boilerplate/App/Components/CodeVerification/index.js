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
    	let {phone} = this.props
        return (
            <View style={{alignItems: 'center'}}>
                <Icon name={'lock'} style={{color: '#f6f6f6', fontSize: 60, marginBottom: 5}} />

                <View style={{flexDirection: 'row', borderWidth: 2, borderColor: '#f6f6f6', paddingVertical: 3, paddingHorizontal: 10, borderRadius: 20}}>
                    <Icon name={'ios-medical'} style={{color: '#f6f6f6', marginRight: 5}} />
                    <Icon name={'ios-medical'} style={{color: '#f6f6f6', marginRight: 5}} />
                    <Icon name={'ios-medical'} style={{color: '#f6f6f6', marginRight: 5}} />
                    <Icon name={'ios-medical'} style={{color: '#f6f6f6', marginRight: 5}} />
                </View>

                <Text style={{color: '#f6f6f6',fontSize: 14, marginTop: 10}}>تم ارسال رمز التحقق برسالة نصية للجوال:</Text>
                <Text style={{color: Colors.brand,fontSize: 20, marginTop: 10}}>+{phone}</Text>

                <Text style={{fontFamily: boldFont, marginTop: 15, color: '#f6f6f6'}}>أدخل رمز التحقق</Text>

                <View style={{backgroundColor: '#132f54', width: 200, marginVertical: 10}}>
                    <TextInputMask
                        onChangeText={(formatted, extracted) => this.props.onChangeText ? this.props.onChangeText(extracted) : {}}
                        mask={"[0] [0] [0] [0] [0]"}
                        underlineColorAndroid={Colors.transparent}
                        style={{fontSize: 28, textAlign: 'left', alignSelf: 'center', width: 120, marginRight: 9, color: Colors.brand}}
                        keyboardType={'numeric'}
                    />

                    <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: -20}}>
                        <Icon name={'md-remove'} style={{marginRight: 4, fontSize: 30, color: Colors.brand}} />
                        <Icon name={'md-remove'} style={{marginRight: 4, fontSize: 30, color: Colors.brand}} />
                        <Icon name={'md-remove'} style={{marginRight: 4, fontSize: 30, color: Colors.brand}} />
                        <Icon name={'md-remove'} style={{marginRight: 4, fontSize: 30, color: Colors.brand}} />
                        <Icon name={'md-remove'} style={{marginRight: 4, fontSize: 30, color: Colors.brand}} />
                    </View>
                </View>

                <TouchableOpacity onPress={() => {
                    this.ActionSheet.show()
                }}>
                    <Text style={{fontSize: 13, color: Colors.white, marginBottom: 20, marginTop: 10}}>اذا لم يصلك الرمز تواصل معنا بالاتصال او واتساب</Text>
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
