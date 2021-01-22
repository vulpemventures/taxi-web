import React, { useState } from 'react';

import { copyToClipboard } from 'copy-lite';
import { TaxiClient } from 'taxi-protobuf/generated/js/TaxiServiceClientPb';
import {
  TopupWithAssetRequest,
  TopupWithAssetReply,
  Topup,
} from 'taxi-protobuf/generated/js/taxi_pb';

import ButtonPrimary from '../elements/ButtonPrimary';
import ButtonDisabled from '../elements/ButtonDisabled';
import InputWithButton from '../elements/InputWithButton';

const config = require('../config.json');

const USDT_ASSET_ID = process.env['USDT_ASSET_ID'] || config.USDT_ASSET_ID;

const TAXI_API_URL = process.env['TAXI_API_URL'] || config.TAXI_API_URL;

interface Props {
  onError(message: string): void;
}

const TopupWithAsset: React.FunctionComponent<Props> = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [topup, setTopup] = useState({});
  const [expiry, setExpiry] = useState(0);

  const onRequestClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    const client = new TaxiClient(TAXI_API_URL);

    const request = new TopupWithAssetRequest();
    request.setAssetHash(USDT_ASSET_ID);

    client
      .topupWithAsset(request, null)
      .then((response: TopupWithAssetReply) => {
        const topup = response.getTopup();
        const expiry = response.getExpiry();

        if (!topup) return props.onError('Internal error');

        setTopup(topup.toObject());
        setExpiry(expiry);
      })
      .catch((e: Error) => props.onError(e.message || JSON.stringify(e)));

    setIsLoading(false);
  };

  if (isLoading) return <h1 className="title is-3">Loading...</h1>;

  return (
    <div>
      {!isLoading && Object.keys(topup).length > 0 ? (
        <Result topup={topup as Topup.AsObject} expiryTimestamp={expiry} />
      ) : (
        <div className="container">
          <h1 className="title is-3 mt-6 mb-6">Top-up with Liquid Tether</h1>
          <p className="subtitle is-6">
            1. Request a partial signed transaction. This includes Liquid
            Bitcoin for the fees
          </p>
          <p className="subtitle is-6">
            2. Import in your wallet and adds your USDt inputs and outputs{' '}
          </p>
          <p className="subtitle is-6">
            3. Broadcats the final transaction to the network within the
            expiration time (by default 3 minutes).{' '}
          </p>
          <ButtonCentered onClick={onRequestClick} />
        </div>
      )}
    </div>
  );
};

const ButtonCentered: React.FunctionComponent<{
  onClick(evt: React.MouseEvent<HTMLButtonElement>): void;
}> = props => {
  return (
    <div className="has-text-centered">
      <ButtonPrimary onClick={props.onClick}>Request a Topup</ButtonPrimary>
    </div>
  );
};

const Result: React.FunctionComponent<{
  topup: Topup.AsObject;
  expiryTimestamp: number;
}> = props => {
  const { topup, expiryTimestamp } = props;
  const assetAmountFractional = topup.assetAmount / 10 ** 8;
  const assetSpreadFractional = topup.assetSpread / 10 ** 8;
  const expiryDate = new Date(expiryTimestamp * 1000);

  const [copySuccess, setCopySuccess] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const copy = (value: string) => {
    copyToClipboard(value);
    setCopySuccess('✅ Copied!');
    setTimeout(() => setCopySuccess(''), 1500);
  };

  const toggleDetails = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setShowDetails(!showDetails);
  };

  const toggleInstructions = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setShowInstructions(!showInstructions);
  };

  return (
    <div>
      <div className="has-text-centered">
        <p className="subtitle is-6 mt-6">ORDER {topup.topupId}</p>
        <h1 className="title is-3 mt-6 mb-3">{`${assetAmountFractional} USDt`}</h1>
        <p className="subtitle is-6">
          {/* eslint-disable-next-line */}
          <a href="#" onClick={toggleDetails}>{`${!showDetails ? `View` : `Hide`} details`}</a>
        </p>
        {showDetails && (
          <div className="notification is-warning has-text-left">
            <p className="subtitle is-6">
              Amount to be paid (Liquid Tether): {assetAmountFractional} USDt
            </p>
            <p className="subtitle is-6">
              Taxi service fee (Liquid Tether): {assetSpreadFractional} USDt
            </p>
            <p className="subtitle is-6">
              On-chain fees (Liquid Bitcoin): 0.00001 L-BTC
            </p>
          </div>
        )}
        <img
          src={require('../images/success.png')}
          alt="success icon after a topup with Liquid.Taxi"
        />
        <h1 className="title is-5 mt-3 mb-6"> Topup completed</h1>
        <h1 className="title is-6 mt-6 has-text-left">
          Transaction with L-BTC fees
        </h1>
        <InputWithButton
          buttonText={copySuccess.length > 0 ? copySuccess : 'Copy'}
          inputText={topup.partial}
          onButtonClick={() => copy(topup.partial)}
        />
        <p className="subtitle is-6 mt-6">
          {`You have until`}{' '}
          <b>
            {' '}
            {`${expiryDate.toLocaleTimeString()} of ${expiryDate.toLocaleDateString()}`}{' '}
          </b>{' '}
          {`to fund the transaction with enough Liquid Tether to cover the
          fee of ${assetAmountFractional} USDt and broadcast it through the Liquid Network.`}
        </p>
        <ButtonPrimary onClick={toggleInstructions}>
          Import into Liquid.Coach
        </ButtonPrimary>
        <ButtonDisabled>Open with Marina </ButtonDisabled>
      </div>
      {showInstructions && (
        <div className="container">
          <h1 className="title is-3 mt-6 mb-6">
            How to import a topup with Liquid.Coach
          </h1>
          <p className="subtitle is-6">
            1. Go to{' '}
            <a href="https://liquid.coach" target="_blank" rel="noreferrer">
              Liquid.Coach
            </a>{' '}
          </p>
          <p className="subtitle is-6">
            2. Paste your address holding USDt or generate a Liquid wallet in
            the browser
          </p>
          <p className="subtitle is-6">
            3. Click on <b>Import</b> and copy-paste the{' '}
            <b>Transaction with L-BTC fees</b> above
          </p>
          <p className="subtitle is-6">
            4. <b>Inputs:</b> Add your USDt input(s) selecting from the select
            box
          </p>
          <p className="subtitle is-6">
            5. <b>Outputs:</b> Add you USDt output(s), like the receiver output
            and the eventual USDt change
          </p>
          <p className="subtitle is-6">
            6. Click on <b>Encode</b> and then <b>Sign</b> and paste your
            mnemonic phrase
          </p>
          <p className="subtitle is-6">
            7. Broadcast the resulting hex encoded transaction
          </p>
        </div>
      )}
    </div>
  );
};

export default TopupWithAsset;
