import React from 'react';

interface Props {
  placeholder?: string;
  onSubmit?: any;
  hasError?: boolean;
  errorMessage?: string;
  buttonDisabled?: boolean;
  buttonText: string;
}

const Input: React.FunctionComponent<Props> = props => {
  const inputClass = `input is-large ${props.hasError && `is-danger`}`;
  return (
    <div>
      <div className="field has-addons">
        <input
          type="text"
          className={inputClass}
          placeholder={
            props.placeholder || 'Provide a transacion (PSET format)'
          }
        />
        <button
          className="button is-primary is-large"
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
