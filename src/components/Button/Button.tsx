import { MouseEventHandler } from 'react';

function BaseButton(props: ButtonProps) {
  return (
    <button
      className={props.classes}
      type={props.type}
      onClick={props.callback}
    >
      {props.text}
    </button>
  );
}

interface ButtonProps {
  callback?: MouseEventHandler;
  classes: string;
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
}

export default BaseButton;
