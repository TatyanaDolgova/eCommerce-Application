import { CustomerRepository } from '../../services/CustomerRepository';
import './AboutSection.css';

const AboutSection = () => {
  const testRequest = async () => {
    await CustomerRepository.sendTestRequest();
  };

  return (
    <section className="about">
      <div className="wrapper about-wrapper">
        <div className="about-container">
          Welcome to our online store of indoor plants, where beauty meets
          responsibility to nature! Each plant presented in our store is grown
          with care for the environment and your well-being. We work directly
          with environmentally conscious suppliers to provide you with the
          highest quality greenery for your home or office.
        </div>
        <button onClick={testRequest} className="test_button">
          TEST BUTTON
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
