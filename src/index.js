import { statSync } from 'fs';
import path from 'path';

export default function localResolver() {
  return {
    resolveId(importee, importer) {
      if (importee.indexOf('./') === -1) {
        return null;
      }

      if (importee && importer) {
        const basename = path.basename(importer);
        const directory = importer.split(basename)[0];

        const dirIndexFile = './' + path.join(directory + importee, 'index.js');

        // TODO: This should be asynchronous
        const stats = statSync(dirIndexFile);

        if (stats.isFile()) {
          return dirIndexFile;
        }

        return null;
      }

      return importee;
    },
  };
}
