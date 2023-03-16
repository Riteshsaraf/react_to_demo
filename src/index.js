
import 'bootstrap';
import React from "react";
import ReactDOM from "react-dom/client";

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import {store, persistor} from './configure-store'
import App from "./App";
import 'antd/dist/reset.css';
import "./App.scss";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
             <App />
         </PersistGate>
     </Provider>
);