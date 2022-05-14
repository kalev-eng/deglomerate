/** @jsxImportSource @emotion/react */
// react
import React, {useEffect, useState} from 'react';

// redux data store
import * as app from '../../dal/data/app';
import { useSelector } from 'react-redux';

// model
import { MetaData } from '../../dal/model';

// static
import { META_DATA_KEYS } from '../../dal/data/static';

// styles
import * as AppStyles from '../../styles/App';
import * as MainContainerStyles from '../../styles/MainContainer';
import { Typography, Link, Tooltip } from '@mui/material';

interface Props {
  tokenId: number;
};

function MetaDataViewer(props: Props)  {
  const [metaData, setMetaData] = useState<MetaData[]>([]);
  
  const logoContract = useSelector(app.selectLogoContract);

  useEffect(() => {
    const getLogoMetaData = async () => {
      if (logoContract) {
        // fetch logo metadata
        const vals: string[] = await logoContract.methods.getMetaDataForKeys(props.tokenId, META_DATA_KEYS).call();
        let metaDataArr: MetaData[] = [];
        for (let i = 0; i < META_DATA_KEYS.length; i++) {
          metaDataArr.push({key: META_DATA_KEYS[i], value: vals[i]});
        }
        setMetaData(metaDataArr);
      }
    };
    getLogoMetaData();
  }, [logoContract, props.tokenId]);

  const withHttp = (url: string) => {
    return !/^https?:\/\//i.test(url) ? `http://${url}` : url;
  }
  
  return (
    <div>
      <MainContainerStyles.Row>
        <Typography css={[AppStyles.txt]} variant="h5" component="div">Profile</Typography>
      </MainContainerStyles.Row>
     {metaData.map(mdElement => {
        return (<MainContainerStyles.SqueezedRow>
                  <Typography css={[AppStyles.txt]} variant="body1" component="div">{mdElement.key}:</Typography>
                  {mdElement.key === 'name' && mdElement.value !== '' ? 
                  <Typography css={[AppStyles.txt]} variant="body1" component="div">{mdElement.value}</Typography>
                  : mdElement.key === 'role' && mdElement.value !== '' ? 
                  <Typography css={[AppStyles.txt]} variant="body1" component="div">{mdElement.value}</Typography>
                  : mdElement.key === 'twitter url' && mdElement.value !== '' ? 
                  <Typography css={[AppStyles.txt]} variant="body1" component="div"><Link href={withHttp(mdElement.value)} underline="hover" target="_blank" rel="noreferrer">...{mdElement.value.slice(-12)}</Link></Typography>
                  : mdElement.key === 'discord' && mdElement.value !== '' ? 
                  <div>
                    {mdElement.value.includes('https://') ? <Typography css={[AppStyles.txt, AppStyles.selectable]} variant="body1" component="div"><Link href={mdElement.value} underline="hover" target="_blank" rel="noreferrer">...{mdElement.value.slice(-12)}</Link></Typography> 
                    : <Typography css={[AppStyles.txt, AppStyles.selectable]} variant="body1" component="div">{mdElement.value}</Typography>}
                  </div>
                  : mdElement.key === 'url' && mdElement.value !== '' ? 
                  <Typography css={[AppStyles.txt]} variant="body1" component="div"><Link href={withHttp(mdElement.value)} underline="hover" target="_blank" rel="noreferrer">{mdElement.value}</Link></Typography>
                  : mdElement.key === 'ens' && mdElement.value !== '' ?
                  <Typography css={[AppStyles.txt]} variant="body1" component="div"><Link href={'https://etherscan.io/enslookup-search?search=' + mdElement.value} underline="hover" target="_blank" rel="noreferrer">{mdElement.value}</Link></Typography>
                  : mdElement.key === 'token address' && mdElement.value !== '' ?
                  <Typography css={[AppStyles.txt]} variant="body1" component="div"><Link href={'https://etherscan.io/token/' + mdElement.value + '#balances'} underline="hover" target="_blank" rel="noreferrer">{mdElement.value.slice(0, 3)}...{mdElement.value.slice(-3)}</Link></Typography>
                  : <Typography css={[AppStyles.txt]} variant="body1" component="div">none</Typography>}
                </MainContainerStyles.SqueezedRow>)
        })}
    </div>
  )
};

export { MetaDataViewer };
