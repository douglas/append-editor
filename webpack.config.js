const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProposalClassProperties = require('@babel/plugin-proposal-class-properties');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
  },
  entry: [
    path.resolve(__dirname, 'app/main.tsx'),
    path.resolve(__dirname, 'app/stylesheets/main.scss')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: './dist.js'
  },
  externals: {
    'filesafe-js': 'filesafe-js'
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    extensions: [".tsx", ".ts", '.js', '.jsx', '.css', '.scss'],
    alias: {
      stylekit: path.join(
        __dirname,
        'node_modules/sn-stylekit/dist/stylekit.css'
      )
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'app'),
        loader: [MiniCssExtractPlugin.loader, 'css-loader', 'style-loader!css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      { test: /\.tsx?$/, 
        use: ["ts-loader"], 
        exclude: /node_modules/ },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.js[x]?$/,
        include: [
          path.resolve(__dirname, 'app'),
          path.resolve(__dirname, 'node_modules/sn-components-api/dist/dist.js')
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env","@babel/preset-react"]
        },
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    //new CopyWebpackPlugin([{ from: './app/index.html', to: 'index.html' }])
  ]
};
