'use strict';

module.exports = {
  search: _queryJson
}

function _queryJson(json, queryRegex) {
  const path = [];
  const result = [];
  _searchOnNode(json, queryRegex, path, result);
  return result;
}

function _searchOnNode(node, queryRegex, previousPath, result) {
  if (!queryRegex.exec(JSON.stringify(node))) {
    return;
  }

  if (node instanceof Array) {
    _processArray(node, queryRegex, previousPath, result)
    return;
  }

  if (typeof node === 'number' || typeof node === 'string' || typeof node === 'boolean') {
    _addResult(previousPath, result);
    return;
  }

  _searchOnChildren(node, queryRegex, previousPath, result);
}

function _processArray(array, queryRegex, previousPath, result) {
  for (let index in array) {
    if(!array.hasOwnProperty(index)) {
      continue;
    }

    const currentPath = previousPath.slice();
    currentPath.push(index);

    const node = array[index];
    _searchOnNode(node, queryRegex, currentPath, result);
  }
}

function _searchOnChildren(json, queryRegex, previousPath, result) {

  const keys = Object.keys(json);

  for(let index in keys) {
    if(!keys.hasOwnProperty(index)) {
      continue;
    }

    const key = keys[index];

    const currentPath = previousPath.slice();
    currentPath.push(key);

    if (queryRegex.exec(key)) {
      _addResult(currentPath, result)
    }

    const nextNode = json[key];
    _searchOnNode(nextNode, queryRegex, currentPath, result);
  }
}

function _addResult(newValue, result) {
  if (result.indexOf(newValue) < 0) {
    result.push(newValue);
  }
}
