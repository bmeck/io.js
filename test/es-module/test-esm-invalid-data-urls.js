'use strict';
const common = require('../common');
const assert = require('assert');

(async () => {
  await assert.rejects(import('data:text/plain,export default0'), {
    code: 'ERR_UNKNOWN_MODULE_FORMAT',
    message:
      'Unknown module format: text/plain for URL data:text/plain,' +
      'export default0',
  });
  await assert.rejects(import('data:text/plain;base64,'), {
    code: 'ERR_UNKNOWN_MODULE_FORMAT',
    message:
      'Unknown module format: text/plain for URL data:text/plain;base64,',
  });
  await assert.rejects(import('data:application/json,[]'), {
    code: 'ERR_UNKNOWN_MODULE_FORMAT',
    message:
      'Unknown module format: application/json for URL data:application/json,' +
      '[]',
  });
})().then(common.mustCall());
