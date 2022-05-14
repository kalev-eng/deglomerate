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
import { IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import * as MainContainerStyles from '../../styles/MainContainer';

// icons
import GridViewIcon from '@mui/icons-material/GridView';
import CropSquareIcon from '@mui/icons-material/CropSquare';

// static
import { ROLODEX_SEARCH_BY } from '../../dal/data/static';

interface Props {};

function Rolodex(props: Props)  {
  const [view, setView] = useState<string>('grid');

  const [searchBy, setSearchyBy] = useState<string>('has a logo image');

  const clickedGridView = () => {
    setView('grid');
  }

  const clickedIndiviualView = () => {
    setView('individual');
  }

  const handleSearchChange = (e) => {
    setSearchyBy(e.target.value);
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
      <MainContainerStyles.RowCenter>
        <FormControl>
          <InputLabel id="searchby-select-label">Search by</InputLabel>
          <Select
            css={[AppStyles.txt, RolodexStyles.headerField]}
            labelId="searchby-label"
            id="searchby-select"
            label="Search by"
            value={searchBy}
            onChange={(e) => handleSearchChange(e)}
            >
          {[...ROLODEX_SEARCH_BY.keys()].map(key => {
            return <MenuItem css={[AppStyles.txt]} value={key}>{key}</MenuItem>;
          })}
          </Select>
        </FormControl>
      </MainContainerStyles.RowCenter>
      { view === 'grid' && <RolodexGridView searchByKey={ROLODEX_SEARCH_BY.get(searchBy)[0]} searchByValue={ROLODEX_SEARCH_BY.get(searchBy)[1]} /> }
      { view === 'individual' && <RolodexIndividualView searchByKey={ROLODEX_SEARCH_BY.get(searchBy)[0]} searchByValue={ROLODEX_SEARCH_BY.get(searchBy)[1]}/> }
    </MainContainerStyles.Content>
  )
};

export { Rolodex };