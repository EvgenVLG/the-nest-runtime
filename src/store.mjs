import {DatabaseSync} from 'node:sqlite';
export class Store{
  constructor(path=':memory:'){
    this.db=new DatabaseSync(path);
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS state(key TEXT PRIMARY KEY,value TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS operations(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        correlation_id TEXT NOT NULL,
        outcome TEXT NOT NULL,
        evidence TEXT,
        created_at TEXT NOT NULL
      );
    `);
  }
  get(key,fallback=null){
    const row=this.db.prepare('SELECT value FROM state WHERE key=?').get(key);
    return row?JSON.parse(row.value):fallback;
  }
  set(key,value){
    this.db.prepare('INSERT INTO state(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(key,JSON.stringify(value));
  }
  record({correlation_id,outcome,evidence}){
    this.db.prepare('INSERT INTO operations(correlation_id,outcome,evidence,created_at) VALUES(?,?,?,?)')
      .run(correlation_id,outcome,evidence?JSON.stringify(evidence):null,new Date().toISOString());
  }
  close(){this.db.close();}
}
