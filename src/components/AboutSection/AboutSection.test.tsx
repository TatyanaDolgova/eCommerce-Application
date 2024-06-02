import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import AboutSection from './AboutSection';

test('renders the AboutSection component', () => {
  render(
    <BrowserRouter>
      <AboutSection />
    </BrowserRouter>,
  );

  const contentText =
    'Welcome to our online store of indoor plants, where beauty meets responsibility to nature! Each plant presented in our store is grown with care for the environment and your well-being. We work directly with environmentally conscious suppliers to provide you with the highest quality greenery for your home or office.';

  expect(screen.getByText(contentText)).toBeInTheDocument();
});
