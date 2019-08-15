import { statSync } from 'fs';
import path from 'path';

export default function localResolver(options = { extensions: ['.js'] }) {
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

      let resolved = null;

      // find will stop at the first occurrence
      options.extensions.find(extension => {
        const dirIndexFile = path.join(directory + importee, `index${extension}`);

        // TODO: This should be asynchronous
        let stats;

        try {
          stats = statSync(dirIndexFile);
        } catch (e) {
          return false;
        }

        if (stats.isFile()) {
          resolved = dirIndexFile;
          return true;
        }

        return false;
      });

      return resolved;
    },
  };
}
