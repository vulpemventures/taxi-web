import React, { useState } from 'react';

import ButtonPrimary from './ButtonPrimary';
import ButtonInfo from './ButtonInfo';

interface Props {
  defaultIndex?: number;
  onChange: any;
  values: Array<string>;
}

const Button: React.FunctionComponent<Props> = props => {
  const [selected, setSelected] = useState(props.defaultIndex || 0);

  const onButtonClick = (index: number) => {
    // Do other stuff
    props.onChange(index);
    setSelected(index);
  };
  const buttons = props.values.map((v, index) => {
    if (selected === index)
      return <ButtonPrimary key={index}>{v}</ButtonPrimary>;

    return (
      <ButtonInfo key={index} onClick={() => onButtonClick(index)}>
        {v}
      </ButtonInfo>
    );
  });
  return <div className="buttons has-addons is-centered">{buttons}</div>;
};

export default Button;
