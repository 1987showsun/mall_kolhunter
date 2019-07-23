import express from "express";
import cors from "cors";
import fs from "fs";
import React from "react";
import logger from "morgan";
import http2 from "spdy";
import https from "https";
import path from "path";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter, matchPath, Route, Switch, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import serialize from "serialize-javascript";
import configureStore from "../shared/redux/store";
import routes from "../shared/routers";
import App from "../shared/layout";
import "source-map-support/register";

const app = express();
const httpsOptions = {
  //cert: fs.readFileSync( path.join('public/ssl/localhost.pem') ),
  //key: fs.readFileSync( path.join('public/ssl/localhost-key.pem') ),
  cert: fs.readFileSync( path.join('public/ssl/localhost-new.pem') ),
  key: fs.readFileSync( path.join('public/ssl/localhost-new-key.pem') ),
  requestCert: false,
  rejectUnauthorized: false
}

app.use(logger('dev'));
app.use(cors());
app.use(express.static( path.join('public') ));

app.all('*', function(req, res, next) {
  const _lang = req.headers['accept-language'].split(',')[0];
  console.log( req.headers["accept-language"] )
  const store = configureStore();
  const promises = routes.reduce((acc, route) => {
    if (matchPath(req.path, route) && route.component && route.component.initialAction) {
      acc.push(
        Promise.resolve(
          store.dispatch(route.component.initialAction(req.path,req.query,_lang)),
        )
      );
    }
    return acc;
  }, []);

  Promise.all(promises)
    .then((data,qw) => {
      const context = {};
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Route component={App} ddd="123"/>
          </StaticRouter>
        </Provider>
      );
      
      const initialData    = store.getState();
      const helmet         = Helmet.renderStatic();
      let date = new Date().valueOf();
      
      res.send(`
        <!DOCTYPE html>
        <html lang="zh-TW" ${helmet.htmlAttributes.toString()}>
          <head>
            <meta charset="utf-8">
            <meta name="theme-color" content="#131722">
            <meta name="robots" content="none , noarchive, nosnippet, noimageindex, notranslate">
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no">
            <meta name="apple-mobile-web-app-title" content="Musik">
            <meta http-equiv="Content-Language" content="zh-TW">
            <meta name="author" content="Sun Li">
            <meta name="description" content="">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            <link rel="stylesheet" href="/css/main.css?t=${date}">
            <link rel="shortcut icon" href="/images/favicon.ico">
            <link rel="apple-touch-icon" href="/images/app_logo.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/images/app_logo.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/images/app_logo.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/images/app_logo.png" />
            <link rel="manifest" href="/manifest.json">
          </head>

          <body>
            <div id="root">${markup}</div>
          </body>
          <script src="/bundle.js" defer></script>
          <script>window.__initialData__ = ${serialize(initialData)}</script>
        </html>
      `);
    })
    .catch( next );
});

// http
app.listen(process.env.PORT || 8080, () => {
  console.log("Server is listening");
});

// https
// https.createServer( httpsOptions,app ).listen(8080, (err) => {
//   if (err) {
//       throw new Error( 'err ---->', err);
//   }
// });
