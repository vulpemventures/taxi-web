import React, { useState } from 'react';
import Layout from './Layout';

import TopupWithAsset from './components/TopupWithAsset';
import TopupWithLN from './components/TopupWithLN';

import ButtonRadio from './elements/ButtonRadio';

interface Props {}

const RADIO_VALUES = ['Pay with Liquid Tether', 'Pay with Lightning Network'];

enum VIEW {
  ASSET = 1,
  LN = 2,
}

const App: React.FunctionComponent<Props> = () => {
  const [view, setView] = useState(VIEW.ASSET);

  return (
    <Layout menu={['Top-up', 'FAQ', 'API']} onMenuChange={console.log}>
      <div className="container">
        <div className="columns">
          <div className="column is-6-desktop is-offset-3-desktop">
            <ButtonRadio
              onChange={(i: number) => setView(i + 1)}
              values={RADIO_VALUES}
            />
            {view === VIEW.ASSET ? <TopupWithAsset /> : <TopupWithLN />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
