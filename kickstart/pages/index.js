import { React } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout  from '../components/Layout';
import { Link } from '../routes';

function app (props) {

    function renderCampaigns() {

        const items = props.campaigns.map(address => {

            return {

                header: address,
                description: (<Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>),
                fluid: true

            }

        });
        
        return <Card.Group items={items}/>

    }

    return <Layout>
    
        <div>
            <h2>Open Campaigns</h2>
            <Link route="/campaigns/new">
                <a>
                    <Button
                    floated="right"
                    content="Create Campaign"
                    icon="add"
                    primary={true}
                    />
                </a>
            </Link>

            {renderCampaigns()}
        </div>

    </Layout>

}


app.getInitialProps = async () => {

    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };

};

export default app;

