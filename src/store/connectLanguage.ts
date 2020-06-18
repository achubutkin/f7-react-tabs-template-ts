import { connect } from 'react-redux'
import { IApplicationState } from './Store'
import { Dispatch } from 'redux'
import { changeLanguage, ChangeLanguageAction } from '../actions/languageActions'

interface ILanguage {
  title: string,
  value: string,
}

interface IStateFromProps {
  language?: string,
  languages: ILanguage[],
}

interface IDispatchFromProps {
  changeLanguage: (lng: string) => void,
}

export interface ILanguageProps extends IStateFromProps, IDispatchFromProps { }

const defaultLanguages: ILanguage[] = [
  {
    title: 'English',
    value: 'en-US'
  },
  {
    title: 'Japanese',
    value: 'ja'
  }
]

const mapStateToProps = (state: IApplicationState, ownProps: ILanguageProps): IStateFromProps => {
  return {
    language: ownProps.language || state.rootReducer.language,
    languages: ownProps.languages || defaultLanguages,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ChangeLanguageAction>, ownProps: ILanguageProps): IDispatchFromProps => ({
  changeLanguage: (lng: string) => ownProps.changeLanguage ? ownProps.changeLanguage(lng)
    : dispatch(changeLanguage(lng))
})

export const languageConnector = connect<IStateFromProps, IDispatchFromProps, ILanguageProps>(
  mapStateToProps,
  mapDispatchToProps
)