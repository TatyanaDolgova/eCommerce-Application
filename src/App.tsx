import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { LoginPage } from './pages/login/LoginPage';
import MainPage from './pages/MainPage';
import RegistrationPage from './pages/RegistrationPage';
import CtpClient from './services/CtpClient';
import { CustomerRepository } from './services/CustomerRepository';

function App() {
  const apiRoot = CustomerRepository.createAnonimusCustomer();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="/login" element={<LoginPage apiRoot={apiRoot} />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
