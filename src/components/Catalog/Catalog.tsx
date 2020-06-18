import React from 'react';
import {
  List, F7List
} from 'framework7-react';
import { Product } from '../../pages/product';
import { CatalogItem } from '.';

import './style.less'

type Props = Partial<F7List.Props> & {
  products: Product[]
}

export default (props: Props) => (
  <List className="catalog" {...props}>
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