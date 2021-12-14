import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Link from "next/link";

import Layout from "../../../components/Layout";
import web3 from "../../../block/web3";
import Campaign from "../../../block/campaign";
import Contribute from "../../../components/ContributeForm";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const campaignDetails = await campaign.methods.getSummary().call();
    return {
      address: props.query.address,
      minimumContribution: campaignDetails[0],
      balance: campaignDetails[1],
      requestCount: campaignDetails[2],
      approversCount: campaignDetails[3],
      manager: campaignDetails[4],
    };
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestCount,
      approversCount,
      manager,
    } = this.props;
    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description:
          "The manager created this Campaign and can create requests.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description: "You must contribute this much wei to become an approver.",
      },
      {
        header: requestCount,
        meta: "Number of requests",
        description:
          "A request tries to withdraw money from contributed account",
      },
      {
        header: approversCount,
        meta: "Number of approvers",
        description:
          "Number of people who have already contributed for the Campaign.",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description: "The balance is how much this Campaign has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width="12">{this.renderCards()}</Grid.Column>
            <Grid.Column width="3">
              <Contribute address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link
                href="/campaigns/[address]/requests"
                as={`/campaigns/${this.props.address}/requests`}
              >
                <a>
                  <Button color="teal">View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
