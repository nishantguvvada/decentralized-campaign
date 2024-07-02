import { Form, Button, Message, Input, Dimmer, Loader } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3UserVersion from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import { useState } from 'react';
import Layout from '../../../components/Layout';

const RequestNew = (props) => {

    const [value, setValue] = useState();
    const [description, setDescription] = useState();
    const [recipient, setRecipient] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {

        e.preventDefault();

        const campaign = Campaign(props.address);

        setLoading(()=>{
            setErrorMessage("");
            return true;
        });

        try {

            const accounts = await web3UserVersion.eth.getAccounts();
            await campaign.methods.createRequest(
                description, 
                web3UserVersion.utils.toWei(value, 'ether'), 
                recipient).send({from: accounts[0]});

                Router.pushRoute(`/capmaigns/${props.address}/requests`);

        } catch(err) {

            setErrorMessage(err.message);

        }

        setLoading(false);
    };

    return (
        <Layout>
            <Link route={`/campaigns/${props.address}/requests`}>
                <a>
                    <Button primary>Back</Button>
                </a>
            </Link>
            <h3>Create a request!</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={description}
                        onChange={(e)=>{setDescription(e.target.value)}}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input
                        value={value}
                        onChange={(e)=>{setValue(e.target.value)}}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={recipient}
                        onChange={(e)=>{setRecipient(e.target.value)}}
                    />
                </Form.Field>
                <Message error header="Oops!" content={errorMessage}/>
                <Button primary loading={loading}>Create!</Button>
                <Dimmer active={loading} inverted>
                    <Loader inverted content='This could take around 20 to 30 seconds' />
                </Dimmer>
            </Form>
        </Layout>
    )

}

RequestNew.getInitialProps = async ({query}) => {

    const address = query.address;

    return {address};
} 

export default RequestNew;