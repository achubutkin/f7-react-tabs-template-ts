import IntroPage from '../pages/intro';
import HomePage from '../pages/home';
import AboutPage from '../pages/about';
import FormPage from '../pages/form';
import CatalogPage from '../pages/catalog';
import ProductPage from '../pages/product';
import SettingsPage from '../pages/settings';
import SelectCityPopup from '../pages/select-city';

import DynamicRoutePage from '../pages/dynamic-route';
import RequestAndLoad, { User } from '../pages/request-and-load';
import NotFoundPage from '../pages/404';
import { Router } from 'framework7/modules/router/router';
import Framework7 from 'framework7';

interface RouteParameters extends Router.RouteParameters {
  app?: Framework7,
  component: any /* fix TS error */
}

const routes: RouteParameters[] | any[] /* fix TS error */ = [
  {
    path: '/',
    component: IntroPage,
  },
  {
    path: '/home/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },
  {
    path: '/select-city/',
    popup: {
      component: SelectCityPopup
    }
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      const router = this;

      // App instance
      const { app } = router;

      // Show Preloader
      app?.preloader.show();

      // User ID from request
      const userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        const user: User = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app?.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
