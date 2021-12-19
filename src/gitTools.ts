// // @ts-nocheck
// // not used for now
// // this is a global file parser that uses git natively. I made this to don't write gitProviderApis but later i gave up and wrote them
// import simpleGit, { GitError, SimpleGit } from 'simple-git';
// import fs from 'fs';
// import util from 'util';

// const mkdirPromise = util.promisify(fs.mkdir);
// const rmdirPromise = util.promisify(fs.rmdir);
// type GitRepo = {
//   HeadSHA: string;
//   remote: string;
// };

// class GitRepoContainer {
//   /**
//    * Using last commit's sha as key.
//    */
//   repos: Map<string, GitRepo>;

//   directory: string;

//   git: SimpleGit;

//   constructor(directory: string, git: SimpleGit, existingRepos?: Map<string, GitRepo>) {
//     createTmpFolder(directory);
//     this.repos = existingRepos || new Map();
//     this.directory = directory;
//     this.git = git;
//   }

//   update(HeadSHA: string) {}

//   deleteRepo(HeadSHA: string) {
//     const repo = this.repos.get(HeadSHA);
//     rmdirPromise(rmdirPromise);
//     this.repos.delete(HeadSHA);
//   }

//   deleteContainer() {}

//   /**
//    * Gets directory information of repo
//    * @param gitRepo Local repo like file:////home/user/gitRepo or any remote adress.
//    */
//   async cloneRepo(gitRepoAddress: string) {
//     let isFileAlreadyCloned = false;
//     const cloned = await this.git.clone(gitRepoAddress).catch((err) => {
//       if (err instanceof GitError && err.message.includes('already exists')) {
//         isFileAlreadyCloned = true;
//       }
//     });
//     // cloned.
//     const config = await this.git.getConfig('remote.origin.url');
//     config.value;
//     if (isFileAlreadyCloned) {
//     }
//   }
// }
// const createTmpFolder = async (folderLoc: string) => {
//   const isFolderExists = fs.existsSync(folderLoc);
//   if (!isFolderExists) await mkdirPromise(folderLoc);
//   else console.info('/tmp/gitDependencyBot already created.');
// };
// const c = new GitRepoContainer('/tmp/gitDependencyBot/31', simpleGit('/tmp/gitDependencyBot/31'));
// c.deleteContainer();
// export default GitRepoContainer;
