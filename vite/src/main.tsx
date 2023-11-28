import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts';
import Snackbar from './Components/Snackbar.tsx';
import theme from './pages/theme.tsx';
import { ThemeProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Snackbar />
      <App />
    </Provider>
  </ThemeProvider>
)
