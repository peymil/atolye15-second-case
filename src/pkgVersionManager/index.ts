// export interface classApi {
//   apiLocation: string;
//   getLatestVersion: (pkg: string) => string;
//   parsePackageFile: (packageFile: string) => { [key: string]: string };
// }
import * as npm from './npm';
import * as packagist from './packagist';

export default { npm, packagist };
