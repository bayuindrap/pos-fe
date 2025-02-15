import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import mainStore from './redux/store/mainStore'
import 'core-js'

import App from './App'
import store from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={mainStore}>
    <App />
  </Provider>,
)
