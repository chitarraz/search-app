import React from 'react';
import ReactDOM from 'react-dom/client';
// store
import { Provider } from 'react-redux';
import { store } from './store/index.tsx';
// css
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import "./assets/css/general.scss";
import './index.css';
// main
import App from './App.tsx';

const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans'
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <App />
        </Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
