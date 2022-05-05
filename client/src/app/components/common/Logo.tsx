/** @jsxImportSource @emotion/react */
// react
import React, {useEffect, useState} from 'react';

// redux data store
import * as app from '../../dal/data/app';
import { useSelector } from 'react-redux';

// styles
import {Skeleton} from '@mui/material';

import SVG, { Props as SVGProps } from 'react-inlinesvg';

interface Props {
  logoConfig: Object

};

function Logo(props: Props)  {
  const [logo, setLogo] = useState<string>('');
  
  const logoContract = useSelector(app.selectLogoContract);

  useEffect(() => {
    const getLogoExample = async () => {
      if (logoContract) {
        setLogo('');
        let svg = await logoContract.methods.getLogoSvg(props.logoConfig).call();
        setLogo(svg);
      }
    };
    getLogoExample();
  }, [logoContract, props.logoConfig]);
  
  
  return (
    <div>
      { logo !== '' ? 
        <SVG src={logo} width="724px" title="Menu" />
          :
        <Skeleton variant="rectangular" width={724} height={724} />
      }
    </div>
  )
};

export { Logo };
