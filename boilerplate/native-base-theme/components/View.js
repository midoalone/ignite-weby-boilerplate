import variable from "./../variables/platform"

export default (variables = variable) => {
	const viewTheme = {
		".padder": {
			padding: variables.contentPadding
		},
		".doublePadder": {
			padding: variables.contentPadding * 2
		},
		".row": {
			flexDirection: 'row'
		}
	}

	return viewTheme
};
