/** @jsxImportSource @emotion/react */
// react
import React, {useEffect, useState} from 'react';
import { Routes, Route } from "react-router-dom";

// components
import { Mint } from '../mint/Mint';
import { Configure } from '../configure/Configure';
import { Rolodex } from '../rolodex/Rolodex';
import { Terms } from './Terms';

interface Props {};

function MainContainer(props: Props)  {
  return (
    <Routes>
      <Route path="/" element={<Mint />} />
      <Route path="/logo" element={<Mint />} />
      <Route path="configure" element={<Configure />} />
      <Route path="rolodex" element={<Rolodex />} />
      <Route path="terms" element={<Terms />} />
    </Routes>
  )
};

export { MainContainer };

/*
// redux starter
const dispatch = useDispatch();
const stringThing = useSelector(app.selectStringThing);
const loadStringThing = () => {
dispatch(app.loadSomething());
};
*/