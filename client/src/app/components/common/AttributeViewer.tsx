/** @jsxImportSource @emotion/react */
// react
import React, {useEffect, useState} from 'react';

// redux data store
import * as app from '../../dal/data/app';
import { useSelector } from 'react-redux';

// static
import { NULL_ADDRESS } from '../../dal/data/static';

// model
import { LogoElement, Logo, BASE_LOGO } from '../../dal/model';

// styles
import * as AppStyles from '../../styles/App';
import * as MainContainerStyles from '../../styles/MainContainer';
import { Typography, Link } from '@mui/material';

// json
import TextAbi from '../../abi/text.json';
import LayerAbi from '../../abi/layerDescriptor.json';
const textAbi = JSON.parse(TextAbi);
const layerAbi = JSON.parse(LayerAbi);

interface Props {
  tokenId: number;
};

function AttributeViewer(props: Props)  {
  const [logo, setLogo] = useState<Logo>(BASE_LOGO);
  const [owner, setOwner] = useState<string>('');
  const web3: Web3 | null = useSelector(app.selectWeb3);

  const logoContract = useSelector(app.selectLogoContract);
  const logoDescriptorContract = useSelector(app.selectLogoDescriptorContract);

  useEffect(() => {
    const getAttributes = async () => {
      if (logoContract !== null) {
        const owner = await logoContract.methods.ownerOf(props.tokenId).call();
        setOwner(owner);
      }
      if (logoDescriptorContract !== null) {
        const logoData = await logoDescriptorContract.methods.logos(props.tokenId).call();
        const logoLayers = await logoDescriptorContract.methods.getLayers(props.tokenId).call();

        let dcLayers = [];
        for (let i = 0; i < logoLayers.length; i++) {
          const logoLayer = logoLayers[i];
          let layer = {contractAddress: logoLayer.contractAddress, tokenId: logoLayer.tokenId, translateXDirection: logoLayer.translateXDirection, translateX: logoLayer.translateX, translateYDirection: logoLayer.translateYDirection, translateY: logoLayer.translateY, scaleDirection: logoLayer.scaleDirection, scaleMagnitude: logoLayer.scaleMagnitude, value: '', font: '', fontLink: ''};
          const layerDetails = await getLayerDetails(logoLayers[i].contractAddress);
          layer = Object.assign({}, layer, layerDetails);
          dcLayers.push(layer);
        }
        const txt = await getOwnedText(logoData.text.contractAddress, Number(logoData.text.tokenId));
        const _logo: Logo = { width: logoData.width != 0 ? logoData.width : 300,
                            height: logoData.height != 0 ? logoData.height : 300,
                            layers: dcLayers.length > 0 ? dcLayers : BASE_LOGO.layers,
                            text: {contractAddress: logoData.text.contractAddress, tokenId: logoData.text.tokenId, translateXDirection: logoData.text.translateXDirection, translateX: logoData.text.translateX, translateYDirection: logoData.text.translateYDirection, translateY: logoData.text.translateY, value: txt.txtVal ? txt.txtVal : 'HELLO WORLD', font: txt.font, scaleDirection: logoData.text.scaleDirection, scaleMagnitude: logoData.text.scaleMagnitude, fontLink: txt.fontLink}
                           };
        setLogo(_logo);
      }
    };
    getAttributes();
  }, [logoDescriptorContract, props.tokenId]);

  const getLayerDetails = async (contractAddress: string) => {
    const layerContract = new web3.eth.Contract(layerAbi, contractAddress);
    let sourceContract = '';
    let siteUrl = '';
    let collectionUrl = '';
    let twitterUrl = '';
    let discordUrl = '';
    try {
      sourceContract = await layerContract.methods.sourceContract().call();
      siteUrl = await layerContract.methods.siteUrl().call();
      collectionUrl = await layerContract.methods.collectionUrl().call();
      twitterUrl = await layerContract.methods.twitterUrl().call();
      discordUrl = await layerContract.methods.discordUrl().call();
    } catch {}
    return {'sourceContract': sourceContract, 'siteUrl': siteUrl, 'collectionUrl': collectionUrl, 'twitterUrl': twitterUrl, 'discordUrl': discordUrl};
  }

  const getOwnedText = async (contractAddress: string, tokenId: number) => {
    let txt = {'txtVal': '', 'font': '', 'fontLink': ''};
    if (web3!== null) {
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
    <div>
      <MainContainerStyles.Row>
        <Typography css={[AppStyles.txt]} variant="h5" component="div">Logo</Typography>
      </MainContainerStyles.Row>
      <MainContainerStyles.SqueezedRow>
        <Typography css={[AppStyles.txt]} variant="body1" component="div">Token Id: {props.tokenId}</Typography>
      </MainContainerStyles.SqueezedRow>
      <MainContainerStyles.SqueezedRow>
        <Typography css={[AppStyles.txt]} variant="body1" component="div">Owner: <Link href={'https://opensea.io/' + owner} underline="hover" target="_blank" rel="noreferrer">{owner.slice(0, 3)}...{owner.slice(-3)}</Link></Typography>
      </MainContainerStyles.SqueezedRow>
      {logo.layers.map((layer, index) => {
        return (<div>
              {layer.contractAddress !== NULL_ADDRESS && <MainContainerStyles.SqueezedRow>
                  <Typography css={[AppStyles.txt]} variant="body1" component="div">{'Layer #' + index + ':'}</Typography>
                  <div>
                  <Typography css={[AppStyles.txt]} variant="body1" component="div"><Link href={'https://opensea.io/assets/' + (layer.sourceContract ? layer.sourceContract: layer.contractAddress) + '/' + layer.tokenId} underline="hover" target="_blank" rel="noreferrer">token</Link></Typography>
                  {layer.collectionUrl && <Typography css={[AppStyles.txt]} variant="body1" component="div"><Link href={layer.collectionUrl} underline="hover" target="_blank" rel="noreferrer">collection</Link></Typography>}
                  {layer.discordUrl && <Typography css={[AppStyles.txt]} variant="body1" component="div"><Link href={layer.discordUrl} underline="hover" target="_blank" rel="noreferrer">discord</Link></Typography>}
                  {layer.twitterUrl && <Typography css={[AppStyles.txt]} variant="body1" component="div"><Link href={layer.twitterUrl} underline="hover" target="_blank" rel="noreferrer">twitter</Link></Typography>}
                  {layer.siteUrl && <Typography css={[AppStyles.txt]} variant="body1" component="div"><Link href={layer.siteUrl} underline="hover" target="_blank" rel="noreferrer">website</Link></Typography>}
                  </div>
                </MainContainerStyles.SqueezedRow>
                }
              </div>)
        })}
      <MainContainerStyles.SqueezedRow>
        <Typography css={[AppStyles.txt]} variant="body1" component="div">Text:</Typography>
        <Typography css={[AppStyles.txt]} variant="body1" component="div"><Link href={'https://opensea.io/assets/' + logo.text.contractAddress + '/' + logo.text.tokenId} underline="hover" target="_blank" rel="noreferrer">token</Link></Typography>
      </MainContainerStyles.SqueezedRow>
    </div>
  )
};

export { AttributeViewer };

/*
<MainContainerStyles.SqueezedRow>
        <Typography css={[AppStyles.txt]} variant="body1" component="div">Width: {logo.width}</Typography>
        <Typography css={[AppStyles.txt]} variant="body1" component="div">Height: {logo.height}</Typography>
      </MainContainerStyles.SqueezedRow>
*/
