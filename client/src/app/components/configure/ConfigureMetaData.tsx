/** @jsxImportSource @emotion/react */
// react
import React from 'react';

// redux data store
import { ROLES } from '../../dal/data/static';

// model
import { MetaData } from '../../dal/model';

// styles
import * as ConfigureStyles from '../../styles/Configure';
import * as MainContainerStyles from '../../styles/MainContainer';
import * as AppStyles from '../../styles/App';
import { FormControl, Typography, TextField, InputLabel, Select, MenuItem } from '@mui/material';

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
            return (
              <div>
                { mdElement.key !== 'role' && <TextField css={[AppStyles.txt, ConfigureStyles.textField]} id={mdElement.key} type="string" label={mdElement.key} variant="outlined" onChange={(e) => props.handleChange(e, mdElement.key)} value={mdElement.value} />}
                { mdElement.key === 'role' && <FormControl fullWidth>
                                                <InputLabel id="role-select-label">role</InputLabel>
                                                <Select
                                                  css={[AppStyles.txt, ConfigureStyles.selectField]}
                                                  labelId="role-label"
                                                  id="role-select"
                                                  label="role"
                                                  value={mdElement.value}
                                                  onChange={(e) => props.handleChange(e, mdElement.key)}
                                                  >
                                                {ROLES.map(role => {
                                                  return <MenuItem css={[AppStyles.txt]} value={role}>{role}</MenuItem>;
                                                })}
                                                </Select>
                                              </FormControl>}
              </div>
            )
          })}
        </MainContainerStyles.Row>
        </FormControl>
      </div>
  )
};

export { ConfigureMetaData };