import variable from "./../variables/platform"
import {boldFont} from "../../App/Config/Globals"
import {Colors} from "../../App/Themes"

export default (variables = variable) => {
	const textTheme = {
		fontSize: variables.DefaultFontSize,
		fontFamily: variables.fontFamily,
		color: variables.textColor,
		".note": {
			color: "#9c9c9c",
			fontSize: 12
		},
		".bold": {
			fontFamily: boldFont
		},
		".center": {
			textAlign: 'center'
		},
		".left": {
			textAlign: 'left'
		},
		".title": {
			color: Colors.brand,
			fontFamily: boldFont,
			textAlign: 'left',
			marginVertical: 10,
			fontSize: 18
		},
		".titleCenter": {
			color: Colors.brand,
			fontFamily: boldFont,
			marginVertical: 10,
			textAlign: 'center',
			fontSize: 16
		},
		".error": {
			backgroundColor: "#b20011",
			color: '#fff',
			padding: 10,
			textAlign: 'center',
			marginBottom: 10,
			fontSize: 14
		}
	}

	return textTheme
};
