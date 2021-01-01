import React, { useState } from 'react';
import Layout from './Layout';

import TopupWithAsset from './components/TopupWithAsset';
import TopupWithLN from './components/TopupWithLN';

import ButtonRadio from './elements/ButtonRadio';
import Intro from './components/Intro';

interface Props {}

const RADIO_VALUES = ['Pay with USDt', 'Use API KEY'];

enum VIEW {
  ASSET = 1,
  LN = 2,
}

const App: React.FunctionComponent<Props> = () => {
  const [view, setView] = useState(VIEW.ASSET);
  const [error, setError] = useState('');

  return (
    <Layout menu={['Top-up']}>
      <Intro />
      <div className="container">
        {error.length > 0 && (
          <div className="notification is-danger is-large">
            {' '}
            <button
              className="delete is-large"
              onClick={() => setError('')}
            ></button>
            {error}
          </div>
        )}
        <div className="columns">
          <div className="column is-6-desktop is-offset-3-desktop">
            <ButtonRadio
              onChange={(i: number) => setView(i + 1)}
              values={RADIO_VALUES}
            />
            {view === VIEW.ASSET ? (
              <TopupWithAsset onError={(msg: string) => setError(msg)} />
            ) : (
              <TopupWithLN />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
