import React, { Component } from "react";
import Link from "next/link";
import { Button, Table, Grid, Icon } from "semantic-ui-react";
import Router from "next/router";

import Layout from "../../../../components/Layout";
import Campaign from "../../../../block/campaign";
import RequestRow from "../../../../components/RequestRow";

class RequestsView extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const totalApprovers = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    console.log(totalApprovers);
    return { address, requests, requestCount, totalApprovers };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          totalApprovers={this.props.totalApprovers}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Requests</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Link
                href="/campaigns/[address]"
                as={`/campaigns/${this.props.address}`}
              >
                <a>
                  <Button icon labelPosition="left" basic>
                    Back
                    <Icon name="left arrow" />
                  </Button>
                </a>
              </Link>
              <Button
                icon
                labelPosition="left"
                color="teal"
                floated="right"
                onClick={() => Router.reload()}
              >
                Refresh
                <Icon name="refresh" />
              </Button>
              <Link
                href="/campaigns/[address]/requests/new"
                as={`/campaigns/${this.props.address}/requests/new`}
              >
                <a>
                  <Button color="teal" floated="right">
                    Create New Request
                  </Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipent</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests</div>
      </Layout>
    );
  }
}

export default RequestsView;
