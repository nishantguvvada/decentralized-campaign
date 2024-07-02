import { Table, Button, Message } from 'semantic-ui-react';
import web3UserVersion from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

const RequestRow = (props) => {

    const { Row, Cell } = Table;

    const onApprove = async () => {

        const accounts = await web3UserVersion.eth.getAccounts();
        const campaign = Campaign(props.address);

        await campaign.methods.approveRequest(props.id).send({
            from: accounts[0]
        });

    }

    const onFinalize = async () => {

        const accounts = await web3UserVersion.eth.getAccounts();
        const campaign = Campaign(props.address);

        await campaign.methods.finalizeRequest(props.id).send({
            from: accounts[0]
        });

    }

    return (
        <Row disabled={props.request.complete}>
            <Cell>{props.id}</Cell>
            <Cell>{props.request.description}</Cell>
            <Cell>{web3UserVersion.utils.fromWei(props.request.value,'ether')}</Cell>
            <Cell>{props.address}</Cell>
            <Cell>{Number(props.request.approvalCount)} / {Number(props.approversCount)}</Cell>
            <Cell>
                {props.request.complete ? null : (
                    <Button color="green" basic onClick={onApprove}>Approve</Button>
                )}
            </Cell>
            <Cell>
                <Button color="teal" basic onClick={onFinalize}>Finalize</Button>
            </Cell>
        </Row>
    )
}

export default RequestRow;