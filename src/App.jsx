import './App.css';
import { RouterProvider } from 'react-router-dom';
import {router} from "./Routing/AppRouting" ;
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './Context/AuthContext';
import {  QueryClient, QueryClientProvider} from '@tanstack/react-query'
function App() {

  const client = new QueryClient(
    { 
      defaultOptions:{
        queries:{
          staleTime:5000,
          QueryCache: 1000 * 60 * 5,
          refetchOnWindowFocus: false
        }
      }
    }
  );
  
  return (
    
    <AuthContextProvider>
      <QueryClientProvider client={client}>
        <Toaster/>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </AuthContextProvider>
    
  )
}

export default App
