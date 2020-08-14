import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import LazyNavigation from './navigation'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App>
      <LazyNavigation />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
