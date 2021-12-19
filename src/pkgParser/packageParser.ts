import FileTypes from './constants/fileTypes';
import fileParsers from './fileParsers';
import node from './pkgParserConfs/node';
import php from './pkgParserConfs/php';
// type parserConfs = {
//   devDependency: string[];
//   dependency: string[];
// };
export type NonUpdatedDepsObj = { [key: string]: string };

type PkgParserBase = {
  dependencyKey: string;
  devDependencyKey: string;
  fileType: FileTypes;
};
const parserMap = new Map<string, PkgParserBase>();
parserMap.set('node', node);
parserMap.set('php', php);

/**
 *
 * @param pkgProvider
 * @param text
 * @returns
 */
const packageParser = (pkgProvider: string, text: string): NonUpdatedDepsObj => {
  const parserConf = parserMap.get(pkgProvider);

  if (!parserConf) throw new Error('Not Implemented');
  // If parsing package versions are complicated a custom parser can be added to pkgConf under pkgFileConfs folder in later versions.
  const { dependencyKey, devDependencyKey, fileType } = parserConf;
  const fileParser = fileParsers[fileType];

  // We are parsing text to json (it can be toml,json)
  const pkgFileObj = fileParser(text) as { [key: string]: { [key: string]: string } };
  return {
    ...pkgFileObj[dependencyKey],
    ...pkgFileObj[devDependencyKey],
  };
};
export default packageParser;
