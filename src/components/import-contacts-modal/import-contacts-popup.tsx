import React from 'react';
import { Popup, Page, Link, Block, F7Popup, Button, Preloader } from "framework7-react";
import { WithTranslation, withTranslation } from 'react-i18next';
import { compose } from 'redux';

interface MapStateToProps {
  loading?: boolean,
  error?: string,
}

interface MapDispatchToProps {
  closePopupOnClick?(): void,
  importContacts?(): void,
}

type Props = F7Popup.Props & MapStateToProps & MapDispatchToProps

class ImportContactsPopup extends React.Component<Props & WithTranslation> {
  render() {
    const {
      error,
      loading,
      closePopupOnClick,
      importContacts,
      t,
      ...rest
    } = this.props

    return (
      <Popup className="import-contacts-popup" {...rest}>
        <Page pageContent={false}>
          <div className="page-content display-flex justify-content-center" style={{ flexDirection: 'column' }}>
            <Block>
              <Link onClick={closePopupOnClick}>Close</Link>
              <p>Here comes popup. You can put here anything, even independent view with its own navigation. Also not, that by default popup looks a bit different on iPhone/iPod and iPad, on iPhone it is fullscreen.</p>
              <Button fill round big onClick={importContacts} disabled={loading}>
                {loading ? <Preloader size="small" color="white" /> : t('Import')}
              </Button>
            </Block>
          </div>
        </Page>
      </Popup>
    )
  }
}

export default compose<React.ComponentClass<Props>>(
  withTranslation()
)(ImportContactsPopup)