import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StateProvider } from './Context/StateContext.jsx'

createRoot(document.getElementById('root')).render(
  <StateProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </StateProvider>
)
