import fetch from 'node-fetch';
//Only versions property are implemented
type npmErr = {
  error: string;
};
type npmFileRes = {
  versions: { [key: string]: string }[];
};

export const getLatestVersion = async (packageName: string) => {
  const res = await fetch('https://registry.npmjs.org/' + packageName);
  const resJson: npmFileRes & npmErr = await res.json();
  if (resJson.error) return undefined;
  const versions = resJson.versions;
  if (!versions) return undefined;
  const versionList = Object.keys(versions);
  return versionList[versionList.length - 1];
};
