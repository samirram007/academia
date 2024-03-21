import React from 'react'
import ReactDOM from 'react-dom/client'


import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, ThemeProvider } from './contexts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './i18n.js';
import Router from './Routes/router.jsx'
import './assets/global.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './utils/queryClient';
import { FormModalProvider } from './contexts/FormModalProvider';

const toastOption = {}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FormModalProvider>
          <AuthProvider>
            <Router />
            <ToastContainer position="bottom-center"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={true}
              theme="dark" />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </FormModalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
