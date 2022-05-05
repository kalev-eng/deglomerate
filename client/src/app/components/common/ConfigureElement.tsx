/** @jsxImportSource @emotion/react */
// react
import React from 'react';

// styles
import * as ConfigureStyles from '../../styles/Configure';
import * as MainContainerStyles from '../../styles/MainContainer';
import * as AppStyles from '../../styles/App';
import { styled } from '@mui/material/styles';
import {FormControl, InputLabel, Select, MenuItem, TextField} from '@mui/material';
import { Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LogoElement } from '../../dal/model';

interface Props {
  id: string;
  label: string;
  selectMap: Map<string, string>;
  element: LogoElement;
  onlyOwnedTokenIds: boolean;
  ownedTokenIds: number[];
  handleChange: Function;
  handleUpdate: Function;
  includeText: boolean;
  fonts: string[];
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ConfigureElement(props: Props)  {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <MainContainerStyles.Row>
        <FormControl fullWidth>
          <InputLabel id={props.id + "-select-label"}>{props.label}</InputLabel>
          <Select
            css={[AppStyles.txt]}
            labelId={props.id + "-label"}
            id={props.id + "-select"}
            label={props.label}
            value={props.element.contractAddress}
            onChange={(e) => props.handleChange(e, props.id, 'contractAddress', true)}
            >
          {[...props.selectMap.keys()].map(key => {
            return <MenuItem css={[AppStyles.txt]} value={key}>{props.selectMap.get(key)}</MenuItem>;
          })}
          </Select>
        </FormControl>
        { !props.onlyOwnedTokenIds &&
          <TextField css={[AppStyles.txt]} id={props.id + "-tokenId"} type="number" inputProps={{ inputMode: 'numeric', min: 0 }} label="Token Id" variant="outlined" onChange={(e) => props.handleChange(e, props.id, 'tokenId')} value={props.element.tokenId} onBlur={() => props.handleUpdate()} />
        }
        { props.onlyOwnedTokenIds &&
          <FormControl fullWidth>
            <InputLabel id={props.id + "-select-id-label"}>Owned Token Ids</InputLabel>
            <Select
              css={[AppStyles.txt]}
              labelId={props.id + "-id-label"}
              id={props.id + "-id-select"}
              label={props.label}
              value={props.element.tokenId}
              onChange={(e) => props.handleChange(e, props.id, 'tokenId', true)}
              >
            { props.ownedTokenIds.map(tokenId => {
              return <MenuItem css={[AppStyles.txt]} value={tokenId}>{tokenId}</MenuItem>;
            })}
            </Select>
          </FormControl>
        }
        <ExpandMore css={[ConfigureStyles.expand]} expand={expanded} onClick={() => handleExpand()} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
        
      </MainContainerStyles.Row>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      { props.includeText &&
      <MainContainerStyles.Row>
        <TextField css={[AppStyles.txt, ConfigureStyles.textField]} id={props.id + "-value"} type="string" label="Value" variant="outlined" onChange={(e) => props.handleChange(e, props.id, 'value')} value={props.element.value} onBlur={() => props.handleUpdate()}/>
        <FormControl fullWidth>
          <InputLabel id={props.id + "-select-id-label"}>Font</InputLabel>
          <Select
            css={[AppStyles.txt]}
            labelId={props.id + "-font-label"}
            id={props.id + "-font-select"}
            label={props.label}
            value={props.element.font}
            onChange={(e) => props.handleChange(e, props.id, 'font', true)}
            >
          { props.fonts.map(font => {
            return <MenuItem css={[AppStyles.txt]} value={font}>{font === 'Helvetica' ? font + ' (OpenSea compatible)': font + ' (not OpenSea compatible)'}</MenuItem>;
          })}
          </Select>
        </FormControl>
      </MainContainerStyles.Row>
      }
      
      <MainContainerStyles.Row>
          <FormControl fullWidth>
            <InputLabel id="text-translatex-select-label">X Direction</InputLabel>
            <Select
              css={[AppStyles.txt]}
              labelId="text-translatex-label"
              id="text-translatex-select"
              label="X Direction"
              value={props.element.translateXDirection}
              onChange={(e) => props.handleChange(e, props.id, 'translateXDirection', true)}
              >
              <MenuItem css={[AppStyles.txt]} value={0}>Left</MenuItem>
              <MenuItem css={[AppStyles.txt]} value={1}>Right</MenuItem>
            </Select>
          </FormControl>
          <TextField css={[AppStyles.txt, ConfigureStyles.textField]} id={props.id + "-x"} type="number" inputProps={{ inputMode: 'numeric', min: 0 }} label="X" variant="outlined" onChange={(e) => props.handleChange(e, props.id, 'x')} value={props.element.translateX} onBlur={() => props.handleUpdate()} />
        </MainContainerStyles.Row>
        <MainContainerStyles.Row>
          <FormControl fullWidth>
            <InputLabel id={props.id + "-translatey-select-label"}>Y Direction</InputLabel>
            <Select
              css={[AppStyles.txt]}
              labelId={props.id + "-translatey-label"}
              id={props.id + "-translatey-select"}
              label="Y Direction"
              value={props.element.translateYDirection}
              onChange={(e) => props.handleChange(e, props.id, 'translateYDirection', true)}
              >
              <MenuItem css={[AppStyles.txt]} value={0}>Up</MenuItem>
              <MenuItem css={[AppStyles.txt]} value={1}>Down</MenuItem>
            </Select>
          </FormControl>
          <TextField css={[AppStyles.txt, ConfigureStyles.textField]} id={props.id + "-y"} type="number" inputProps={{ inputMode: 'numeric', min: 0 }} label="Y" variant="outlined" onChange={(e) => props.handleChange(e, props.id, 'y')} value={props.element.translateY} onBlur={() => props.handleUpdate()} />
        </MainContainerStyles.Row>
        <MainContainerStyles.Row>
          <FormControl fullWidth>
            <InputLabel id={props.id + "-scale-select-label"}>Scale Direction</InputLabel>
            <Select
              css={[AppStyles.txt]}
              labelId={props.id + "-scale-label"}
              id={props.id + "-scale-select"}
              label="Scale Direction"
              value={props.element.scaleDirection}
              onChange={(e) => props.handleChange(e, props.id, 'translateScaleDirection', true)}
              >
              <MenuItem css={[AppStyles.txt]} value={0}>Smaller</MenuItem>
              <MenuItem css={[AppStyles.txt]} value={1}>Larger</MenuItem>
            </Select>
          </FormControl>
          <TextField css={[AppStyles.txt, ConfigureStyles.textField]} id={props.id + "-scale"} type="number" inputProps={{ inputMode: 'numeric', min: 0 }} label="Scale" variant="outlined" onChange={(e) => props.handleChange(e, props.id, 'scale')} value={props.element.scaleMagnitude} onBlur={() => props.handleUpdate()} />
      </MainContainerStyles.Row>
      </Collapse>
    </div>
  )
};

/*
<TextField css={[AppStyles.txt, ConfigureStyles.textField]} id={props.id + "-font"} type="string" label="Font" variant="outlined" onChange={(e) => props.handleChange(e, props.id, 'font')} value={props.element.font} onBlur={() => props.handleUpdate()}/>
        <TextField css={[AppStyles.txt, ConfigureStyles.textField]} id={props.id + "-fontLink"} type="string" label="Font Link" variant="outlined" onChange={(e) => props.handleChange(e, props.id, 'fontLink')} value={props.element.fontLink} onBlur={() => props.handleUpdate()}/>
*/
export { ConfigureElement };