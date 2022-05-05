import React, {useEffect, useState} from 'react';


// redux data store
import * as app from './dal/data/app';
import { useSelector, useDispatch } from 'react-redux';
import { BGBYL_CONTRACT_ADDRESS, TBL_CONTRACT_ADDRESS, FGBL_CONTRACT_ADDRESS, LOGO_CONTRACT_ADDRESS, LOGO_DESCRIPTOR_CONTRACT_ADDRESS, SEARCH_CONTRACT_ADDRESS } from './dal/data/static';

// components
import { Header } from './components/common/Header';
import { MainContainer } from './components/common/MainContainer';
import { Footer } from './components/common/Footer';

// styles
import './App.css';

// web3
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

// abi
import LogosAbi from './logos.json';
import LogosDescriptorAbi from './logosDescriptor.json';
import SearchAbi from './logoSearcher.json';
import ERC721Abi from './erc721a.json';

function App() {
  const web3 = useSelector(app.selectWeb3);

  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const provider: any = await detectEthereumProvider();
      dispatch(app.setWeb3(new Web3(provider)));
    };
    init();
  }, []);

  // set contracts and metadata
  useEffect(() => {
    const init = async () => {
      try {
        if (web3 != null) {
          const logosAbi = JSON.parse(LogosAbi);
          dispatch(app.setLogoContract(new web3.eth.Contract(logosAbi, LOGO_CONTRACT_ADDRESS)));

          const logosDescriptorAbi = JSON.parse(LogosDescriptorAbi);
          dispatch(app.setLogoDescriptorContract(new web3.eth.Contract(logosDescriptorAbi, LOGO_DESCRIPTOR_CONTRACT_ADDRESS)));

          const erc721Abi = JSON.parse(ERC721Abi);
          dispatch(app.setBackgroundContract(new web3.eth.Contract(erc721Abi, BGBYL_CONTRACT_ADDRESS)));

          dispatch(app.setForegroundContract(new web3.eth.Contract(erc721Abi, FGBL_CONTRACT_ADDRESS)));

          dispatch(app.setTextContract(new web3.eth.Contract(erc721Abi, TBL_CONTRACT_ADDRESS)));

          const searchAbi = JSON.parse(SearchAbi);
          dispatch(app.setSearchContract(new web3.eth.Contract(searchAbi, SEARCH_CONTRACT_ADDRESS)));
        }
      } catch (err) {
        console.error('Error setting contract!');
      }
    };
    init();
  }, [web3]);

  return (
    <div className="App">
      <Header />
      <MainContainer />
      <Footer />
    </div>
  );
}

export default App;
