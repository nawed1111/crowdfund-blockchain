import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import Link from "next/link";

const Header = () => {
  return (
    <Segment inverted>
      <Menu style={{ marginTop: "10px" }}>
        <Link href="/" as="/">
          <a className="item">Crowd Fund</a>
        </Link>
        <Menu.Menu position="right">
          <Link href="/" as="/">
            <a className="item">Campaigns</a>
          </Link>
          <Link href="/campaigns/new" as="/campaigns/new">
            <a className="item">+</a>
          </Link>
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};

export default Header;
