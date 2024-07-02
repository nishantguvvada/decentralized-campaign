import web3UserVersion from "./web3";
import Campaign from './build/Campaign.json';

export default (address) => {
    return (new web3UserVersion.eth.Contract(
        JSON.parse(Campaign.interface),
        address
    ));
};
