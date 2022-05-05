/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from "react-router-dom";

// components
import { Connect } from './Connect'

// styles
import * as HeaderStyles from '../../styles/Header';
import * as AppStyles from '../../styles/App';

// assets
import Logo from "../../../assets/logo.svg"

interface Props {};

function Header(props: Props)  {

    return (
      <HeaderStyles.Header>
        <HeaderStyles.HeaderSection>
          <HeaderStyles.HeaderLogo>
            <Link to="/"><img src={Logo} alt="logo" css={[]}/></Link>
          </HeaderStyles.HeaderLogo>
        </HeaderStyles.HeaderSection>
        <HeaderStyles.HeaderSection>
          <HeaderStyles.HeaderItem>
            <Link css={[AppStyles.txt, AppStyles.link]} to="/">Mint</Link>
          </HeaderStyles.HeaderItem>
          <HeaderStyles.HeaderItem>
            <Link css={[AppStyles.txt, AppStyles.link]} to="/configure">Configure</Link>
          </HeaderStyles.HeaderItem>
          <HeaderStyles.HeaderItem>
              <Link css={[AppStyles.txt, AppStyles.link]} to="/rolodex">Rolodex</Link>
          </HeaderStyles.HeaderItem>
          <HeaderStyles.HeaderItem>
            <Connect />
          </HeaderStyles.HeaderItem>
        </HeaderStyles.HeaderSection>
      </HeaderStyles.Header>
    )
};

export { Header };