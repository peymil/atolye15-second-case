//@ts-nocheck
// import { Database } from 'sqlite3';
// This is a subscriber store to handle cronjobs and subscribers.
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
