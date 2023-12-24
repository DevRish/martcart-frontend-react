import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import webpack from 'webpack';
import { EsbuildPlugin } from 'esbuild-loader'; // minifier
import HtmlWebpackPlugin from 'html-webpack-plugin';

const env = dotenv.config().parsed;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envKeys = Object.keys(env || {}).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const config = {
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
          test: /\.(png|jp(e*)g|svg|gif|pdf)$/,
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

export default config;