import test from 'ava';

import { rollup } from 'rollup';
import localResolve from '../dist/rollup-plugin-local-resolve.js';

// tests for faild file lookup
test(t =>
  t.throws(rollup({
    entry: './files/index.js',
    plugins: [localResolve()],
  }))
);

// tests for folder lookup using default extension
test(t =>
  rollup({
    entry: './folders/index.js',
    plugins: [localResolve()],
  }).then(stats => {
    t.is(stats.modules[0].id.endsWith('/folders/folder/index.js'), true);
    t.is(stats.modules[1].id.endsWith('/folders/index.js'), true);
    t.is(stats.modules.length, 2);
  })
);

// tests for folder lookup using provided extension
test(t =>
  rollup({
    entry: './folders/index.js',
    plugins: [localResolve({ extensions: ['.jsx'] })],
  }).then(stats => {
    t.is(stats.modules[0].id.endsWith('/folders/folder/index.jsx'), true);
    t.is(stats.modules[1].id.endsWith('/folders/index.js'), true);
    t.is(stats.modules.length, 2);
  })
);

// tests for file lookup
test(t =>
  rollup({
    entry: './files/index.js',
    plugins: [localResolve({ extensions: ['.jsx'] })],
  }).then(stats => {
    t.is(stats.modules[0].id.endsWith('/files/App.jsx'), true);
    t.is(stats.modules[1].id.endsWith('/files/index.js'), true);
    t.is(stats.modules.length, 2);
  })
);
