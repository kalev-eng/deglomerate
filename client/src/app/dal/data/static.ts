// mainnnet
// const LOGO_CONTRACT_ADDRESS = '0x320CCb623b612Eef62F186AfF6b664377cb4260b';
// local
const LOGO_CONTRACT_ADDRESS = '0xccf1769D8713099172642EB55DDFFC0c5A444FE9';
const LOGO_PRICE = 0;
const LOGO_SUPPLY = null;

// const LOGO_DESCRIPTOR_CONTRACT_ADDRESS = '0xeA55c5579e1ccE3e52217493788f2a909e64f64F';
const LOGO_DESCRIPTOR_CONTRACT_ADDRESS = '0x2Dd78Fd9B8F40659Af32eF98555B8b31bC97A351';

// const BGBYL_CONTRACT_ADDRESS = '0xfedf7d1f0bde821407B4906482e0d94CE2B04b1c';
const BGBYL_CONTRACT_ADDRESS = '0xdFdE6B33f13de2CA1A75A6F7169f50541B14f75b';
const BACKGROUND_PRICE = 0.02;
const BACKGROUND_SUPPLY = 10000;

// const FGBL_CONTRACT_ADDRESS = '0x0F552be8CB76f7310129ea9ac9566290bCcBe087';
const FGBL_CONTRACT_ADDRESS = '0xf090f16dEc8b6D24082Edd25B1C8D26f2bC86128';
const EMOTICON_PRICE = 0;
const EMOTICON_SUPPLY = 500;

// const TBL_CONTRACT_ADDRESS = '0xe879E7cb78bc665026509598F534A9820F9db88A';
const TBL_CONTRACT_ADDRESS = '0x071586BA1b380B00B793Cc336fe01106B0BFbE6D';
const TEXT_PRICE = 0;
const TEXT_SUPPLY = 20000;

// const ETHTERRESTRIAL_LOGO_CONTRACT_ADDRESS = '0x383f1cAFa50CdC2B1450EBf3D8f11b40ee474432';
const ETHTERRESTRIAL_LOGO_CONTRACT_ADDRESS = '0xE8addD62feD354203d079926a8e563BC1A7FE81e';
// const NOUN_CONTRACT_ADDRESS = '0xA091265C2643B2B6EA9ac995421e7d53065fa7C4';
const NOUN_CONTRACT_ADDRESS = '0xe039608E695D21aB11675EBBA00261A0e750526c';
// const TERRAFORM_CONTRACT_ADDRESS = '0x1EB67cBc2b988F0264c983D86aCF4cBE0aC4B2B6';
const TERRAFORM_CONTRACT_ADDRESS = '0x54B8d8E2455946f2A5B8982283f2359812e815ce';

// const SEARCH_CONTRACT_ADDRESS = '0x505FAeDB47cb08E0A895F90C305ff504b9d08343';
// const SEARCH_CONTRACT_ADDRESS = '0x56fC17a65ccFEC6B7ad0aDe9BD9416CB365B9BE8';
const SEARCH_CONTRACT_ADDRESS = '0x8D81A3DCd17030cD5F23Ac7370e4Efb10D2b3cA4';

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
const MAX_UINT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

// mainnet
// const CHAIN_ID = 1;

// rinkeby
// const CHAIN_ID = 4;

// local
const CHAIN_ID = 31337;

const BACKGROUND_ELEMENTS: Map<string, string> = new Map([[NULL_ADDRESS, 'None'],
                                                        [BGBYL_CONTRACT_ADDRESS, 'Background by Logo'],
                                                        [TERRAFORM_CONTRACT_ADDRESS, 'Terraform']]);
    
const FOREGROUND_ELEMENTS: Map<string, string> = new Map([[NULL_ADDRESS, 'None'],
                                                        [ETHTERRESTRIAL_LOGO_CONTRACT_ADDRESS, 'EthTerrestrial'],
                                                        [NOUN_CONTRACT_ADDRESS, 'Noun']]);

const TEXT_ELEMENTS: Map<string, string> = new Map([[NULL_ADDRESS, 'None'],
                                                    [TBL_CONTRACT_ADDRESS, 'Text by Logo'],
                                                    [FGBL_CONTRACT_ADDRESS, 'Emoticon by Logo']]);

const BASE_OWNED_BG_TOKENS: Map<string, number[]> = new Map([[BGBYL_CONTRACT_ADDRESS, []],
                                                              [TERRAFORM_CONTRACT_ADDRESS, []]]);

const BASE_OWNED_TXT_TOKENS: Map<string, number[]> = new Map([[TBL_CONTRACT_ADDRESS, []],
                                                            [FGBL_CONTRACT_ADDRESS, []]]);

const FONTS: string[] = ['Helvetica', 'Rubik', 'Playfair Display', 'Oswald', 'Work Sans', 'Krona One', 'Italiana', 'Federo', 'Caudex', 'VT323', 'Faster One', ];
const FONT_LINK = 'https://fonts.googleapis.com/css?family=';

// metadata
const META_DATA_KEYS: string[] = ['role', 'name', 'twitter url', 'discord'];
const ROLES: string[] = ['artist', 'collector', 'community manager', 'discord builder', 'mod', 'marketing', 'full-stack developer', 'solidity developer', 'ui developer', 'community'];
const ROLODEX_SEARCH_BY: Map<string, string[]> = new Map([['has logo layers configured', ['layers', '']],
                                                    ['has any role configured', ['role', '']],
                                                    ['has role of artist', ['role', 'artist']],
                                                    ['has role of collector', ['role', 'collector']],
                                                    ['has role of community manager', ['role', 'community manager']],
                                                    ['has role of discord builder', ['role', 'discord builder']],
                                                    ['has role of mod', ['role', 'mod']],
                                                    ['has role of marketing', ['role', 'marketing']],
                                                    ['has role of full-stack developer', ['role', 'full-stack developer']],
                                                    ['has role of solidity developer', ['role', 'solidity developer']],
                                                    ['has role of ui developer', ['role', 'ui developer']],
                                                    ['has role of community', ['role', 'community']],
                                                  ]);

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
export { TERRAFORM_CONTRACT_ADDRESS };
export { SEARCH_CONTRACT_ADDRESS };
export { NULL_ADDRESS, MAX_UINT };

export { CHAIN_ID };

export { BACKGROUND_ELEMENTS, FOREGROUND_ELEMENTS, TEXT_ELEMENTS, BASE_OWNED_TXT_TOKENS, BASE_OWNED_BG_TOKENS, FONTS, FONT_LINK };
export { META_DATA_KEYS, ROLES, ROLODEX_SEARCH_BY };
