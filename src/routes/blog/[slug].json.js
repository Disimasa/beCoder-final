import { init } from "../../db.js";

export async function get(req, res, next) {
	const { slug } = req.params;
	const { db } = await init()
	const post = await db.collection("posts").findOne({slug});
	if (post) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify(post));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
