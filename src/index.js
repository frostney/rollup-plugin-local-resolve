import { statSync } from 'fs';
import path from 'path';

export default function localResolver() {
  return {
    resolveId(importee, importer) {
      if (importee.indexOf('./') === -1) {
        return null;
      }

      if (!importer) {
        return null;
      }

      const basename = path.basename(importer);
      const directory = importer.split(basename)[0];

      const dirIndexFile = path.join(directory + importee, 'index.js');

      // TODO: This should be asynchronous
      let stats;

      try {
        stats = statSync(dirIndexFile);
      } catch (e) {
        return null;
      }

      if (stats.isFile()) {
        return dirIndexFile;
      }

      return null;
    },
  };
}
