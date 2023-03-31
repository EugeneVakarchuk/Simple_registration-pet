import React from "react";
import * as ReactDOM from 'react-dom/client';
import App from "./App";
import "./normalize.css";
import "./index.less";
import { Provider } from "react-redux/es/exports";
import { setupStore } from './redux/store';

const el = document.getElementById('root') as HTMLElement;
if (el === null) throw new Error('Root container missing in index.html')

const store = setupStore()

const root = ReactDOM.createRoot(el)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)