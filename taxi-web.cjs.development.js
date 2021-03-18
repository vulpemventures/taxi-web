'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = _interopDefault(require('react-dom'));
var copyLite = require('copy-lite');
var TaxiServiceClientPb = require('taxi-protobuf/generated/js/TaxiServiceClientPb');
var taxi_pb = require('taxi-protobuf/generated/js/taxi_pb');

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var Button = function Button(props) {
  return React__default.createElement("button", {
    className: "button is-primary is-medium",
    onClick: props.onClick,
    disabled: props.disabled || false
  }, React__default.createElement("h1", {
    className: "title has-text-dark is-6"
  }, props.children));
};

var Button$1 = function Button(props) {
  return React__default.createElement("button", {
    className: "button is-dark is-medium",
    style: {
      border: 'none'
    },
    disabled: props.disabled || false,
    onClick: props.onClick
  }, React__default.createElement("h1", {
    className: "title is-6"
  }, props.children));
};

var taxiImage = /*#__PURE__*/require('./images/taxi.png');

var currentYear = /*#__PURE__*/new Date().getFullYear();

var Layout = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Layout, _React$Component);

  function Layout() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.state = {
      selected: 0
    };
    return _this;
  }

  var _proto = Layout.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var withTitle = this.props.title ? React__default.createElement("section", {
      className: "hero is-light"
    }, React__default.createElement("div", {
      className: "hero-body"
    }, React__default.createElement("div", {
      className: "container"
    }, React__default.createElement("div", {
      className: "columns"
    }, React__default.createElement("div", {
      className: "column has-text-centered"
    }, React__default.createElement("h1", {
      className: "title"
    }, this.props.title)))))) : null;
    var menu = this.props.menu && this.props.menu.map(function (m, i) {
      if (_this2.state.selected === i) return React__default.createElement("div", {
        key: i,
        className: "navbar-item"
      }, React__default.createElement(Button, null, m));
      return React__default.createElement("div", {
        key: i,
        className: "navbar-item"
      }, React__default.createElement(Button$1, {
        onClick: function onClick() {
          _this2.props.onMenuChange(i);

          _this2.setState({
            selected: i
          });
        }
      }, m));
    });
    return React__default.createElement("div", {
      style: {
        minHeight: '100vh',
        position: 'relative'
      }
    }, withTitle, React__default.createElement("nav", {
      className: "navbar is-dark",
      role: "navigation",
      "aria-label": "main navigation"
    }, React__default.createElement("div", {
      className: "navbar-brand ml-6"
    }, React__default.createElement("a", {
      className: "navbar-item",
      href: "https://liquid.taxi"
    }, React__default.createElement("img", {
      src: taxiImage,
      alt: "Liquid Taxi",
      style: {
        height: '48px'
      }
    }))), React__default.createElement("div", {
      className: "navbar-menu"
    }, React__default.createElement("div", {
      className: "navbar-end"
    }, menu))), React__default.createElement("div", {
      style: {
        paddingTop: '5rem',
        paddingRight: '1rem',
        paddingLeft: '1rem',
        paddingBottom: '5rem'
      }
    }, this.props.children), React__default.createElement("footer", {
      style: {
        position: 'absolute',
        bottom: 0,
        height: '5rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, React__default.createElement("p", null, React__default.createElement("a", {
      href: "https://vulpem.com",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "\xA9 ", currentYear, " Vulpem Ventures OU"), " - ", React__default.createElement("a", {
      href: "https://alissadeleva.com",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Design by AD"))));
  };

  return Layout;
}(React__default.Component);

var Button$2 = function Button(props) {
  return React__default.createElement("button", {
    className: "button is-grey is-medium",
    disabled: true
  }, React__default.createElement("h1", {
    className: "title is-6 has-text-dark"
  }, props.children));
};

var Input = function Input(props) {
  var inputClass = "input is-medium " + (props.hasError && "is-danger");
  return React__default.createElement("div", null, React__default.createElement("div", {
    className: "field has-addons"
  }, React__default.createElement("input", {
    type: "text",
    readOnly: props.inputText ? true : false,
    defaultValue: props.inputText,
    onChange: function onChange(e) {
      return props.onInputChange(e.target.value);
    },
    className: inputClass,
    placeholder: props.inputPlaceholder
  }), React__default.createElement("button", {
    className: "button is-primary is-medium",
    onClick: props.onButtonClick,
    disabled: props.buttonDisabled || false
  }, React__default.createElement("h1", {
    className: "title has-text-dark is-6"
  }, props.buttonText))), props.hasError && React__default.createElement("div", {
    className: "notification is-danger"
  }, props.errorMessage));
};

var config = /*#__PURE__*/require('../config.json');

var USDT_ASSET_ID = process.env['USDT_ASSET_ID'] || config.USDT_ASSET_ID;
var TAXI_API_URL = process.env['TAXI_API_URL'] || config.TAXI_API_URL;

var TopupWithAsset = function TopupWithAsset(props) {
  var _useState = React.useState(false),
      isLoading = _useState[0],
      setIsLoading = _useState[1];

  var _useState2 = React.useState({}),
      topup = _useState2[0],
      setTopup = _useState2[1];

  var _useState3 = React.useState(0),
      expiry = _useState3[0],
      setExpiry = _useState3[1];

  var onRequestClick = function onRequestClick(evt) {
    evt.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    var client = new TaxiServiceClientPb.TaxiClient(TAXI_API_URL);
    var request = new taxi_pb.TopupWithAssetRequest();
    request.setAssetHash(USDT_ASSET_ID);
    client.topupWithAsset(request, null).then(function (response) {
      var topup = response.getTopup();
      var expiry = response.getExpiry();
      if (!topup) return props.onError('Internal error');
      setTopup(topup.toObject());
      setExpiry(expiry);
    }).catch(function (e) {
      return props.onError(e.message || JSON.stringify(e));
    });
    setIsLoading(false);
  };

  if (isLoading) return React__default.createElement("h1", {
    className: "title is-3"
  }, "Loading...");
  return React__default.createElement("div", null, !isLoading && Object.keys(topup).length > 0 ? React__default.createElement(Result, {
    topup: topup,
    expiryTimestamp: expiry
  }) : React__default.createElement("div", {
    className: "container"
  }, React__default.createElement("h1", {
    className: "title is-3 mt-6 mb-6"
  }, "Top-up with Liquid Tether"), React__default.createElement("p", {
    className: "subtitle is-6"
  }, "1. Request a partial signed transaction. This includes Liquid Bitcoin for the fees"), React__default.createElement("p", {
    className: "subtitle is-6"
  }, "2. Import in your wallet and adds your USDt inputs and outputs", ' '), React__default.createElement("p", {
    className: "subtitle is-6"
  }, "3. Broadcats the final transaction to the network within the expiration time (by default 3 minutes).", ' '), React__default.createElement(ButtonCentered, {
    onClick: onRequestClick
  })));
};

var ButtonCentered = function ButtonCentered(props) {
  return React__default.createElement("div", {
    className: "has-text-centered"
  }, React__default.createElement(Button, {
    onClick: props.onClick
  }, "Request a Topup"));
};

var Result = function Result(props) {
  var topup = props.topup,
      expiryTimestamp = props.expiryTimestamp;
  var assetAmountFractional = topup.assetAmount / Math.pow(10, 8);
  var assetSpreadFractional = topup.assetSpread / Math.pow(10, 8);
  var expiryDate = new Date(expiryTimestamp * 1000);

  var _useState4 = React.useState(''),
      copySuccess = _useState4[0],
      setCopySuccess = _useState4[1];

  var _useState5 = React.useState(false),
      showDetails = _useState5[0],
      setShowDetails = _useState5[1];

  var _useState6 = React.useState(false),
      showInstructions = _useState6[0],
      setShowInstructions = _useState6[1];

  var copy = function copy(value) {
    copyLite.copyToClipboard(value);
    setCopySuccess('✅ Copied!');
    setTimeout(function () {
      return setCopySuccess('');
    }, 1500);
  };

  var toggleDetails = function toggleDetails(evt) {
    evt.preventDefault();
    setShowDetails(!showDetails);
  };

  var toggleInstructions = function toggleInstructions(evt) {
    evt.preventDefault();
    setShowInstructions(!showInstructions);
  };

  return React__default.createElement("div", null, React__default.createElement("div", {
    className: "has-text-centered"
  }, React__default.createElement("p", {
    className: "subtitle is-6 mt-6"
  }, "ORDER ", topup.topupId), React__default.createElement("h1", {
    className: "title is-3 mt-6 mb-3"
  }, assetAmountFractional + " USDt"), React__default.createElement("p", {
    className: "subtitle is-6"
  }, React__default.createElement("a", {
    href: "#",
    onClick: toggleDetails
  }, (!showDetails ? "View" : "Hide") + " details")), showDetails && React__default.createElement("div", {
    className: "notification is-warning has-text-left"
  }, React__default.createElement("p", {
    className: "subtitle is-6"
  }, "Amount to be paid (Liquid Tether): ", assetAmountFractional, " USDt"), React__default.createElement("p", {
    className: "subtitle is-6"
  }, "Taxi service fee (Liquid Tether): ", assetSpreadFractional, " USDt"), React__default.createElement("p", {
    className: "subtitle is-6"
  }, "On-chain fees (Liquid Bitcoin): 0.00001 L-BTC")), React__default.createElement("img", {
    src: require('../images/success.png'),
    alt: "success icon after a topup with Liquid.Taxi"
  }), React__default.createElement("h1", {
    className: "title is-5 mt-3 mb-6"
  }, " Topup completed"), React__default.createElement("h1", {
    className: "title is-6 mt-6 has-text-left"
  }, "Transaction with L-BTC fees"), React__default.createElement(Input, {
    buttonText: copySuccess.length > 0 ? copySuccess : 'Copy',
    inputText: topup.partial,
    onButtonClick: function onButtonClick() {
      return copy(topup.partial);
    }
  }), React__default.createElement("p", {
    className: "subtitle is-6 mt-6"
  }, "You have until", ' ', React__default.createElement("b", null, ' ', expiryDate.toLocaleTimeString() + " of " + expiryDate.toLocaleDateString(), ' '), ' ', "to fund the transaction with enough Liquid Tether to cover the\n          fee of " + assetAmountFractional + " USDt and broadcast it through the Liquid Network."), React__default.createElement(Button, {
    onClick: toggleInstructions
  }, "Import into Liquid.Coach"), React__default.createElement(Button$2, null, "Open with Marina ")), showInstructions && React__default.createElement("div", {
    className: "container"
  }, React__default.createElement("h1", {
    className: "title is-3 mt-6 mb-6"
  }, "How to import a topup with Liquid.Coach"), React__default.createElement("p", {
    className: "subtitle is-6"
  }, "1. Go to", ' ', React__default.createElement("a", {
    href: "https://liquid.coach",
    target: "_blank",
    rel: "noreferrer"
  }, "Liquid.Coach"), ' '), React__default.createElement("p", {
    className: "subtitle is-6"
  }, "2. Paste your address holding USDt or generate a Liquid wallet in the browser"), React__default.createElement("p", {
    className: "subtitle is-6"
  }, "3. Click on ", React__default.createElement("b", null, "Import"), " and copy-paste the", ' ', React__default.createElement("b", null, "Transaction with L-BTC fees"), " above"), React__default.createElement("p", {
    className: "subtitle is-6"
  }, "4. ", React__default.createElement("b", null, "Inputs:"), " Add your USDt input(s) selecting from the select box"), React__default.createElement("p", {
    className: "subtitle is-6"
  }, "5. ", React__default.createElement("b", null, "Outputs:"), " Add you USDt output(s), like the receiver output and the eventual USDt change"), React__default.createElement("p", {
    className: "subtitle is-6"
  }, "6. Click on ", React__default.createElement("b", null, "Encode"), " and then ", React__default.createElement("b", null, "Sign"), " and paste your mnemonic phrase"), React__default.createElement("p", {
    className: "subtitle is-6"
  }, "7. Broadcast the resulting hex encoded transaction")));
};

var Topup = function Topup() {
  return React__default.createElement("h1", {
    className: "title has-text-centered mt-6"
  }, "Coming soon");
  /*return (
    <div>
      <h1 className="title is-3 mt-6">Top-up with Lightning Network</h1>
      <p className="subtitle is-5 mt-3 mb-6">
        1. Provide a transaction (PSET format) spending your Liquid assets{' '}
        <br />
        2. Pay the Lightning Network invoice <br />
        3. Once paid, we will add L-BTC fees on your behalf <br />
        4. Import the transaction in your wallet. It's ready to be signed
      </p>
      <InputWithButton
        buttonText="Top-up"
        onSubmit={() => console.log('clicked')}
      />
    </div>
  );*/
};

var Button$3 = function Button(props) {
  return React__default.createElement("button", {
    className: "button is-dark is-medium",
    style: {
      borderColor: '#fdfffc'
    },
    disabled: props.disabled || false,
    onClick: props.onClick
  }, React__default.createElement("h1", {
    className: "title is-6"
  }, props.children));
};

var Button$4 = function Button$1(props) {
  var _useState = React.useState(props.defaultIndex || 0),
      selected = _useState[0],
      setSelected = _useState[1];

  var onButtonClick = function onButtonClick(index) {
    // Do other stuff
    props.onChange(index);
    setSelected(index);
  };

  var buttons = props.values.map(function (v, index) {
    if (selected === index) return React__default.createElement(Button, {
      key: index
    }, v);
    return React__default.createElement(Button$3, {
      key: index,
      onClick: function onClick() {
        return onButtonClick(index);
      }
    }, v);
  });
  return React__default.createElement("div", {
    className: "buttons has-addons is-centered"
  }, buttons);
};

var taxiImage$1 = /*#__PURE__*/require('../images/taxi.png');

var Intro = function Intro() {
  return React__default.createElement("section", {
    className: "hero hero-body-padding-small is-medium"
  }, React__default.createElement("div", {
    className: "hero-body"
  }, React__default.createElement("div", {
    className: "columns"
  }, React__default.createElement("div", {
    className: "column pl-6"
  }, React__default.createElement("h1", {
    className: "title is-3 mt-6"
  }, "Liquid Taxi"), React__default.createElement("p", {
    className: "subtitle is-5 mt-3 mb-6"
  }, "Move around your Liquid assets without L-BTC. Pay per use with USDt or buy a prepaid package to get an API KEY")), React__default.createElement("div", {
    className: "column is-centered has-text-centered"
  }, React__default.createElement("img", {
    src: taxiImage$1,
    alt: "Liquid Taxi"
  })))));
};

var RADIO_VALUES = ['Pay with USDt', 'Use API KEY'];
var VIEW;

(function (VIEW) {
  VIEW[VIEW["ASSET"] = 1] = "ASSET";
  VIEW[VIEW["LN"] = 2] = "LN";
})(VIEW || (VIEW = {}));

var App = function App() {
  var _useState = React.useState(VIEW.ASSET),
      view = _useState[0],
      setView = _useState[1];

  var _useState2 = React.useState(''),
      error = _useState2[0],
      setError = _useState2[1];

  return React__default.createElement(Layout, {
    menu: ['Top-up']
  }, React__default.createElement(Intro, null), React__default.createElement("div", {
    className: "container"
  }, error.length > 0 && React__default.createElement("div", {
    className: "notification is-danger is-large"
  }, ' ', React__default.createElement("button", {
    className: "delete is-large",
    onClick: function onClick() {
      return setError('');
    }
  }), error), React__default.createElement("div", {
    className: "columns"
  }, React__default.createElement("div", {
    className: "column is-6-desktop is-offset-3-desktop"
  }, React__default.createElement(Button$4, {
    onChange: function onChange(i) {
      return setView(i + 1);
    },
    values: RADIO_VALUES
  }), view === VIEW.ASSET ? React__default.createElement(TopupWithAsset, {
    onError: function onError(msg) {
      return setError(msg);
    }
  }) : React__default.createElement(Topup, null)))));
};

ReactDOM.render(React__default.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=taxi-web.cjs.development.js.map
