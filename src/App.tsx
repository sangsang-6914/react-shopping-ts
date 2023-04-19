import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import AuthContextProvider from './context/AuthContextProvider';

const client = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <NavBar />
          <Outlet />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
