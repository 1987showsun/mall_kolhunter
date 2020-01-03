/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import express                            from "express";
import path                               from 'path';
import cors                               from "cors";
import React                              from "react";
import logger                             from "morgan";
import { renderToString }                 from "react-dom/server";
import { Provider }                       from "react-redux";
import { StaticRouter, matchPath, Route } from "react-router-dom";
import { Helmet }                         from "react-helmet";
import serialize                          from "serialize-javascript";
import configureStore                     from "../shared/redux/store";
import routes                             from "../shared/routers";
import App                                from "../shared/layout";
import "source-map-support/register";

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.static("public"));
app.set('/views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.all("*", (req, res, next) => {
  const store    = configureStore();
  const promises = routes.reduce((acc, route) => {
    if (matchPath(req.path, route) && route.component && route.component.initialAction) {
      acc.push(
        Promise.resolve(
          store.dispatch(route.component.initialAction(req.path,req.query)),
        )
      );
    }
    return acc;
  }, []);

  Promise.all(promises)
    .then(() => {
      const context = {};
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Route component={App} />
          </StaticRouter>
        </Provider>
      );

      const initialData = store.getState();
      const helmet      = Helmet.renderStatic();
      const date        = new Date().valueOf();
      
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="theme-color" content="#131722">
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="google-site-verification" content="dGVuJ2TR7aWJiIUs1o9I0byFSR2Sc9MGEqJnNhGK9Uc" />
            <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no">
            <meta name="apple-mobile-web-app-title" content="Musik">
            <meta http-equiv="Content-Language" content="zh-TW">
            <meta name="author" content="Sun Li">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            <link rel="stylesheet" href="/css/main.css">
            <link rel="shortcut icon" href="/assets/images/favicon.ico">
            <link rel="apple-touch-icon" sizes="512x512" href="/assets/images/appIcon512.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/assets/images/appIcon120.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/assets/images/appIcon114.png" />
            <link rel="apple-touch-icon" sizes="57x57" href="/assets/images/appIcon57.png" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300i,400,400i,500,500i,700,700i,900,900i&display=swap" rel="stylesheet">
            <link rel="manifest" href="/assets/manifest.json">

            <script src="/bundle.js" defer></script>
            <script>window.__initialData__ = ${serialize(initialData)}</script>

            <!-- Global site tag (gtag.js) - Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-132884770-2"></script>
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-132884770-2');
            </script>
            
            <!-- Hotjar Tracking Code for http://mall.kolhunter.com/ -->
            <script>
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:1618665,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            </script>
          </head>

          <body>
            <div id="root">${markup}</div>
          </body>
        </html>
      `);
    })
    .catch(next);
});

app.use('/site/404', (req, res, next) =>{
  res.status(404);
  next();
});

app.use('/site/502', (req, res, next) =>{
  res.status(502);
  next();
});

app.use((err, req, res, next) => {
  res.status(500);
  //res.send('Something broke!');
  res.render('err500',{aaa:'123'});
});

// http
app.listen(process.env.PORT || 8080, () => {
  console.log("Server is listening");
});