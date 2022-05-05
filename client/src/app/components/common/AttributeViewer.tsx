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
import TextAbi from '../../text.json';
const textAbi = JSON.parse(TextAbi);

interface Props {
  tokenId: number;
};

function AttributeViewer(props: Props)  {
  const [logo, setLogo] = useState<Logo>(BASE_LOGO);
  const web3: Web3 | null = useSelector(app.selectWeb3);

  const logoDescriptorContract = useSelector(app.selectLogoDescriptorContract);

  useEffect(() => {
    const getAttributes = async () => {
      if (logoDescriptorContract !== null) {
        const logoData = await logoDescriptorContract.methods.logos(props.tokenId).call();
        const logoLayers = await logoDescriptorContract.methods.getLayers(props.tokenId).call();

        let dcLayers = [];
        for (let i = 0; i < logoLayers.length; i++) {
          const logoLayer = logoLayers[i];
          dcLayers.push({contractAddress: logoLayer.contractAddress, tokenId: logoLayer.tokenId, translateXDirection: logoLayer.translateXDirection, translateX: logoLayer.translateX, translateYDirection: logoLayer.translateYDirection, translateY: logoLayer.translateY, scaleDirection: logoLayer.scaleDirection, scaleMagnitude: logoLayer.scaleMagnitude, value: '', font: '', fontLink: ''});
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
        <Typography css={[AppStyles.txt]} variant="h4" component="div">Logo</Typography>
      </MainContainerStyles.Row>
      <MainContainerStyles.Row>
        <Typography css={[AppStyles.txt]} variant="body1" component="div">Width: {logo.width}</Typography>
        <Typography css={[AppStyles.txt]} variant="body1" component="div">Height: {logo.height}</Typography>
      </MainContainerStyles.Row>
      {logo.layers.map((layer, index) => {
        return (<MainContainerStyles.Row>
                  <Typography css={[AppStyles.txt]} variant="body1" component="div">{'Layer #' + index + ':'}</Typography>
                  <Typography css={[AppStyles.txt]} variant="body1" component="div"><Link href={'https://opensea.io/assets/' + layer.contractAddress + '/' + layer.tokenId} underline="hover" target="_blank" rel="noreferrer">{layer.contractAddress}</Link></Typography>
                </MainContainerStyles.Row>)
        })}
      <MainContainerStyles.Row>
        <Typography css={[AppStyles.txt]} variant="body1" component="div">Text:</Typography>
        <Typography css={[AppStyles.txt]} variant="body1" component="div"><Link href={'https://opensea.io/assets/' + logo.text.contractAddress + '/' + logo.text.tokenId} underline="hover" target="_blank" rel="noreferrer">{logo.text.contractAddress}</Link></Typography>
      </MainContainerStyles.Row>
    </div>
  )
};

export { AttributeViewer };
