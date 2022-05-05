/** @jsxImportSource @emotion/react */
// react
import React, {useEffect, useState} from 'react';

// redux data store
import * as app from '../../dal/data/app';
import { useSelector, useDispatch } from 'react-redux';

// web3
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

// styles
import * as MainContainerStyles from '../../styles/MainContainer';
import * as AppStyles from '../../styles/App';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

interface Props {};

function Connect(props: Props)  {
  const [isConnecting, setIsConnecting] = useState(false);

  const dispatch = useDispatch();
  const web3: Web3 | null = useSelector(app.selectWeb3);
  const account = useSelector(app.selectAccount);

  const onClickConnect = async () => {
    setIsConnecting(true);

    const provider = await detectEthereumProvider();

    if (provider) {
      connectToWallet(provider); // Initialize your app
    } else {
      console.error('Error getting provider, please install web3 wallet!');
      setIsConnecting(false);
    }
  }

  const connectToWallet = async (provider: any) => {
    if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
      setIsConnecting(false);
    }

    if (web3) {
      web3.eth.requestAccounts()
      .then((accounts: any) => {
        handleAccountsChanged(accounts);
        setIsConnecting(false);
      })
      .catch((err: any) => {
        setIsConnecting(false);
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
      provider.on('accountsChanged', handleAccountsChanged);
    }
  }

  const handleAccountsChanged = (accounts: any) => {
    if (accounts.length === 0) {
      dispatch(app.setAccount(''));
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== account) {
      dispatch(app.setAccount(accounts[0]));
    }
  }

  return (
    <div>
      { !account && !isConnecting &&
        <MainContainerStyles.Row>
          <Button variant="outlined" onClick={() => onClickConnect()} css={[MainContainerStyles.divImg, AppStyles.txt, AppStyles.link]}>Connect</Button>
        </MainContainerStyles.Row> 

      }
      { !account && isConnecting &&
        <MainContainerStyles.Row>
          <Button variant="outlined" css={[MainContainerStyles.divImg, AppStyles.txt, AppStyles.link]} disableElevation>Connect</Button>
        </MainContainerStyles.Row>
      }
      { account &&
        <Typography css={[AppStyles.txt, AppStyles.account]}>{account.slice(0, 3)}...{account.slice(-3)}</Typography>
      }

    </div>
  )
};

export { Connect };