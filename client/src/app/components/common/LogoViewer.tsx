/** @jsxImportSource @emotion/react */
// react
import React, {useEffect, useState} from 'react';

// redux data store
import * as app from '../../dal/data/app';
import { useSelector } from 'react-redux';
import { Logo } from '../../dal/model';
import { NULL_ADDRESS } from '../../dal/data/static';

// tools
import * as svg from 'save-svg-as-png';

// assets
import DownloadIcon from "../../../assets/download.png"

// styles
import { css } from '@emotion/react'
import { Skeleton } from '@mui/material';
import * as LogoViewerStyles from '../../styles/LogoViewer';
import * as MainContainerStyles from '../../styles/MainContainer';

interface Props {
  width: number;
  height: number;
  logo?: Logo;
  tokenId?: number;
  downloadable?: boolean;
};

// if logo has is unminted, this is what is returned
const BASE_SVG = '<svg version="2.0" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 300 300"></svg>';

function LogoViewer(props: Props)  {
  const [logo, setLogo] = useState<string>('');
  
  const logoContract = useSelector(app.selectLogoContract);

  useEffect(() => {
    const getLogoExample = async () => {
      if (logoContract) {
        let svg = '';
        setLogo(svg);
        if (props.tokenId == null && props.logo != null) {
          svg = await logoContract.methods.getLogoSvg(props.logo, props.logo.text.value, props.logo.text.font, props.logo.text.fontLink).call();
        } else {
          svg = await logoContract.methods.getSvg(props.tokenId).call();
        }
        setLogo(svg);
      }
    };
    getLogoExample();
  }, [logoContract, props.logo, props.tokenId]);

  const onClickDownload = () => {
    var oParser = new DOMParser();
    var oDOM = oParser.parseFromString(logo, "image/svg+xml");
    svg.saveSvgAsPng(oDOM.documentElement, "logo.png");
  }
  
  
  return (
    <div>
      { logo !== '' ? logo === BASE_SVG || 
        (props.logo != null &&
        props.logo.layers[0].contractAddress === NULL_ADDRESS && 
        props.logo.layers[1].contractAddress === NULL_ADDRESS && 
        props.logo.text.contractAddress === NULL_ADDRESS) ?
        <div  css={[LogoViewerStyles.empty, css({ width: props.width, height: props.height })]} />
          :
        <div>
          <iframe css={[LogoViewerStyles.container]} srcdoc={logo} width={props.width} height={props.height} frameBorder="0"></iframe>
          { props.downloadable && <MainContainerStyles.Row><a css={[LogoViewerStyles.downloadRow]} onClick={() => onClickDownload()}><img src={DownloadIcon} alt="logo" css={[LogoViewerStyles.download]} /></a></MainContainerStyles.Row> } 
        </div>
          :
        <Skeleton css={[LogoViewerStyles.container]} variant="rectangular" width={props.width} height={props.height} />
      }
    </div>
  )
};

export { LogoViewer };