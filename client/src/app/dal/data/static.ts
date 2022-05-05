const LOGO_CONTRACT_ADDRESS = '0x8d599Da501B3C56F14877EB4fEAC89582c4d417d';
const LOGO_PRICE = 0;
const LOGO_SUPPLY = null;

const LOGO_DESCRIPTOR_CONTRACT_ADDRESS = '0x3B78E3E349850d5CC8C817432C563986Bd2b421b';

const BGBYL_CONTRACT_ADDRESS = '0x5914f2050df98Cb4A05Dc23381b4A9BCDB3ea633';
const BACKGROUND_PRICE = 0.02;
const BACKGROUND_SUPPLY = 10000;

const FGBL_CONTRACT_ADDRESS = '0x2cb74a110ca0C6bEB6c2a0b11da2bf23c6EBb51d';
const EMOTICON_PRICE = 0;
const EMOTICON_SUPPLY = 500;

const TBL_CONTRACT_ADDRESS = '0xeE86Dc92a869c204E482E4016C781E9F7aD25317';
const TEXT_PRICE = 0;
const TEXT_SUPPLY = 20000;

const ETHTERRESTRIAL_LOGO_CONTRACT_ADDRESS = '0x33a8B7bE35a04c4E80cC6bc77C86B75D98f96DD9';
const NOUN_CONTRACT_ADDRESS = '0xcEB0f67bf50EAefbB60aAFAE29406658278FD5d9';

const SEARCH_CONTRACT_ADDRESS = '0x698320bf255659e53EC4dAECbbB021a761712c69';

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
