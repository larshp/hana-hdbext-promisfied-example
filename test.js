// @ts-check

import dbClass from './index.js'
/**
 * Test #1
 */
export async function test1() {

    let envFile = dbClass.resolveEnv(null)
    dbClass.createConnectionFromEnv(envFile)
        .then(client => {
            let db = new dbClass(client)
            db.preparePromisified(`SELECT SESSION_USER, CURRENT_SCHEMA 
                             FROM "DUMMY"`)
                .then(statement => {
                    db.statementExecPromisified(statement, [])
                        .then(results => {
                            console.table(results)
                        })
                        .catch(err => {
                            console.error(`ERROR: ${err.toString()}`)
                        })
                })
                .catch(err => {
                    console.error(`ERROR: ${err.toString()}`)
                })
        })
        .catch(err => {
            console.error(`ERROR: ${err.toString()}`)
        })
}
test1()

/**
 * Test #2
 */
export async function test2() {
    try {
        let db = new dbClass(await dbClass.createConnectionFromEnv(dbClass.resolveEnv(null)))
        const statement = await db.preparePromisified(`SELECT SESSION_USER, CURRENT_SCHEMA 
                                                     FROM "DUMMY"`)
        const results = await db.statementExecPromisified(statement, [])
        console.table(results)
    } catch (err) {
        console.error(`ERROR: ${err.toString()}`)
    }
}
test2()