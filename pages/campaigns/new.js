import React, { Component } from "react";
import Router from "next/router";
import { Form, Button, Input, Message } from "semantic-ui-react";

import Layout from "../../components/Layout";
import factory from "../../block/factory";
import web3 from "../../block/web3";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errMsg: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errMsg: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({ from: accounts[0] });

      Router.push("/");
    } catch (error) {
      this.setState({ errMsg: error.message });
    }
    this.setState({ loading: false });
  };

  render() {
    console.log(process.env.FACTORY_ADDRESS);
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Message
            error
            header="There was some errors with your submission"
            content={this.state.errMsg}
          />
          <Button type="submit" color="teal" loading={this.state.loading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
