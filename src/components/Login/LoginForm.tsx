import './LoginForm.css';

import {
  ByProjectKeyRequestBuilder,
  CustomerSignin,
} from '@commercetools/platform-sdk';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext, UserData } from '../../app-context/UserContext';
import { cartRepository } from '../../services/CardRepository';
import { CustomerRepository } from '../../services/CustomerRepository';
import { userTokenStorage } from '../../services/LocalStorage';
import { serverErrorMessages } from '../../utils/ErrorHandler';
import showToast from '../../utils/notifications';
import { emailProps, passwordProps } from '../../utils/validation';
import Input from '../Input/Input';
import Label from '../Label/Label';

interface LoginData {
  anonymousCartSignInMode?: string | undefined;
  anonymousId?: string | undefined;

  email: string;
  password: string;
}

function LoginForm(props: LoginFormProps) {
  const [passwordInputType, setPasswordInputType] = useState('password');
  const { updateState } = useContext(UserContext);

  const showPassword = () => {
    if (passwordInputType === 'password') {
      setPasswordInputType('text');
    } else {
      setPasswordInputType('password');
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
    const anonymousCart = await cartRepository.checkActiveCard();
    const loginData: LoginData = {
      email: data.email,
      password: data.password,
    };

    if (anonymousCart) {
      loginData.anonymousId = anonymousCart.anonymousId;
      loginData.anonymousCartSignInMode = 'MergeWithExistingcustomerCart';
    }
    const response = await CustomerRepository.createLoggedInCustomer(loginData);

    if (response instanceof Error) {
      CustomerRepository.createAnonymousCustomer();
      if (response.message === serverErrorMessages.loginError.errorMessage) {
        showToast(serverErrorMessages.loginError.userMessage, true);
      }
    } else {
      const userState: UserData = {
        loginStatus: true,
      };

      showToast('You are successfully logged in', false);
      updateState({ user: userState });
      userTokenStorage.setLoginState('true');
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
      <p>
        Don`t have an account?
        <Link className="register_link" to="/registration">
          Sign Up
        </Link>
      </p>
      <Label classes="label" text="Email" for="email_input"></Label>
      <input
        {...register('email', emailProps)}
        className="input email_input"
        type="email"
        id="email_input"
        required={true}
        placeholder="Enter your email"
      ></input>
      <p className="error_message" data-testid="email_error_message">
        {errors.email?.message}
      </p>
      <Label classes="label" text="Password" for="password_input"></Label>
      <div className="input_wrapper">
        <input
          {...register('password', passwordProps)}
          className="input password_input"
          type={passwordInputType}
          id="password_input"
          required={true}
          placeholder="Enter your password"
        ></input>
        <Input
          classes="input show_password_input"
          type="checkbox"
          dataTestId="password_checkbox"
          callback={showPassword}
        ></Input>
      </div>
      <p className="error_message" data-testid="password_error_message">
        {errors.password?.message}
      </p>
      <Input classes="input submit_input" type="submit" value="Login"></Input>
    </form>
  );
}

interface LoginFormProps {
  apiRoot?: ByProjectKeyRequestBuilder;

  classes?: string;
}

export default LoginForm;
