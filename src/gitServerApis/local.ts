import fs from 'fs/promises';

export default {
  searchForFile: async (repoName: string, fileName: string) => {
    let isFileExists = true as boolean;
    const foundFile = await fs.readFile(repoName + '/' + fileName, 'utf-8').catch((err) => {
      isFileExists = false;
    });
    if (isFileExists === false) return undefined;
    // I don't know how can it able to return void.

    return foundFile as string;
  },
};
