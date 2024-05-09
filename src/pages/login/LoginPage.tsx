import './LoginPage.css';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import Header from '../../components/Header/Header';
import LoginForm from '../../components/Login/LoginForm';

interface LoginPageProps {
  apiRoot: ByProjectKeyRequestBuilder;
}

export const LoginPage = (props: LoginPageProps) => {
  return (
    <>
      <Header></Header>
      <main className="login_page">
        <LoginForm classes="login_form" apiRoot={props.apiRoot}></LoginForm>
      </main>
    </>
  );
};
