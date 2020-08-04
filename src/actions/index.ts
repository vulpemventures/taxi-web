import TaxiClient from './taxiClient';
import createDummyTx from './createDummyTx';

const taxiClient = new TaxiClient('http://localhost:8080');

export function estimateFees(ninput: number, noutput: number): Promise<any> {
  const dummyPset = createDummyTx(ninput, noutput);
  return taxiClient.getAssetEstimate(
    dummyPset,
    'ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2'
  );
}
