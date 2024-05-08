import './LoginForm.css';

import { CustomerSignin } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { customerRepository } from '../../services/CustomerRepository';
import { emailProps, passwordProps } from '../../utils/validation';
import Input from '../Input/Input';
import Label from '../Label/Label';

function LoginForm(props: LoginFormProps) {
  const [passwordInputType, setPasswordInputType] = useState('password');

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
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  async function submitLoginData(data: CustomerSignin) {
    console.log(data);
    const customerData: CustomerSignin = data;

    await customerRepository.createLoggedInCustomer(customerData);
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
      <Input classes="input submit_input" type="submit" value="Login"></Input>
    </form>
  );
}

interface LoginFormProps {
  classes?: string;
}

export default LoginForm;
