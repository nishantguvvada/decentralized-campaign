import { React, useState } from 'react';
import { Form, Button, Input, Message, Dimmer, Loader } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory  from '../../ethereum/factory';
import web3UserVersion from '../../ethereum/web3';
import { Router } from '../../routes';

const CampaignNew = () => {
    const [minimumContribution, setMinimumContribution] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(e) {

        e.preventDefault();

        setLoading(()=>{
            setErrorMessage("");
            return true;
        });

        try{

            const accounts = await web3UserVersion.eth.getAccounts();
            await factory.methods.createCampaign(minimumContribution).send({from: accounts[0]});
            Router.pushRoute('/');

        } catch(err){

            setErrorMessage(err.message);

        }

        setLoading(false);
        
    }

    return (
        <Layout>
            <h2>Create a new campaign</h2>
            <Form error={!!errorMessage} onSubmit={onSubmit}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label='wei' 
                        labelPosition='right'
                        value={minimumContribution}
                        onChange={(e) => setMinimumContribution(e.target.value)}
                    />
                </Form.Field>
                <Message error header="There was some errors with your submission" content={errorMessage}/>
                <Button loading={loading} primary>Create</Button>
                <Dimmer active={loading} inverted>
                    <Loader inverted content='This could take around 20 to 30 seconds' />
                </Dimmer>
            </Form>
        </Layout>
    )
}

export default CampaignNew;
