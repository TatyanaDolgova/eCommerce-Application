import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import AboutSection from '../components/AboutSection/AboutSection';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';
import { ctpClient } from '../services/commerceToolsService';

const MainPage = () => {
  const test = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('submit');

    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: 'ecommerce2024rss',
    });

    const createCustomer = () => {
      return apiRoot
        .customers()
        .post({
          // The CustomerDraft is the object within the body
          body: {
            firstName: 'Tatiana',
            lastName: 'Dolgova',
            email: 'sdk2@example.com',
            password: '123456',
          },
        })
        .execute();
    };

    createCustomer()
      .then(({ body }) => {
        console.log(body.customer.id);
      })
      .catch(console.error);
  };

  return (
    <>
      <Header></Header>
      <main>
        <HeroSection />
        <AboutSection />
        <button onClick={test}>Submit</button>
      </main>
    </>
  );
};

export default MainPage;
