import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../strengths-assessment.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
