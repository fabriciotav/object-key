const assert = require('assert');
const ok = require('../index');

describe('assign', function() {
  it('single', function() {
    assert.deepEqual({ random: 'value' }, ok.assign('random', 'value', {}));
  });

  it('single', function() {
    assert.deepEqual({ randomValue: 'value' }, ok.assign('randomValue', 'value', {}));
  });

  it('nested', function() {
    assert.deepEqual({ foo: { bar: { baz: 'value' }}}, ok.assign('foo.bar.baz', 'value', {}, 'kebab'));
  });

  it('kebabCase', function() {
    assert.deepEqual({ 'random-value': 'value' }, ok.assign('randomValue', 'value', {}, 'kebab'));
  });

  it('camelCase', function() {
    assert.deepEqual({ randomValue: 'value' }, ok.assign('random_value', 'value', {}, 'camel'));
  });

  it('snakeCase', function() {
    assert.deepEqual({ random_value: 'value' }, ok.assign('random_value', 'value', {}, 'snake'));
  });
});

describe('lookup', function() {
  it('single', function() {
    assert.deepEqual('value', ok.lookup('random', { random: 'value' }));
  });

  it('single', function() {
    assert.deepEqual('value', ok.lookup('randomValue', { randomValue: 'value' }));
  });

  it('nested', function() {
    assert.deepEqual('value', ok.lookup('random-value.nested', { 'random-value': { nested: 'value' }}));
  });

  it('kebabCase', function() {
    assert.deepEqual('value', ok.lookup('random-value', { 'random-value': 'value' }));
  });

  it('camelCase', function() {
    assert.deepEqual('value', ok.lookup('random_value', { random_value: 'value' }));
  });

  it('snakeCase', function() {
    assert.deepEqual('value', ok.lookup('random_value', { random_value: 'value' }));
  });
});

