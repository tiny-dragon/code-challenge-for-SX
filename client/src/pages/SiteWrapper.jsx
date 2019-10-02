// @flow

import * as React from "react";
import "tabler-react/dist/Tabler.css";

import { Site, Nav, Button } from "tabler-react";
import history from '../redux/history';

class SiteWrapper extends React.Component {
  
  render = () => {
    return (
      <Site.Wrapper
        headerProps={{
          href: "/",
          alt: "Test Project for StormX",
          imageURL: "./img/Logo.png",
          navItems: (
            <Nav.Item type="div" className="d-none d-md-flex">
              <Button onClick={() => history.push('/signin')}>Sing In</Button>
            </Nav.Item>
          )
        }}
        footerProps={{
          copyright: (
            <React.Fragment>
              Copyright © 2019
              <a href="."> Jin.com</a>. All rights reserved.
            </React.Fragment>
          )
        }}
      >
        {this.props.children}
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;
