import React from 'react';
import Layout from './Layout';

import InputWithButton from './elements/InputWithButton';

interface Props {}

const App: React.FunctionComponent<Props> = () => {
  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-6-desktop is-offset-3-desktop">
            <h1 className="title">Liquid Top-up service</h1>
            <InputWithButton buttonText="Top-up" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
