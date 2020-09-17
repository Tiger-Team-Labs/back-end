"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoles = void 0;

var _role = _interopRequireDefault(require("../models/role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createRoles = async () => {
  try {
    const count = await _role.default.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([new _role.default({
      name: 'user'
    }).save(), new _role.default({
      name: 'admin'
    }).save()]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

exports.createRoles = createRoles;