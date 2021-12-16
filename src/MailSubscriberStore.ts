//@ts-nocheck
// import { Database } from 'sqlite3';

// Needs a proper database.
class MailSubscriberStore {
  private db: Database;
  private tableName: string;
  constructor(sqllitedb: Database, tableName = 'subscribers') {
    this.db = sqllitedb;
    this.tableName = tableName;
    this.db.run('');
  }
  addSubscriber(repoName: string, email: string) {
    this.db.run(`INSERT INTO ${this.tableName} (EMAIL, REPONAME) VALUES ('${email}','${repoName}')`);
  }
  removeSubscriber(repoName: string, email: string) {
    this.db.run(`DELETE FROM ${this.tableName} WHERE EMAIL='${email}' AND REPONAME='${repoName}'`);
  }
  findSubscriber(repoName: string, email: string) {
    this.db.run(`SELECT FROM ${this.tableName} WHERE EMAIL='${email}' AND REPONAME='${repoName}'`);
  }
}
export default MailSubscriberStore;
