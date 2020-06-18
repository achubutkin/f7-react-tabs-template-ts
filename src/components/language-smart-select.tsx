import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { languageConnector, ILanguageProps } from '../store/connectLanguage';
import { List, ListItem } from 'framework7-react';
import { compose } from 'redux';

type Props = WithTranslation & ILanguageProps
type OwnProps = Partial<Pick<ILanguageProps, 'languages' | 'language' | 'changeLanguage'>>

const LanguageSmartSelect = (props: Props) => {
  const {
    language,
    languages,
    changeLanguage,
    t
  } = props

  console.log('language: ' + language)

  return (
    <List noHairlines>
      <ListItem
        title={t('Language').toString()}
        smartSelect
        smartSelectParams={{
          openIn: 'popover',
          closeOnSelect: true,
          on: {
            closed: (ev: any) => changeLanguage(ev.selectEl.value)
          }
        }}
      >
        <select name="language" defaultValue={language}>
          {languages.map(item => (
            <option key={item.value} value={item.value}>{item.title}</option>
          ))}
        </select>
      </ListItem>
    </List>
  )
}

export default compose<React.FC<OwnProps>>(
  withTranslation(),
  languageConnector
)(LanguageSmartSelect)