import { stat } from 'fs';
import path from 'path';
import { isDirectoryId, mergeConfig, eachAsync } from './utils';

export default function localResolver(customConfig) {
  return {
    resolveId(importee, importer) {
      if (!isDirectoryId(importee)) {
        return null;
      }

      if (!importer) {
        return null;
      }
      const config = mergeConfig(customConfig);
      const basename = path.basename(importer);
      const directory = importer.split(basename)[0];
      return new Promise((resolve) => {
        eachAsync(config.extensions, (ext, i) => {
          const file = path.join(
            directory,
            importee,
            `${config.indexFileName}${ext}`
          );
          return new Promise((statResolve) => {
            stat(file, (err, stats) => {
              console.log(err, stats);
              if (!err && stats.isFile()) {
                // stop eachAsync
                statResolve(false);
                resolve(file);
              }
              // continue eachAsync
              statResolve(true);
              if (i === config.extensions.length - 1) resolve(null);
            });
          });
        });
      });
    },
  };
}
