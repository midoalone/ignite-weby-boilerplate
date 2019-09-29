import {Platform, Dimensions} from "react-native"

import variable from "./../variables/platform"
import Colors from "../../App/Themes/Colors"

const deviceHeight = Dimensions.get("window").height
export default (variables = variable) => {
	const theme = {
		flex: 1,
		height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 50,
		backgroundColor: Colors.background,
	}

	return theme
};
