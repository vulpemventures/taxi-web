import React from 'react';

interface Props {
  firstPlaceholder: string;
  secondPlaceholder: string;
  firstValue: number;
  secondValue: number;
  onFirstInputChange: any;
  onSecondInputChange: any;
  onSubmit?: any;
  buttonDisabled?: boolean;
  buttonText: string;
}

const FormWithButton: React.FunctionComponent<Props> = props => {
  const {
    firstPlaceholder,
    secondPlaceholder,
    firstValue,
    secondValue,
    onFirstInputChange,
    onSecondInputChange,
  } = props;
  return (
    <div>
      <div className="field">
        <label className="label has-text-white"> Inputs </label>
        <input
          type="number"
          min={1}
          value={firstValue}
          onChange={(e: any) => onFirstInputChange(Number(e.target.value))}
          className={'input is-medium'}
          placeholder={firstPlaceholder}
        />
      </div>
      <div className="field">
        <label className="label has-text-white"> Outputs </label>
        <input
          type="number"
          min={1}
          value={secondValue}
          onChange={(e: any) => onSecondInputChange(Number(e.target.value))}
          className={'input is-medium'}
          placeholder={secondPlaceholder}
        />
      </div>
      <button
        className="button is-primary is-medium is-fullwidth"
        onClick={props.onSubmit}
        disabled={props.buttonDisabled || false}
      >
        <h1 className="title has-text-dark is-4">{props.buttonText}</h1>
      </button>
    </div>
  );
};

export default FormWithButton;
