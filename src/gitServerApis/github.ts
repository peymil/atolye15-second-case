import fetch from 'node-fetch';
export default {
  searchForFile: async (repoName: string, fileName: string) => {
    const res = await fetch(`https://api.github.com/repos/${repoName}/contents/${fileName}`);
    const json: any = await res.json();
    if (json.message) return undefined;
    const base64Buffer = Buffer.from(json.content, 'base64');
    const file = base64Buffer.toString('utf-8');
    return file;
  },
};
