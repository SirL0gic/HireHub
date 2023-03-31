import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter} from "react-router-dom";

import './index.css'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

//Styling
import "./App.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
)
