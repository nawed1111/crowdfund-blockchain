import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../block/campaign";
import web3 from "../block/web3";
import Router from "next/router";

class Contribute extends Component {
  state = {
    value: "",
    errMsg: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errMsg: "" });
    const campaign = Campaign(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      Router.replace(`/campaigns/${this.props.address}`);
    } catch (error) {
      this.setState({ errMsg: error.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
          />
        </Form.Field>
        <Message
          error
          header="There was some error with your submission"
          content={this.state.errMsg}
        />
        <Button color="teal" loading={this.state.loading}>
          Contribute
        </Button>
      </Form>
    );
  }
}

export default Contribute;
