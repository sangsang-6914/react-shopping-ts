import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import AuthContextProvider from './context/AuthContextProvider';

function App() {
  return (
    <>
      <AuthContextProvider>
        <NavBar />
        <Outlet />
      </AuthContextProvider>
    </>
  );
}

export default App;
