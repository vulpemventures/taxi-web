import React from 'react';

interface Props {
  onClick?: any;
}

const Button: React.FunctionComponent<Props> = props => (
  <button className="button is-primary" onClick={props.onClick}>
    <h1 className="title has-text-dark is-5">{props.children}</h1>
  </button>
);

export default Button;
