"use strict";

var _app = _interopRequireDefault(require("./app"));

require("./database");

var _config = _interopRequireDefault(require("./config"));

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//app.listen(3000)
//app.listen(process.env.PORT, '0.0.0.0');
_app.default.listen(_config.default.PORT, '0.0.0.0');

console.log('API listen on port', 3000);