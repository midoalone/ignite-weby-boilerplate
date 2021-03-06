import {StyleSheet} from 'react-native'
import {boldFont, regularFont} from "../../Config/Globals";
import Colors from "../../Themes/Colors";

export default StyleSheet.create({
    itemContainer: {
        paddingHorizontal: 7,
        flex: 1,
        borderRadius: 30,
		borderWidth: 2,
		borderColor: Colors.mainLight
    },
    cleanItemContainer: {
        paddingHorizontal: 7
    },
    labelContainer: {
        marginBottom: 5,
        textAlign: 'left'
    },
    label: {
        fontFamily: boldFont,
        fontSize: 14,
		color: Colors.brand
    },
    required: {
        color: 'red'
    },
    hint: {
        fontFamily: regularFont,
        fontSize: 12,
        color: Colors.grayDark
    },
    input: {
        fontFamily: regularFont,
        fontSize: 13,
        height: 38,
        textAlign: 'right',
		color: Colors.white
    },
    textarea: {
        height: 90,
    },
    pickerArrow: {
        color: Colors.grayDark,
        position: 'absolute',
        right: 10,
        top: 5,
        fontSize: 25
    },
    pickerLabel: {
        fontFamily: regularFont,
        fontSize: 13,
        paddingLeft: 30,
        paddingRight: 4,
        paddingVertical: 9,
        lineHeight: 18,
    },
    photoPlaceholderPhoto: {
        width: 65,
        height: 65,
        borderRadius: 35
    },
    photoPlaceholderView: {
        width: 65,
        height: 65,
        backgroundColor: Colors.grayDark,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 35
    },
    photoPlaceholderText: {
        textAlign: 'center',
        flex: 1,
        fontFamily: regularFont,
        color: '#fff',
        fontSize: 11,
        lineHeight: 16
    },
    addOptionButton: {
        marginVertical: 5,
        paddingHorizontal: 10
    }
})
