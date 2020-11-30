'use strict';

const { getOptionValue } = require('internal/options');
const experimentalImportMetaResolve =
  getOptionValue('--experimental-import-meta-resolve');
const {
  fetch,
} = require('internal/modules/esm/assets/load');
const { PromisePrototypeThen, PromiseReject } = primordials;
const asyncESM = require('internal/process/esm_loader');

function createImportMetaResolve(defaultParentUrl) {
  return async function resolve(specifier, parentUrl = defaultParentUrl) {
    return PromisePrototypeThen(
      asyncESM.esmLoader.resolve(specifier, parentUrl),
      ({ url }) => url,
      (error) => (
        error.code === 'ERR_UNSUPPORTED_DIR_IMPORT' ?
          error.url : PromiseReject(error))
    );
  };
}

function initializeImportMeta(meta, context) {
  const url = context.url;

  // Alphabetical
  if (experimentalImportMetaResolve) {
    meta.resolve = createImportMetaResolve(url);
  }

  if (
    StringPrototypeStartsWith(url, 'http:') ||
    StringPrototypeStartsWith(url, 'https:')
  ) {
    url = fetch(new URL(url)).resolvedHREF;
  }

  meta.url = url;
}

module.exports = {
  initializeImportMeta
};
