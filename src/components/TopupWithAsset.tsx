import React, { useState } from 'react';

import { copyToClipboard } from 'copy-lite';
import { TaxiClient } from 'taxi-protobuf/generated/js/TaxiServiceClientPb';
import {
  TopupWithAssetRequest,
  TopupWithAssetReply,
} from 'taxi-protobuf/generated/js/taxi_pb';

import ButtonPrimary from '../elements/ButtonPrimary';
import ButtonDisabled from '../elements/ButtonDisabled';
import InputWithButton from '../elements/InputWithButton';

const USDT_ASSET_HASH =
  process.env['ASSET_HASH'] ||
  'ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2';

interface Props {
  onError(message: string): void;
}

const TopupWithAsset: React.FunctionComponent<Props> = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [topup, setTopup] = useState({});

  const onRequestClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    const client = new TaxiClient('http://localhost:8000');

    const request = new TopupWithAssetRequest();
    request.setAssetHash(USDT_ASSET_HASH);

    client
      .topupWithAsset(request, null)
      .then((response: TopupWithAssetReply) => {
        const topup = response.getTopup();

        if (!topup) return props.onError('Internal error');

        setTopup(topup.toObject());
      })
      .catch((e: Error) => props.onError(e.message));

    setIsLoading(false);
  };

  if (isLoading) return <h1 className="title is-3">Loading...</h1>;

  return (
    <div>
      {!isLoading && Object.keys(topup).length > 0 ? (
        <Result topup={topup} />
      ) : (
        <div>
          <h1 className="title is-3 mt-6">Top-up with Liquid Tether</h1>
          <p className="subtitle is-5 mt-3 mb-6">
            1. Request a partial signed transaction. This includes Liquid
            Bitcoin for the fees <br />
            2. Import in your wallet and adds your USDt inputs and outputs{' '}
            <br />
            3. Broadcats the final transaction to the network within 3 minutes.{' '}
            <br />
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

const Result: React.FunctionComponent<{ topup: any }> = props => {
  const { topup } = props;
  const assetAmountFractional = topup.assetAmount / 10 ** 8;

  const [copySuccess, setCopySuccess] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const copy = (value: string) => {
    copyToClipboard(value);
    setCopySuccess('✅ Copied!');
    setTimeout(() => setCopySuccess(''), 1500);
  };

  const toggleDetails = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setShowDetails(!showDetails);
  };

  return (
    <div className="has-text-centered">
      <p className="subtitle is-6 mt-6">ORDER {topup.topupId}</p>
      <h1 className="title is-3 mt-6 mb-3">{`${assetAmountFractional} USDt`}</h1>
      <p className="subtitle is-6">
        {/* eslint-disable-next-line */}
        <a href="#" onClick={toggleDetails}>{`${!showDetails ? `View` : `Hide`} details`}</a>
      </p>
      {showDetails && (
        <div className="notification is-warning">
          Fees (Liquid Bitcoin): 0.00001 L-BTC <br />
          Amount to be paid (Liquid Tether): {assetAmountFractional} USDt
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
        {`You have 3 minutes to fund the transaction with USDt inputs that covers the 
          fee of ${assetAmountFractional} and broadcast through the Liquid Network.`}
      </p>
      <ButtonPrimary onClick={console.log}>Open with Elements</ButtonPrimary>
      <ButtonDisabled>Open with Marina </ButtonDisabled>
    </div>
  );
};

export default TopupWithAsset;
