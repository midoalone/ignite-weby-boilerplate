import variable from "./../variables/platform"
import {Colors} from "../../App/Themes"

export default (variables = variable) => {
	const contentTheme = {
		flex: 1,
		backgroundColor: Colors.background,
		"NativeBase.Segment": {
			borderWidth: 0,
			backgroundColor: "transparent"
		}
	}

	return contentTheme
};
