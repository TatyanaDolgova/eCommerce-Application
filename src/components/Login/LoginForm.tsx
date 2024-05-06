import './LoginForm.css';

import { useForm } from 'react-hook-form';

import Input from '../Input/Input';
import Label from '../Label/Label';

function LoginForm(props: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function submitLoginData(data: object) {
    console.log(data);
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
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[\\-a-zA-z]+@[\\-a-zA-z]+.[\\-a-zA-z]+$/,
            message:
              'Email address must be properly formatted (e.g., user@example.com) and should not contain whitespace ',
          },
        })}
        className="input email_input"
        type="email"
        id="email_input"
        required={true}
        placeholder="Type your email"
      ></input>
      <p className="error_message">{errors.email?.message}</p>
      <Label classes="label" text="Password" for="password_input"></Label>
      <input
        {...register('password', {
          required: 'Password is required.',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long.',
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,25}$/,
            message:
              'Password must contain at least one uppercase and one lowercase letter, one digit and one special character.',
          },
        })}
        className="input password_input"
        type="password"
        id="password_input"
        required={true}
        placeholder="Type your password"
      ></input>
      <p className="error_message">{errors.password?.message}</p>
      <Input classes="input submit_input" type="submit" value="Login"></Input>
    </form>
  );
}

interface LoginFormProps {
  classes: string;
}

export default LoginForm;
