
import { BGBYL_CONTRACT_ADDRESS, 
  FGBL_CONTRACT_ADDRESS,
  NOUN_CONTRACT_ADDRESS,
  TBL_CONTRACT_ADDRESS,
  NULL_ADDRESS} from './data/static';

export interface LogoElement {
  contractAddress: string;
  tokenId: number;
  translateXDirection: number
  translateX: number;
  translateYDirection: number
  translateY: number;
  scaleDirection: number;
  scaleMagnitude: number;
  value: string;
  font: string;
  fontLink: string;
  sourceContract: string;
  siteUrl: string;
  collectionUrl: string;
  twitterUrl: string;
  discordUrl: string;
};

export interface Logo {
  width: number;
  height: number;
  layers: LogoElement[];
  text: LogoElement;
};

export interface MetaData {
  key: string
  value: string;
};

const BASE_LOGO: Logo = {
  width: 300,
  height: 300,
  layers: [{contractAddress: NULL_ADDRESS, tokenId: 0, translateXDirection: 0, translateX: 0, translateYDirection: 0, translateY: 0, scaleDirection: 0, scaleMagnitude: 0, value: '', font: '', fontLink: '', sourceContract: '', siteUrl: '', collectionUrl: '', twitterUrl: '', discordUrl: ''},
  {contractAddress: NULL_ADDRESS, tokenId: 1, translateXDirection: 0, translateX: 0, translateYDirection: 0, translateY: 0, scaleDirection: 0, scaleMagnitude: 0, value: '', font: '', fontLink: '', sourceContract: '', siteUrl: '', collectionUrl: '', twitterUrl: '', discordUrl: ''}],
  text: {contractAddress: NULL_ADDRESS, tokenId: 0, translateXDirection: 0, translateX: 0, translateYDirection: 0, translateY: 0, scaleDirection: 0, scaleMagnitude: 0, value: '', font: '', fontLink: '', sourceContract: '', siteUrl: '', collectionUrl: '', twitterUrl: '', discordUrl: ''}
};

export { BASE_LOGO };
