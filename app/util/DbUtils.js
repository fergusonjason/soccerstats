import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);

open = (dbparams) => {

    return SQLite.openDatabase({ name: dbparams.name, createFromLocation: dbparams.createFromLocation });

}

close = (db) => {
    db.close(() => {
        console.log("Database closed")
    }, (err) => {
        console.warn("Error closing database: Code: " + err.code + ", message: " + err.message);
    });
}

query = async (db, sql, params) => {

    console.log("Entered query: db: " + JSON.stringify(db));

    if (db === undefined) {
        console.log("DB is undefined inside query");
    }

    // figured this out from https://stackoverflow.com/questions/47345000/react-native-handling-async-calls-to-sqllite-db
    // TODO: Fix this so that it just returns an array, not {result: []}
    return new Promise((resolve, reject) => {

        db.transaction((tx) => {
            console.log("Beginning transaction");
            tx.executeSql(sql, params, (tx, rs) => {
                let length = rs.rows.length;
                let result = [];

                for (i = 0; i < length; i++) {
                    result.push(rs.rows.item(i));
                }

                resolve({ result });
            }, (err) => { console.log("Error in transaction: code: " + err.code + ", message: " + err.message) });


        });
    });

}


execute = (db, sql, params) => {

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(sql, params, (tx, rs) => {
                let rowsAffected = rs.rowsAffected;
                console.log("Rows affected: " + rowsAffected);
                resolve({ rowsAffected });
            })
        }, (err) => {
            console.log("Error in transaction: code: " + err.code + ", message: " + err.message);
        });
    });

}

close = (db) => {
    db.close(() => {
        console.log("Database closed")
    }, (err) => {
        console.log("Unable to close database: code: "+ err.code + ", message: " + err.message);
    });
}

export { open, close, query, execute };