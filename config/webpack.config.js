const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

const config = {
  // "production" | "development" | "none"
  mode: 'production',
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: {
    main: [
      `${srcDir}/app.js`,
      '@babel/polyfill',
      `${srcDir}/styles/style.scss`
    ]
  },
  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: distDir, // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "assets/js/[name].[hash].js", // string
    // the filename template for entry chunks
    publicPath: '',
    // publicPath: "/assets/", // string
    // the url to the output directory resolved relative to the HTML page
    // library: "MyLibrary", // string,
    // the name of the exported library
    // libraryTarget: "umd", // universal module definition
    // the type of the exported library
    /* Advanced output configuration (click to show) */
    /* Expert output configuration (on own risk) */
  },
  // Configuration Alias
  resolve: {
    alias: {
      node_modules: path.resolve(__dirname, 'node_modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        // test: /\.s[ac]ss$/i,
        use: [
          /*
          // Creates `style` nodes from JS strings
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production'

            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
           */
          {
            loader: MiniCssExtractPlugin.loader
          },
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 1
            },
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'postcss-loader'
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // Images files
      {
        test: /\.(png|jp(e*)g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              outputPath: 'assets/images',
              name: '[name].[ext]'
            }
          }
        ]
      },
      // Fonts files
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              outputPath: 'assets/fonts',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'assets/css/[name].[hash].css',
      chunkFilename: 'assets/css/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.php`,
      filename: 'index.php',
      title: 'F1RST Business Coach test',
      // inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        // removeRedundantAttributes: true,
        // removeScriptTypeAttributes: true,
        // removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
    }),
    new CopyPlugin([
      { from: `${srcDir}/includes`, to: `${distDir}/includes` },
      { from: `${srcDir}/assets/images/favicon.ico`, to: `${distDir}/assets/images/favicon.ico` },
      { from: `${srcDir}/assets/images/favicon.png`, to: `${distDir}/assets/images/favicon.png` },
    ]),
  ],
};

module.exports = config;
