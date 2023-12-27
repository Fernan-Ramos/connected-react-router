"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _lodash = _interopRequireDefault(require("lodash.isequalwith"));
var _actions = require("./actions");
var _selectors = _interopRequireDefault(require("./selectors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var createConnectedRouter = function createConnectedRouter(structure) {
  var _createSelectors = (0, _selectors["default"])(structure),
    getLocation = _createSelectors.getLocation;
  /*
   * ConnectedRouter listens to a history object passed from props.
   * When history is changed, it dispatches action to redux store.
   * Then, store will pass props to component to render.
   * This creates uni-directional flow from history->store->router->components.
   */
  var ConnectedRouter = /*#__PURE__*/function (_PureComponent) {
    _inherits(ConnectedRouter, _PureComponent);
    var _super = _createSuper(ConnectedRouter);
    function ConnectedRouter(props) {
      var _this;
      _classCallCheck(this, ConnectedRouter);
      _this = _super.call(this, props);
      var store = props.store,
        history = props.history,
        onLocationChanged = props.onLocationChanged,
        stateCompareFunction = props.stateCompareFunction;
      _this.inTimeTravelling = false;

      // Subscribe to store changes to check if we are in time travelling
      _this.unsubscribe = store.subscribe(function () {
        // Allow time travel debugging compatibility to be turned off
        // as the detection for this (below) is error prone in apps where the
        // store may be unmounted, a navigation occurs, and then the store is re-mounted
        // during the app's lifetime. Detection could be much improved if Redux DevTools
        // simply set a global variable like `REDUX_DEVTOOLS_IS_TIME_TRAVELLING=true`.
        var isTimeTravelDebuggingAllowed = !props.noTimeTravelDebugging;

        // Extract store's location
        var _getLocation = getLocation(store.getState()),
          pathnameInStore = _getLocation.pathname,
          searchInStore = _getLocation.search,
          hashInStore = _getLocation.hash,
          stateInStore = _getLocation.state;
        // Extract history's location
        var _history$location = history.location,
          pathnameInHistory = _history$location.pathname,
          searchInHistory = _history$location.search,
          hashInHistory = _history$location.hash,
          stateInHistory = _history$location.state;

        // If we do time travelling, the location in store is changed but location in history is not changed
        if (isTimeTravelDebuggingAllowed && props.history.action === 'PUSH' && (pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInHistory !== hashInStore || !(0, _lodash["default"])(stateInStore, stateInHistory, stateCompareFunction))) {
          _this.inTimeTravelling = true;
          // Update history's location to match store's location
          history.push({
            pathname: pathnameInStore,
            search: searchInStore,
            hash: hashInStore,
            state: stateInStore
          });
        }
      });
      var handleLocationChange = function handleLocationChange(location, action) {
        var isFirstRendering = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        // Dispatch onLocationChanged except when we're in time travelling
        if (!_this.inTimeTravelling) {
          onLocationChanged(location, action, isFirstRendering);
        } else {
          _this.inTimeTravelling = false;
        }
      };

      // Listen to history changes
      _this.unlisten = history.listen(handleLocationChange);
      if (!props.noInitialPop) {
        // Dispatch a location change action for the initial location.
        // This makes it backward-compatible with react-router-redux.
        // But, we add `isFirstRendering` to `true` to prevent double-rendering.
        handleLocationChange(history.location, history.action, true);
      }
      return _this;
    }
    _createClass(ConnectedRouter, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unlisten();
        this.unsubscribe();
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
          omitRouter = _this$props.omitRouter,
          history = _this$props.history,
          children = _this$props.children;

        // The `omitRouter` option is available for applications that must
        // have a Router instance higher in the component tree but still desire
        // to use connected-react-router for its Redux integration.

        if (omitRouter) {
          return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, children);
        }
        return /*#__PURE__*/_react["default"].createElement(_reactRouter.Router, {
          history: history
        }, children);
      }
    }]);
    return ConnectedRouter;
  }(_react.PureComponent);
  ConnectedRouter.propTypes = {
    store: _propTypes["default"].shape({
      getState: _propTypes["default"].func.isRequired,
      subscribe: _propTypes["default"].func.isRequired
    }).isRequired,
    history: _propTypes["default"].shape({
      action: _propTypes["default"].string.isRequired,
      listen: _propTypes["default"].func.isRequired,
      location: _propTypes["default"].object.isRequired,
      push: _propTypes["default"].func.isRequired
    }).isRequired,
    basename: _propTypes["default"].string,
    children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node]),
    onLocationChanged: _propTypes["default"].func.isRequired,
    noInitialPop: _propTypes["default"].bool,
    noTimeTravelDebugging: _propTypes["default"].bool,
    stateCompareFunction: _propTypes["default"].func,
    omitRouter: _propTypes["default"].bool
  };
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onLocationChanged: function onLocationChanged(location, action, isFirstRendering) {
        return dispatch((0, _actions.onLocationChanged)(location, action, isFirstRendering));
      }
    };
  };
  var ConnectedRouterWithContext = function ConnectedRouterWithContext(props) {
    var Context = props.context || _reactRedux.ReactReduxContext;
    if (Context == null) {
      throw 'Please upgrade to react-redux v6';
    }
    return /*#__PURE__*/_react["default"].createElement(Context.Consumer, null, function (_ref) {
      var store = _ref.store;
      return /*#__PURE__*/_react["default"].createElement(ConnectedRouter, _extends({
        store: store
      }, props));
    });
  };
  ConnectedRouterWithContext.propTypes = {
    context: _propTypes["default"].object
  };
  return (0, _reactRedux.connect)(null, mapDispatchToProps)(ConnectedRouterWithContext);
};
var _default = exports["default"] = createConnectedRouter;