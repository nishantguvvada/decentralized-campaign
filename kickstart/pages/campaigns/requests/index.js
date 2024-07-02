import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

const RequestIndex = (props) => {
    const { Header, Row, HeaderCell, Body } = Table;

    const renderRow = () => {
        return props.requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={props.address}
                approversCount={props.approversCount}
            />
        });
    }

    return (
        <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${props.address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {renderRow()}
                </Body>
            </Table>
        </Layout>
    )
}

RequestIndex.getInitialProps = async ({ query }) => {

    const address = query.address;

    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(

        Array(parseInt(requestCount)).fill().map((element, index) => {
            return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, requestCount, approversCount }
};

export default RequestIndex;