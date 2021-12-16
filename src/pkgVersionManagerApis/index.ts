// export interface classApi {
//   apiLocation: string;
//   getLatestVersion: (pkg: string) => string;
//   parsePackageFile: (packageFile: string) => { [key: string]: string };
// }
import npm from './npm';
import packagist from './packagist';

type PkgVersionManagerBase = {
  //   fetchRegistryInfo: (packageName: string) => { [key: string]: any };
  //   parseRegistryInfo: (resJson: { [key: string]: any }) => string[] | undefined;
  getLatestVersion: (packageName: string) => Promise<string | undefined>;
};
const exportMap = new Map<string, PkgVersionManagerBase>();
exportMap.set('npm', npm);
exportMap.set('packagist', packagist);

export default exportMap;
