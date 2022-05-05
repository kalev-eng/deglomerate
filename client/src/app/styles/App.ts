
import { css } from '@emotion/react';
import styled from '@emotion/styled';


export const txt = css`
  font-family: VT323;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;

export const link = css`
  color: black;
  text-decoration: none;
  &:hover {
    color: #F5A318;
    border-color: #F5A318;
  }
  border-color: grey;
`;

export const linkDisabled = css`
  color: lightgrey;
  text-decoration: none;
  cursor: not-allowed;
  &:hover {
    color: lightgrey;
    border-color: grey;
    
  }
  border-color: grey;
`;

export const account = css`
  font-size: 20px;
`;