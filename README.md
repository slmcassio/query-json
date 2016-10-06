Query-JSON
===

[![Build Status](https://travis-ci.org/slmcassio/query-json.svg?branch=master)](https://travis-ci.org/slmcassio/query-json)

Search all occurrences on a given JSON.

```bash
$ npm install query-json
```

## API

Import ```queryJson``` module:

```js
const queryJson = require("query-json");
```

Specify both JSON and query regex:

```js

const json = {
  "key_a": {
    "color": "red"
  },
  "key_b": {
    "color": "white"
  },
  "key_c": {
    "color": "blue"
  }
};

```

Simple query:
```js

const regex = new RegExp('WHITE', 'i');
const result = queryJson.search(json, regex);

console.log(result);
// [ [ 'key_b', 'color' ] ]
```

Detailed query:
```js

const regex = new RegExp('COLOR', 'i');
const result = queryJson.search(json, regex, {
  details: true
});

console.log(result);
// [ { isKey: true, path: [ 'key_a', 'color' ] },
//   { isKey: true, path: [ 'key_b', 'color' ] },
//   { isKey: true, path: [ 'key_c', 'color' ] } ]
```

## License

MIT
