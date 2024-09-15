import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import HeroSection from './HeroSection';

test('renders HeroSection component correctly', () => {
  render(
    <BrowserRouter>
      <HeroSection />
    </BrowserRouter>,
  );

  const heroTitle = screen.getByText(/Don't panic, it's/i);

  expect(heroTitle).toBeInTheDocument();

  const highlightedSpan = screen.getByText(/Organic/i);

  expect(highlightedSpan).toBeInTheDocument();
  expect(highlightedSpan).toHaveClass('hero-title--high');
});
