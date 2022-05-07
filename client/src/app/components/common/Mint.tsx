/** @jsxImportSource @emotion/react */
// react
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

// data store
import * as app from '../../dal/data/app';
import { BGBYL_CONTRACT_ADDRESS, TBL_CONTRACT_ADDRESS, FGBL_CONTRACT_ADDRESS, LOGO_CONTRACT_ADDRESS} from '../../dal/data/static';
import { LOGO_PRICE, LOGO_SUPPLY, BACKGROUND_PRICE, BACKGROUND_SUPPLY, EMOTICON_PRICE, EMOTICON_SUPPLY, TEXT_PRICE, TEXT_SUPPLY } from '../../dal/data/static';
import { CHAIN_ID } from '../../dal/data/static';

// components
import { NftCard } from './NftCard';

// web3
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

// styles
import * as MainContainerStyles from '../../styles/MainContainer';
import * as MintStyles from '../../styles/Mint';

// assets
import BackgroundExample from "../../../assets/backgroundExample.png"
import EmoticonExample from "../../../assets/emoticonExample.svg"
import TextExample from "../../../assets/textExample.svg"
import ContainerExample from "../../../assets/containerExample.svg"

interface Transaction {
  hash: string;
  link: string;
  status: string;
}

interface Props {};


function Mint(props: Props)  {
  const account = useSelector(app.selectAccount);

  // contracts
  const logoContract = useSelector(app.selectLogoContract);
  const backgroundContract = useSelector(app.selectBackgroundContract);
  const emoticonContract = useSelector(app.selectForegroundContract);
  const textContract = useSelector(app.selectTextContract);

  const [web3, setWeb3] = useState<Web3>();

  // mint
  const [backgroundMintIsActive, setBackgroundMintIsActive] = useState<boolean>(false);
  const [emoticonMintIsActive, setEmoticonMintIsActive] = useState<boolean>(false);
  const [textMintIsActive, setTextMintIsActive] = useState<boolean>(false);
  const [logoMintIsActive, setLogoMintIsActive] = useState<boolean>(false);

  const [logoNumMinted, setLogoNumMinted] = useState<number>(0);
  const [backgroundNumMinted, setBackgroundNumMinted] = useState<number>(0);
  const [emoticonNumMinted, setEmoticonNumMinted] = useState<number>(0);
  const [textNumMinted, setTextNumMinted] = useState<number>(0);

  const [mintTxs, setMintTxs] = useState<Transaction[]>([]);
  const [successfulTxs, setSuccessfulTxs] = useState<string[]>([]);
  const [failedTxs, setFailedTxs] = useState<string[]>([]);

  const backgroundDesc: string = 'On-chain generative SVG art created by logo. Makes for a great logo background.';
  const emoticonDesc: string = 'On-chain emoticons by logo with text that you can set. Highly recommend for logos.'
  const textDesc: string = 'Text that you can set the value and font of. 10/10 degens would recommend for logos.'
  const logoDesc : string= 'A container where you can set a background, foreground, and text to other on-chain nfts to create your logo. Logo containers also have configurable metadata to share data in an on-chain and composable way. After minting, your logo container will be blank. Go to configure to get started (configuring will cost additional gas).'

  useEffect(() => {
    const init = async () => {
      const provider: any = await detectEthereumProvider();
      setWeb3(new Web3(provider));
    };
    init();
  }, []);

  useEffect(() => {
    if (backgroundContract != null) {
      const getMintIsActive = async () => {
        const active = await backgroundContract.methods.mintIsActive().call();
        setBackgroundMintIsActive(active);
      };
      getMintIsActive();
    } else {
      console.log('Waiting for contract to be set');
    }
  }, [backgroundContract]);

  useEffect(() => {
    if (emoticonContract != null) {
      const getMintIsActive = async () => {
        const active = await emoticonContract.methods.mintIsActive().call();
        setEmoticonMintIsActive(active);
      };
      getMintIsActive();
    } else {
      console.log('Waiting for contract to be set');
    }
  }, [emoticonContract]);

  useEffect(() => {
    if (textContract != null) {
      const getMintIsActive = async () => {
        const active = await textContract.methods.mintIsActive().call();
        setTextMintIsActive(active);
      };
      getMintIsActive();
    } else {
      console.log('Waiting for contract to be set');
    }
  }, [textContract]);

  useEffect(() => {
    if (logoContract != null) {
      const getMintIsActive = async () => {
        const active = await logoContract.methods.mintIsActive().call();
        setLogoMintIsActive(active);
      };
      getMintIsActive();
    } else {
      console.log('Waiting for contract to be set');
    }
  }, [logoContract]);

   // update successful and failed txs
   useEffect(() => {
    for (let i = 0; i < mintTxs.length; i++) {
      let tx = mintTxs[i];
      for (let j = 0; j < successfulTxs.length; j++) {
        if (successfulTxs[j] === tx.hash) {
          const newMintTxs = Object.assign([...mintTxs], {
              [i]: {
                  ...mintTxs[i],
                  status: 'success'
              }
            });
          setMintTxs(newMintTxs);
        }
      }

      for (let j = 0; j < failedTxs.length; j++) {
        if (failedTxs[j] === tx.hash) {
          const newMintTxs = Object.assign([...mintTxs], {
            [i]: {
                ...mintTxs[i],
                status: 'error'
            }
          });
        setMintTxs(newMintTxs);
        }
      }
    }
  }, [successfulTxs, failedTxs]);

  // update successful and failed txs
  useEffect(() => {
    updateNumMinted();
  }, [account]);

  // update num minted every 5 seconds
  setInterval(async () => {
    updateNumMinted();
  }, 5000);

  const updateNumMinted = async () => {
    if (backgroundContract != null) {
      const numMinted = await backgroundContract.methods.totalSupply().call();
      setBackgroundNumMinted(Number(numMinted));
    }
    if (emoticonContract != null) {
      const numMinted = await emoticonContract.methods.totalSupply().call();
      setEmoticonNumMinted(Number(numMinted));
    }
    if (textContract != null) {
      const numMinted = await textContract.methods.totalSupply().call();
      setTextNumMinted(Number(numMinted));
    }
    if (logoContract != null) {
      const numMinted = await logoContract.methods.totalSupply().call();
      setLogoNumMinted(Number(numMinted));
    }
  }
  
  const mint = async (contractAddress: string, quantity: number) => {
    const chainId = await web3.eth.getChainId();
    if (chainId !== CHAIN_ID) {
      alert('Please connect to Ethereum mainnet before minting.');
      return;
    }

    if (logoContract != null && backgroundContract != null &&
        emoticonContract != null && textContract != null && account != null) {
      /*
      // get mint fee
      let unitPrice = UNIT_COST;
      // get total cost of mint = mint fee * number to mint
      let totalCost = Web3.utils.toWei((unitPrice * quantity).toString(), 'ether');
      */
      let tx;
      if (contractAddress === LOGO_CONTRACT_ADDRESS) {
        let unitPrice = LOGO_PRICE;
        let totalCost = Web3.utils.toWei(((unitPrice * quantity).toFixed(2)).toString(), 'ether');
        tx = logoContract.methods.mint(quantity).send({
          from: account,
          chainId: CHAIN_ID,
          value: totalCost,
        })
      } else if (contractAddress === BGBYL_CONTRACT_ADDRESS) {
        let unitPrice = BACKGROUND_PRICE;
        let totalCost = Web3.utils.toWei(((unitPrice * quantity).toFixed(2)).toString(), 'ether');
        tx = backgroundContract.methods.mint(quantity).send({
          from: account,
          chainId: CHAIN_ID,
          value: totalCost,
        })
      } else if (contractAddress === FGBL_CONTRACT_ADDRESS) {
        let unitPrice = EMOTICON_PRICE;
        let totalCost = Web3.utils.toWei(((unitPrice * quantity).toFixed(2)).toString(), 'ether');
        tx = emoticonContract.methods.mint(quantity).send({
          from: account,
          chainId: CHAIN_ID,
          value: totalCost,
        })
      }  else if (contractAddress === TBL_CONTRACT_ADDRESS) {
        let unitPrice = TEXT_PRICE;
        let totalCost = Web3.utils.toWei(((unitPrice * quantity).toFixed(2)).toString(), 'ether');
        tx = textContract.methods.mint(quantity).send({
          from: account,
          chainId: CHAIN_ID,
          value: totalCost,
        })
      }           
      // send tx
      tx.on('transactionHash', function(hash: any){
          setMintTxs([...mintTxs, {hash: hash, link: `https://etherscan.io/tx/${hash}`, status: 'pending'}]);
        })
        .on('receipt', function(receipt: any){
          setSuccessfulTxs([...successfulTxs, receipt.transactionHash]);
        })
        .on('confirmation', function(confirmationNumber: any, receipt: any){
          //
        })
        .on('error', function(error: any, receipt: any) {
          try {
            if (receipt) {
              setFailedTxs([...failedTxs, receipt.transactionHash]);
            } else {
              const data = JSON.parse(error.message.split('[ethjs-query] while formatting outputs from RPC ', 2)[1].split("'").join(''));
              const txHash: string = data.value.data.data.txHash;
              let inMintTxs: boolean = false;
              for (let i = 0; i < mintTxs.length; i++) {
                if (mintTxs[i].hash === txHash) {
                  inMintTxs = true;
                }
              }
              if (!inMintTxs) {
                setMintTxs([...mintTxs, {hash: txHash, link: `https://etherscan.io/tx/${txHash}`, status: 'pending'}]);
              }
              setFailedTxs([...failedTxs, txHash]);
            }
          } catch {};
        });
    } else {
      console.error('Contract or account not set, cannot mint!')
    }
  };

  return (
    <MainContainerStyles.Content>

      <MainContainerStyles.Row css={[MintStyles.mintRow]}>
        <NftCard mint={mint} mintIsActive={backgroundMintIsActive} maxQuantity={10} example={BackgroundExample} contractAddress={BGBYL_CONTRACT_ADDRESS} key='background' header='Backgrounds' description={backgroundDesc} cost={BACKGROUND_PRICE} minted={backgroundNumMinted} supply={BACKGROUND_SUPPLY} adjustableQuantity={true} openSeaLink='backgrounds-by-logo' />
        <NftCard mint={mint} mintIsActive={emoticonMintIsActive} maxQuantity={2} example={EmoticonExample} contractAddress={FGBL_CONTRACT_ADDRESS} key='emoticon' header='Emoticons' description={emoticonDesc} cost={EMOTICON_PRICE} minted={emoticonNumMinted} supply={EMOTICON_SUPPLY} adjustableQuantity={true} openSeaLink='emoticons-by-logo' />
        <NftCard mint={mint} mintIsActive={textMintIsActive} maxQuantity={2} example={TextExample} contractAddress={TBL_CONTRACT_ADDRESS} key='text' header='Text' description={textDesc} cost={TEXT_PRICE} minted={textNumMinted} supply={TEXT_SUPPLY} adjustableQuantity={true} openSeaLink='text-by-logo' />
        <NftCard mint={mint} mintIsActive={logoMintIsActive} maxQuantity={1} example={ContainerExample} contractAddress={LOGO_CONTRACT_ADDRESS} key='container' header='Logo Containers' description={logoDesc} cost={LOGO_PRICE} minted={logoNumMinted} supply={LOGO_SUPPLY} adjustableQuantity={false} openSeaLink='deglomerate-logos' />
      </MainContainerStyles.Row>

    </MainContainerStyles.Content>
  )
};

export { Mint };