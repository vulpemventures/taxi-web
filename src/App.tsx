import React from 'react';
import Layout from './Layout';

interface Props { }

const App: React.FunctionComponent<Props> = () => {
  return (
    <Layout title="😎 Yeah">
      <h1 className="title">Hey folks!</h1>
    </Layout>
  );
};

export default App;
