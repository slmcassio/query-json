Query-JSON
===

[![Build Status](https://travis-ci.org/slmcassio/query-json.svg?branch=master)](https://travis-ci.org/slmcassio/query-json)

Search for a given value JSON occurrences.

```bash
$ npm install query-json
```

## API

Import ```queryJson``` module:

```js
const queryJson = require('../index.js');
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

const colorRegex = new RegExp('COLOR', 'i');
const colorResult = queryJson.search(json, colorRegex);
console.log(colorResult);
// [ [ 'key_a', 'color' ],
//   [ 'key_b', 'color' ],
//   [ 'key_c', 'color' ] ]

const whiteRegex = new RegExp('WHITE', 'i');
const whiteResult = queryJson.search(json, whiteRegex);
console.log(whiteResult);
// [ [ 'key_b', 'color' ] ]
```

## License

MIT
