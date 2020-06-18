import React from 'react';
import { compose } from 'redux';
import { Page, Navbar, Block, BlockTitle, Link, NavRight } from 'framework7-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import NavTitle from '../components/nav-title';
import { ImportContactsPopup } from '../components/import-contacts-modal';
import LanguageSmartSelect from '../components/language-smart-select';

type Props = WithTranslation

class IntroPage extends React.Component<Props> {
  state = {
    popupOpen: false
  }

  togglePopup = () => this.setState({
    popupOpen: !this.state.popupOpen
  })

  render() {
    const { t } = this.props
    const { popupOpen } = this.state

    return (
      <Page>
        <Navbar noHairline noShadow>
          <NavTitle>{t('Intro')}</NavTitle>
          <NavRight>
            <Link href="/settings/" iconIos="f7:settings" iconMd="material:settings" />
          </NavRight>
        </Navbar>
        <BlockTitle>{t('Intro')}</BlockTitle>
        <Block strong>
          <Link onClick={this.togglePopup}>Open</Link>
          <p>Fugiat perspiciatis excepturi, soluta quod non ullam deleniti. Nobis sint nemo consequuntur, fugiat. Eius perferendis animi autem incidunt vel quod tenetur nostrum, voluptate omnis quasi quidem illum consequuntur, a, quisquam.</p>
          <p>Laudantium neque magnam vitae nemo quam commodi, in cum dolore obcaecati laborum, excepturi harum, optio qui, consequuntur? Obcaecati dolor sequi nesciunt culpa quia perspiciatis, reiciendis ex debitis, ut tenetur alias.</p>
        </Block>
        <Block strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni molestiae laudantium dignissimos est nobis delectus nemo ea alias voluptatum architecto, amet similique, saepe iste consectetur in repellat ut minus quibusdam!</p>
          <p>Molestias et distinctio porro nesciunt ratione similique, magni doloribus, rerum nobis, aliquam quae reiciendis quasi modi. Nam a recusandae, fugiat in ea voluptates fuga eius, velit corrupti reprehenderit dignissimos consequatur!</p>
          <p>Blanditiis, cumque quo adipisci. Molestiae, dolores dolorum quos doloremque ipsa ullam eligendi commodi deserunt doloribus inventore magni? Ea mollitia veniam nostrum nihil, iusto doloribus a at! Ea molestiae ullam delectus!</p>
        </Block>

        <ImportContactsPopup
          opened={popupOpen}
          closePopupOnClick={this.togglePopup}
          importContacts={() => {
            this.setState({ loading: true })
          }}
          loading={this.state.loading}
        />

        <LanguageSmartSelect 
          changeLanguage={lng => console.log(lng)}
        />

      </Page>
    )
  }
}

export default compose(
  withTranslation()
)(IntroPage)