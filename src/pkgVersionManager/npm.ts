import fetch from 'node-fetch';
//Only versions property are implemented
type npmRes = {
  versions: { [key: string]: string }[];
  error: string;
};

export const fetchRegistryInfo = async (packageName: string): Promise<npmRes> => {
  const res = await fetch('https://registry.npmjs.org/' + packageName);
  return await res.json();
};
export const parseRegistryInfo = (resJson: npmRes): string | undefined => {
  if (resJson.error) return undefined;
  const versions = resJson.versions;
  if (!versions) return undefined;
  const keys = Object.keys(versions);
  return keys[keys.length - 1];
};
