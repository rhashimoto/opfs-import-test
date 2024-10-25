# opfs-import-test
* Clone this repo.
* `yarn install`
* `yarn start`
* Open browser on dev server URL.

Sample output:
```
12:22:54.064 Clearing OPFS
12:22:54.066 Removing test.db-wal
12:22:54.069 Removing test.db-journal
12:22:54.070 Removing test.db
12:22:54.070 Removing .ahp-j3gxze5cd5
12:22:54.072 Importing test.db
12:22:54.078 Initializing wa-sqlite with OPFSCoopSyncVFS
12:22:54.113 Opening test.db
12:22:54.120 Querying database
12:22:54.129 ["foo"]
12:22:54.130 ["bar"]
12:22:54.130 ["baz"]
12:22:54.130 Done
```
