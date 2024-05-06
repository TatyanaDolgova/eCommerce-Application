import './LoginForm.css';

import { FormEvent, useState } from 'react';

import { validateLoginForm } from '../../utils/validation';
import Input from '../Input/Input';
import Label from '../Label/Label';

function LoginForm(props: LoginFormProps) {
  const [errorMessage, showErrorMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const emailInput = target[0] as HTMLInputElement;
    const email = emailInput.value;
    const passwordInput = target[1] as HTMLInputElement;
    const password = passwordInput.value;

    const message = validateLoginForm(email, password);

    if (message) {
      showErrorMessage(message);
    }
  }

  return (
    <form className={props.classes} onSubmit={handleSubmit} noValidate>
      <h1 className="page_title">Login</h1>
      <Label classes="label" text="Email" for="email_input"></Label>
      <Input
        classes="input email_input"
        type="email"
        id="email_input"
        required={true}
        placeholder="Type your email"
      ></Input>
      <Label classes="label" text="Password" for="password_input"></Label>
      <Input
        classes="input password_input"
        type="password"
        id="password_input"
        required={true}
        placeholder="Type your password"
      ></Input>
      <p className="error">{errorMessage}</p>
      <Input classes="input submit_input" type="submit" value="Login"></Input>
    </form>
  );
}

interface LoginFormProps {
  classes: string;
}

export default LoginForm;
