import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    settingsData: ['data'],
})

export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    data: {
    	language: 'en'
	}
})

/* ------------- Reducers ------------- */

// request the data from an api
export const settingsData = (state = INITIAL_STATE, {data}) =>
    state.merge({data})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SETTINGS_DATA]: settingsData,
})
