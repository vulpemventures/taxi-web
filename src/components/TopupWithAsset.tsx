import React, { useState } from 'react';
import { copyToClipboard } from 'copy-lite';

import InputWithButton from '../elements/InputWithButton';
import FormWithButton from '../elements/FormWithButton';

import { estimateFees } from '../actions';

const SuccessImage = require('../images/success.png');

interface Props {}

enum VIEW {
  ESTIMATE = 1,
  CONFIRM = 2,
  RESULT = 3,
}

const Topup: React.FunctionComponent<Props> = () => {
  const [view, setView] = useState(VIEW.ESTIMATE);

  const [ins, setIns] = useState(1);
  const [outs, setOuts] = useState(1);
  const [estimate, setEstimate] = useState({
    breakdown: {
      fee: '',
      sat_per_byte: 0.1,
      spread: '',
      total: '',
    },
    assetAmount: '',
  });
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
          firstValue={ins}
          secondValue={outs}
          onFirstInputChange={setIns}
          onSecondInputChange={setOuts}
          buttonText="Estimate"
          onSubmit={() => {
            estimateFees(ins, outs)
              .then(json => {
                setEstimate({
                  breakdown: json.breakdown,
                  assetAmount: json.asset_amount,
                });
                setView(VIEW.CONFIRM);
              })
              .catch(error => alert(error));
          }}
        />
      </div>
    );

  if (view === VIEW.CONFIRM)
    return (
      <div>
        <div className="has-text-centered">
          <p className="subtitle is-6  mt-6 mb-3">Taxi Fee</p>
          <h1 className="title is-3 mt-3">
            {(Number(estimate.assetAmount) / 10 ** 8).toLocaleString(
              undefined,
              { minimumIntegerDigits: 1, maximumFractionDigits: 2 }
            )}{' '}
            USDt
          </h1>
          <p className="subtitle is-6">
            {/* eslint-disable-next-line */}
            <a href="#" onClick={() => setShowDetails(!showDetails)}>{`${
              !showDetails ? `View` : `Hide`
            } details`}</a>
          </p>
          {showDetails && (
            <div className="notification is-warning">
              Values are expressed in satoshis (Precision: 8)
              <br />
              <br />
              Network fees (L-BTC): {estimate.breakdown.fee} <br />
              Service fees (L-BTC): {estimate.breakdown.spread} <br />
              Total fees (L-BTC): {estimate.breakdown.total} <hr />
              Satoshi Per Byte: {estimate.breakdown.sat_per_byte} <br />
              Total fees (L-USDt): {estimate.assetAmount}
            </div>
          )}
        </div>

        <p className="subtitle is-5 mt-3 mb-3">
          Provide the unsigned transaction spending your Liquid assets. <br />
          Remember to subtract from your USDt change{' '}
          <b>{estimate.assetAmount}</b>
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
