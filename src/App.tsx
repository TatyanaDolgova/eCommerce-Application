import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import CatalogPage from './pages/catalog/CatalogPage';
import DetailedProductPage from './pages/detailedProductPage/DetailedProductPage';
import { LoginPage } from './pages/login/LoginPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import RegistrationPage from './pages/registration/RegistrationPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import { CustomerRepository } from './services/CustomerRepository';
import { userTokenStorage } from './services/LocalStorage';
import { productRepository } from './services/ProductRepository';
import { RouteGuard, RouteGuardLoggedIn } from './utils/RouteGuard';

function App() {
  const tokens = userTokenStorage.getTokens();
  let apiRoot;

  if (tokens?.refreshToken) {
    CustomerRepository.refreshCustomer(tokens.refreshToken);
  } else {
    apiRoot = CustomerRepository.createAnonymousCustomer();
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route
          path="/catalog/:ProductSlug"
          element={
            <DetailedProductPage productRepository={productRepository} />
          }
        />
        <Route
          path="/login"
          element={
            <RouteGuard>
              <LoginPage apiRoot={apiRoot} />
            </RouteGuard>
          }
        />
        <Route
          path="/registration"
          element={
            <RouteGuard>
              <RegistrationPage />
            </RouteGuard>
          }
        />
        <Route
          path="/userprofile"
          element={
            <RouteGuardLoggedIn>
              <UserProfilePage />
            </RouteGuardLoggedIn>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
