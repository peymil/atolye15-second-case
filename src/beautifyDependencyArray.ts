import { UpdateableDependencies } from './findLatestVers';

export default (oldAndNewVersions: UpdateableDependencies): string => {
  const templateArr = oldAndNewVersions.map(
    ({ newVersion, oldVersion, pkgName }) => `${pkgName}: ${oldVersion} ---> ${newVersion}`,
  );
  return templateArr.join('\n');
};
