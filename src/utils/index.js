import { stat } from 'fs';
import path from 'path';
import { defaultConfig } from '../contants/config';

// start with ./ and don't end .*
export function isDirectoryId(importee) {
  return (
    typeof importee === 'string' &&
    importee.indexOf('./') > -1 &&
    path.extname(importee) === ''
  );
}

// merge default config with user config
export function mergeConfig(config) {
  return Object.assign({}, defaultConfig, config || {});
}

export function statAsync(file) {
  return new Promise((resolve, reject) =>
    stat(file, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    })
  );
}

export function eachAsync(arr, fn) {
  function next(i) {
    if (i >= arr.length) {
      return;
    }
    const item = arr[i];
    if (item) {
      const promise = fn(item, i);
      if (promise instanceof Promise) {
        promise.then((res, err) => {
          if (!err && typeof res === 'undefined' || res) {
            next(i + 1);
          }
        });
      } else {
        next(i + 1);
      }
    }
  }
  next(0);
}
