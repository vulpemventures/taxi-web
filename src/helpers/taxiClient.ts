import { throwTwirpError } from './twirp';

export default class TaxiClient {
  private baseUrl: string;
  private pathPrefix = '/twirp/vulpemventures.liquid_taxi.taxi.Taxi';
  defaultOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  url: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.url = this.baseUrl + this.pathPrefix;
  }

  getAssetEstimate(pset: string, assetHash: string): Promise<any> {
    return fetch(
      this.url + '/GetAssetEstimate',
      Object.assign({}, this.defaultOptions, {
        body: JSON.stringify({
          unsigned: {
            pset,
          },
          asset_hash: assetHash,
        }),
      })
    ).then(response => {
      if (!response.ok) return throwTwirpError(response);

      return response.json();
    });
  }

  topupWithAsset(
    orderId: string,
    pset: string,
    assetHash: string
  ): Promise<any> {
    return fetch(
      this.url + '/TopupWithAsset',
      Object.assign({}, this.defaultOptions, {
        body: JSON.stringify({
          unsigned: {
            pset,
          },
          asset_hash: assetHash,
          order_id: orderId,
        }),
      })
    ).then(response => {
      if (!response.ok) return throwTwirpError(response);

      return response.json();
    });
  }
}
