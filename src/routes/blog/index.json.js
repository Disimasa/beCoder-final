import { init } from "../../db.js"

export async function get(req, res) {
	const { collection } = await init();
	const posts = await collection.find({}).toArray();
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(JSON.stringify(posts));
}

export async function post(req, res) {
	let { collection } = await init();
	await collection.insertOne(req.body)
	// console.log(req.body)
}