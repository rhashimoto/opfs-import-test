import SQLiteESMFactory from 'wa-sqlite/dist/wa-sqlite.mjs';
import * as SQLite from 'wa-sqlite';
import { OPFSCoopSyncVFS as MyVFS } from 'wa-sqlite/src/examples/OPFSCoopSyncVFS.js';

(async function() {
  try {
    postMessage('Clearing OPFS');
    const root = await navigator.storage.getDirectory();
    for await (const entry of root.values()) {
      postMessage(`Removing ${entry.name}`);
      await root.removeEntry(entry.name, { recursive: true });
    }

    postMessage('Importing test.db');
    await fetch('test.db').then(async response => {
      const writable = await root.getFileHandle('test.db', { create: true });
      const writableStream = await writable.createWritable();
      await response.body.pipeTo(writableStream);
    });

    postMessage('Initializing wa-sqlite with OPFSCoopSyncVFS');
    const module = await SQLiteESMFactory();
    const sqlite3 = SQLite.Factory(module);
    const vfs = await MyVFS.create('MyVFS', module);
    sqlite3.vfs_register(vfs, true);

    postMessage('Opening test.db');
    const db = await sqlite3.open_v2('test.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, 'MyVFS');

    postMessage('Querying database');
    await sqlite3.exec(db, `SELECT * FROM foo`, (row, columns) => {
      postMessage(JSON.stringify(row));
    });
    await sqlite3.close(db);

    postMessage('Done');
  } catch (e) {
    postMessage(e.stack);
    throw e;
  }
})();
