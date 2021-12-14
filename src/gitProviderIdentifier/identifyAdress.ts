import github from './conf/github';
import local from './conf/local';

const confs = { github, local };
export const identifyAdress = (adress: string) => {
  for (const [provider, conf] of Object.entries(confs)) {
    const regex = new RegExp(conf.httpRegex);
    const matches = adress.match(regex);
    if (matches === null) break;
    const repoName = matches[1];
    return { provider, repoName };
  }
  throw new Error(adress + ' is not identified');
};
