import React from 'react';
import ButtonPrimary from './ButtonPrimary';

interface Props {
  placeholder?: string;
  onSubmit?: any;
  buttonText: string;
}

const Input: React.FunctionComponent<Props> = props => (
  <div className="field has-addons">
    <input
      type="text"
      className="input"
      placeholder={props.placeholder || 'Provide a transacion (PSET format)'}
    />
    <ButtonPrimary onClick={props.onSubmit}>{props.buttonText}</ButtonPrimary>
  </div>
);

export default Input;
