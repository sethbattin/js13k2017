var webpack = require( "webpack" );
var path = require( "path" );

module.exports = [{
  context: path.resolve( __dirname ),
  output: {
    path: path.resolve( __dirname, "public" ),
    filename: "[name].js",
  },
  entry: {
    app: "./app.js",
  },
  devtool: "inline-source-map",
},
{
  context: path.resolve( __dirname ),
  output: {
    path: path.resolve( __dirname, "public" ),
    filename: "[name].min.js",
  },
  entry: {
    app: "./app.js",
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        drop_console: true,
        passes: 4,
      },
      mangle: {
        reserved: ["container"],
        topLevel: true,
      },
    }),
  ],
},];
