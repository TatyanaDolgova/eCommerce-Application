import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import RegistrationForm from '../../components/Registration/RegistrationForm';

const RegistrationPage = () => {
  return (
    <div>
      <Header></Header>
      <main className="login_page">
        <RegistrationForm></RegistrationForm>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;
