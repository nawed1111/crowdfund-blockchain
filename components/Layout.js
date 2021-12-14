import React from "react";
import Header from "./Header";
import "semantic-ui-css/semantic.min.css";
import { Segment } from "semantic-ui-react";

const Layout = (props) => {
  return (
    <Segment basic>
      <Header />
      {props.children}
    </Segment>
  );
};

export default Layout;
