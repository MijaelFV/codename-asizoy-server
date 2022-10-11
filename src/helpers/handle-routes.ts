import fs from 'fs';
import { IDirInfo } from '../interfaces/readDir';

const readDir = (folder = '', replace = '') => {
  return new Promise((resolve) => {
    // LOAD MODELS
    const info: IDirInfo[] = [];
    fs.readdirSync(folder).forEach((file) => {
      const extension = file.slice(-2, file.length);
      if (extension !== 'ts') return;

      const filename = file.slice(0, -3);
      const name = filename.replace(replace, '');
      info.push({
        file, // testCtrl.js
        filename, // testCtrl
        name, // test
      });
    });
    resolve(info);
  });
};

export default readDir;
