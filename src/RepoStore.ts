//@ts-nocheck
// import { Database } from 'sqlite3';

// Needs a proper database.
class RepoStore {
  private db: Database;
  private tableName: string;
  constructor(sqllitedb: Database, tableName = 'inspectedRepos') {
    // CREATE  TABLE IF NOT EXISTS User (
    //   id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE  ,
    //   login TEXT NOT NULL ,
    //   pass TEXT NOT NULL ,
    //   creationDate NUMERIC NOT NULL ,
    //   authToken TEXT NULL REFERENCES TemporaryAuthTokens(authToken)
    //   );
    this.db = sqllitedb;
    this.tableName = tableName;
  }
  getRepo(repoName: string) {
    this.db.run(`SELECT FROM ${this.tableName} WHERE REPONAME='${repoName}'`);
  }
  updateRepo(repoName: string, newSHA: string, updatedPackages: string) {
    this.db.run(
      `UPDATE ${this.tableName} SET LASTCOMMITSHA='${newSHA}',UPDATEDPACKAGES='${updatedPackages}'  WHERE AND REPONAME='${repoName}'`,
    );
  }
  addRepo(repoName: string, commitSHA: string, updatedPackages: string) {
    this.db.run(
      `INSERT INTO ${this.tableName} (LASTCOMMITSHA,REPONAME,UPDATEDPACKAGES) VALUES ('${commitSHA}','${repoName}','${updatedPackages}')`,
    );
  }
  deleteRepo(repoName: string) {
    this.db.run(`DELETE FROM ${this.tableName} WHERE REPONAME='${repoName}'`);
  }
}
const RepoStoreFactory = (sqllitedb: Database, tableName = 'inspectedRepos') => {
  new RepoStore(sqllitedb, tableName);
};
export default RepoStore;
