import React from 'react';
import {
  ListItem, F7ListItem
} from 'framework7-react';

import './style.less'

export default (props: F7ListItem.Props) => (
  <ListItem
    className="catalog-item"
    {...props}
  />
)