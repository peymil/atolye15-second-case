export default (oldAndNewVersions: { pkgName: string; oldVersion: string; newVersion: string }[]) => {
  const templateArr = oldAndNewVersions.map(
    ({ newVersion, oldVersion, pkgName }) => `${pkgName}: ${oldVersion} ---> ${newVersion}`,
  );
  return templateArr.join('\n');
};
