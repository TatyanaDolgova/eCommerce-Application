import './LoginForm.css';

import {
  ByProjectKeyRequestBuilder,
  CustomerSignin,
} from '@commercetools/platform-sdk';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CustomerRepository } from '../../services/CustomerRepository';
import { emailProps, passwordProps } from '../../utils/validation';
import Input from '../Input/Input';
import Label from '../Label/Label';

function LoginForm(props: LoginFormProps) {
  const [passwordInputType, setPasswordInputType] = useState('password');
  const [ServerMessageError, setServerMessageError] = useState('');

  function showPassord() {
    if (passwordInputType === 'password') {
      setPasswordInputType('text');
    } else {
      setPasswordInputType('password');
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  async function submitLoginData(data: CustomerSignin) {
    const response = await CustomerRepository.createLoggedInCustomer(data);

    if (response instanceof Error) {
      console.log('Form error msg');
      console.log(response.message);
      setServerMessageError(response.message);
    }

    CustomerRepository.setLoggedApiRoot();
  }

  return (
    <form
      className={props.classes}
      onSubmit={handleSubmit(submitLoginData)}
      noValidate
    >
      <h1 className="page_title">Login</h1>
      <Label classes="label" text="Email" for="email_input"></Label>
      <input
        {...register('email', emailProps)}
        className="input email_input"
        type="email"
        id="email_input"
        required={true}
        placeholder="Type your email"
      ></input>
      <p className="error_message">{errors.email?.message}</p>
      <Label classes="label" text="Password" for="password_input"></Label>
      <div className="input_wrapper">
        <input
          {...register('password', passwordProps)}
          className="input password_input"
          type={passwordInputType}
          id="password_input"
          required={true}
          placeholder="Type your password"
        ></input>
        <Input
          classes="input show_password_input"
          type="checkbox"
          callback={showPassord}
        ></Input>
      </div>
      <p className="error_message">{errors.password?.message}</p>
      <p className="error_message">{ServerMessageError}</p>
      <Input classes="input submit_input" type="submit" value="Login"></Input>
    </form>
  );
}

interface LoginFormProps {
  apiRoot: ByProjectKeyRequestBuilder;

  classes?: string;
}

export default LoginForm;
