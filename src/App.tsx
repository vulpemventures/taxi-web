import React from 'react';
import Layout from './Layout';

import InputWithButton from './elements/InputWithButton';
import ButtonRadio from './elements/ButtonRadio';

interface Props {}

const RADIO_VALUES = ['Pay with Liquid Tether', 'Pay with Lightning Network'];

const App: React.FunctionComponent<Props> = () => {
  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-6-desktop is-offset-3-desktop">
            <ButtonRadio onChange={console.log} values={RADIO_VALUES} />
            <h1 className="title is-3 mt-6">Liquid Top-up service</h1>
            <p className="subtitle is-5 mt-3 mb-6">
              1. Provide a transaction (PSET format) spending your Liquid assets{' '}
              <br />
              2. We will add L-BTC fees on your behalf <br />
              3. Import the transaction in your wallet. It's ready to be signed
            </p>
            <InputWithButton
              buttonText="Top-up"
              onSubmit={() => console.log('clicked')}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
