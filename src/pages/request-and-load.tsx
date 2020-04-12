import React from 'react';
import { Page, Navbar, Block, List, ListItem } from 'framework7-react';

export type User = {
  firstName?: string,
  lastName?: string,
  about?: string,
  links: Link[],
}

export type Link = {
  title?: string,
  url?: string,
}

type Props = {
  userId?: string, /* will fill from '/request-and-load/user/:userId/'  */
}

type State = {
  user: User,
}

export default class extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);

    const { $f7route } = this /* object f7route is also available in props */
    const { user = { links: [] } }: { user?: User } = $f7route?.context as any

    this.state = {
      user: user,
    };

  }
  render() {
    const user = this.state.user;
    return (
      <Page>
        <Navbar title={`${user.firstName} ${user.lastName}`} backLink="Back" />
        <Block strong>
          {user.about}
        </Block>
        <List>
          {user.links.map((link, index) => (
            <ListItem
              key={index}
              link={link.url}
              title={link.title}
              external
              target="_blank"
            ></ListItem>
          ))}
        </List>
      </Page>
    );
  }
}