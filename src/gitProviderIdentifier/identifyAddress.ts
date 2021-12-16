import github from './conf/github';
import local from './conf/local';

const confs = { github, local };
export default (adress: string): { provider: string; repoName: string } => {
  for (const [provider, conf] of Object.entries(confs)) {
    const regex = new RegExp(conf.httpRegex);
    const matches = regex.exec(adress);

    if (matches !== null) {
      const repoName = matches[1];
      return { provider, repoName };
    }
  }
  throw new Error(`${adress} is not identified`);
};
