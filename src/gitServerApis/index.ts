import * as github from './github';
import * as local from './local';
type gitServerApiBase = {
  searchForFile: (repoName: string, fileName: string) => Promise<string | undefined>;
  getLatestCommitSha: (packageName: string) => Promise<string | undefined>;
};
const gitServerApiMap = new Map<string, gitServerApiBase>();
gitServerApiMap.set('github', github);
gitServerApiMap.set('local', local);
export default gitServerApiMap;
