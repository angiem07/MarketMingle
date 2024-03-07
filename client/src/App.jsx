import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex-column justify-center align-center min-100-vh bg-primary">
      <Outlet />
    </div>
  );
}

export default App;
