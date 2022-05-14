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
import * as MainContainerStyles from '../../styles/MainContainer';
import * as RolodexStyles from '../../styles/Rolodex';
import { TextField, Button, Tooltip } from '@mui/material';

// static
import { MAX_UINT } from '../../dal/data/static';

interface Props {
  searchByKey: string;
  searchByValue: string;
};

function RolodexIndividualView(props: Props)  {
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

  const handleTokenIdChange = (e) => {
    setTokenId(e.target.value);
  }

  useEffect(() => {
    const search = async () => {
      if (searchContract !== null) {
        const nxtTokenId = await searchContract.methods.getNextConfiguredLogo(props.searchByKey, props.searchByValue, 0, maxTokenId).call();
        parseAndSetTokenId(nxtTokenId);
      }
    };
    search();
  }, [props.searchByKey, props.searchByValue]);

  const previousConfiguredLogo = async () => {
    if (searchContract) {
      const nxtTokenId = await searchContract.methods.getPreviousConfiguredLogo(props.searchByKey, props.searchByValue, tokenId > 0 ? tokenId - 1: tokenId, 0).call();
      parseAndSetTokenId(nxtTokenId);
    }
  }

  const nextConfiguredLogo = async () => {
    if (searchContract) {
      const nxtTokenId = await searchContract.methods.getNextConfiguredLogo(props.searchByKey, props.searchByValue, tokenId + 1, maxTokenId).call();
      parseAndSetTokenId(nxtTokenId);
    }
  }

  const parseAndSetTokenId = (nxtTokenId: string) => {
    if (nxtTokenId === MAX_UINT) {
      alert('No additional logos meet the search criteria.');
    }
    setTokenId(nxtTokenId != MAX_UINT ? Number(nxtTokenId) : 0);
    setDisplayTokenId(nxtTokenId !== '' && nxtTokenId != MAX_UINT ? Number(nxtTokenId): 0);
  }

  const updateLogo = () => {
    setDisplayTokenId(tokenId !== '' ? Number(tokenId): 0);
  }

  return (
    <MainContainerStyles.Content>
      <MainContainerStyles.RowCenter>
        <Tooltip title="Previous Logo (based on search criteria)" placement="top">
          <Button variant="outlined" css={[AppStyles.txt, AppStyles.link]} onClick={() => previousConfiguredLogo()} size="large" disableElevation>&lt;&lt;</Button>
        </Tooltip>  
        <TextField css={[AppStyles.txt]} id="tokenId" type="number" inputProps={{ inputMode: 'numeric', min: 0 }} label="Token Id" variant="outlined" onChange={(e) => handleTokenIdChange(e)} value={tokenId} />
        <Button variant="outlined" css={[AppStyles.txt, AppStyles.link]} onClick={() => updateLogo()} size="large" disableElevation>View Logo</Button>
        <Tooltip title="Next Logo (based on search criteria)" placement="top">
          <Button variant="outlined" css={[AppStyles.txt, AppStyles.link]} onClick={() => nextConfiguredLogo()} size="large" disableElevation>&gt;&gt;</Button>
        </Tooltip>
      </MainContainerStyles.RowCenter>
      <MainContainerStyles.RowCenter>
        <LogoViewer width={500} height={500} tokenId={displayTokenId} downloadable={false}/>
        <div css={[RolodexStyles.dataPanel]}>
        <MetaDataViewer css={[RolodexStyles.dataPanel]}  tokenId={tokenId} />
        </div>
        <div css={[RolodexStyles.dataPanel]}>
        <AttributeViewer css={[RolodexStyles.dataPanel]}  tokenId={tokenId} />
        </div>
      </MainContainerStyles.RowCenter>
      <MainContainerStyles.RowCenter css={[RolodexStyles.dataContainer]}>
       
      </MainContainerStyles.RowCenter>
      <MainContainerStyles.RowCenter>
      </MainContainerStyles.RowCenter>
    </MainContainerStyles.Content>
  )
};

export { RolodexIndividualView };
