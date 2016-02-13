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
  ok.assign = function assign(key, value, hash, stringCase) {
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

    let keys = key.split('.');
    keys = _.map(keys, convertCase);
    let elapsedIdx = [];
  
    if (keys.length === 1) {
      hash[keys[0]] = value;
      return hash;
    }
  
    for (let i = 0; i < keys.length; i++) {
      elapsedIdx.push(i);
      if (i !== keys.length - 1) {
  
        if (_.isPlainObject(hash[keys[i]]) === false) {
          let nestedValue = 'hash';
          elapsedIdx.forEach((idx) => { nestedValue += '[keys[' + idx + ']]'});
          nestedValue += '= {}';

          // TODO-->> Find alternative for `eval`
          eval(nestedValue);
        }
  
      } else {
        let leafValue = 'hash';
        elapsedIdx.forEach((idx) => { leafValue += '[keys[' + idx + ']]'});
        leafValue += '= value';

        // TODO-->> Find alternative for `eval`
        eval(leafValue);
      }
    }
  
    return hash;
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
