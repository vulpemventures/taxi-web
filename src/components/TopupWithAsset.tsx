import React, { useState } from 'react';
import ButtonPrimary from '../elements/ButtonPrimary';

//import InputWithButton from '../elements/InputWithButton';

interface Props {
  onError(message: string): void;
}

const TopupWithAsset: React.FunctionComponent<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onRequestClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    console.log(isLoading);
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="title is-3 mt-6">Top-up with Liquid Tether</h1>
      <p className="subtitle is-5 mt-3 mb-6">
        1. Request a partial signed transaction. This includes Liquid Bitcoin
        for the fees <br />
        2. Import in your wallet and adds your USDt inputs and outputs
        <br />
        3. Broadcats the final transaction to the network within 3 minutes.{' '}
        <br />
      </p>
      <div className="has-text-centered">
        <ButtonPrimary onClick={onRequestClick}>Request a Topup</ButtonPrimary>
      </div>
    </div>
  );
};

export default TopupWithAsset;
