import './LoginForm.css';

import {
  ByProjectKeyRequestBuilder,
  CustomerSignin,
} from '@commercetools/platform-sdk';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { UserContext, UserData } from '../../app-context/UserContext';
import { CustomerRepository } from '../../services/CustomerRepository';
import { serverErrorMessages } from '../../utils/ErrorHandler';
import { emailProps, passwordProps } from '../../utils/validation';
import Input from '../Input/Input';
import Label from '../Label/Label';

function LoginForm(props: LoginFormProps) {
  const [passwordInputType, setPasswordInputType] = useState('password');
  const [serverMessageError, setServerMessageError] = useState('');
  const { updateState } = useContext(UserContext);

  const showPassord = () => {
    if (passwordInputType === 'password') {
      setPasswordInputType('text');
    } else {
      setPasswordInputType('password');
    }
  };

  const clearServerMessageError = () => {
    if (serverMessageError) {
      setServerMessageError('');
    }
  };

  const navigate = useNavigate();
  const redirectToMain = () => navigate('/home');

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
      if (response.message === serverErrorMessages.loginError.errorMessage) {
        setServerMessageError(serverErrorMessages.loginError.userMessage);
      }
    } else {
      const userState: UserData = {
        loginStatus: true,
      };

      updateState({ user: userState });
      redirectToMain();
    }
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
        onInput={clearServerMessageError}
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
          onInput={clearServerMessageError}
        ></input>
        <Input
          classes="input show_password_input"
          type="checkbox"
          callback={showPassord}
        ></Input>
      </div>
      <p className="error_message">{errors.password?.message}</p>
      <p className="error_message">{serverMessageError}</p>
      <Input classes="input submit_input" type="submit" value="Login"></Input>
    </form>
  );
}

interface LoginFormProps {
  apiRoot?: ByProjectKeyRequestBuilder;

  classes?: string;
}

export default LoginForm;
