import fileParsers from './fileParsers';
import node from './pkgParsers/node';
import php from './pkgParsers/php';
// type parserConfs = {
//   devDependency: string[];
//   dependency: string[];
// };
export type NonUpdatedDepsObj = {
  deps: string[];
  devDeps?: string[];
};
const parserConfs = { node, php };
/**
 *
 * @param pkgProvider
 * @param text
 * @returns
 */
const packageParser = (pkgProvider: keyof typeof parserConfs, text: string): NonUpdatedDepsObj => {
  const parserConf = parserConfs[pkgProvider];
  if (!parserConf) throw new Error('Not Implemented');
  //If parsing package versions are complicated a custom parser can be added to pkgConf under pkgFileConfs folder in later versions.
  const { dependencyKey, devDependencyKey, fileType } = parserConf;
  const fileParser = fileParsers[fileType];
  const pkgFileObj = fileParser(text);
  return {
    deps: pkgFileObj[dependencyKey],
    devDeps: pkgFileObj[devDependencyKey],
  };
};
export default packageParser;
