import i18n from '../i18n';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
export type CHANGE_LANGUAGE = typeof CHANGE_LANGUAGE

export interface ChangeLanguage {
  type: CHANGE_LANGUAGE
}

export type ChangeLanguageAction = ChangeLanguage

export function changeLanguage(lng: string): ChangeLanguageAction {
  if (lng !== i18n.language) i18n.changeLanguage(lng)
  return {
    type: CHANGE_LANGUAGE
  }
}