import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

try {
  const stored = localStorage.getItem('ejournal-theme')
  if (stored) {
    const { c1, c2, c3 } = JSON.parse(stored)
    const root = document.documentElement
    root.style.setProperty('--theme-color-1', c1)
    root.style.setProperty('--theme-color-2', c2)
    root.style.setProperty('--theme-color-3', c3)
  }
} catch (e) {}

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
