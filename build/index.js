"use strict";

var _app = _interopRequireDefault(require("./app"));

require("./database");

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app["default"].listen(process.env.PORT, '0.0.0.0');

console.log('API listen on port', 3000);