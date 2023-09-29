const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const { EsbuildPlugin } = require('esbuild-loader'); // minifier
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.js',
  },
  optimization: {
    minimizer: [
        new EsbuildPlugin({
            target: 'es2015'
        })
    ]
  },
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            loader: 'esbuild-loader',
            options: {
                loader: 'tsx',
                target: 'es2015'
            }
        },
        {
            test: /\.css$/i,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'esbuild-loader',
                    options: {
                        minify: true,
                    },
                },
            ],
        },
        {
          test: /\\.(png|jp(e*)g|svg|gif|pdf)$/,
          use: [ 'file-loader' ],
        }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new webpack.DefinePlugin(envKeys)
  ],
  devServer: {
    static: [
        {
          directory: path.join(__dirname, 'public'),
        },
        {
          directory: path.join(__dirname, 'src', 'assets'),
        },
      ],
    hot: 'only',
    port: 3000,
  },
  mode: 'development',
  resolve: {
    extensions: ['', '.js', '.ts', '.jsx', '.tsx', '.css'],
    modules: [
      'node_modules'
    ]        
  },
};