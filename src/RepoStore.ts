//@ts-nocheck
// import { Database } from 'sqlite3';

import { Database } from 'sqlite3';

// This is a repo store to cache previously parsed updateable dependencies.
class RepoStore {
  private db: Database;
  private tableName: string;
  constructor(sqllitedb: Database, tableName = 'inspectedRepos') {
    this.db = sqllitedb;
    this.tableName = tableName;
  }
  getRepo(repoName: string) {
    this.db.run(`SELECT FROM ${this.tableName} WHERE REPONAME='${repoName}'`, (err, row) => {
      console.log('row', row);
    });
  }
  updateRepo(repoName: string, newSHA: string, updatedPackages: string) {
    this.db.run(
      `UPDATE ${this.tableName} SET LASTCOMMITSHA='${newSHA}',UPDATEDPACKAGES='${updatedPackages}'  WHERE AND REPONAME='${repoName}'`,
      (err, row) => {
        console.log('row', row);
      },
    );
  }
  addRepo(repoName: string, commitSHA: string, updatedPackages: string) {
    this.db.run(
      `INSERT INTO ${this.tableName} (LASTCOMMITSHA,REPONAME,UPDATEDPACKAGES) VALUES ('${commitSHA}','${repoName}','${updatedPackages}')`,
      (err, row) => {
        console.log('row', row);
      },
    );
  }
  deleteRepo(repoName: string) {
    this.db.run(`DELETE FROM ${this.tableName} WHERE REPONAME='${repoName}'`, (err, row) => {
      console.log('row', row);
    });
  }
}
export const RepoStoreFactory = async (sqllitedb: Database, tableName = 'inspectedRepos') => {
  sqllitedb.run(
    `CREATE TABLE IF NOT EXISTS tableName (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE  ,UPDATEDPACKAGES TEXT NOT NULL ,LASTCOMMITSHA varchar(255) NOT NULL )`,
    (err, res) => {
      console.log('err', err);
    },
  );
  return new RepoStore(sqllitedb, tableName);
};
