import babelPolyfill from 'babel-polyfill'
import {appConfig} from 'js/config'
import App from 'app/App'
import React from 'react'

if (!babelPolyfill) { alert('Error: babel-polyfill could not be detected') }
let root = document.createElement('div')
root.className = appConfig.rootClassName
document.body.appendChild(root)
React.render(<App />, root)
