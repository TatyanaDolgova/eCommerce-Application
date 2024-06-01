import { render, screen } from '@testing-library/react';

import HeroSection from './HeroSection';

test('renders HeroSection component correctly', () => {
  render(<HeroSection />);
  const heroSection = screen.getByTestId('hero-section');

  expect(heroSection).toBeInTheDocument();

  const heroTitle = screen.getByText(/Don't panic, it's/i);

  expect(heroTitle).toBeInTheDocument();

  const highlightedSpan = screen.getByText(/Organic/i);

  expect(highlightedSpan).toBeInTheDocument();
  expect(highlightedSpan).toHaveClass('hero-title--high');
});
