import { confidential, Psbt, networks } from 'liquidjs-lib';

function create(ninput: number, noutput: number): string {
  const dummyUtxo = {
    script: Buffer.from(
      '76a91439397080b51ef22c59bd7469afacffbeec0da12e88ac',
      'hex'
    ),
    nonce: Buffer.from('00', 'hex'),
    value: confidential.satoshiToConfidentialValue(99999500),
    asset: Buffer.concat([
      Buffer.from('01', 'hex'),
      Buffer.from(networks.liquid.assetHash, 'hex').reverse(),
    ]),
  };

  const pset = new Psbt();

  for (let i = 0; i < ninput; i++) {
    pset.addInput({
      hash:
        '9d64f0343e264f9992aa024185319b349586ec4cbbfcedcda5a05678ab10e58' + i,
      index: 0,
      witnessUtxo: dummyUtxo,
    });
  }

  for (let i = 0; i < noutput; i++) {
    pset.addOutput(dummyUtxo);
  }

  const b64 = pset.toBase64();
  return b64;
}

export default create;
