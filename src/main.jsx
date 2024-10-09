import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CartContextProvider from './store/Context.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </StrictMode>
);
