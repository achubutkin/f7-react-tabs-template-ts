import React from 'react';
import { Device } from '../framework7-custom';
import {
  App,
  Panel,
  View,
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter
} from 'framework7-react';

import cordovaApp from '../cordova-app';
import routes from '../routes';
import Framework7, { Framework7Params } from 'framework7/components/app/app-class';
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n';
import { Provider } from 'react-redux';
import configureStore from '../store/Store';
import { onLanguageChanged } from '../store/languageActions';

const LS_START_PAGE = 'startPage'
const store = configureStore()

type Props = {}

type State = {
  f7params?: Framework7Params,
  username?: string,
  password?: string,
  init?: boolean,
  url?: string,
}

export default class extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      // Framework7 Parameters
      f7params: {
        id: 'io.framework7.myapp', // App bundle ID
        name: 'My App', // App name
        theme: 'auto', // Automatic theme detection
        // App root data
        data: function () {
          return {

            // Demo products for Catalog section
            products: [
              {
                id: '1',
                title: 'Apple iPhone 8',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
              },
              {
                id: '2',
                title: 'Apple iPhone 8 Plus',
                description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
              },
              {
                id: '3',
                title: 'Apple iPhone X',
                description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
              },
            ]
          };
        },

        // App routes
        routes: routes,

        // Input settings
        input: {
          scrollIntoViewOnFocus: Device.cordova,
          scrollIntoViewCentered: Device.cordova,
        },
        // Cordova Statusbar settings
        statusbar: {
          enabled: Framework7.device.ios && Framework7.device.webView,
          iosOverlaysWebView: true,
          androidOverlaysWebView: true,
          androidBackgroundColor: '#107bfe',
          androidTextColor: 'white',
          iosBackgroundColor: '#107bfe',
          iosTextColor: 'white',
        },
      },
      // Login screen demo data
      username: '',
      password: '',
      init: false,
      url: '/',
    }
  }

  async componentDidMount() {
    this.$f7ready!(async (f7) => {     
      // Call F7 APIs here
      await this.initMainView()

      // Init cordova APIs (see cordova-app.js)
      if (Device.cordova) {
        cordovaApp.init(f7);
      }

      store.dispatch<any>(onLanguageChanged())
    });
  }

  initMainView = () => new Promise(resolve => {
    const url = localStorage.getItem(LS_START_PAGE) || '/'
    this.$f7?.views.create('#view_main', { url: url })
    if (url === '/') {
      localStorage.setItem(LS_START_PAGE, '/')
    }
    resolve()
  })

  alertLoginData() {
    this.$f7?.dialog.alert('Username: ' + this.state.username + '<br>Password: ' + this.state.password, () => {
      this.$f7?.loginScreen.close();
    });
  }

  render() {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App params={this.state.f7params} >

            {/* Left panel with cover effect*/}
            <Panel left cover themeDark>
              <View>
                <Page>
                  <Navbar title="Left Panel" />
                  <Block>Left panel content goes here</Block>
                </Page>
              </View>
            </Panel>


            {/* Right panel with reveal effect*/}
            <Panel right reveal themeDark>
              <View>
                <Page>
                  <Navbar title="Right Panel" />
                  <Block>Right panel content goes here</Block>
                </Page>
              </View>
            </Panel>

            <View id="view_main" main init={false} />

            {/* Popup */}
            <Popup id="my-popup">
              <View>
                <Page>
                  <Navbar title="Popup">
                    <NavRight>
                      <Link popupClose>Close</Link>
                    </NavRight>
                  </Navbar>
                  <Block>
                    <p>Popup content goes here.</p>
                  </Block>
                </Page>
              </View>
            </Popup>

            <LoginScreen id="my-login-screen">
              <View>
                <Page loginScreen>
                  <LoginScreenTitle>Login</LoginScreenTitle>
                  <List form>
                    <ListInput
                      type="text"
                      name="username"
                      placeholder="Your username"
                      value={this.state.username}
                      onInput={(e) => this.setState({ username: e.target.value })}
                    ></ListInput>
                    <ListInput
                      type="password"
                      name="password"
                      placeholder="Your password"
                      value={this.state.password}
                      onInput={(e) => this.setState({ password: e.target.value })}
                    ></ListInput>
                  </List>
                  <List>
                    <ListButton title="Sign In" onClick={() => this.alertLoginData()} />
                    <BlockFooter>
                      Some text about login information.<br />Click "Sign In" to close Login Screen
                </BlockFooter>
                  </List>
                </Page>
              </View>
            </LoginScreen>
          </App>
        </I18nextProvider>
      </Provider>
    )
  }
}