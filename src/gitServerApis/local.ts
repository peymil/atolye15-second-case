import fs from 'fs/promises';

export const searchForFile = async (repoDir: string, fileName: string) => {
  let isFileExists = true as boolean;
  const foundFile = await fs.readFile(repoDir + '/' + fileName, 'utf-8').catch((err) => {
    isFileExists = false;
  });
  if (isFileExists === false) return undefined;
  // I don't know how can it able to return void.

  return foundFile as string;
};
export const getLatestCommitSha = async (repoDir: string) => {
  let isFileExists = true as boolean;
  const foundFile = await fs.readFile(repoDir + '/' + 'git/refs/heads/main', 'utf-8').catch((err) => {
    isFileExists = false;
  });
  if (isFileExists === false) return undefined;
  return foundFile as string;
};
