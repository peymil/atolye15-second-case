import { identifyAdress } from './gitProviderIdentifier/identifyAdress';
import pkgManagerIdentifiers, { pkgManagerBase } from './pkgManagerIdentifiers';
import pkgParsers from './pkgParser/packageParser';
import pkgVersionManagerApis from './pkgVersionManagerApis';
import { gitServerApiBase } from './gitProviderApis';

export default async (gitServerApi: gitServerApiBase, repoName: string) => {
  let pkgManagerInfo: pkgManagerBase | undefined;
  let file: string | undefined;
  for (const pkgManagerIdentifier of pkgManagerIdentifiers) {
    const fileOrNot = await gitServerApi.searchForFile(repoName, pkgManagerIdentifier.pkgManagerFiles[0]);
    if (fileOrNot) {
      pkgManagerInfo = pkgManagerIdentifier;
      file = fileOrNot;
      break;
    }
  }
  if (!file || !pkgManagerInfo) throw new Error('File not found');
  const dependencies = pkgParsers(pkgManagerInfo.language, file);
  const pkgVersionManagerApi = pkgVersionManagerApis.get(pkgManagerInfo.pkgManagers[0]);
  if (!pkgVersionManagerApi) throw new Error('Pkg version manager is not identified');
  const updateableDependencies: { pkgName: string; oldVersion: string; newVersion: string }[] = [];
  // This is giving ECONNRESET in large dependency lists. I think it is because i'm sending 100 requests per second :)
  // const dependenciesAndNewVersionsPromises = Object.entries(dependencies).map(([name, version]) => {
  //   return new Promise<{ pkgName: string; oldVersion: string; newVersion: string | undefined }>((resolve, reject) => {
  //     pkgVersionManagerApi.getLatestVersion(name).then((newVersion) => {
  //       resolve({ pkgName: name, oldVersion: version, newVersion });
  //     });
  //   });
  // });
  // await Promise.all(dependenciesAndNewVersionsPromises)
  for (const [name, version] of Object.entries(dependencies)) {
    const newVersion = await pkgVersionManagerApi.getLatestVersion(name);
    if (newVersion && newVersion !== version) {
      updateableDependencies.push({ pkgName: name, oldVersion: version, newVersion });
    }
  }
  return updateableDependencies;
};
