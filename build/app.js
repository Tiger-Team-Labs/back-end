"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _initialSetup = require("./libs/initialSetup");

var _categories = _interopRequireDefault(require("./routes/categories.routes"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

var _posts = _interopRequireDefault(require("./routes/posts.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
(0, _initialSetup.createRoles)(); // settings

app.set('pkg', _package.default); // middlewares

const corsOptions = {
  origin: "https://bernardoaguayoortega.github.io" //origin: "http://localhost:3000"

};
app.use((0, _cors.default)(corsOptions));
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json()); // welcome routes

app.get('/', (req, res) => {
  res.json({
    author: app.get('pkg').author,
    name: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
}); // routes

app.use('/api/categories', _categories.default);
app.use('/api/users', _user.default);
app.use('/api/posts', _posts.default);
app.use('/api/auth', _auth.default);
var _default = app;
exports.default = _default;