import React from 'react';
import {
  ListItem, F7ListItem
} from 'framework7-react';

import './styles.less'

export default (props: F7ListItem.Props) => (
  <ListItem
    {...props}
    className="catalog__item"
  />
)