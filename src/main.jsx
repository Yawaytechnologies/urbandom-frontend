// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store/store';
import { NavProvider } from './components/PropertyOverview/NavContext'; // ✅ Import NavProvider
import '../style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavProvider> {/* ✅ Wrap App here */}
          <App />
        </NavProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
