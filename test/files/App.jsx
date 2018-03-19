import path from 'path';

export default function () {
  path.isAbsolute('test');
  console.log('This function is imported from a file with .jsx as extension');
}
