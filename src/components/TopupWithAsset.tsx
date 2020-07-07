import React, { useState } from 'react';
import { copyToClipboard } from 'copy-lite';

import InputWithButton from '../elements/InputWithButton';
import ButtonPrimary from '../elements/ButtonPrimary';
import ButtonInfo from '../elements/ButtonInfo';

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
  const [view, setView] = useState(1);
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
          Provide the partial transaction spending your Liquid assets. <br />
          Be sure to add enough L-USDt to cover fees (~ $0.5)
          <br />
        </p>
        <InputWithButton
          buttonText="Estimate"
          onSubmit={() => {
            setView(VIEW.CONFIRM);
            console.log('weee');
          }}
        />
      </div>
    );

  if (view === VIEW.CONFIRM)
    return (
      <div className="has-text-centered">
        <p className="subtitle is-6  mt-6 mb-6">Estimate</p>
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

        <div className="buttons is-centered">
          <ButtonPrimary onClick={() => setView(VIEW.RESULT)}>
            Confirm, I have enough to cover fees
          </ButtonPrimary>
          <ButtonInfo onClick={() => setView(VIEW.ESTIMATE)}>
            Provide different transaction
          </ButtonInfo>
        </div>
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
        <h1 className="title is-5 mt-3 mb-6">Topup successful</h1>
        <h1 className="title is-6 mt-6 has-text-left">Transaction with fees</h1>
        <InputWithButton
          buttonText={copySuccess.length > 0 ? copySuccess : 'Copy'}
          inputText={resultPset}
          onSubmit={() => copy(resultPset)}
        />
      </div>
    );
  return null;
};

export default Topup;
