import React from 'react';

interface Props {
  onClick?: any;
  disabled?: boolean;
}

const Button: React.FunctionComponent<Props> = props => (
  <button
    className="button is-dark is-medium"
    style={{ borderColor: '#fdfffc' }}
    disabled={props.disabled || false}
    onClick={props.onClick}
  >
    <h1 className="title is-6">{props.children}</h1>
  </button>
);

export default Button;
