const mongo = require("mongodb");
const url = "mongodb://localhost"
const dbName = "sapper-starter"

let client = null;
let db = null;



export async function init() {
    if (!client){
        client = await mongo.MongoClient.connect(url);
        db = client.db(dbName)
    }
    return {client, db}
}