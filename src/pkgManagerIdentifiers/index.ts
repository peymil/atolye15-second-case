import node from './identifierConfs/node';
import php from './identifierConfs/php';

export type pkgManagerBase = { language: string; pkgManagers: string[]; pkgManagerFiles: string[] };

const pkgManagerConfs: pkgManagerBase[] = [node, php];

export default pkgManagerConfs;
