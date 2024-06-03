import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

test('should render home page', () => {
  render(<App />);
  const heroSection = screen.getByText(/Don't panic/i);

  expect(heroSection).toBeInTheDocument();
});
