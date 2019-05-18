import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
	nav: require('./NavigationRedux').reducer,
	settings: require('./SettingsRedux').reducer,
	login: require('./LoginRedux').reducer,
})

export default () => {
	let finalReducers = reducers
	// If rehydration is on use persistReducer otherwise default combineReducers
	if (ReduxPersist.active) {
		const persistConfig = ReduxPersist.storeConfig
		finalReducers = persistReducer(persistConfig, reducers)
	}

	let { store } = configureStore(finalReducers)

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('./').reducers
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}
