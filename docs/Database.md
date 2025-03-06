# SQL Database Drivers

`global.apis.database.getConnection()` returns one of these, depending on which database is in use.

## SQLite

```javascript
export class SQLiteAdapter {
    constructor(db) {
        this.type = "sqlite";
        this.db = db;
    }

    async query(query, replace) {
        if (global.devMode) {
            console.info(query, replace);
        }
        return await this.db.all(query, replace);
    }

    async run(statement, replace) {
        if (global.devMode) {
            console.info(statement, replace);
        }
        return await this.db.run(statement, replace);
    }

    async exec(statement) {
        if (global.devMode) {
            console.info(statement);
        }
        return await this.db.exec(statement);
    }

    async exists(table, where, replace) {
        const q = await this.db.all("SELECT EXISTS(SELECT 1 FROM " + table + " WHERE " + where + ") as n", replace);
        if (q[0].n > 0) {
            return true;
        }
        return false;
    }

    async close() {

    }

    async tableExists(table) {
        return (await this.db.get(`SELECT count(name) AS cnt FROM sqlite_master WHERE type='table' AND name=?`, table)).cnt > 0;
    }

    /**
     * Get the version code set in the database by setSchemaVersion().
     */
    async getSchemaVersion() {
        var res = await this.db.all(`PRAGMA user_version`);
        return res[0].user_version;
    }

    /**
     * Set the database version, using PRAGMA user_version.  Must be an integer.
     */
    async setSchemaVersion(version) {
        await this.db.exec(`PRAGMA user_version = ${version}`);
    }

}
```

## MariaDB/MySQL

```javascript
export class MariaDBAdapter {
    constructor(connection) {
        this.type = "mariadb";
        this.conn = connection;
    }

    async query(query, replace) {
        if (global.devMode) {
            console.info(query, replace);
        }
        return await this.conn.query(query, replace);
    }

    async run(statement, replace) {
        if (global.devMode) {
            console.info(statement, replace);
        }
        return await this.query(statement, replace);
    }

    async exec(statement) {
        if (global.devMode) {
            console.info(statement);
        }
        return await this.run(statement);
    }

    async exists(table, where, replace) {
        const q = await this.query("SELECT EXISTS(SELECT 1 FROM " + table + " WHERE " + where + ") as n", replace);
        if (q[0].n > 0) {
            return true;
        }
        return false;
    }

    async close() {
        await this.conn.release();
    }

    async tableExists(table) {
        return (await this.query("SHOW TABLES LIKE ?", table)).length > 0;
    }

    /**
     * Get the version code set in the database by setSchemaVersion().  Returns zero if not set.
     */
    async getSchemaVersion() {
        if (await this.tableExists("database_metadata")) {
            var res = await this.query("SELECT `value` FROM database_metadata WHERE `key`='schema_version' LIMIT 1");
            console.log(res);
            console.log(res[0].value);
            if (res.length == 1) {
                return res[0].value;
            }
        }
        return 0;
    }

    /**
     * Set a version number for the database schema.
     * Must be an integer to maintain code compatibility with SQLite driver.
     * Will create a "database_metadata" table if required to store the version number.
     */
    async setSchemaVersion(version) {
        if (await this.tableExists("database_metadata")) {
            await this.query("REPLACE INTO `database_metadata` (`key`, `value`) VALUES (?, ?)", ["schema_version", version]);
        } else {
            await this.exec("CREATE TABLE IF NOT EXISTS `database_metadata` ( `key` VARCHAR(50) NOT NULL, `value` VARCHAR(255) NOT NULL DEFAULT '', PRIMARY KEY (`key`))");
            await this.setSchemaVersion(version);
        }
    }
}
```