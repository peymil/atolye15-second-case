// Caches repo's updateable dependencies.
import { Knex } from 'knex';

type RepoInterface = {
  LASTCOMMITSHA: string;
  REPONAME: string;
  UPDATEDPACKAGES: string;
};
// This is a repo store to cache previously parsed updateable dependencies.
class RepoStore {
  private db: Knex;

  private tableName: string;

  constructor(sqllitedb: Knex, tableName = 'inspectedRepos') {
    this.db = sqllitedb;
    this.tableName = tableName;
  }

  async getRepo(repoName: string): Promise<RepoInterface | undefined> {
    const repo = await this.db(this.tableName).select<RepoInterface[]>().where('REPONAME', repoName);
    return repo[0];
  }

  async updateRepo(repoName: string, newSHA: string, updatedPackages: string) {
    const results = await this.db(this.tableName)
      .update({ LASTCOMMITSHA: newSHA, UPDATEDPACKAGES: updatedPackages })
      .where('REPONAME', repoName);
    return results;
  }

  async addRepo(repoName: string, commitSHA: string, updatedPackages: string) {
    const results = await this.db(this.tableName).insert({
      LASTCOMMITSHA: commitSHA,
      REPONAME: repoName,
      UPDATEDPACKAGES: updatedPackages,
    });
    return results;
  }

  async deleteRepo(repoName: string) {
    const results = await this.db(this.tableName).delete().where('REPONAME', repoName);
    return results;
  }
}
export default async (sqllitedb: Knex, tableName = 'inspectedRepos'): Promise<RepoStore> => {
  const isTableExists = await sqllitedb.schema.hasTable(tableName);
  if (!isTableExists) {
    await sqllitedb.schema.createTable(tableName, (table) => {
      table.increments('ID');
      table.string('LASTCOMMITSHA');
      table.string('REPONAME');
      table.string('UPDATEDPACKAGES');
    });
  }

  return new RepoStore(sqllitedb, tableName);
};
