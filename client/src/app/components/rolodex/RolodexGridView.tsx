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

function RolodexGridView(props: Props)  {
  // contracts
  const logoContract = useSelector(app.selectLogoContract);
  const searchContract = useSelector(app.selectSearchContract);

  const [maxTokenId, setMaxTokenId] = useState<number>(0);
  const [tokenIds, setTokenIds] = useState<number[]>([]);

  useEffect(() => {
    const init = async () => {
      if (logoContract !== null && maxTokenId === 0) {
        const totalSupply = await logoContract.methods.totalSupply().call();
        setMaxTokenId(Number(totalSupply));
      }
    };
    init();
  }, [logoContract]);

  useEffect(() => {
    const init = async () => {
      if (searchContract !== null && maxTokenId !== 0) {
        const nxtTokenIds = await searchContract.methods.getNextConfiguredLogos(4, props.searchByKey, props.searchByValue, 0, maxTokenId).call();
        parseAndSetTokenIds(nxtTokenIds);
      }
    };
    init();
  }, [searchContract, maxTokenId]);

  useEffect(() => {
    const search = async () => {
      if (searchContract !== null) {
        setTokenIds([]);
        const nxtTokenIds = await searchContract.methods.getNextConfiguredLogos(4, props.searchByKey, props.searchByValue, 0, maxTokenId).call();
        parseAndSetTokenIds(nxtTokenIds);
      }
    };
    search();
  }, [props.searchByKey, props.searchByValue]);
  
  
  const previousConfiguredLogos = async () => {
    if (searchContract) {
      const nxtTokenId = tokenIds.length > 0 ? (tokenIds[0] > 0 ? tokenIds[0] - 1: 0) : 0;
      // edge case when pressing previous and tokenId 0 is already fetched
      if (tokenIds.includes(nxtTokenId)) {
        return;
      }
      const nxtTokenIds = await searchContract.methods.getPreviousConfiguredLogos(nxtTokenId >= 3 ? 4: nxtTokenId + 1, props.searchByKey, props.searchByValue, nxtTokenId, 0).call();
      parseAndSetTokenIds(nxtTokenIds);
    }
  }

  const nextConfiguredLogos = async () => {
    if (searchContract) {
      const nxtTokenId = tokenIds.length > 0 ? tokenIds[tokenIds.length - 1] + 1 : 0;
      const nxtTokenIds = await searchContract.methods.getNextConfiguredLogos(4, props.searchByKey, props.searchByValue, nxtTokenId, maxTokenId).call();
      parseAndSetTokenIds(nxtTokenIds);
    }
  }

  const parseAndSetTokenIds = (nxtTokenIds: string[]) => {
    const parsedTokenIds = parseTokenIdResult(nxtTokenIds);
    if (parsedTokenIds.length > 0) {
      setTokenIds(parsedTokenIds);
    }
  }

  const parseTokenIdResult = (nxtTokenIds: string[]) => {
    let parsedTokenIds: number[] = [];
    for (let i = 0; i < nxtTokenIds.length; i++) {
      if (nxtTokenIds[i] == MAX_UINT) {
        return parsedTokenIds;
      }
      parsedTokenIds.push(Number(nxtTokenIds[i]));
    }
    // sort the tokens so they are in ascending order
    return parsedTokenIds.sort(function(a, b){return a - b});
  }

  return (
    <MainContainerStyles.Content>
      <MainContainerStyles.RowCenter css={[RolodexStyles.icons]}>
        <Tooltip title="Previous (skip blank Logos)" placement="top">
          <Button variant="outlined" css={[AppStyles.txt, AppStyles.link]} onClick={() => previousConfiguredLogos()} size="large" disableElevation>&lt;&lt;</Button>
        </Tooltip>  
        <Tooltip title="Next (skip blank Logos)" placement="top">
          <Button variant="outlined" css={[AppStyles.txt, AppStyles.link]} onClick={() => nextConfiguredLogos()} size="large" disableElevation>&gt;&gt;</Button>
        </Tooltip>
      </MainContainerStyles.RowCenter>
      <MainContainerStyles.RowCenter css={[RolodexStyles.grid]}>
        {tokenIds.map(tokenId => {
          return (<div>
            <LogoViewer width={500} height={500} tokenId={tokenId} downloadable={false}/>
            <MainContainerStyles.RowCenter>
              <MetaDataViewer tokenId={tokenId} />
              <AttributeViewer tokenId={tokenId} />
            </MainContainerStyles.RowCenter>
        </div>)
        })}
      </MainContainerStyles.RowCenter>
    </MainContainerStyles.Content>
  )
};

export { RolodexGridView };
