import { init } from "../../db.js"

export async function get(req, res) {
	const { collection } = await init();
	const posts = await collection.find({}).toArray();
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(JSON.stringify(posts));
}