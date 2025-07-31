import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from "./Routing/Router.jsx"
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <RouterProvider router={Router} />
    </Provider>
  </StrictMode>,
)
