import React from 'react';

interface Props {
  inputPlaceholder?: string;
  inputText?: string;
  onButtonClick?: any;
  onInputChange?: any;
  hasError?: boolean;
  errorMessage?: string;
  buttonDisabled?: boolean;
  buttonText: string;
}

const Input: React.FunctionComponent<Props> = props => {
  const inputClass = `input is-medium ${props.hasError && `is-danger`}`;
  return (
    <div>
      <div className="field has-addons">
        <input
          type="text"
          readOnly={props.inputText ? true : false}
          defaultValue={props.inputText}
          onChange={(e: any) => props.onInputChange(e.target.value)}
          className={inputClass}
          placeholder={props.inputPlaceholder}
        />
        <button
          className="button is-primary is-medium"
          onClick={props.onButtonClick}
          disabled={props.buttonDisabled || false}
        >
          <h1 className="title has-text-dark is-6">{props.buttonText}</h1>
        </button>
      </div>
      {props.hasError && (
        <div className="notification is-danger">{props.errorMessage}</div>
      )}
    </div>
  );
};

export default Input;
