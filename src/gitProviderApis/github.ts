import fetch from 'node-fetch';
type githubCommitRes = {
  object: {
    sha: string;
  };
};
type gitHubPackagejsonres = {
  content: string;
};
type npmErr = {
  message: string;
};

export const searchForFile = async (repoName: string, fileName: string) => {
  const res = await fetch(`https://api.github.com/repos/${repoName}/contents/${fileName}`);
  const json: gitHubPackagejsonres & npmErr = await res.json();
  if (json.message) return undefined;
  const base64Buffer = Buffer.from(json.content, 'base64');
  const file = base64Buffer.toString('utf-8');
  return file;
};

export const getLatestCommitSha = async (packageName: string) => {
  const res = await fetch('https://api.github.com/repos/' + packageName + 'git/refs/heads/main');
  const resJson: githubCommitRes & npmErr = await res.json();
  if (resJson.message) return undefined;
};
