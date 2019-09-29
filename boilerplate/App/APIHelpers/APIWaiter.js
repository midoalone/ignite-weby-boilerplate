import React, {Fragment} from 'react'

export const APIWaiter = ({children, checker}) => {
	if (checker) {
		return <Fragment>
			{children}
		</Fragment>
	}

	return null
}
