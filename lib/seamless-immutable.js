"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CALL_HISTORY_METHOD", {
  enumerable: true,
  get: function get() {
    return _actions.CALL_HISTORY_METHOD;
  }
});
exports.ConnectedRouter = void 0;
Object.defineProperty(exports, "LOCATION_CHANGE", {
  enumerable: true,
  get: function get() {
    return _actions.LOCATION_CHANGE;
  }
});
exports.getSearch = exports.getRouter = exports.getLocation = exports.getHash = exports.getAction = exports.createMatchSelector = exports.connectRouter = void 0;
Object.defineProperty(exports, "go", {
  enumerable: true,
  get: function get() {
    return _actions.go;
  }
});
Object.defineProperty(exports, "goBack", {
  enumerable: true,
  get: function get() {
    return _actions.goBack;
  }
});
Object.defineProperty(exports, "goForward", {
  enumerable: true,
  get: function get() {
    return _actions.goForward;
  }
});
Object.defineProperty(exports, "onLocationChanged", {
  enumerable: true,
  get: function get() {
    return _actions.onLocationChanged;
  }
});
Object.defineProperty(exports, "push", {
  enumerable: true,
  get: function get() {
    return _actions.push;
  }
});
Object.defineProperty(exports, "replace", {
  enumerable: true,
  get: function get() {
    return _actions.replace;
  }
});
Object.defineProperty(exports, "routerActions", {
  enumerable: true,
  get: function get() {
    return _actions.routerActions;
  }
});
Object.defineProperty(exports, "routerMiddleware", {
  enumerable: true,
  get: function get() {
    return _middleware["default"];
  }
});
var _ConnectedRouter = _interopRequireDefault(require("./ConnectedRouter"));
var _reducer = _interopRequireDefault(require("./reducer"));
var _selectors = _interopRequireDefault(require("./selectors"));
var _seamlessImmutable = _interopRequireDefault(require("./structure/seamless-immutable"));
var _actions = require("./actions");
var _middleware = _interopRequireDefault(require("./middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ConnectedRouter = exports.ConnectedRouter = /*#__PURE__*/(0, _ConnectedRouter["default"])(_seamlessImmutable["default"]);
var connectRouter = exports.connectRouter = /*#__PURE__*/(0, _reducer["default"])(_seamlessImmutable["default"]);
var _createSelectors = /*#__PURE__*/(0, _selectors["default"])(_seamlessImmutable["default"]),
  getLocation = exports.getLocation = _createSelectors.getLocation,
  getAction = exports.getAction = _createSelectors.getAction,
  getHash = exports.getHash = _createSelectors.getHash,
  getRouter = exports.getRouter = _createSelectors.getRouter,
  getSearch = exports.getSearch = _createSelectors.getSearch,
  createMatchSelector = exports.createMatchSelector = _createSelectors.createMatchSelector;