# rollup-plugin-local-resolve
Resolves Node-style directories with `index.js` files in Rollup

[![Build Status](https://travis-ci.org/frostney/rollup-plugin-local-resolve.svg?branch=master)](https://travis-ci.org/frostney/rollup-plugin-local-resolve) [![Dependency Status](https://david-dm.org/frostney/rollup-plugin-local-resolve.svg)](https://david-dm.org/frostney/rollup-plugin-local-resolve) [![devDependency Status](https://david-dm.org/frostney/rollup-plugin-local-resolve/dev-status.svg)](https://david-dm.org/frostney/rollup-plugin-local-resolve#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/github/frostney/rollup-plugin-local-resolve/badge.svg?branch=master)](https://coveralls.io/github/frostney/rollup-plugin-local-resolve?branch=master)

Rollup by default doesn't handle resolving `./folder` to `./folder/index.js` internally. While there is the `rollup-plugin-node-resolve` plugin which also resolves directories as well as all dependencies from the `node_modules` directory, these may sometimes be too much for the use case at hand.

## Installation
```
npm install rollup-plugin-local-resolve
```

## Usage
```
import { rollup } from 'rollup';
import localResolve from 'rollup-plugin-local-resolve.js';

// This will resolve `./files` to `./files/index.js` if the file exists
rollup({
  entry: './files',
  plugins: [localResolve()],
}).then(stats => {
  t.same(stats.modules[0], { id: './files/folder/index.js' });
  t.same(stats.modules[1], { id: './files/index.js' });
  t.is(stats.modules.length, 2);
});
```

## License
MIT, see `LICENSE` for more information
