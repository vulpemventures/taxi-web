export interface TwirpErrorJSON {
  code: string;
  msg: string;
  meta: { [index: string]: string };
}

export class TwirpError extends Error {
  code: string;
  meta: { [index: string]: string };

  constructor(te: TwirpErrorJSON) {
    super(te.msg);

    this.code = te.code;
    this.meta = te.meta;
  }
}

export const throwTwirpError = (resp: Response) => {
  return resp.json().then((err: TwirpErrorJSON) => {
    throw new TwirpError(err);
  });
};

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
}
