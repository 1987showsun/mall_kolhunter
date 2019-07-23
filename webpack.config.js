const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer      = require('autoprefixer');
const proxy = require('http-proxy-middleware');

const keyName= {};
let SETUP= {};

Object.keys(process.env).map((key, i) => {
  if (key.indexOf("NODE_ENV") == 0) {
    return (keyName[key] = process.env[key]);
  }
});
if( keyName['NODE_ENV']=='development' ){
  SETUP = { ...SETUP, 'NODE_ENV_DEV': true }
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
        //use: ['babel-loader', 'eslint-loader'],
        query: { presets: ["react-app"] }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "public/css/[name].css?t=1231231"
    }),
    new webpack.DefinePlugin({
      "process.env": SETUP
    }),
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
        //use: ['babel-loader', 'eslint-loader'],
        query: { presets: ["react-app"] }
      }
    ]
  }
};

module.exports = [browserConfig, serverConfig];
