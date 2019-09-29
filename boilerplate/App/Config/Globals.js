import {Platform, Dimensions} from 'react-native'

const baseDomain = 'http://shater.local.192.168.1.4.xip.io'
const baseUrl = baseDomain + '/api'

// const regularFont = Platform.OS === "ios" ? "DroidArabicKufi" : "DroidKufi-Regular"
// const boldFont = Platform.OS === "ios" ? "DroidArabicKufi-Bold" : "DroidKufi-Bold"

const regularFont = Platform.OS === 'ios' ? 'DroidArabicKufi' : 'Tajawal-Regular'
const boldFont = Platform.OS === 'ios' ? 'DroidArabicKufi-Bold' : 'Tajawal-Bold'

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window')

const isAndroid = Platform.OS === 'android'

export {
    baseUrl,
	isAndroid,
    regularFont,
    boldFont,
    baseDomain,
	viewportWidth,
	viewportHeight
}
