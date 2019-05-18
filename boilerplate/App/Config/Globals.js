import {Platform} from 'react-native'

const baseDomain = ''
const baseUrl = baseDomain + '/api'

// const regularFont = Platform.OS === "ios" ? "DroidArabicKufi" : "DroidKufi-Regular"
// const boldFont = Platform.OS === "ios" ? "DroidArabicKufi-Bold" : "DroidKufi-Bold"

const regularFont = Platform.OS === 'ios' ? 'DroidArabicKufi' : 'Tajawal-Regular'
const boldFont = Platform.OS === 'ios' ? 'DroidArabicKufi-Bold' : 'Tajawal-Bold'

export {
    baseUrl,
    regularFont,
    boldFont,
    baseDomain
}
