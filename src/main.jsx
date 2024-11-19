import React from 'react';
import ReactDOM from 'react-dom/client';


import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/global.css';
import { AuthProvider, ThemeProvider } from './contexts';
import { FormModalProvider } from './contexts/FormModalProvider';
import './i18n.js';
import PlayGround from './PlayGround';
import { queryClient } from './utils/queryClient';

const toastOption = {}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FormModalProvider>
          <AuthProvider>
            {/* <Router /> */}
            <BrowserRouter>

              <PlayGround />

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
            </BrowserRouter>

          </AuthProvider>
        </FormModalProvider>
      </ThemeProvider>
    </QueryClientProvider>

  </React.StrictMode>,
)
