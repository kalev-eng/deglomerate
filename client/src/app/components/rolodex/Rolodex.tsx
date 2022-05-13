/** @jsxImportSource @emotion/react */
// react
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

// data store
import * as app from '../../dal/data/app';

// components
import { RolodexGridView } from './RolodexGridView';
import { RolodexIndividualView } from './RolodexIndividualView';
import { LogoViewer } from '../common/LogoViewer';
import { MetaDataViewer } from '../common/MetaDataViewer';
import { AttributeViewer } from '../common/AttributeViewer';

// styles
import * as AppStyles from '../../styles/App';
import * as RolodexStyles from '../../styles/Rolodex';
import { IconButton, TextField, Button, Tooltip } from '@mui/material';
import * as MainContainerStyles from '../../styles/MainContainer';

// icons
import GridViewIcon from '@mui/icons-material/GridView';
import CropSquareIcon from '@mui/icons-material/CropSquare';

interface Props {};

function Rolodex(props: Props)  {
  // contracts
  const logoContract = useSelector(app.selectLogoContract);
  const searchContract = useSelector(app.selectSearchContract);

  const [view, setView] = useState<string>('grid');

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

  const clickedGridView = () => {
    setView('grid');
  }

  const clickedIndiviualView = () => {
    setView('individual');
  }

  return (
    <MainContainerStyles.Content>
      <MainContainerStyles.RowCenter css={[RolodexStyles.icons]}>
        <IconButton onClick={() => clickedGridView()} css={[AppStyles.link]} component="span">
          <GridViewIcon /> 
        </IconButton>
        <IconButton onClick={() => clickedIndiviualView()} css={[AppStyles.link]} component="span">
          <CropSquareIcon />
        </IconButton>
      </MainContainerStyles.RowCenter>
      { view === 'grid' && <RolodexGridView/> }
      { view === 'individual' && <RolodexIndividualView/> }
    </MainContainerStyles.Content>
  )
};

export { Rolodex };
