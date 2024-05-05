import Input from '../Input/Input';

function LoginForm(props: LoginFormProps) {
  return (
    <form className={props.classes} onSubmit={props.callback}>
      <Input
        classes="email_input"
        type="email"
        required={true}
        placeholder="Type your email"
      ></Input>
      <Input
        classes="password_input"
        type="password"
        required={true}
        placeholder="Type your password"
      ></Input>
    </form>
  );
}

interface LoginFormProps {
  callback?: () => void;
  classes: string;
}

export default LoginForm;
