import Header from '../components/Header/Header';
import RegistrationForm from '../components/Registration/RegistrationForm';

const RegistrationPage = () => {
  return (
    <div>
      <Header></Header>
      <main className="login_page">
        <RegistrationForm></RegistrationForm>
      </main>
    </div>
  );
};

export default RegistrationPage;
