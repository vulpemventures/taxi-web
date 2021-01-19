import React from 'react';

const Button: React.FunctionComponent<{}> = props => (
  <button className="button is-grey is-medium" disabled>
    <h1 className="title is-6 has-text-dark">{props.children}</h1>
  </button>
);

export default Button;
