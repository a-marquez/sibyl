({
  baseUrl: 'build/',
  name: 'js/main',
  out: 'dist/js/main.js',
  paths: {
    // cdn
    'esri': 'empty:',
    'dojo': 'empty:',
    'dijit': 'empty:',
    'dojox': 'empty:',

    // src
    'js': 'js',
    'app': 'js/app',
    'map': 'js/map',
    'atoms': 'js/atoms',
    'components': 'js/components',
    'utils': 'js/utils',
    'shim': 'shim',
    //'lib': 'lib'

    // vendor
    'alt': 'vendor/alt/dist/alt',
    'react': 'vendor/react/react.min',
    'react-dom': 'vendor/react/react-dom.min',

    // shim
    'babel-polyfill': 'shim/babel-polyfill/browser-polyfill',
    'fetch': 'shim/fetch/fetch'
  }
})
