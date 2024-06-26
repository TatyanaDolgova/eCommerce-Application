import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PersonalInfo from './PersonalInfo';

test('should have first name label', () => {
  render(
    <BrowserRouter>
      <PersonalInfo />
    </BrowserRouter>,
  );

  const firstName = screen.getByText('First Name');

  expect(firstName).toBeInTheDocument();
});

test('should have last name label', () => {
  render(
    <BrowserRouter>
      <PersonalInfo />
    </BrowserRouter>,
  );

  const lastName = screen.getByText('Last Name');

  expect(lastName).toBeInTheDocument();
});

test('should have birthdate label', () => {
  render(
    <BrowserRouter>
      <PersonalInfo />
    </BrowserRouter>,
  );

  const birthDate = screen.getByText('Date of Birth');

  expect(birthDate).toBeInTheDocument();
});

test('should have email label', () => {
  render(
    <BrowserRouter>
      <PersonalInfo />
    </BrowserRouter>,
  );

  const email = screen.getByText('Email');

  expect(email).toBeInTheDocument();
});

test('should have an edit button', () => {
  render(
    <BrowserRouter>
      <PersonalInfo />
    </BrowserRouter>,
  );

  const edit = screen.getByText('Edit');

  expect(edit).toBeInTheDocument();
});

test('should have a change password button', () => {
  render(
    <BrowserRouter>
      <PersonalInfo />
    </BrowserRouter>,
  );

  const changePassword = screen.getByText('Change password');

  expect(changePassword).toBeInTheDocument();
});

test('should open a modal on edit button click', () => {
  render(
    <BrowserRouter>
      <PersonalInfo />
    </BrowserRouter>,
  );

  const edit = screen.getByText('Edit');

  fireEvent.click(edit);

  const modalHeading = screen.getByText('Edit Personal Information');

  expect(modalHeading).toBeInTheDocument();
});

test('should open a modal on change password button click', () => {
  render(
    <BrowserRouter>
      <PersonalInfo />
    </BrowserRouter>,
  );

  const changeBtn = screen.getByText('Change password');

  fireEvent.click(changeBtn);

  const label = screen.getByText('New Password');

  expect(label).toBeInTheDocument();
});

test('should close the modal on cancel button click', () => {
  render(
    <BrowserRouter>
      <PersonalInfo />
    </BrowserRouter>,
  );

  const changeBtn = screen.getByText('Change password');

  fireEvent.click(changeBtn);

  const label = screen.getByText('New Password');

  const cancel = screen.getByText('Cancel');

  fireEvent.click(cancel);

  expect(label).not.toBeInTheDocument();
});

test('should close the modal on x button click', () => {
  render(
    <BrowserRouter>
      <PersonalInfo />
    </BrowserRouter>,
  );

  const changeBtn = screen.getByText('Change password');

  fireEvent.click(changeBtn);

  const label = screen.getByText('New Password');

  const cancel = screen.getByText('X');

  fireEvent.click(cancel);

  expect(label).not.toBeInTheDocument();
});
