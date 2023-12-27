"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRouter = require("react-router");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var createSelectors = function createSelectors(structure) {
  var getIn = structure.getIn,
    toJS = structure.toJS;
  var isRouter = function isRouter(value) {
    return value != null && _typeof(value) === 'object' && getIn(value, ['location']) && getIn(value, ['action']);
  };
  var getRouter = function getRouter(state) {
    var router = toJS(getIn(state, ['router']));
    if (!isRouter(router)) {
      throw 'Could not find router reducer in state tree, it must be mounted under "router"';
    }
    return router;
  };
  var getLocation = function getLocation(state) {
    return toJS(getIn(getRouter(state), ['location']));
  };
  var getAction = function getAction(state) {
    return toJS(getIn(getRouter(state), ['action']));
  };
  var getSearch = function getSearch(state) {
    return toJS(getIn(getRouter(state), ['location', 'search']));
  };
  var getHash = function getHash(state) {
    return toJS(getIn(getRouter(state), ['location', 'hash']));
  };

  // It only makes sense to recalculate the `matchPath` whenever the pathname
  // of the location changes. That's why `createMatchSelector` memoizes
  // the latest result based on the location's pathname.
  var createMatchSelector = function createMatchSelector(path) {
    var lastPathname = null;
    var lastMatch = null;
    return function (state) {
      var _ref = getLocation(state) || {},
        pathname = _ref.pathname;
      if (pathname === lastPathname) {
        return lastMatch;
      }
      lastPathname = pathname;
      var match = (0, _reactRouter.matchPath)(pathname, path);
      if (!match || !lastMatch || match.url !== lastMatch.url
      // When URL matched for nested routes, URL is the same but isExact is not.
      || match.isExact !== lastMatch.isExact) {
        lastMatch = match;
      }
      return lastMatch;
    };
  };
  return {
    getLocation: getLocation,
    getAction: getAction,
    getRouter: getRouter,
    getSearch: getSearch,
    getHash: getHash,
    createMatchSelector: createMatchSelector
  };
};
var _default = exports["default"] = createSelectors;