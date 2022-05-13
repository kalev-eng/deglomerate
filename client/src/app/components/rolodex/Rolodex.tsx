/** @jsxImportSource @emotion/react */
// react
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

// data store
import * as app from '../../dal/data/app';

// components
import { LogoViewer } from '../common/LogoViewer';
import { MetaDataViewer } from '../common/MetaDataViewer';
import { AttributeViewer } from '../common/AttributeViewer';

// styles
import * as AppStyles from '../../styles/App';
import { TextField, Button, Tooltip } from '@mui/material';
import * as MainContainerStyles from '../../styles/MainContainer';

interface Props {};

function Rolodex(props: Props)  {
  // contracts
  const logoContract = useSelector(app.selectLogoContract);
  const searchContract = useSelector(app.selectSearchContract);

  const [maxTokenId, setMaxTokenId] = useState<number>(0);
  const [tokenId, setTokenId] = useState<number>(0);
  const [displayTokenId, setDisplayTokenId] = useState<number>(0);
  const [logoView, setLogoView] = useState<number>(0);
  const [attributes, setAttributes] = useState<Object>({});

  useEffect(() => {
    const init = async () => {
      if (logoContract !== null) {
        const totalSupply = await logoContract.methods.totalSupply().call();
        setMaxTokenId(Number(totalSupply));
      }
    };
    init();
  }, [logoContract]);

  useEffect(() => {
    const init = async () => {
      if (logoContract !== null) {
        const totalSupply = await logoContract.methods.totalSupply().call();
        setMaxTokenId(Number(totalSupply));
      }
    };
    init();
  }, [logoContract]);

  const handleTokenIdChange = (e) => {
    setTokenId(e.target.value);
  }


  

  const previousConfiguredLogo = async () => {
    if (searchContract) {
      const nxtTokenId = await searchContract.methods.getPreviousConfiguredLogo(tokenId > 0 ? tokenId - 1: tokenId, 0).call();
      setTokenId(Number(nxtTokenId));
      setDisplayTokenId(nxtTokenId !== '' ? Number(nxtTokenId): 0);
    }
  }

  const nextConfiguredLogo = async () => {
    if (searchContract) {
      const nxtTokenId = await searchContract.methods.getNextConfiguredLogo(tokenId + 1, maxTokenId).call();
      setTokenId(Number(nxtTokenId));
      setDisplayTokenId(nxtTokenId !== '' ? Number(nxtTokenId): 0);
    }
  }

  const updateLogo = () => {
    setDisplayTokenId(tokenId !== '' ? Number(tokenId): 0);
  }

  return (
    <MainContainerStyles.Content>
      <MainContainerStyles.RowCenter>
        <Tooltip title="Previous Logo (skip blank Logos)" placement="top">
          <Button variant="outlined" css={[AppStyles.txt, AppStyles.link]} onClick={() => previousConfiguredLogo()} size="large" disableElevation>&lt;&lt;</Button>
        </Tooltip>  
        <TextField css={[AppStyles.txt]} id="tokenId" type="number" inputProps={{ inputMode: 'numeric', min: 0 }} label="Token Id" variant="outlined" onChange={(e) => handleTokenIdChange(e)} value={tokenId} />
        <Button variant="outlined" css={[AppStyles.txt, AppStyles.link]} onClick={() => updateLogo()} size="large" disableElevation>View Logo</Button>
        <Tooltip title="Next Logo (skip blank Logos)" placement="top">
          <Button variant="outlined" css={[AppStyles.txt, AppStyles.link]} onClick={() => nextConfiguredLogo()} size="large" disableElevation>&gt;&gt;</Button>
        </Tooltip>
      </MainContainerStyles.RowCenter>
      <MainContainerStyles.RowCenter>
        <LogoViewer width={600} height={600} tokenId={displayTokenId} downloadable={true}/>
      </MainContainerStyles.RowCenter>
      <MainContainerStyles.RowCenter>
        <MetaDataViewer tokenId={tokenId} />
        <AttributeViewer tokenId={tokenId} />
      </MainContainerStyles.RowCenter>
      <MainContainerStyles.RowCenter>
        
      </MainContainerStyles.RowCenter>
    </MainContainerStyles.Content>
  )
};

export { Rolodex };
