import React from 'react';

interface Props {
  inputPlaceholder?: string;
  inputText?: string;
  onSubmit?: any;
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
          value={props.inputText}
          className={inputClass}
          placeholder={
            props.inputPlaceholder || 'Provide a transacion (PSET format)'
          }
        />
        <button
          className="button is-primary is-medium"
          onClick={props.onSubmit}
          disabled={props.buttonDisabled || false}
        >
          <h1 className="title has-text-dark is-4">{props.buttonText}</h1>
        </button>
      </div>
      {props.hasError && (
        <div className="notification is-danger">{props.errorMessage}</div>
      )}
    </div>
  );
};

export default Input;
