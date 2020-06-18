import { createStore, applyMiddleware, AnyAction, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { LANGUAGE_CHANGING } from './languageActions';
import i18n from '../i18n';

export interface IApplicationState {
  language?: string,
}

const initialState: IApplicationState = {
  language: i18n.language,
}

const rootReducer = (state: IApplicationState = initialState, action: AnyAction): IApplicationState => {
  switch (action.type) {
    case LANGUAGE_CHANGING:
      return {
        ...state,
        language: action.lng
      }
  }
  return state
}

const combinedReducers = combineReducers({
  rootReducer
})

const configureStore = () => {
  const isDebuggingInChrome = !!(window as any).navigator.userAgent
  const middlewares: any[] = [reduxThunk]

  if (isDebuggingInChrome) {
    middlewares.push(logger)
  }

  return createStore(combinedReducers, applyMiddleware(...middlewares))
}

export default configureStore