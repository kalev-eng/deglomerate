const LOGO_CONTRACT_ADDRESS = '0x3C15538ED063e688c8DF3d571Cb7a0062d2fB18D';
const LOGO_PRICE = 0;
const LOGO_SUPPLY = null;

const LOGO_DESCRIPTOR_CONTRACT_ADDRESS = '0x3904b8f5b0F49cD206b7d5AABeE5D1F37eE15D8d';

const BGBYL_CONTRACT_ADDRESS = '0xdFdE6B33f13de2CA1A75A6F7169f50541B14f75b';
const BACKGROUND_PRICE = 0.02;
const BACKGROUND_SUPPLY = 10000;

const FGBL_CONTRACT_ADDRESS = '0x54B8d8E2455946f2A5B8982283f2359812e815ce';
const EMOTICON_PRICE = 0;
const EMOTICON_SUPPLY = 500;

const TBL_CONTRACT_ADDRESS = '0xe039608E695D21aB11675EBBA00261A0e750526c';
const TEXT_PRICE = 0;
const TEXT_SUPPLY = 20000;

const ETHTERRESTRIAL_LOGO_CONTRACT_ADDRESS = '0x56D13Eb21a625EdA8438F55DF2C31dC3632034f5';
const NOUN_CONTRACT_ADDRESS = '0xE8addD62feD354203d079926a8e563BC1A7FE81e';

const SEARCH_CONTRACT_ADDRESS = '0x2Dd78Fd9B8F40659Af32eF98555B8b31bC97A351';

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
// const CHAIN_ID = 1;

// rinkeby
// const CHAIN_ID = 4;

// local
const CHAIN_ID = 31337;

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
