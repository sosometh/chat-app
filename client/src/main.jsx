import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ICI
import {io} from "socket.io-client"
// ici on choisit l'ip du réseau avec qui on veut se connecter en TCP (en LAN uniquement)
const socket = io("172.16.6.1:3000")

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>,
)
