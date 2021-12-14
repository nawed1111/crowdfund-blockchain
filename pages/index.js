import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";

import factory from "../block/factory";
import Layout from "../components/Layout";

import { Card, Button } from "semantic-ui-react";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.deployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href="/campaigns/[address]" as={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Button
            content="Create Campaign"
            icon="add circle"
            color="teal"
            labelPosition="left"
            floated="right"
            onClick={() => Router.push("/campaigns/new")}
          />
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
