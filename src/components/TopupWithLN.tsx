import React from 'react';

import InputWithButton from '../elements/InputWithButton';

interface Props {}

const Topup: React.FunctionComponent<Props> = () => {
  return (
    <div>
      <h1 className="title is-3 mt-6">Top-up with Lightning Network</h1>
      <p className="subtitle is-5 mt-3 mb-6">
        1. Provide a transaction (PSET format) spending your Liquid assets{' '}
        <br />
        2. Pay the Lightning Network invoice <br />
        3. Once paid, we will add L-BTC fees on your behalf <br />
        4. Import the transaction in your wallet. It's ready to be signed
      </p>
      <InputWithButton
        buttonText="Top-up"
        onSubmit={() => console.log('clicked')}
      />
    </div>
  );
};

export default Topup;
