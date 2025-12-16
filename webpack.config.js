import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/data', to: 'data' },
        { from: 'CNAME', to: './' },
        { from: '.htaccess', to: './' },
      ],
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    compress: true,
    open: true,
    // setupMiddlewares: (middlewares, devServer) => {
    //   devServer.app.use((req, res, next) => {
    //     const nonce = Math.random().toString(36).substr(2, 9);
    //     res.locals = res.locals || {};
    //     res.locals.nonce = nonce;
    //     res.set('Content-Security-Policy', `default-src 'self'; script-src 'self' 'strict-dynamic' 'nonce-${nonce}' https://pagead2.googlesyndication.com; frame-src https://www.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:;`);
    //     next();
    //   });
    //   return middlewares;
    // },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
};
