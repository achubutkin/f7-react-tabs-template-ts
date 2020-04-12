import React from 'react';
import { Page, Navbar, BlockTitle, Block } from 'framework7-react';

export type Product = {
  id?: string,
  title?: string,
  description?: string,
}

type Props = {}

type State = {
  product: Product
}

export default class extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    const { $f7route } = this /* object f7route is also available in props */
    const productId = $f7route?.params.id;
    let currentProduct: Product = {};
    const { products = [] }: { products: Product[] } = this.$f7?.data
    products.forEach(function (product) {
      if (product.id === productId) {
        currentProduct = product;
      }
    });

    this.state = {
      product: currentProduct,
    };

  }
  render() {
    return (
      <Page name="product">
        <Navbar title={this.state.product.title} backLink="Back" />
        <BlockTitle>About {this.state.product.title}</BlockTitle>
        <Block strong>
          {this.state.product.description}
        </Block>
      </Page>
    );
  }
}