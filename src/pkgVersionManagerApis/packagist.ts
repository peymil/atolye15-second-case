import fetch from 'node-fetch';
//Only versions property are implemented
type packagistRes = {
  versions: { [key: string]: string }[];
  status: string;
};

export const getLatestVersion = async (packageName: string) => {
  const res = await fetch(`https://packagist.org/packages/${packageName}.json`);
  const resJson: packagistRes = await res.json();
  if (resJson.status) return undefined;
  const versions = resJson.versions;
  if (!versions) return undefined;
  const versionList = Object.keys(versions);
  //packagist sorting versions in descending order
  return versionList[0];
};
