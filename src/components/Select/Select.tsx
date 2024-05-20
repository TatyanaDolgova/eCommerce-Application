import './Select.css';

function CustomSelect(props: SelectProps) {
  return (
    <select className={props.classes} name={props.name} id={props.id}>
      <option value="">Please select an option</option>
      {props.options.map((opt) => {
        return <option value={opt}>{opt}</option>;
      })}
    </select>
  );
}

interface SelectProps {
  classes: string;
  id: string;
  name: string;
  options: Array<string>;
}
export default CustomSelect;
