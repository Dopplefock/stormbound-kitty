import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import './index.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: () => console.log('Service worker updated.'),
  onSuccess: () => console.log('Service worker installed.')
})
