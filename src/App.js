import React, { useEffect } from 'react';
import auth from '@reducers/auth'
import {
    useInjectReducer,
    useInjectSaga,
} from "redux-injectors";
import mySaga from '@saga/auth'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "@components/Home/Home";

import 'antd/dist/reset.css';

function App({}) {
    useInjectReducer({ key: "Auth", reducer: auth });
    useInjectSaga({ key:'Auth', saga:mySaga });

    useEffect(()=>{
       console.log({appRendered: true});
    },[])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
        );
          
}
export default App;
