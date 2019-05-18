import React, { Component } from "react"
import {Alert, Dimensions} from "react-native";
import {baseUrl} from "../Config/Globals";
import I18n from '../I18n'
const windowWidth = Dimensions.get("window").width

const TWAlert = (title, message) => {
    Alert.alert(title, message, [
        {text: I18n.t("Ok"), onPress: () => console.log('OK Pressed')},
    ]);
}

const photoURL = (name) => {
    return baseUrl + '/storage/images/' + name
}

export {
    TWAlert,
    photoURL,
}
