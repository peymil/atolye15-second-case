import fetch from 'node-fetch';
// Only versions property are implemented
type NpmErr = {
  error: string;
};
type NpmFileRes = {
  versions: { [key: string]: string }[];
};

export default {
  getLatestVersion: async (packageName: string): Promise<string | undefined> => {
    const res = await fetch(`https://registry.npmjs.org/${packageName}`);
    const resJson = (await res.json()) as NpmFileRes & NpmErr;
    if (resJson.error) return undefined;
    const { versions } = resJson;
    if (!versions) return undefined;
    const versionList = Object.keys(versions);
    return versionList[versionList.length - 1];
  },
};
