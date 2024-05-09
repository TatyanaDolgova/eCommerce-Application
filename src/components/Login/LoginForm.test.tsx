import { render, screen } from '@testing-library/react';
import React from 'react';

import LoginForm from './LoginForm';

// test('should have password type by default', () => {
//   render(<LoginForm />);
//   const passwordInput = screen.getByPlaceholderText(/Type your password/i);

//   expect(passwordInput).toBeInTheDocument();
//   expect(passwordInput.getAttribute('type')).toBe('password');
// });

// test('should have text type after checking input', () => {
//   const result = render(<LoginForm />);
//   const passwordInput = result.container.querySelector('.show_password_input');

//   expect(passwordInput).toBeInTheDocument();
//   expect(passwordInput.getAttribute('type')).toBe('password');
// });
