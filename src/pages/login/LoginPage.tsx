import './LoginPage.css';
import Header from '../../components/Header/Header';
import LoginForm from '../../components/Login/LoginForm';

export function LoginPage() {
  return (
    <div className="login_page">
      <Header></Header>
      <LoginForm classes="login_form"></LoginForm>
    </div>
  );
}
