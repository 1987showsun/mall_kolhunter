const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer      = require('autoprefixer');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { InjectManifest } = require('workbox-webpack-plugin');

const keyName= {};
let SETUP= {
  "NODE_ENV_DEV" : false
};

Object.keys(process.env).map((key, i) => {
  if (key.indexOf("NODE_ENV") == 0) {
    return (keyName[key] = process.env[key]);
  }
});
if( keyName['NODE_ENV']=='development' ){
  //SETUP.push({'NODE_ENV_DEV': true})
  SETUP['NODE_ENV_DEV'] = true;
  //SETUP = { ...SETUP, 'NODE_ENV_DEV': true }
}

const browserConfig = {
  entry: "./src/browser/index.js",
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, "")
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'postcss-loader',
              options: { plugins: [autoprefixer()] },
            },
          ],
        }),
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "public/css/[name].css"
    }),
    new webpack.DefinePlugin({
      "process.env": SETUP
    }),
    new CopyWebpackPlugin([
      { 
        from: "./src/server/public", 
        to: "public/assets"
      }
    ]),
    // new InjectManifest({
    //   swDest: './public/sw.js',
    //   swSrc: './src/sw-template.js',
    //   include: ['/app-shell', /\.js$/, /\.css$/],
    //   templatedUrls: {
    //     '/app-shell': new Date().toString(),
    //   },
    // }),
  ]
};

const serverConfig = {
  entry: "./src/server/index.js",
  target: "node",
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, ""),
          emit: false
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      }
    ]
  }
};

module.exports = [browserConfig, serverConfig];
