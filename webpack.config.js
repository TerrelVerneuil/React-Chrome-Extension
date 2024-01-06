const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './background.js', // Update this to your background script's path
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'background.bundle.js' // Output file
  },
  // Add babel-loader if you are using Babel
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
