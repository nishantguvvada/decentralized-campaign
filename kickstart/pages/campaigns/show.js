import { useEffect } from 'react';
import Layout  from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card , Grid, Button } from 'semantic-ui-react';
import web3UserVersion from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

const show = (props) => {

    function renderCards() {

        const minimumContribution = props.minimumContribution;
        const balance = props.balance;
        const requestsCount = props.requestsCount;
        const approversCount = props.approversCount;
        const manager = props.manager;

        const items = [
            {
                header: manager,
                meta: 'Manager Address',
                description: 'Manager creates the campaign and can create requests to withdraw money.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'One must contribute at least the stated wei to become an approver.'
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request to withdraw money from the contract. Requests must be approved by approvers.'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to the campaign.'
            },
            {
                header: balance,
                meta: 'Campaign Balance (ether)',
                description: 'Balance is the amount of money the campaign has left to spend.'
            }
        ];

        return <Card.Group items={items}/>
    }

    return (
        <Layout>
            <h3>Campaign Stats</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {renderCards()} 
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={props.address}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaigns/${props.address}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )
}

show.getInitialProps = async ({ query }) => {

    const address = query.address;

    const campaign = Campaign(query.address);
    const summary = await campaign.methods.getSummary().call();

    const minimumContribution = Number(summary[0]);
    const balance = Number(web3UserVersion.utils.fromWei(summary[1], 'ether'));
    const requestsCount = Number(summary[2]);
    const approversCount = Number(summary[3]);
    const manager = summary[4].toString();

    return {
        address,
        minimumContribution,
        balance,
        requestsCount,
        approversCount,
        manager
    };

}

export default show;