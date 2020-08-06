import TaxiClient from './taxiClient';
import createDummyTx from './createDummyTx';
import { Psbt } from 'liquidjs-lib';

const TAXI_API_URL =
  process.env.TAXI_API_URL ||
  'https://3moyhezvi3.execute-api.eu-west-1.amazonaws.com/production';
const TETHER_ASSET_HASH =
  'ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2';
const taxiClient = new TaxiClient(TAXI_API_URL);

export function estimateFees(ninput: number, noutput: number): Promise<any> {
  const dummyPset = createDummyTx(ninput, noutput);
  return taxiClient.getAssetEstimate(dummyPset, TETHER_ASSET_HASH);
}

export function topupWithTether(
  orderId: string,
  psetBase64: string
): Promise<any> {
  try {
    Psbt.fromBase64(psetBase64);
  } catch (ignore) {
    return Promise.reject(new Error('Invalid PSET'));
  }

  return taxiClient.topupWithAsset(orderId, psetBase64, TETHER_ASSET_HASH);
}

export const toPrettyUSD = (x: number) => {
  return (x / 10 ** 8).toLocaleString(undefined, {
    minimumIntegerDigits: 1,
    maximumFractionDigits: 2,
  });
};

export * from './twirp';
