import * as github from './github';
import * as local from './local';

export type GitServerApiBase = {
  searchForFile: (repoName: string, fileName: string) => Promise<string | undefined>;
  getLatestCommitSha: (packageName: string) => Promise<string | undefined>;
};
const gitServerApiMap = new Map<string, GitServerApiBase>();
gitServerApiMap.set('github', github);
gitServerApiMap.set('local', local);
export default gitServerApiMap;
