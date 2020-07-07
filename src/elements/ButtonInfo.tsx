import React from 'react';

interface Props {
  onClick?: any;
}

const Button: React.FunctionComponent<Props> = props => (
  <button
    className="button is-dark"
    style={{ borderColor: '#fdfffc' }}
    onClick={props.onClick}
  >
    <h1 className="title is-5">{props.children}</h1>
  </button>
);

export default Button;
