const LOGO_CONTRACT_ADDRESS = '0xeb696173269F5993139B0AB5e1502D2A21706E97';
const LOGO_PRICE = 0;
const LOGO_SUPPLY = null;

const LOGO_DESCRIPTOR_CONTRACT_ADDRESS = '0x60E5604710f97d2b52616aAaE5086737aF1d5385';

const BGBYL_CONTRACT_ADDRESS = '0x02E5aAa21579Ad08cD968C810C6c702640dEfd96';
const BACKGROUND_PRICE = 0.02;
const BACKGROUND_SUPPLY = 10000;

const FGBL_CONTRACT_ADDRESS = '0xF434BD9A3C81700223ED99eEE1af9EF199f96Fe9';
const EMOTICON_PRICE = 0;
const EMOTICON_SUPPLY = 500;

const TBL_CONTRACT_ADDRESS = '0xF1877BA8c5654A09E09E166694f68f1f085C6bd9';
const TEXT_PRICE = 0;
const TEXT_SUPPLY = 20000;

const ETHTERRESTRIAL_LOGO_CONTRACT_ADDRESS = '0x857f07498065bd1c6F0351E8E5DDBE912dFc1BD2';
const NOUN_CONTRACT_ADDRESS = '0xFF9f4ab197b62c04A61AADFf30C8749F260598b2';

const SEARCH_CONTRACT_ADDRESS = '0x19Ce143b0aF196db9b855D0047448b7dA1CF0494';

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
const CHAIN_ID = 4;

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
