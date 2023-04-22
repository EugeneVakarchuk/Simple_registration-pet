import React from "react";
import * as ReactDOM from 'react-dom/client';
import App from "./App";
import "./normalize.css";
import "./index.less";
import { Provider } from "react-redux/es/exports";
import { setupStore } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

// Check if there is div with id 'root' in index.html file.
const el = document.getElementById('root') as HTMLElement;
if (el === null) throw new Error('Root container missing in index.html');

// Create redux store.
const store = setupStore();

// Create and render root element.
const root = ReactDOM.createRoot(el)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)