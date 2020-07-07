import React from 'react';

interface Props {
  onClick?: any;
  disabled?: boolean;
}

const Button: React.FunctionComponent<Props> = props => (
  <button
    className="button is-primary is-medium"
    onClick={props.onClick}
    disabled={props.disabled || false}
  >
    <h1 className="title has-text-dark is-6">{props.children}</h1>
  </button>
);

export default Button;
