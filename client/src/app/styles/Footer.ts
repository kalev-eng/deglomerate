/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';

export const hotPink = css`
  color: hotpink;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 40px;
  padding-bottom: 20px;
`;

export const FooterSection = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: flex-end;
`;

export const FooterLogo = styled.div`
  font-size: 40px;
  color: hotpink;
`;

export const FooterItem = styled.div`
  margin-left: 20px;
  font-size: 20px;
  color: lightgrey;
  &:hover {
    color: purple;
  }
  cursor: pointer;
`;