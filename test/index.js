import test from 'ava';

import { rollup } from 'rollup';
import localResolve from '../dist/rollup-plugin-local-resolve.js';

test(t =>
  rollup({
    entry: './files/index.js',
    plugins: [localResolve()],
  }).then(stats => {
    t.is(stats.modules[0].id.endsWith('/files/folder/index.js'), true);
    t.is(stats.modules[1].id.endsWith('/files/index.js'), true);
    t.is(stats.modules.length, 2);
  })
);
