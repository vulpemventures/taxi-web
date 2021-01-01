import React from 'react';

const taxiImage = require('../images/taxi.png');

interface Props {}

const Intro: React.FunctionComponent<Props> = () => {
  return (
    <section className="hero hero-body-padding-small is-medium">
      <div className="hero-body">
        <div className="columns">
          <div className="column pl-6">
            <h1 className="title is-3 mt-6">Liquid Taxi</h1>
            <p className="subtitle is-5 mt-3 mb-6">
              Move around your Liquid assets without L-BTC. Pay per use with
              USDt or buy a prepaid package to get an API KEY
            </p>
          </div>
          <div className="column is-centered has-text-centered">
            <img src={taxiImage} alt="Liquid Taxi" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
