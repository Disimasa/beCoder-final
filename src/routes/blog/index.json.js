import { init } from "../../db.js"

export async function get(req, res) {
	const { db } = await init();
	console.log(db)
	const posts = await db.collection("posts").find({}).toArray();
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	console.log(JSON.stringify(posts))
	res.end(JSON.stringify(posts));
}