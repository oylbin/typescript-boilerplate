import path from 'path';
import webpack from 'webpack';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';
import WebpackObfuscator from 'webpack-obfuscator';
// in case you run into any typescript error when configuring `devServer`
// import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: 'production',
  entry: {
    'wxlivespy-cli': path.resolve(__dirname, 'src', 'main.ts'),
    loader: path.resolve(__dirname, 'src', 'loader.ts'),
  },
  devtool: 'source-map',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  externals: {
    './wxlivespy-cli.js': 'commonjs ./wxlivespy-cli.js',
  },
  plugins: [
    new WebpackObfuscator(
      {
        rotateStringArray: true,
        sourceMap: true,
      },
      ['excluded_bundle_name.js'],
    ),
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'oylbin',
      project: 'wxlivespy-cli',
      telemetry: false,
    }),
  ],
};

export default config;
