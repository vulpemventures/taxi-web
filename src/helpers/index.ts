import TaxiClient from './taxiClient';
import createDummyTx from './createDummyTx';
import { Psbt } from 'liquidjs-lib';

const taxiClient = new TaxiClient('http://localhost:8080');
const TETHER_ASSET_HASH =
  'ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2';

export function estimateFees(ninput: number, noutput: number): Promise<any> {
  const dummyPset = createDummyTx(ninput, noutput);
  return taxiClient.getAssetEstimate(dummyPset, TETHER_ASSET_HASH);
}

export function topupWithTether(psetBase64: string): Promise<any> {
  try {
    Psbt.fromBase64(psetBase64);
  } catch (ignore) {
    return Promise.reject(new Error('Invalid PSET'));
  }

  return taxiClient.topupWithAsset(psetBase64, TETHER_ASSET_HASH);
}

export * from './twirp';
