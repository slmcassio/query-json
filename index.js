'use strict';

module.exports = {
  search: _queryJson
}

function _queryJson(json, queryRegex, options) {
  options = options ? options : {};

  const path = [];
  const result = [];
  _searchOnNode(json, queryRegex, path, result, options);
  return result;
}

function _searchOnNode(node, queryRegex, previousPath, result, options) {
  if (!queryRegex.exec(JSON.stringify(node))) {
    return;
  }

  if (node instanceof Array) {
    _processArray(node, queryRegex, previousPath, result, options)
    return;
  }

  if (typeof node === 'number' || typeof node === 'string' || typeof node === 'boolean') {
    _addResult(previousPath, result, 'VALUE', options);
    return;
  }

  _searchOnChildren(node, queryRegex, previousPath, result, options);
}

function _processArray(array, queryRegex, previousPath, result, options) {
  for (let index in array) {
    if(!array.hasOwnProperty(index)) {
      continue;
    }

    const currentPath = previousPath.slice();
    currentPath.push(index);

    const node = array[index];
    _searchOnNode(node, queryRegex, currentPath, result, options);
  }
}

function _searchOnChildren(json, queryRegex, previousPath, result, options) {

  const keys = Object.keys(json);

  for(let index in keys) {
    if(!keys.hasOwnProperty(index)) {
      continue;
    }

    const key = keys[index];

    const currentPath = previousPath.slice();
    currentPath.push(key);

    if (queryRegex.exec(key)) {
      _addResult(currentPath, result, 'KEY', options);
    }

    const nextNode = json[key];
    _searchOnNode(nextNode, queryRegex, currentPath, result, options);
  }
}

function _addResult(newValue, result, type, options) {
  if (result.indexOf(newValue) >= 0) {
    return;
  }

  if (options.details) {
    result.push({
      isKey: 'KEY' == type,
      path: newValue
    });

    return;
  }

  result.push(newValue);
}
