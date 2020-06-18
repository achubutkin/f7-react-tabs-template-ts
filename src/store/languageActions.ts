import i18n from '../i18n'
import { Dispatch } from 'redux'

export const LANGUAGE_CHANGING = 'LANGUAGE_CHANGING'

export const onLanguageChanged = () => async (dispatch: Dispatch) => {
  i18n.on('languageChanged', lng => dispatch(languageChangingAction(lng)))
}

const languageChangingAction = (lng: string) => ({
  type: LANGUAGE_CHANGING,
  lng
})