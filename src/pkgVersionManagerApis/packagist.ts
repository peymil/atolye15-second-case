import fetch from 'node-fetch';
// Only versions property are implemented
type PackagistRes = {
  status: string;

  package: {
    versions: { [key: string]: string }[];
  };
};
export default {
  getLatestVersion: async (packageName: string): Promise<string | undefined> => {
    const res = await fetch(`https://packagist.org/packages/${packageName}.json`);
    const resJson = (await res.json()) as PackagistRes;
    if (resJson.status) return undefined;
    const {
      package: { versions },
    } = resJson;
    if (!versions) return undefined;

    const versionList = Object.keys(versions);
    // packagist sorting versions in descending order
    return versionList[0];
  },
};
