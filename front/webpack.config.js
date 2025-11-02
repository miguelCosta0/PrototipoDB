const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, ".env") });
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const rules = [
  {
    test: /\.html$/i,
    loader: "html-loader"
  },
  {
    test: /\.css|\.s(c|a)ss$/,
    use: [
      'style-loader',
      'css-loader',
      'resolve-url-loader',
      {
        loader: 'sass-loader',
        options: { sourceMap: true, api: 'modern' },
      },
    ],
  },
  {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  },
]

const app_config = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './src/app/app.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname,  "dist"),
  },
  module: { rules: rules },
  plugins: [ new webpack.DefinePlugin({ 'process.env': JSON.stringify(dotenv.parsed) }) ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [ new TsconfigPathsPlugin() ]
  }
};

module.exports = [app_config];
