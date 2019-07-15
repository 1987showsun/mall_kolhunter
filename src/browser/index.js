import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter,Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// Store
import configureStore from "../shared/redux/store";

// Components
import App from "../shared/layout";

const store = configureStore( window.__initialData__ );

render(
  <Provider store={store}>
    <I18nextProvider i18n={ i18n }>
      <BrowserRouter>
        <Route component={App} />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>,
  document.getElementById("root")
);
