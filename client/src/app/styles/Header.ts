/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';

export const hotPink = css`
  color: hotpink;
`;


export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-right: 40px;
  margin-bottom: 50px;
`;

export const HeaderSection = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: flex-end;
`;

export const HeaderLogo = styled.div`
  width: 400px;
  color: #d4b635;
  &:hover {
    color: purple;
  }
  cursor: pointer;
`;

export const HeaderItem = styled.div`
  margin-left: 20px;
  font-size: 40px;
`;