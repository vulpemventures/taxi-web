import React, { useState } from 'react';
import { copyToClipboard } from 'copy-lite';

import InputWithButton from '../elements/InputWithButton';
import FormWithButton from '../elements/FormWithButton';

const SuccessImage = require('../images/success.svg');

interface Props {}

/**
 * 
 *  2. Estimate the needed fee expressed in the given asset <br />
    3. Top-up the transaction: We will add L-BTC fees on your behalf <br />
    4. Import the transaction in your wallet. It's ready to be signed
 */

enum VIEW {
  ESTIMATE = 1,
  CONFIRM = 2,
  RESULT = 3,
}

const Topup: React.FunctionComponent<Props> = () => {
  const [view, setView] = useState(VIEW.ESTIMATE);
  const [showDetails, setShowDetails] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const copy = (value: string) => {
    copyToClipboard(value);
    setCopySuccess('✅ Copied!');
    setTimeout(() => setCopySuccess(''), 1500);
  };

  if (view === VIEW.ESTIMATE)
    return (
      <div>
        <h1 className="title is-3 mt-6">Top-up with L-USDt</h1>
        <p className="subtitle is-5 mt-3 mb-6">
          Provide the number of inputs and outputs of the transaction
          <br />
          Be sure to add an input with enough L-USDt to cover fees (~ $0.5)
          <br />
        </p>
        <FormWithButton
          firstPlaceholder="Number of inputs"
          secondPlaceholder="Number of outputs"
          onFirstInputChange={console.log}
          onSecondInputChange={console.log}
          buttonText="Estimate"
          onSubmit={() => setView(VIEW.CONFIRM)}
        />
      </div>
    );

  if (view === VIEW.CONFIRM)
    return (
      <div>
        <div className="has-text-centered">
          <p className="subtitle is-6  mt-6 mb-3">Taxi Fee</p>
          <h1 className="title is-3 mt-3">0.65 USDt</h1>
          <p className="subtitle is-6">
            {/* eslint-disable-next-line */}
            <a href="#" onClick={() => setShowDetails(!showDetails)}>{`${
              !showDetails ? `View` : `Hide`
            } details`}</a>
          </p>
          {showDetails && (
            <div className="notification is-warning">
              Network fees (L-BTC): 500 <br />
              Service fees (L-BTC): 50 <br />
              Total fees (L-BTC): 550 <hr />
              Total fees (L-USDt): 65853500
            </div>
          )}
        </div>

        <p className="subtitle is-5 mt-3 mb-3">
          Provide the unsigned transaction spending your Liquid assets. <br />
          Remember to subtract from the actual change the Taxi fee.
          <br />
        </p>

        <InputWithButton
          buttonText="Top-up"
          inputPlaceholder={'Provide a PSET (base64)'}
          onInputChange={console.log}
          onSubmit={() => {
            setView(VIEW.RESULT);
          }}
        />
      </div>
    );

  const resultPset = 'foobar';

  if (view === VIEW.RESULT)
    return (
      <div className="has-text-centered">
        <p className="subtitle is-6  mt-6 mb-6">ORDER #473838</p>
        <h1 className="title is-3 mt-6">0.65 USDt</h1>
        <p className="subtitle is-6">
          {/* eslint-disable-next-line */}
          <a href="#" onClick={() => setShowDetails(!showDetails)}>{`${
            !showDetails ? `View` : `Hide`
          } details`}</a>
        </p>
        {showDetails && (
          <div className="notification is-warning">
            Network fees (L-BTC): 500 <br />
            Service fees (L-BTC): 50 <br />
            Total fees (L-BTC): 550 <hr />
            Total fees (L-USDt): 65853500
          </div>
        )}
        <img src={SuccessImage} alt="Liquid Taxi Success" />
        <h1 className="title is-5 mt-3 mb-6">Topup successful</h1>
        <h1 className="title is-6 mt-6 has-text-left">Transaction with fees</h1>
        <InputWithButton
          buttonText={copySuccess.length > 0 ? copySuccess : 'Copy'}
          inputText={resultPset}
          onSubmit={() => copy(resultPset)}
        />
        <p className="subtitle is-6 mt-3">
          Import this transaction (PSET) in your Liquid wallet to sign and
          finalize the transfer of your Liquid Assets
        </p>
      </div>
    );
  return null;
};

export default Topup;
