'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

require('./controllers/Telegram');

var _assistant = require('./routers/assistant.router');

var _assistant2 = _interopRequireDefault(_assistant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

// --- Routers ---

// ---------------

var app = (0, _express2.default)();

app.set('PORT', process.env.PORT || 8000);
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// // --- Routes ---
// app.use('/', assistantRouter)
// // --------------

app.listen(app.get('PORT'), function () {
    console.log('Express server listening on port ' + app.get('PORT'));
});