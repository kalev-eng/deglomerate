/** @jsxImportSource @emotion/react */
// react
import React, {useEffect, useState} from 'react';

// redux data store
import * as app from '../../dal/data/app';
import { useSelector } from 'react-redux';

// styles
import * as MainContainerStyles from '../../styles/MainContainer';
import * as NftCardStyles from '../../styles/NftCard';
import { Card, CardContent, CardActions, CardMedia } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { Link } from '@mui/material';

import * as AppStyles from '../../styles/App';

interface Props {
  mint: Function;
  mintIsActive: boolean;
  maxQuantity: number;
  key: string;
  header: string;
  contractAddress: string;
  description: string;
  cost: number;
  minted: number;
  supply: number|null;
  adjustableQuantity: boolean;
  example: Object;
  openSeaLink: string;
};

function NftCard(props: Props)  {
  const [quantity, setQuantity] = useState<number>(1);

  const account = useSelector(app.selectAccount);
  
  const onIncreaseQuantity = () => {
    if (quantity + 1 >= props.maxQuantity) {
      setQuantity(props.maxQuantity);
    } else {
      setQuantity(quantity + 1);
    }
  }

  const onDecreaseQuantity = () => {
    if (quantity - 1 <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  }

  const saleIsActive = () => {
    if (!props.mintIsActive) {
      return false;
    } else if (props.mintIsActive &&  props.supply === null) {
      return true;
    } else if (props.mintIsActive && props.supply && props.minted < props.supply) {
      return true;
    }
  }

  const shouldAllowMint = () => {
    if (saleIsActive() && props.supply === null) {
      return true;
    }
    return (saleIsActive() && props.supply !== null && props.minted + quantity <= props.supply);
  }

  return (
    <Grid item key={props.key} xs={12} sm={6} md={4}>
      <Card  css={[NftCardStyles.card]}
        sx={{ height: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column' }}
      >
        <Typography css={[AppStyles.txt, NftCardStyles.header]} gutterBottom variant="h3" component="div">
          {props.header}
        </Typography>
        <Typography css={[AppStyles.txt, NftCardStyles.sample]} gutterBottom>
          Sample:
        </Typography>
        <CardMedia>
          <img src={props.example} alt="logo" css={[NftCardStyles.sampleAsset]}/>
        </CardMedia>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h4" component="div">
          </Typography>
          <Typography css={[AppStyles.txt, NftCardStyles.description]} >
            {props.description}
          </Typography>
          <Typography css={[AppStyles.txt, NftCardStyles.numMinted]}>
            {props.minted !== 0 ? props.minted : '-'} minted of {props.supply !== null ? props.supply : 'infinite'} total supply
          </Typography>
          <Typography css={[AppStyles.txt, NftCardStyles.cost]}>
            <svg css={[MainContainerStyles.ethLogo]} aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
            {props.cost}
          </Typography>
        </CardContent>
        <Typography css={[AppStyles.txt]} gutterBottom>
          No roadmap.
        </Typography>
        <Typography css={[AppStyles.txt]} gutterBottom>
          Read <Link href='https://deglomerate.gitbook.io/deglomerate/' underline="hover" target="_blank" rel="noreferrer">gitbook</Link> before mint.
        </Typography>
        { !account &&
          <CardActions>
            <Tooltip title="Please connect your wallet first" arrow>
            <span css={[NftCardStyles.mint]}>
              <Button css={[AppStyles.txt, AppStyles.link, NftCardStyles.mint]} size="large" disabled>Mint</Button>
            </span>
            </Tooltip>
          </CardActions>
        }
        { account &&
          <CardActions>
            {props.adjustableQuantity && <Button variant="outlined" css={[AppStyles.txt, AppStyles.link, NftCardStyles.mint]} onClick={() => onDecreaseQuantity()} size="large" disableElevation disabled={!saleIsActive()}>-</Button>}
            {props.adjustableQuantity && <Button variant="outlined" css={[AppStyles.txt, AppStyles.link, NftCardStyles.mint]} onClick={() => props.mint(props.contractAddress, quantity)} size="large" disableElevation disabled={!shouldAllowMint()}>Mint {props.adjustableQuantity ? quantity : ''}</Button>}
            {!props.adjustableQuantity && <Button variant="outlined" css={[AppStyles.txt, AppStyles.link, NftCardStyles.mintWide]} onClick={() => props.mint(props.contractAddress, quantity)} size="large" disableElevation disabled={!shouldAllowMint()}>Mint {props.adjustableQuantity ? quantity : ''}</Button>}
            {props.adjustableQuantity && <Button variant="outlined" css={[AppStyles.txt, AppStyles.link, NftCardStyles.mint]} onClick={() => onIncreaseQuantity()} size="large" disableElevation disabled={!saleIsActive() || !shouldAllowMint()}>+</Button>}
          </CardActions>
        }
        <Typography css={[AppStyles.txt]}>
            <a href={"https://opensea.io/collection/" + props.openSeaLink} css={[NftCardStyles.openSeaLink]} target="_blank" rel="noopener noreferrer"><svg width="30px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#2081E2" d="M17.4414 13.5517C17.4 13.5103 17.3379 13.5103 17.2759 13.531L17.131 13.5931C16.4276 13.9448 15.6414 14.1103 14.8552 14.1103C14.8138 14.1103 14.7931 14.131 14.7931 14.1517C14.7103 14.5241 14.4 14.7931 14.0069 14.7931H12.3931V13.4483H12.4138C12.5172 13.469 12.6 13.469 12.7034 13.4897C13.3862 13.5931 13.7172 13.9034 13.8621 14.0483L13.8828 14.069C13.9034 14.0897 13.9448 14.0897 13.9655 14.069C13.9862 14.0483 14.0069 14.0276 14.0483 14.0069C14.2966 13.8414 14.8759 13.4897 14.8759 11.6276C14.8759 9.72414 13.4276 8.44138 13.2621 8.35862L12.4138 8.29655H12.3931V7.75862C12.5586 7.65517 12.6828 7.46897 12.6828 7.24138C12.6828 6.91035 12.4345 6.64138 12.1034 6.64138C11.7724 6.64138 11.5241 6.91035 11.5241 7.24138C11.5241 7.44828 11.6276 7.63448 11.8138 7.73793V8.1931L10.5931 8.06897C10.531 8.06897 10.4897 8.13103 10.531 8.17241C10.7379 8.50345 11.2966 9.53793 11.3379 11.0897C11.3793 12.5379 11.1517 13.2207 11.0483 13.469C11.0276 13.4897 11.0276 13.5103 11.0483 13.531C11.069 13.5517 11.0897 13.5517 11.1103 13.5517C11.2552 13.531 11.5034 13.4897 11.8138 13.469V14.8138H10.469C10.0345 14.8138 9.66207 14.4414 9.66207 14.0069V13.6759C9.66207 13.6345 9.64138 13.6138 9.6 13.6138H7.09655C7.07586 13.6138 7.03448 13.6345 7.03448 13.6759C7.03448 13.7379 7.03448 13.8 7.03448 13.8621C7.03448 14.7931 7.30345 15.6414 7.75862 16.3862C7.84138 16.5103 7.98621 16.5724 8.11034 16.5103L8.37931 16.3862C8.58621 16.2828 8.83448 16.2828 9.06207 16.3862L9.35172 16.5103C9.55862 16.6138 9.8069 16.6138 10.0345 16.5103L10.3241 16.3862C10.5517 16.2828 10.7793 16.2828 11.0069 16.3862L11.2966 16.5103C11.5241 16.6138 11.7517 16.6138 11.9793 16.5103L12.269 16.3862C12.4966 16.2828 12.7241 16.2828 12.9517 16.3862L13.2414 16.5103C13.469 16.6138 13.6966 16.6138 13.9241 16.5103L14.2138 16.3862C14.4414 16.2828 14.669 16.2828 14.8966 16.3862L15.1862 16.5103C15.3724 16.5931 15.5793 16.4897 15.6828 16.3034C15.8483 16.0345 15.9931 15.7241 16.0966 15.4345C16.3241 14.7517 16.7379 14.1103 17.3793 13.8C17.4414 13.7793 17.4621 13.7172 17.4621 13.6552C17.5034 13.6345 17.4828 13.5724 17.4414 13.5517ZM8.21379 13.0966H10.5724C10.6138 13.0966 10.6345 13.0759 10.6345 13.0345V10.469C10.6345 10.4483 10.6138 10.4276 10.5931 10.4069L9.43448 9.86897C9.41379 9.84828 9.37241 9.86897 9.35172 9.91035L8.15172 12.9931C8.13103 13.0552 8.17241 13.0966 8.21379 13.0966ZM12 0C5.37931 0 0 5.37931 0 12C0 18.6207 5.37931 24 12 24C18.6207 24 24 18.6207 24 12C24 5.37931 18.6207 0 12 0ZM11.9586 20.731C7.17931 20.731 3.31034 16.8621 3.31034 12.0621C3.31034 7.28276 7.17931 3.3931 11.9586 3.3931C16.7379 3.3931 20.6069 7.28276 20.6069 12.0621C20.5862 16.8621 16.7172 20.731 11.9586 20.731ZM17.2759 13.531L17.131 13.5931C16.4276 13.9448 15.6414 14.1103 14.8552 14.1103C14.8138 14.1103 14.7931 14.131 14.7931 14.1517C14.7103 14.5241 14.4 14.7931 14.0069 14.7931H12.3931V13.4483H12.4138C12.5172 13.469 12.6 13.469 12.7034 13.4897C13.3862 13.5931 13.7172 13.9034 13.8621 14.0483L13.8828 14.069C13.9034 14.0897 13.9448 14.0897 13.9655 14.069C13.9862 14.0483 14.0069 14.0276 14.0483 14.0069C14.2966 13.8414 14.8759 13.4897 14.8759 11.6276C14.8759 9.72414 13.4276 8.44138 13.2621 8.35862L12.4138 8.29655H12.3931V7.75862C12.5586 7.65517 12.6828 7.46897 12.6828 7.24138C12.6828 6.91035 12.4345 6.64138 12.1034 6.64138C11.7724 6.64138 11.5241 6.91035 11.5241 7.24138C11.5241 7.44828 11.6276 7.63448 11.8138 7.73793V8.1931L10.5931 8.06897C10.531 8.06897 10.4897 8.13103 10.531 8.17241C10.7379 8.50345 11.2966 9.53793 11.3379 11.0897C11.3793 12.5379 11.1517 13.2207 11.0483 13.469C11.0276 13.4897 11.0276 13.5103 11.0483 13.531C11.069 13.5517 11.0897 13.5517 11.1103 13.5517C11.2552 13.531 11.5034 13.4897 11.8138 13.469V14.8138H10.469C10.0345 14.8138 9.66207 14.4414 9.66207 14.0069V13.6759C9.66207 13.6345 9.64138 13.6138 9.6 13.6138H7.09655C7.07586 13.6138 7.03448 13.6345 7.03448 13.6759C7.03448 13.7379 7.03448 13.8 7.03448 13.8621C7.03448 14.7931 7.30345 15.6414 7.75862 16.3862C7.84138 16.5103 7.98621 16.5724 8.11034 16.5103L8.37931 16.3862C8.58621 16.2828 8.83448 16.2828 9.06207 16.3862L9.35172 16.5103C9.55862 16.6138 9.8069 16.6138 10.0345 16.5103L10.3241 16.3862C10.5517 16.2828 10.7793 16.2828 11.0069 16.3862L11.2966 16.5103C11.5241 16.6138 11.7517 16.6138 11.9793 16.5103L12.269 16.3862C12.4966 16.2828 12.7241 16.2828 12.9517 16.3862L13.2414 16.5103C13.469 16.6138 13.6966 16.6138 13.9241 16.5103L14.2138 16.3862C14.4414 16.2828 14.669 16.2828 14.8966 16.3862L15.1862 16.5103C15.3724 16.5931 15.5793 16.4897 15.6828 16.3034C15.8483 16.0345 15.9931 15.7241 16.0966 15.4345C16.3241 14.7517 16.7379 14.1103 17.3793 13.8C17.4414 13.7793 17.4621 13.7172 17.4621 13.6552C17.4621 13.6138 17.4414 13.5517 17.4 13.531C17.4 13.531 17.3379 13.5103 17.2759 13.531ZM8.21379 13.0966H10.5724C10.6138 13.0966 10.6345 13.0759 10.6345 13.0345V10.469C10.6345 10.4483 10.6138 10.4276 10.5931 10.4069L9.43448 9.86897C9.41379 9.84828 9.37241 9.86897 9.35172 9.91035L8.15172 12.9931C8.13103 13.0552 8.17241 13.0966 8.21379 13.0966Z"></path></svg></a>
            <a href={"https://looksrare.org/collections/" + props.contractAddress} css={[NftCardStyles.looksRareLink]} target="_blank" rel="noopener noreferrer">
              <svg width="30px" height="80px" viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.379 43.7306C55.8133 21.4231 92.1867 21.4231 114.621 43.7306L134 63L114.621 82.2694C92.1867 104.577 55.8134 104.577 33.379 82.2694L14 63L33.379 43.7306Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 63.0304L44 19H104L148 63.0304L74 137L0 63.0304ZM108 46.9998C89.3047 28.2224 58.6953 28.2225 40 46.9999L24 63.0001L40 79.0002C58.6953 97.7776 89.3047 97.7775 108 79.0001L124 63.0001L108 46.9998Z" fill="#0CE466"/>
                <path d="M74 77C66.2712 77 60 70.7351 60 63C60 55.2649 66.2712 49 74 49C81.7288 49 88 55.2649 88 63C88 70.7351 81.7288 77 74 77Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M51 63C51 75.7077 61.3026 86 74 86C86.6974 86 97 75.7077 97 63C97 50.2923 86.6974 40 74 40C61.3026 40 51 50.2923 51 63ZM64 63C64 68.5251 68.4794 73 74 73C79.5206 73 84 68.5251 84 63C84 57.4749 79.5206 53 74 53C68.4794 53 64 57.4749 64 63Z" fill="white"/>
              </svg>
            </a>
          </Typography>
      </Card>
    </Grid>
  )
};

export { NftCard };

