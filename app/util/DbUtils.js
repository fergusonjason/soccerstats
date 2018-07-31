import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

open = (dbparams) => {

    return SQLite.openDatabase({ name: dbparams.name, createFromLocation: dbparams.createFromLocation });

}

close = (db) => {

    db.close(() => {
        console.log("Database closed")
    }, (err) => {
        console.warn("Error closing database: Code: " + err.code + ", message: " + err.message + "(" + JSON.stringify(err) + ")");
    });

}

query = async (db, sql, params) => {

    console.log("Entered query: db: " + JSON.stringify(db));

    if (db === undefined) {
        console.log("DB is undefined inside query");
    }

    // figured this out from https://stackoverflow.com/questions/47345000/react-native-handling-async-calls-to-sqllite-db
    // TODO: Fix this so that it just returns an array, not {result: []}
    let queryResult = new Promise((resolve, reject) => {

        db.readTransaction((tx) => {
            console.log("Beginning transaction");

            tx.executeSql(sql, params, (tx, rs) => {
                let totalRows = rs.rows.length;
                let result = [];

                for (i = 0; i < totalRows; i++) {
                    result.push(rs.rows.item(i));
                }

                resolve({ result, totalRows });
            }, (err) => { 
                console.log("Error occured executing sql: code: " + err.code + ", message: " + err.message + "(" + JSON.stringify(err) + ")");

            });


        });
    });

    return await queryResult;
}


execute = async (db, sql, params) => {

    console.log("Entered execute()");

    let result =  new Promise((resolve, reject) => {
        db.transaction((tx) => {
            console.log("Beginning transaction");
            tx.executeSql(sql, params, (tx, rs) => {

                let hasErrors = false;
                let errorMessage = "";
                let sqliteErrorCode = -1;
                let rowsAffected = rs.rowsAffected;
                
                resolve({hasErrors, errorMessage, sqliteErrorCode, rowsAffected});

            });
        }, (err) => {
            console.log("Error occured in sql: code: " + err.code + ", message: " + err.message);

            // use a regular expression to extract the error message and sqlite error code
            let message = err.message;
            let regex = /^(.*) \(code (\d+)\)$/g;
            let regexResult = regex.exec(message);

            let hasErrors = true;
            let errorMessage = regexResult[1];
            let sqliteErrorCode = new Number(regexResult[2]);
            let rowsAffected = 0;

            resolve({hasErrors, errorMessage, sqliteErrorCode, rowsAffected});
        });
    });


    let queryResult = await result;

    console.log("Exiting execute(), queryResult: " + JSON.stringify(queryResult));
    return queryResult;

}

/**
 * Query method that returns a promise. Used so that redux/thunk don't get pissy.
 * 
 * SQLite object's enablePromise must be true for this to work
 * 
 * @async
 * @function
 * @param {string} sql for method to execute
 * @param {array} params parameters for sql statement
 * @returns {Promise<array>} The array of objects returned by the query
 */
queryPromise = async (sql, params) => {

    console.log(`Entered queryPromise, sql: ${sql}, params: ${params} `);

    // enable promise has to be true
    let db = null;

    let dbPromise2 = SQLite.openDatabase({ name: "stats.db", createFromLocation: "~soccerstats.db" });

    let results = dbPromise2.then((resolvedDb) => {
        // this is a dirty way of doing this, but I need the resolved db for the next peice of the chain
        db = resolvedDb; 
        return query(db, sql, params);
    }).then((queryResults) => {
        close(db);
        
        return queryResults;
    })

    return results;
}

/**
 * Function to execute a sql statement
 * 
 * @async
 * @function
 * @param {string} sql sql statement to execute (UPDATE, DELETE, INSERT)
 * @param {Array<string>} params params for the SQL statement
 * @returns {Promise<object>} object with the following keys: hasErrors, errorMessage, sqlLiteErrorCode, rowsAffected
 */
function executePromise(sql, params) {

    let db = null;

    let dbPromise2 = SQLite.openDatabase({ name: "stats.db", createFromLocation: "~soccerstats.db" });

    let results = dbPromise2.then((resolvedDb) => {
        db = resolvedDb;
        return execute(db, sql, params);
    }).then((queryResults) => {
        close(db);
        return queryResults;
    });

    return results;

}

export { open, close, query, execute, queryPromise, executePromise };