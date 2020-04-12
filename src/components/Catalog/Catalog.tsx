import React from 'react';
import {
  List, F7List
} from 'framework7-react';
import { Product } from '../../pages/product';

import './style.less'
import { CatalogItem } from '.';

type Props = Partial<F7List.Props> & {
  products: Product[]
}

export default (props: Props) => (
  <List {...props} className="catalog">
    {props.products.map((product) => (
      <CatalogItem
        key={product.id}
        title={product.title}
        link={`/product/${product.id}/`}
        slot="list"
      />
    ))}
  </List>
)