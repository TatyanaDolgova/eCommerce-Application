function Input(props: InputProps) {
  return (
    <input
      className={props.classes}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.callback}
      id={props.id}
      max={props.max}
      name={props.name}
      required={props.required}
      value={props.value}
      data-testid={props.dataTestId}
    ></input>
  );
}

interface InputProps {
  callback?: VoidFunction; //this might have to change to some other type of function
  classes: string;
  dataTestId?: string;
  id?: string;
  max?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type: string;
  value?: string;
}

export default Input;
