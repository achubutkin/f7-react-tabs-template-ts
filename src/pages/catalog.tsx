import React from 'react';
import { Page, Navbar, List, ListItem } from 'framework7-react';
import { Product } from './product';
import { Catalog } from '../components/Catalog';

type Props = {}

type State = {
  products: Product[]
}

export default class extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      products: this.$f7?.data.products || [],
    }
  }
  render() {
    return (
      <Page name="catalog">
        <Navbar title="Catalog" />
        <Catalog products={this.state.products} />
      </Page>
    );
  }
}