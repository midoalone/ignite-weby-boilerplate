import React, {Component} from 'react'
import {KeyboardAvoidingView, ScrollView} from 'react-native'
import {connect} from 'react-redux'
// Styles
import FixedHeader from "../Components/FixedHeader";
import {Button, Col, Container, Content, Form, Grid, View, Text} from "native-base";
import Colors from "../Themes/Colors";
import LoaderHud from "../Components/LoaderHud";
import styles from "./Styles/MainStyles";
import {FormInput, FormItem, FormMobile, FormPhotoUpload, FormPicker} from "../Components/Forms";
import {photoURL, TWAlert} from "../Lib/functions";
import GradientButton from "../Components/GradientButton";
import LoginActions from "../Redux/LoginRedux";
import {NavigationActions} from "react-navigation";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import API from '../Services/Api'

const api = API.create()

class SettingsEditInfoScreen extends Component {

    constructor(props) {
        super(props)

        const {login} = props
        this.state = {
            id: login.id,
            mobile: login.mobile,
            name: login.name,
            description: login.description,
            manager: login.manager,
            categories: JSON.parse(login.categories),
            models: login.models ? JSON.parse(login.models) : [],
            logo: login.logo,
            loading: false,
            password: false,
            confirmPassword: false,
        }
    }

    register = async () => {
        const requiredFields = [
            'mobile',
            'name',
            'manager',
            'categories',
            'models',
            'logo'
        ]

        let valid = true
        requiredFields.map(field => {
            if (!this.state[field]) {
                valid = false
            }
        })

        if (!valid) {
            TWAlert(
                "تنبيه",
                "يجب تعبئة جميع الحقول الالزامية و المميزة بعلامة * "
            )
            return
        }

        this.setState({loading: true})
        let request = await api.registerAccount(this.state)
        let data = request.data
        this.setState({loading: false})

        if (data.error) {
            TWAlert("تنبيه", data.message)
            return
        }

        // Save data
        this.props.saveLoginData({...this.props.login, ...data})

        // Navigate back
        this.props.navigation.dispatch(NavigationActions.back())
    }

    async changePassword() {
        if (!this.state.password || !this.state.confirmPassword) {
            TWAlert(
                "تنبيه",
                "يجب كتابة كلمة المرور الجديدة أولا "
            )
            return
        }

        if (this.state.password !== this.state.confirmPassword) {
            TWAlert(
                "تنبيه",
                "تأكد من تأكيد كلمة المرور"
            )
            return
        }

        this.setState({loading: true})
        let request = await api.changePassword({
            token: this.props.login.token,
            password: this.state.password,
            mobile: this.props.login.mobile
        })
        let data = request.data
        this.setState({loading: false})

        if (data.error) {
            TWAlert("تنبيه", data.message)
            return
        }

        // Save data
        this.props.saveLoginData({...this.props.login, ...data})

        // Navigate back
        this.props.navigation.dispatch(NavigationActions.back())
    }

    async uploadPhoto(photo) {
        this.setState({loading: true})
        let request = await api.uploadPhoto(photo)
        let data = request.data

        if (data.error) {
            this.setState({loading: false})
            TWAlert('تنبيه', data.message)
            return
        }

        this.setState({logo: data.url, loading: false})
    }

    render() {
        const {params} = this.props.navigation.state

        let isPassword = false
        if (params && params.password) {
            isPassword = true
        }

        return (
            <Container>
                <FixedHeader show={true}/>

                <LoaderHud show={this.state.loading}/>

                <Text style={styles.title}>{isPassword ? "تغيير كلمة المرور" : "تعديل البيانات"}</Text>

                <Content>

                    {isPassword ?
                        <Form style={{padding: 20}}>
                            <FormItem
                                label={"كلمة المرور الجديدة"}
                                required>
                                <FormInput
                                    secureTextEntry={true}
                                    onChangeText={password => {
                                        this.setState({password})
                                    }}
                                />
                            </FormItem>

                            <FormItem
                                label={"تأكيد كلمة المرور الجديدة"}
                                required>
                                <FormInput
                                    secureTextEntry={true}
                                    onChangeText={confirmPassword => {
                                        this.setState({confirmPassword})
                                    }}
                                />
                            </FormItem>
                        </Form> :
                        <Form style={{padding: 20}}>
                            <View style={{alignItems: 'center', marginBottom: 10}}>
                                <FormItem placeholder={"اختر\n الشعار"} required clear>
                                    <FormPhotoUpload
                                        onChange={logo => {
                                            this.uploadPhoto(logo).done()
                                        }}
                                        initial={this.state.logo ? photoURL(this.state.logo) : false}
                                    />
                                </FormItem>
                            </View>

                            <FormItem
                                label={"رقم الجوال"}
                                required>
                                <FormMobile
                                    value={this.state.mobile}
                                    onChangeText={mobile => {
                                        this.setState({mobile})
                                    }}
                                />
                            </FormItem>

                            <FormItem
                                label={"اسم المحل"}
                                placeholder={"مثلا: مؤسسة الامتياز التجارية"}
                                required>
                                <FormInput
                                    value={this.state.name}
                                    onChangeText={name => {
                                        this.setState({name})
                                    }}
                                />
                            </FormItem>

                            <FormItem
                                label={"وصف المحل"}
                                placeholder={"مثلا: لبيع قطع الغيار الأمريكي"}
                                required>
                                <FormInput
                                    value={this.state.description}
                                    onChangeText={description => {
                                        this.setState({description})
                                    }}
                                />
                            </FormItem>

                            <FormItem
                                label={"اسم المسؤول"}
                                placeholder={"ادخل اسم المسؤول"}
                                required>
                                <FormInput
                                    value={this.state.manager}
                                    onChangeText={manager => {
                                        this.setState({manager})
                                    }}
                                />
                            </FormItem>

                            <FormItem
                                label={"التصنيف"}
                                placeholder={"اختر الخدمات التي يقدمها المحل"}
                                required>
                                <FormPicker
                                    objects
                                    multiple
                                    dialogTitle={"اختر التصنيفات"}
                                    dialogSubTitle={"الخدمات التي تقدمها"}
                                    items={this.props.settings.categories}
                                    selectedItems={this.state.categories}
                                    select={categories => {
                                        this.setState({categories})
                                    }}
                                />
                            </FormItem>

                            <FormItem
                                label={"موديلات السيارات"}
                                placeholder={"اختر الموديلات التي يعمل بها المحل"}
                                required>
                                <FormPicker
                                    objects
                                    multiple
                                    dialogTitle={"اختر الموديلات"}
                                    dialogSubTitle={"الموديلات المدعومة"}
                                    items={this.props.settings.models}
                                    selectedItems={this.state.models}
                                    select={models => {
                                        this.setState({models})
                                    }}
                                />
                            </FormItem>
                        </Form>
                    }
                </Content>

                <View style={{height: 47}}>
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
                                    إلغاء
                                </Text>
                            </Button>
                        </Col>
                        <Col size={2}>
                            <GradientButton
                                large
                                onPress={() => {
                                    if (isPassword) {
                                        this.changePassword().done();
                                    } else {
                                        this.register().done()
                                    }
                                }}
                                title={isPassword ? "حفظ كلمة المرور" : "حفظ البيانات"}
                            />
                        </Col>
                    </Grid>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditInfoScreen)
