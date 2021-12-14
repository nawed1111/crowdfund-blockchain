import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../block/web3";
import Campaign from "../block/campaign";

class RequestRow extends Component {
  onApprove = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0],
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  onFinilize = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0],
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    const { Row, Cell } = Table;
    const { id, request, totalApprovers } = this.props;
    const majorityCheck = request.approvalCount > totalApprovers / 2;
    return (
      <Row
        disabled={request.complete}
        positive={majorityCheck && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{`${request.approvalCount}/${totalApprovers}`}</Cell>
        <Cell>
          <Button
            color="green"
            basic
            onClick={this.onApprove}
            disabled={majorityCheck}
          >
            Approve
          </Button>
        </Cell>
        <Cell>
          <Button
            color="teal"
            basic
            onClick={this.onFinilize}
            disabled={request.complete || !majorityCheck}
          >
            Finilize
          </Button>
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
