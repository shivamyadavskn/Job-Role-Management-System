import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const RootApp = () => {
  const themeMode = useSelector((state: RootState) => state.ui.themeMode);
  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RootApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


