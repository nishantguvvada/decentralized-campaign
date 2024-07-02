import web3UserVersion from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3UserVersion.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xf7B70Ff381C435fFf51b10FfD0BeC8d765876BAB'
);

export default instance;