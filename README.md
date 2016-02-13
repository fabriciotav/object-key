# object-key

Assing value to an object property using path string separated by dots and lookup values using the same dot separated string paths.

## Usage

### ok.assign(key, value, hash[, stringCase])

`stringCase` might be:

- camel
- kebab
- snake

```
const ok = require('ok');

var path = 'foo.bar.baz';
var path2 = 'foo.barBar.baz';
var obj = {};

ok.assign(path, 'some value', obj);  // { foo: { bar: { baz: 'some value' }}}
ok.assign(path2, 'some value', obj, 'kebab');  // { foo: { 'bar-bar': { baz: 'some value' }}}
```

### ok.lookup(key, hash)

```
const ok = require('ok');

var path = 'foo.bar.baz';
var obj = { foo: { bar: { baz: 'some value' }}};

ok.lookup(path, obj);  // 'some value'
```
