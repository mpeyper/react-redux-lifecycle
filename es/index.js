import React from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import wrapDisplayName from 'recompose/wrapDisplayName';

var handleAction = function handleAction(action, dispatch, props) {
  if (typeof action === 'function') {
    dispatch(action(props));
  } else if (Array.isArray(action)) {
    action.forEach(function (a) {
      return handleAction(a, dispatch, props);
    });
  } else {
    dispatch(action);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var INCLUDED_METHODS = ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount', 'componentDidCatch'];

var withLifecycleActions = function withLifecycleActions(lifecycleActions) {
  if (process.env.NODE_ENV !== 'production') {
    if ((typeof lifecycleActions === 'undefined' ? 'undefined' : _typeof(lifecycleActions)) !== 'object' || Array.isArray(lifecycleActions)) {
      throw TypeError('lifecycleActions must be an object.');
    }
  }

  var lifecycleActionsKeys = Object.keys(lifecycleActions || {});

  if (process.env.NODE_ENV !== 'production') {
    var unknownKeys = lifecycleActionsKeys.filter(function (lifecycleActionKey) {
      return INCLUDED_METHODS.indexOf(lifecycleActionKey) < 0;
    });

    if (lifecycleActionsKeys.length > 0 && unknownKeys.length > 0) {
      var unknownKeysString = unknownKeys.join(', ');
      var allowedKeysString = INCLUDED_METHODS.join(', ');
      console.warn('Unknown key(s) (' + unknownKeysString + ') found in lifecycleActions.  Allowed keys are ' + allowedKeysString + '.');
    }
  }

  return function (Component) {
    var LifeCycleActionsWrapper = function (_React$Component) {
      inherits(LifeCycleActionsWrapper, _React$Component);

      function LifeCycleActionsWrapper() {
        classCallCheck(this, LifeCycleActionsWrapper);

        var _this = possibleConstructorReturn(this, _React$Component.call(this));

        lifecycleActionsKeys.filter(function (lifecycleActionKey) {
          return INCLUDED_METHODS.indexOf(lifecycleActionKey) >= 0;
        }).forEach(function (lifecycleActionKey) {
          return _this[lifecycleActionKey] = function () {
            return handleAction(lifecycleActions[lifecycleActionKey], _this.props.dispatch, _this.getPassThroughProps());
          };
        });
        return _this;
      }

      LifeCycleActionsWrapper.prototype.getPassThroughProps = function getPassThroughProps() {
        var _props = this.props,
            dispatch = _props.dispatch,
            passThroughProps = objectWithoutProperties(_props, ['dispatch']); // eslint-disable-line no-unused-vars

        return passThroughProps;
      };

      LifeCycleActionsWrapper.prototype.render = function render() {
        return React.createElement(Component, this.getPassThroughProps());
      };

      return LifeCycleActionsWrapper;
    }(React.Component);

    hoistNonReactStatics(LifeCycleActionsWrapper, Component);

    LifeCycleActionsWrapper.displayName = wrapDisplayName(Component, 'LifeCycleActions');

    return connect()(LifeCycleActionsWrapper);
  };
};

var onComponentWillMount = function onComponentWillMount(action) {
  return withLifecycleActions({ componentWillMount: action });
};
var onComponentDidMount = function onComponentDidMount(action) {
  return withLifecycleActions({ componentDidMount: action });
};
var onComponentWillReceiveProps = function onComponentWillReceiveProps(action) {
  return withLifecycleActions({ componentWillReceiveProps: action });
};
var onComponentWillUpdate = function onComponentWillUpdate(action) {
  return withLifecycleActions({ componentWillUpdate: action });
};
var onComponentDidUpdate = function onComponentDidUpdate(action) {
  return withLifecycleActions({ componentDidUpdate: action });
};
var onComponentWillUnmount = function onComponentWillUnmount(action) {
  return withLifecycleActions({ componentWillUnmount: action });
};
var onComponentDidCatch = function onComponentDidCatch(action) {
  return withLifecycleActions({ componentDidCatch: action });
};

export { withLifecycleActions, onComponentWillMount, onComponentDidMount, onComponentWillReceiveProps, onComponentWillUpdate, onComponentDidUpdate, onComponentWillUnmount, onComponentDidCatch };
