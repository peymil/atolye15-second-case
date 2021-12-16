import node from './identifierConfs/node';
import php from './identifierConfs/php';

export type PkgManagerBase = { language: string; pkgManagers: string[]; pkgManagerFiles: string[] };

const pkgManagerConfs: PkgManagerBase[] = [node, php];

export default pkgManagerConfs;
