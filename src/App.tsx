import React from 'react';
import Layout from './Layout';

interface Props {}

const App: React.FunctionComponent<Props> = () => {
  return (
    <Layout>
      <h1 className="title">Hey folks!</h1>
      <button className="button is-primary">
        <h1 className="title has-text-dark is-4">Top-up</h1>
      </button>
      <button className="button is-dark is-outlined is-inverted">
        <h1 className="title is-4">Top-up</h1>
      </button>
    </Layout>
  );
};

export default App;
