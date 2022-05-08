const LOGO_CONTRACT_ADDRESS = '0x320CCb623b612Eef62F186AfF6b664377cb4260b';
const LOGO_PRICE = 0;
const LOGO_SUPPLY = null;

const LOGO_DESCRIPTOR_CONTRACT_ADDRESS = '0xeA55c5579e1ccE3e52217493788f2a909e64f64F';

const BGBYL_CONTRACT_ADDRESS = '0xfedf7d1f0bde821407B4906482e0d94CE2B04b1c';
const BACKGROUND_PRICE = 0.02;
const BACKGROUND_SUPPLY = 10000;

const FGBL_CONTRACT_ADDRESS = '0x0F552be8CB76f7310129ea9ac9566290bCcBe087';
const EMOTICON_PRICE = 0;
const EMOTICON_SUPPLY = 500;

const TBL_CONTRACT_ADDRESS = '0xe879E7cb78bc665026509598F534A9820F9db88A';
const TEXT_PRICE = 0;
const TEXT_SUPPLY = 20000;

const ETHTERRESTRIAL_LOGO_CONTRACT_ADDRESS = '0x383f1cAFa50CdC2B1450EBf3D8f11b40ee474432';
const NOUN_CONTRACT_ADDRESS = '0xA091265C2643B2B6EA9ac995421e7d53065fa7C4';

const SEARCH_CONTRACT_ADDRESS = '0x505FAeDB47cb08E0A895F90C305ff504b9d08343';

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

const BACKGROUND_ELEMENTS: Map<string, string> = new Map([[NULL_ADDRESS, 'None'],
                                                        [BGBYL_CONTRACT_ADDRESS, 'Background by Logo']]);
    
const FOREGROUND_ELEMENTS: Map<string, string> = new Map([[NULL_ADDRESS, 'None'],
                                                        [ETHTERRESTRIAL_LOGO_CONTRACT_ADDRESS, 'EthTerrestrial'],
                                                        [NOUN_CONTRACT_ADDRESS, 'Noun']]);

const TEXT_ELEMENTS: Map<string, string> = new Map([[NULL_ADDRESS, 'None'],
                                                    [TBL_CONTRACT_ADDRESS, 'Text by Logo'],
                                                    [FGBL_CONTRACT_ADDRESS, 'Emoticon by Logo']]);

const BASE_OWNED_BG_TOKENS: Map<string, number[]> = new Map([[BGBYL_CONTRACT_ADDRESS, []]]);

const BASE_OWNED_TXT_TOKENS: Map<string, number[]> = new Map([[TBL_CONTRACT_ADDRESS, []],
                                                            [FGBL_CONTRACT_ADDRESS, []]]);

const FONTS: string[] = ['Helvetica', 'Rubik', 'Playfair Display', 'Oswald', 'Work Sans', 'Krona One', 'Italiana', 'Federo', 'Caudex', 'VT323', 'Faster One', ];
const FONT_LINK = 'https://fonts.googleapis.com/css?family=';

const META_DATA_KEYS: string[] = ['name', 'url', 'ens', 'token address'];
// mainnet
const CHAIN_ID = 1;

// rinkeby
// const CHAIN_ID = 4;

// local
// const CHAIN_ID = 31337;

export { LOGO_CONTRACT_ADDRESS };
export { LOGO_DESCRIPTOR_CONTRACT_ADDRESS };
export { LOGO_PRICE };
export { LOGO_SUPPLY };
export { BGBYL_CONTRACT_ADDRESS };
export { BACKGROUND_PRICE };
export { BACKGROUND_SUPPLY };
export { FGBL_CONTRACT_ADDRESS };
export { EMOTICON_PRICE };
export { EMOTICON_SUPPLY };
export { TBL_CONTRACT_ADDRESS };
export { TEXT_PRICE };
export { TEXT_SUPPLY };

export { ETHTERRESTRIAL_LOGO_CONTRACT_ADDRESS };
export { NOUN_CONTRACT_ADDRESS };
export { SEARCH_CONTRACT_ADDRESS };
export { NULL_ADDRESS };

export { CHAIN_ID };

export { BACKGROUND_ELEMENTS, FOREGROUND_ELEMENTS, TEXT_ELEMENTS, BASE_OWNED_TXT_TOKENS, BASE_OWNED_BG_TOKENS, FONTS, FONT_LINK };
export { META_DATA_KEYS };