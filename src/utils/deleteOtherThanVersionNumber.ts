export default (version: string) => {
  const findVersion = new RegExp('([0-9]+.)+[0-9]+');
  const matched = version.match(findVersion);
  if (matched === null) return undefined;
  const parsedVersion = matched[1];
  return parsedVersion;
};
