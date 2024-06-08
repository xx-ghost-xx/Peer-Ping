// Importing the required modules
import React from 'react'
import ReactDOM from 'react-dom/client'
// /Importing the React App & it's assets
import App from './App.jsx'
import './index.css'

// Creating a ROOT element for a single paged app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
