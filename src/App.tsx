import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { LoginPage } from './pages/login/LoginPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import RegistrationPage from './pages/registration/RegistrationPage';
import { CustomerRepository } from './services/CustomerRepository';
import { RouteGuard } from './utils/RouteGuard';

function App() {
  const apiRoot = CustomerRepository.createAnonimusCustomer();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route
          path="/login"
          element={
            <RouteGuard>
              <LoginPage apiRoot={apiRoot} />
            </RouteGuard>
          }
        />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
