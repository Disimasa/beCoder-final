const MongoClient = require('mongodb').MongoClient;
const dbName = "sapper-starter"
const uri = `mongodb+srv://testUser:pWuqZpfeMMsTwHVZ@cluster0.3b7lw.mongodb.net/${dbName}?retryWrites=true&w=majority`;

let client = null;
let collection = null

export async function init() {
    if (!collection || !client) {
        client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        await client.connect();
        collection = client.db(dbName).collection("posts");
    }
    return {client, collection};
}