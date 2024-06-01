// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import React, { PropsWithChildren } from 'react';

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: PropsWithChildren) => (
    <div data-testid="swiper-testid">{children}</div>
  ),
  SwiperSlide: ({ children }: PropsWithChildren) => (
    <div data-testid="swiper-slide-testid">{children}</div>
  ),
}));

jest.mock('swiper/modules', () => ({
  Navigation: () => null,
  Pagination: () => null,
  Scrollbar: () => null,
  A11y: () => null,
}));
