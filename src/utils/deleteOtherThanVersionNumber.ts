export default (version: string): string | undefined => {
  const findVersion = new RegExp('([0-9]+.)+[0-9]+');
  const matched = findVersion.exec(version);
  if (matched === null) return undefined;
  const parsedVersion = matched[1];
  return parsedVersion;
};
