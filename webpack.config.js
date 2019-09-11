const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Create template index.html
const MiniCSSExtractPlugin = require("mini-css-extract-plugin"); //Extracts compiled SASS->CSS into a file
const WebpackShellPlugin = require('webpack-shell-plugin'); //allows you to run any shell command before or after webpack builds. This will work for both webpack and webpack-dev-server.
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //Analyze webpack plugin size (Plugin)
//var glob = require("glob"); //Use the glob pattern to retieve all files in a defined location
//var CopyWebpackPlugin = require('copy-webpack-plugin'); //Copy files from a location to another location (Plugin)

module.exports = {
  mode: 'development',
  //mode: 'production',
  watch: true,
  externals: [{ //Add Jquery, Drupal, DrupalSettings here
    /*
    'lodash': {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    }*/
  }],
  //entry: glob.sync("./src/scripts/*.js"), //This would define multiple entry files in this location using Glob
  entry:  path.resolve(__dirname, 'assets/scripts/index.js'), //Entry Webpack file
  output: {
    filename: '[name].bundle.js', //Final Build file
    path: path.resolve(__dirname, 'dist') //The root Dir Webpack Build
  },
  resolve: { //Resolve paths for import statements
    alias: {
      //'@scss': path.resolve(__dirname, 'assets/style')
      //'@components': path.resolve(__dirname, '../src/components'),
      //'@scss': path.resolve(__dirname, '../src/scss'),
      //'@img': path.resolve(__dirname, '../src/img'),
      //'@': path.resolve(__dirname, '../src')
      '@COMPONENTS': path.resolve(__dirname, 'assets/components'), //If project has ES6 Components
      '@LODASH': path.resolve(__dirname, 'node_modules/lodash'),
      '@SCSS': path.resolve(__dirname,'assets/styles'), //Looks for all scss files in this directory
    },
    extensions: ['.js','.scss','.css'] //extensions to resolve within the import statements
  },
  plugins: [ //PLUGINS
    new MiniCSSExtractPlugin({
      filename: 'style.css', //Final CSS Build File
      ignoreOrder: false
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Template', //Change to Page Title
      myPageHeader: 'Header',
      template: 'template.html', //This file is a template for the dist/index.html file
      filename: 'index.html', //Final Build File (dist/index.html)
      hash: true, //Appends hash to script file to disable caching per reload
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
      minify: {
        removeComments: true,
        //collapseWhitespace: true
      },
    }),
    new BundleAnalyzerPlugin(), //Webpack bundle analyzer
    /*new CopyWebpackPlugin([
      {
        from: 'src/images',
        to: 'images'
      }
    ]),*/
    new WebpackShellPlugin({onBuildStart:['echo "Webpack Build Started"'], onBuildEnd:['echo "Webpack Build Ended"']})
  ],
  module: {
    rules: [{
      test: /(\.js|\.jsx)$/,
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, "assets/scripts")
      ],
      use: [{
        loader: 'babel-loader', //Add ES6 Support
        options: {
          // babel-loader options (if necessary)
        },
      }
    ],
    },{
      test: /(\.css|\.scss|\.sass)$/,
      include: [
        path.resolve(__dirname, "assets/styles") //Directory for sass files
      ],
      exclude: /(node_modules|bower_components)/,
      use: [{
          loader: MiniCSSExtractPlugin.loader
        },
        {
          //loader: 'style-loader' //The style loader takes CSS and actually inserts it into the page so that the styles are active on the page.
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS modules
        },
        {
          loader: 'postcss-loader', // Run post css actions
          options:{
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('autoprefixer')(/*options*/), //autoprefixes properties like "display:flex"
              ];
            }
          }
        },
        {
          loader: 'sass-loader' // compiles Sass to CSS
        }
      ]
    }/*,
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ["file-loader"]
    }*/
  ],
  },/* Dev Server Config
  devServer: {
    // The local filesystem directory where static html files
    // should be placed.
    // Put your main static html page containing the <script> tag
    // here to enjoy 'live-reloading'
    // E.g., if 'contentBase' is '../views', you can
    // put 'index.html' in '../views/main/index.html', and
    // it will be available at the url:
    //   https://localhost:9001/main/index.html
    contentBase: path.resolve(__dirname, 'dist'), //Location to server dev server files
    compress: true,
    // 'Live-reloading' happens when you make changes to code
    // dependency pointed to by 'entry' parameter explained earlier.
    // To make live-reloading happen even when changes are made
    // to the static html pages in 'contentBase', add 
    // 'watchContentBase'
    watchContentBase: true,
    port: 9000,
    // This is where webpack-dev-server serves your bundle
    // which is created in memory.
    // To use the in-memory bundle,
    // your <script> 'src' should point to the bundle
    // prefixed with the 'publicPath', e.g.:
    //   <script src='http://localhost:9001/assets/bundle.js'>
    //   </script>
    //publicPath: '/assets/',
     // Can be omitted unless you are using 'docker' 
     //**host: '0.0.0.0',
     overlay: { // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      warnings: false, // defaults to false
      errors: false, // defaults to false
    },
    proxy: [ // allows redirect of requests to webpack-dev-server to another destination
      {
        context: ['/api', '/auth'],  // can have multiple
        target: 'http://localhost:8080', // server and port to redirect to
        secure: false,
      },
    ],
  }*/
};