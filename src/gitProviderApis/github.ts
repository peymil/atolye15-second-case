import fetch from 'node-fetch';

type GithubCommitRes = {
  object: {
    sha: string;
  };
};
type GitHubPackageJsonRes = {
  content: string;
};
type NpmErr = {
  message: string;
};

export const searchForFile = async (repoName: string, fileName: string): Promise<string | undefined> => {
  const res = await fetch(`https://api.github.com/repos/${repoName}/contents/${fileName}`);
  const json = (await res.json()) as GitHubPackageJsonRes & NpmErr;
  if (json.message) return undefined;
  const base64Buffer = Buffer.from(json.content, 'base64');
  const file = base64Buffer.toString('utf-8');
  return file;
};

export const getLatestCommitSha = async (packageName: string): Promise<string | undefined> => {
  const res = await fetch(`https://api.github.com/repos/${packageName}/git/refs/heads/main`);
  const resJson = (await res.json()) as GithubCommitRes & NpmErr;
  if (resJson.message) {
    return undefined;
  }
  return resJson.object.sha;
};
