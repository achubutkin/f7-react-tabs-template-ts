import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment';
import numeral from 'numeral';
import 'numeral/locales/ru';
import 'numeral/locales/ja';

const setLocaleNumeralJS = (lng: string) => {
  const defaultLng = 'en'
  lng = lng.toLocaleLowerCase()
  if (lng.startsWith('en-')) {
    lng = defaultLng
  } else {
    if (!numeral.locales[lng]) {
      lng = lng.includes('-') ? lng.split('-')[0] : lng
      if (!numeral.locales[lng]) lng = defaultLng
    }
  }
  numeral.locale(lng)
}

const setLocale = (lng: string) => {
  moment.locale(lng)
  setLocaleNumeralJS(lng)
}

i18n.on('initialized', () => setLocale(i18n.language))
i18n.on('languageChanged', lng => setLocale(lng))

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: require('./static/locales/en.json'),
      ja: require('./static/locales/ja.json')
    },
    interpolation: {
      escapeValue: false
    },
  })

export default i18n
