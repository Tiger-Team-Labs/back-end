"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://platzi-admin:Pq5HLvhdvBpXJX1d@curso-platzi.o7zlc.mongodb.net/foroDb?retryWrites=true&w=majority",
  SECRET: 'c033497fa2fd1a54205e2a63fe6eb97c1a770603bc7febaefb77e4100a27cef1',
  PORT: process.env.PORT || 3000
};
exports.default = _default;