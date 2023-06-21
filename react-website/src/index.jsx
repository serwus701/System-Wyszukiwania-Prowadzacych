import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();
ReactDOM.render(
    
    <React.StrictMode>
        <QueryClientProvider client={client}>
        <App />
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);