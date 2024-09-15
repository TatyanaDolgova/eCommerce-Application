import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import AboutUsPage from './AboutUsPage';

test('renders the collaboration section with title and description', () => {
  render(
    <BrowserRouter>
      <AboutUsPage />
    </BrowserRouter>,
  );
  const titleElement = screen.getByText(/Effective Collaboration/i);
  const descriptionElement = screen.getByText(
    /Our team collaborated effectively through regular meetings and code reviews/i,
  );

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});
