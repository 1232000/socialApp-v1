import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AuthContextProvider from './Context/AuthContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
   <AuthContextProvider>
    <App />
   </AuthContextProvider>, 
)
