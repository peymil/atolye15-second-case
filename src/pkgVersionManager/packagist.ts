import fetch from 'node-fetch';
//Only versions property are implemented
type packagistRes = {
  versions: { [key: string]: string }[];
  status: string;
};

export const fetchRegistryInfo = async (packageName: string): Promise<packagistRes> => {
  const res = await fetch(`https://packagist.org/packages/${packageName}.json`);
  return await res.json();
};
export const parseRegistryInfo = (resJson: packagistRes): string | undefined => {
  if (resJson.status) return undefined;
  const versions = resJson.versions;
  if (!versions) return undefined;
  const keys = Object.keys(versions);
  return keys[keys.length - 1];
};
