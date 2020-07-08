import React from 'react';

import ButtonInfo from './elements/ButtonInfo';
import ButtonPrimary from './elements/ButtonPrimary';

const taxiImage = require('../public/favicon.png');

interface Props {
  title?: string;
  menu?: Array<string>;
  onMenuChange?: any;
}

class Layout extends React.Component<Props> {
  state = {
    selected: 0,
  };

  render() {
    const withTitle = this.props.title ? (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column has-text-centered">
                <h1 className="title">{this.props.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    ) : null;

    const menu =
      this.props.menu &&
      this.props.menu.map((m: string, i: number) => {
        if (this.state.selected === i)
          return (
            <div key={i} className="navbar-item">
              <ButtonPrimary>{m}</ButtonPrimary>
            </div>
          );

        return (
          <div key={i} className="navbar-item">
            <ButtonInfo
              onClick={() => {
                this.props.onMenuChange(i);
                this.setState({ selected: i });
              }}
            >
              {m}
            </ButtonInfo>
          </div>
        );
      });

    return (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        {withTitle}
        <nav
          className="navbar is-dark"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand ml-6">
            <a className="navbar-item" href="https://liquid.taxi">
              <img
                src={taxiImage}
                alt="Liquid Taxi"
                style={{ height: '48px' }}
              />
              <h1 className="title is-6 ml-2">Liquid.Taxi</h1>
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">{menu}</div>
          </div>
        </nav>
        <div
          style={{
            paddingTop: '5rem',
            paddingRight: '1rem',
            paddingLeft: '1rem',
            paddingBottom: '5rem',
          }}
        >
          {this.props.children}
        </div>
        <footer
          style={{
            position: 'absolute',
            bottom: 0,
            height: '5rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>
            <a
              href="https://vulpem.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              © 2020 Vulpem Ventures OU
            </a>
            {` - `}
            <a
              href="https://alissadeleva.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Design by AD
            </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default Layout;
