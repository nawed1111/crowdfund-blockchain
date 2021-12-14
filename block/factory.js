import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xa26BEfc2c5E7F49539C9A632FA82820C13421FA5"
);
export default instance;
