import {Form, Input, Message, Button, Dimmer, Loader } from 'semantic-ui-react';
import { useState } from 'react';
import Campaign from '../ethereum/campaign';
import web3UserVersion from '../ethereum/web3';
import { Router } from '../routes';


const ContributeForm  = (props) => {
    const [value, setValue] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {

        e.preventDefault();

        const campaign = Campaign(props.address);

        setLoading(() => {
            setErrorMessage("");
            return true;
        });

        try{

            const accounts = await web3UserVersion.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3UserVersion.utils.toWei(value, 'ether')
            });

            Router.replaceRoute(`/campaigns/${props.address}`); // Refresh the page

        } catch(err){

            setErrorMessage(err.message);

        }

        setLoading(false);

    };

    return (
            <Form error={!!errorMessage} onSubmit={onSubmit}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        label='ether'
                        labelPosition='right'
                    />
                </Form.Field>
                <Message error header="There was some errors with your submission" content={errorMessage}/>
                <Button loading={loading} primary>
                    Contribute!
                </Button>
                <Dimmer active={loading} inverted>
                    <Loader inverted content='This could take around 20 to 30 seconds' />
                </Dimmer>
            </Form>
    )
}

export default ContributeForm;