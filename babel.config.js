let cssLocalIdent;
if (process.env.NODE_ENV === 'production') {
  cssLocalIdent = '[hash:base64:6]';
} else {
  cssLocalIdent = '[path][name]___[local]___[hash:base64:6]';
}

const config = {
  presets: [
    ['@babel/preset-env', { targets: { 'browsers': ['> 1%', 'not dead', 'ie 11'] } }],
    '@babel/preset-react'
  ],
  plugins: [
    ['module-resolver', {
      extensions: ['.js', '.jsx'],
      root: [
        './src',
      ],
    }],
    '@babel/syntax-dynamic-import',
    [
      'inline-react-svg',
      {
        ignorePattern: '[/\/]assets[/\/]images'
      }
    ],
    '@babel/transform-runtime',
    ['react-css-modules', {
      context: './src',
      filetypes: {
        '.scss': {
          syntax: 'postcss-scss',
        },
      },
      generateScopedName: cssLocalIdent
    }],
  ]
};


module.exports = config;
