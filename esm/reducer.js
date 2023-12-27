function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { LOCATION_CHANGE } from './actions';

/**
 * Adds query to location.
 * Utilises the search prop of location to construct query.
 */
var injectQuery = function injectQuery(location) {
  if (location && location.query) {
    // Don't inject query if it already exists in history
    return location;
  }
  var searchQuery = location && location.search;
  if (typeof searchQuery !== 'string' || searchQuery.length === 0) {
    return _objectSpread(_objectSpread({}, location), {}, {
      query: {}
    });
  }

  // Ignore the `?` part of the search string e.g. ?username=codejockie
  var search = searchQuery.substring(1);
  // Split the query string on `&` e.g. ?username=codejockie&name=Kennedy
  var queries = search.split('&');
  // Contruct query
  var query = queries.reduce(function (acc, currentQuery) {
    // Split on `=`, to get key and value
    var _currentQuery$split = currentQuery.split('='),
      _currentQuery$split2 = _slicedToArray(_currentQuery$split, 2),
      queryKey = _currentQuery$split2[0],
      queryValue = _currentQuery$split2[1];
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, queryKey, queryValue));
  }, {});
  return _objectSpread(_objectSpread({}, location), {}, {
    query: query
  });
};
var createConnectRouter = function createConnectRouter(structure) {
  var fromJS = structure.fromJS,
    merge = structure.merge;
  var createRouterReducer = function createRouterReducer(history) {
    var initialRouterState = fromJS({
      location: injectQuery(history.location),
      action: history.action
    });

    /*
    * This reducer will update the state with the most recent location history
    * has transitioned to.
    */
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialRouterState;
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        type = _ref.type,
        payload = _ref.payload;
      if (type === LOCATION_CHANGE) {
        var location = payload.location,
          action = payload.action,
          isFirstRendering = payload.isFirstRendering;
        // Don't update the state ref for the first rendering
        // to prevent the double-rendering issue on initilization
        return isFirstRendering ? state : merge(state, {
          location: fromJS(injectQuery(location)),
          action: action
        });
      }
      return state;
    };
  };
  return createRouterReducer;
};
export default createConnectRouter;