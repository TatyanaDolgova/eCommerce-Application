import './LoginPage.css';
import Header from '../../components/Header/Header';
import LoginForm from '../../components/Login/LoginForm';

export function LoginPage() {
  return (
    <>
      <Header></Header>
      <main className="login_page">
        <LoginForm classes="login_form"></LoginForm>
      </main>
    </>
  );
}
