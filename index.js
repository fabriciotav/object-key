'use strict';

if (typeof module === 'object' && module.exports) {
  var _ = require('lodash');
}

!function() {
  var ok = { version: '0.1.0' };

  /**
   * Assign value to object property.
   *
   * @param {string} key
   * @param {(string|number|object|array)} value
   * @param {object} hash
   * @param {string} stringCase
   *
   * @return {object}
   */
  ok.assign = function assign(object, path, value, stringCase) {
    var convertCase;

    switch(stringCase) {
      case 'camel':
        convertCase = _.camelCase;
        break;
      case 'kebab':
        convertCase = _.kebabCase;
        break;
      case 'snake':
        convertCase = _.snakeCase;
        break;
      default:
        convertCase = function convertCase(d) { return d; };
        break;
    }

    let keys = path.split('.');
    keys = _.map(keys, convertCase);
    keys = keys.join('.');
  
    return _.set(object, keys, value);
  }

  /**
   * Lookup key value
   *
   * @param {string} key
   * @param {object} hash
   *
   * @return {(string|number|object|array)}
   */
  ok.lookup = function lookup(key, hash) {
      let firstKey;
      let idx;
      let remainingKeys;
  
    if (hash[key] !== undefined) { return hash[key]; }
  
    if ((idx = key.indexOf('.')) !== -1) {
      firstKey = key.substr(0, idx);
      remainingKeys = key.substr(idx + 1);
      hash = hash[firstKey];
      if (hash) { return lookup(remainingKeys, hash); }
    }
  }

  if (typeof define === 'function' && define.amd) {
    define(ok);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = ok;
  } else {
    this.ok = ok;
  }
}();
