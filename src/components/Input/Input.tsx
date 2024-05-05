function Input(props: InputProps) {
  return (
    <input
      className={props.classes}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.callback}
      id={props.id}
      name={props.name}
      required={props.required}
    ></input>
  );
}

interface InputProps {
  callback?: VoidFunction; //this might have to change to some other type of function
  classes: string;
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type: string;
}

export default Input;
