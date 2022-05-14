/** @jsxImportSource @emotion/react */
// react
import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

// redux data store
import * as app from '../../dal/data/app';
import { useSelector } from 'react-redux';
import { NULL_ADDRESS,
        BACKGROUND_ELEMENTS, 
        FOREGROUND_ELEMENTS, 
        TEXT_ELEMENTS, 
        BASE_OWNED_TXT_TOKENS, 
        BASE_OWNED_BG_TOKENS,
        FONTS, 
        FONT_LINK,
        META_DATA_KEYS } from '../../dal/data/static';
import { LogoElement, Logo, BASE_LOGO, MetaData } from '../../dal/model';

// components
import { ConfigureElement } from './ConfigureElement';
import { ConfigureMetaData } from './ConfigureMetaData'; 
import { LogoViewer } from '../common/LogoViewer'; 

// web3
import Web3 from "web3";

// styles
import * as ConfigureStyles from '../../styles/Configure';
import * as MainContainerStyles from '../../styles/MainContainer';
import * as AppStyles from '../../styles/App';
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';

// json
import TextAbi from '../../abi/text.json';
import { fontGrid } from '@mui/material/styles/cssUtils';
const textAbi = JSON.parse(TextAbi);

interface Props {};

function Configure(props: Props)  {
  // logo
  const [currentTokenId, setCurrentTokenId] = useState<number | null>(null);
  const [currentLogo, setCurrentLogo] = useState<Logo>(BASE_LOGO);
  const [logo, setLogo] = useState<Logo>(BASE_LOGO);
  const [logoView, setLogoView] = useState<Logo>(BASE_LOGO);
  const [metaData, setMetaData] = useState<MetaData[]>([]);

  // owned tokens
  const [ownedTokenIds, setOwnedTokenIds] = useState<number[]>([]);
  const [ownedBgTokenIds, setOwnedBgTokenIds] = useState<Map<string, number[]>>(BASE_OWNED_BG_TOKENS);
  const [ownedTxtTokenIds, setOwnedTxtTokenIds] = useState<Map<string, number[]>>(BASE_OWNED_TXT_TOKENS);

  const web3: Web3 | null = useSelector(app.selectWeb3);
  const logoContract = useSelector(app.selectLogoContract);
  const logoDescriptorContract = useSelector(app.selectLogoDescriptorContract);
  const account = useSelector(app.selectAccount);

  useEffect(() => {
    const getOwnedLogos = async () => {
      const tokenIds: number[] = [];
      if (logoContract != null && account !== '') {
        const numTokens: number = Number(await logoContract.methods.balanceOf(account).call());
        for (let i = 0; i < numTokens; i++) {
          const tokenId: number = Number(await logoContract.methods.tokenOfOwnerByIndex(account, i).call())
          tokenIds.push(tokenId);
          }
        } else {
          console.error('Contract or account not set')
        }
        setCurrentTokenId(tokenIds[0]);
        setOwnedTokenIds(tokenIds);
    };
    getOwnedLogos();
  }, [logoContract, account]);

  useEffect(() => {
    const getOwnedLogo = async () => {
      if (web3 && currentTokenId != null && logoContract != null && logoDescriptorContract != null && account !== '') {
        // fetch logo visual elements
        const logoData = await logoDescriptorContract.methods.logos(currentTokenId).call();
        const logoLayers = await logoDescriptorContract.methods.getLayers(currentTokenId).call();

        let dcLayers = [];
        for (let i = 0; i < logoLayers.length; i++) {
          const logoLayer = logoLayers[i];
          dcLayers.push({contractAddress: logoLayer.contractAddress, tokenId: logoLayer.tokenId, translateXDirection: logoLayer.translateXDirection, translateX: logoLayer.translateX, translateYDirection: logoLayer.translateYDirection, translateY: logoLayer.translateY, scaleDirection: logoLayer.scaleDirection, scaleMagnitude: logoLayer.scaleMagnitude, value: '', font: '', fontLink: ''});
        }
        const txt = await getOwnedText(logoData.text.contractAddress, Number(logoData.text.tokenId));
        const logo: Logo = { width: logoData.width !== 0 ? logoData.width : 300,
                            height: logoData.height !== 0 ? logoData.height : 300,
                            layers: dcLayers.length > 0 ? dcLayers : BASE_LOGO.layers,
                            text: {contractAddress: logoData.text.contractAddress, tokenId: logoData.text.tokenId, translateXDirection: logoData.text.translateXDirection, translateX: logoData.text.translateX, translateYDirection: logoData.text.translateYDirection, translateY: logoData.text.translateY, value: txt.txtVal ? txt.txtVal : 'HELLO WORLD', font: txt.font, scaleDirection: logoData.text.scaleDirection, scaleMagnitude: logoData.text.scaleMagnitude, fontLink: txt.fontLink}
                           };
                           
        setCurrentLogo(logo);
        setLogo(JSON.parse(JSON.stringify(logo)));
        setLogoView(JSON.parse(JSON.stringify(logo)));

        // fetch logo metadata
        const vals: string[] = await logoContract.methods.getMetaDataForKeys(currentTokenId, META_DATA_KEYS).call();
        let metaDataArr: MetaData[] = [];
        for (let i = 0; i < META_DATA_KEYS.length; i++) {
          metaDataArr.push({key: META_DATA_KEYS[i], value: vals[i]});
        }
        setMetaData(metaDataArr);
      }
    }
    getOwnedLogo();
  }, [currentTokenId, logoDescriptorContract, account]);

  useEffect(() => {
    const getOwnedTextElements = async () => {
      if (web3 && account !== '') {
        let ownedTxtTokens: Map<string, number[]> = new Map();
        for (const [contractAddress, ownedTokens] of ownedTxtTokenIds) {
          // get owned txt tokens
          const txtContract = new web3.eth.Contract(textAbi, contractAddress);

          const tokenIds: number[] = [];
          if (logoContract != null && account !== '') {
            const numTokens: number = Number(await txtContract.methods.balanceOf(account).call());
            for (let i = 0; i < numTokens; i++) {
              const tokenId: number = Number(await txtContract.methods.tokenOfOwnerByIndex(account, i).call())
              tokenIds.push(tokenId);
              }
            } else {
              console.error('Contract or account not set')
            }
            ownedTxtTokens.set(contractAddress, tokenIds);
        }
        setOwnedTxtTokenIds(ownedTxtTokens);
      }
    }
    getOwnedTextElements();
  }, [logoContract, account]);


  useEffect(() => {
    const getOwnedBackgroundElements = async () => {
      if (web3 && account !== '') {
        let ownedBgTokens: Map<string, number[]> = new Map();
        for (const [contractAddress, ownedTokens] of ownedBgTokenIds) {
          // get owned background tokens
          // TODO txt abi is used since it contains all necessary methods
          // may want to make better name for generic ABI
          const contract = new web3.eth.Contract(textAbi, contractAddress);

          const tokenIds: number[] = [];
          if (logoContract != null && account !== '') {
            const numTokens: number = Number(await contract.methods.balanceOf(account).call());
            for (let i = 0; i < numTokens; i++) {
              const tokenId: number = Number(await contract.methods.tokenOfOwnerByIndex(account, i).call())
              tokenIds.push(tokenId);
              }
            } else {
              console.error('Contract or account not set')
            }
            ownedBgTokens.set(contractAddress, tokenIds);
        }
        setOwnedBgTokenIds(ownedBgTokens);
      }
    }
    getOwnedBackgroundElements();
  }, [logo.layers[0].contractAddress, logoContract, account]);

  const handleSetLogo = async () => {
    if (logoDescriptorContract != null && account != null && validateLogo()) {
      // see if txt should be updated
      const txt = await getOwnedText(logo.text.contractAddress, Number(logo.text.tokenId));

      const txtVal = logo.text.value !== txt.txtVal && logo.text.value !== 'HELLO WORLD' ? logo.text.value: ''
      const fontVal = logo.text.font !== txt.font ? logo.text.font: '';

      if (!isAlphaNumericAndSize(txtVal)) {
        alert('Text must be less than 25 characters and can only contain letter, number, and spaces.');
        return;
      }

      // send tx
      logoDescriptorContract.methods.setLogo(currentTokenId, logo, txtVal, fontVal, logo.text.fontLink).send({
        from: account,
      }).on('transactionHash', function(hash: any){
          setCurrentLogo(logo);
        })
        .on('receipt', function(receipt: any){
        })
        .on('confirmation', function(confirmationNumber: any, receipt: any){
          //
        })
        .on('error', function(error: any, receipt: any) {
        });
    } else {
      console.error('Contract or account not set, cannot mint!')
    }
  };

  const handleSetMetaData = async () => {
    if (logoDescriptorContract != null && account != null) {
      // send tx
      logoDescriptorContract.methods.setMetaData(currentTokenId, metaData).send({
        from: account,
      }).on('transactionHash', function(hash: any){
        })
        .on('receipt', function(receipt: any){
        })
        .on('confirmation', function(confirmationNumber: any, receipt: any){
          //
        })
        .on('error', function(error: any, receipt: any) {
        });
    } else {
      console.error('Contract or account not set, cannot mint!')
    }
  };

  const validateLogo = () => {
    for (let i = 0; i < logo.layers.length; i++) {
      // check that a tokenId has been chosen and that the tokenId is owned if required
      if (logo.layers[i].contractAddress !== NULL_ADDRESS && (logo.layers[i].tokenId === null || (i === 0 && !getOwnedBgTokenIds().includes(Number(logo.layers[i].tokenId))))) {
        alert('Please choose a tokenId before setting logo.');
        return false;
      }
    }
    // check that a tokenId has been chosen and that the tokenId is owned if required
    if (logo.text.contractAddress !== NULL_ADDRESS && !getOwnedTextTokenIds().includes(Number(logo.text.tokenId))) {
      alert('Please choose a text tokenId before setting logo.');
      return false;
    }
    return true;
  }

  const isAlphaNumericAndSize = (str: string) => {
    if (str.length > 25) {
      return false;
    }
    var code, i, len;
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
          !(code > 64 && code < 91) && // uppercase alpha (A-Z)
          !(code > 96 && code < 123) && // lowercase alpha (a-z)
          !(code === 32)) { 
        return false;
      }
    }
    return true;
  };

  const handleLogoElementChange = async (e, element: string, attribute: string, setView: boolean = false) => {
    let logoElement: LogoElement = {} as LogoElement;
    if (element === 'background') {
      logoElement = logo.layers[0];
    } else if  (element === 'foreground') {
      logoElement = logo.layers[1];
    } else if  (element === 'text') {
      logoElement = logo.text;
    }

    if (attribute === 'contractAddress') {
      logoElement.contractAddress = e.target.value;
    } else if (attribute === 'tokenId') {
      logoElement.tokenId = Number(e.target.value);
    } else if (attribute === 'value') {
      logoElement.value = String(e.target.value);
    } else if (attribute === 'font') {
      const val: string = String(e.target.value);
      logoElement.font = val;
      if (val !== 'Helvetica') {
        logoElement.fontLink = FONT_LINK + val.replace(/\s/g, '+');
      } else {
        logoElement.fontLink = '';
      }
    } else if (attribute === 'fontLink') {
      logoElement.fontLink = String(e.target.value);
    } else if (attribute === 'x') {
      logoElement.translateX = Number(e.target.value);
    } else if (attribute === 'y') {
      logoElement.translateY = Number(e.target.value);
    } else if (attribute === 'scale') {
      logoElement.scaleMagnitude = Number(e.target.value);
    } else if (attribute === 'translateXDirection') {
      logoElement.translateXDirection = Number(e.target.value);
    } else if (attribute === 'translateYDirection') {
      logoElement.translateYDirection = Number(e.target.value);
    } else if (attribute === 'translateScaleDirection') {
      logoElement.scaleDirection = Number(e.target.value);
    }

    if (element === 'background') {
      const newLayers = Object.assign([...logo.layers], {
        [0]: logoElement
      });
      const updatedLogo = {
        ...logo,
        layers: newLayers
      };
      setLogo(updatedLogo);
      // show a blank logo if a non-owned tokenId is set
      if (logo.layers[0].contractAddress !== NULL_ADDRESS && !getOwnedBgTokenIds().includes(Number(logo.layers[0].tokenId))) {
        setLogoView(BASE_LOGO)
      } else if (setView) {
        setLogoView(updatedLogo)
      }
    } else if  (element === 'foreground') {
      const newLayers = Object.assign([...logo.layers], {
        [1]: logoElement
      });
      const updatedLogo = {
        ...logo,
        layers: newLayers
      };
      setLogo(updatedLogo);
      if (setView) {
        setLogoView(updatedLogo)
      }
    } else if  (element === 'text') {
      const updatedLogo = {
        ...logo,
        text: logoElement
      };
      setLogo(updatedLogo);
      // show a blank logo if a non-owned tokenId is set
      if (logo.text.contractAddress !== NULL_ADDRESS && !getOwnedTextTokenIds().includes(Number(logo.text.tokenId))) {
        setLogoView(BASE_LOGO)
      } else if (setView) {
        setLogoView(updatedLogo)
      }
    }
  }

  const handleLogoElementUpdate = () => {
    setLogoView(logo);
  }

  const handleLogoMetaDataChange = (e, key: string) => {
    for (let i = 0; i < metaData.length; i++) {
      if (metaData[i].key === key) {
        const newMetaData = Object.assign([...metaData], {
          [i]: {key: metaData[i].key, value: e.target.value}
        });
        setMetaData(newMetaData);
        return;
      }
    }
  }

  const getOwnedBgTokenIds = () => {
    return ownedBgTokenIds.get(logo.layers[0].contractAddress) ? ownedBgTokenIds.get(logo.layers[0].contractAddress) : [];
  }

  const getOwnedTextTokenIds = () => {
    return ownedTxtTokenIds.get(logo.text.contractAddress) ? ownedTxtTokenIds.get(logo.text.contractAddress) : [];
  }

  const getOwnedText = async (contractAddress: string, tokenId: number) => {
    let txt = {'txtVal': '', 'font': '', 'fontLink': ''};
    if (web3!== null && account !== '') {
      let txtVal = '';
      let txtFont = {name: '', link: ''};
      if (contractAddress !== NULL_ADDRESS) {
        try {
        const txtContract = new web3.eth.Contract(textAbi, contractAddress);
        txtVal = await txtContract.methods.getTxtVal(tokenId).call();
        txtFont = await txtContract.methods.getTxtFont(tokenId).call();
        } catch (err) {
          console.error('Unable to fetch text details');
        }
      }
      txt.txtVal = txtVal ? txtVal : 'HELLO WORLD';
      txt.font = txtFont.name ? txtFont.name : 'Helvetica';
      txt.fontLink = txtFont.link;
    }
    return txt;
  };

  return (
    <Card  css={[ConfigureStyles.card]}
        sx={{ height: '100%', width: '750px', display: 'flex', flexDirection: 'column' }}
      >
        <Typography css={[AppStyles.txt, ConfigureStyles.header]} gutterBottom variant="h2" component="div">Configure Logo</Typography>
        { !account &&
          <Typography css={[AppStyles.txt, ConfigureStyles.header]} gutterBottom component="div">Please connect your wallet</Typography>
        }
        { account && ownedTokenIds.length === 0 &&
          <Typography css={[AppStyles.txt, ConfigureStyles.header]} gutterBottom component="div"><Link css={[AppStyles.txt, AppStyles.link]} to="/">Mint</Link> a logo container in order to create a logo</Typography>
        }
        { account && ownedTokenIds.length > 0 &&
        <div>
          <MainContainerStyles.Row>
            <FormControl fullWidth>
              <InputLabel css={[AppStyles.txt]} id="logo-select-label">Edit Logo Token</InputLabel>
              <Select
                css={[AppStyles.txt]} 
                labelId="logo-label"
                id="logo-select"
                label="Logo"
                value={currentTokenId}
                onChange={(e) => setCurrentTokenId(Number(e.target.value))}
                >
              {ownedTokenIds.map(val => {
                return <MenuItem css={[AppStyles.txt]} value={val}>#{val}</MenuItem>;
              })}
              </Select>
            </FormControl>
          </MainContainerStyles.Row>

          <MainContainerStyles.Row css={[ConfigureStyles.preview]}>
            <LogoViewer width={600} height={600} logo={logoView} downloadable={true}/>
          </MainContainerStyles.Row>

          <MainContainerStyles.Row>
            <Typography css={[AppStyles.txt, ConfigureStyles.header]} variant="h3" component="div">Image</Typography>
          </MainContainerStyles.Row>

          <ConfigureElement id="background" label="Background" element={logo.layers[0]} selectMap={BACKGROUND_ELEMENTS} onlyOwnedTokenIds={true} ownedTokenIds={getOwnedBgTokenIds()} handleChange={handleLogoElementChange} handleUpdate={handleLogoElementUpdate} includeText={false} fonts={[]} />
          <ConfigureElement id="foreground" label="Foreground" element={logo.layers[1]} selectMap={FOREGROUND_ELEMENTS} onlyOwnedTokenIds={false} ownedTokenIds={[]} handleChange={handleLogoElementChange} handleUpdate={handleLogoElementUpdate} includeText={false} fonts={[]} />
          <ConfigureElement id="text" label="Text" element={logo.text} selectMap={TEXT_ELEMENTS} onlyOwnedTokenIds={true} ownedTokenIds={getOwnedTextTokenIds()} handleChange={handleLogoElementChange} handleUpdate={handleLogoElementUpdate} includeText={true} fonts={FONTS} />

          <MainContainerStyles.Row>
            { !account && 
              <Button variant="outlined" css={[AppStyles.txt, AppStyles.link, ConfigureStyles.updateLogo]} disabled>Update Logo Image</Button>
            }
            { account && 
              <Button variant="outlined" css={[AppStyles.txt, AppStyles.link, ConfigureStyles.updateLogo]}  onClick={() => handleSetLogo()} >Update Logo Image</Button>
            }
          </MainContainerStyles.Row>
          
          <MainContainerStyles.Row>
            <Typography css={[AppStyles.txt, ConfigureStyles.header]} variant="h3" component="div">Profile</Typography>
          </MainContainerStyles.Row>
          <ConfigureMetaData metaData={metaData} handleChange={handleLogoMetaDataChange} />
          <MainContainerStyles.Row>
            { !account && 
              <Button variant="outlined" css={[AppStyles.txt, AppStyles.link, ConfigureStyles.updateLogo]} disabled>Update Logo Profile</Button>
            }
            { account && 
              <Button variant="outlined" css={[AppStyles.txt, AppStyles.link, ConfigureStyles.updateLogo]}  onClick={() => handleSetMetaData()} >Update Logo Profile</Button>
            }
          </MainContainerStyles.Row>
            
        </div>
        }
      </Card>
  )
};

export { Configure };