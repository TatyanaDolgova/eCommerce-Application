import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { LoginPage } from './pages/login/LoginPage';
import MainPage from './pages/MainPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
