/** @jsxImportSource @emotion/react */
// react
import React from 'react';

// model
import { MetaData } from '../../dal/model';

// styles
import * as ConfigureStyles from '../../styles/Configure';
import * as MainContainerStyles from '../../styles/MainContainer';
import * as AppStyles from '../../styles/App';
import {FormControl, Typography, TextField} from '@mui/material';

interface Props {
  metaData: MetaData[];
  handleChange: Function;
};

function ConfigureMetaData(props: Props)  {

  return (
      <div>
        <FormControl fullWidth>
        <MainContainerStyles.Row>
          {props.metaData.map(mdElement => {
            return (<TextField css={[AppStyles.txt, ConfigureStyles.textField]} id={mdElement.key} type="string" label={mdElement.key} variant="outlined" onChange={(e) => props.handleChange(e, mdElement.key)} value={mdElement.value} />)
          })}
        </MainContainerStyles.Row>
        </FormControl>
      </div>
  )
};

export { ConfigureMetaData };