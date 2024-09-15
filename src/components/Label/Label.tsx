function Label(props: LabelProps) {
  return (
    <label className={props.classes} htmlFor={props.for}>
      {props.text}
    </label>
  );
}

interface LabelProps {
  classes: string;
  for?: string;
  text: string;
}

export default Label;
