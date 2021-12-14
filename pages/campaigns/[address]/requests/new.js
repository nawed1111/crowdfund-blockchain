import React, { Component } from "react";
import { Form, Message, Button, Input, Grid, Icon } from "semantic-ui-react";
import Link from "next/link";
import Router from "next/router";

import Layout from "../../../../components/Layout";
import Campaign from "../../../../block/campaign";
import web3 from "../../../../block/web3";

class RequestNew extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  state = {
    description: "",
    amount: "",
    recipent: "",
    errMsg: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errMsg: "" });
    try {
      const campaign = await Campaign(this.props.address);
      console.log(campaign.options.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          this.state.description,
          web3.utils.toWei(this.state.amount, "ether"),
          this.state.recipent
        )
        .send({ from: accounts[0] });

      Router.push(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      this.setState({ errMsg: error.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>New Request</h3>
        <Link
          href="/campaigns/[address]/requests"
          as={`/campaigns/${this.props.address}/requests`}
        >
          <a>
            <Button icon labelPosition="left" basic>
              Back
              <Icon name="left arrow" />
            </Button>
          </a>
        </Link>
        <Grid>
          <Grid.Column width="8">
            <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
              <Form.Field>
                <label>Description</label>
                <Input
                  value={this.state.description}
                  onChange={(event) =>
                    this.setState({ description: event.target.value })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Amount</label>
                <Input
                  label="ether"
                  labelPosition="right"
                  value={this.state.amount}
                  onChange={(event) =>
                    this.setState({ amount: event.target.value })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Recipent</label>
                <Input
                  value={this.state.recipent}
                  onChange={(event) =>
                    this.setState({ recipent: event.target.value })
                  }
                />
              </Form.Field>
              <Message
                error
                header="There was some error with your submission"
                content={this.state.errMsg}
              />
              <Button color="teal" loading={this.state.loading}>
                Submit
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default RequestNew;
