import { init } from "../../db.js";

export async function get(req, res, next) {
	const { slug } = req.params;
	const { collection } = await init()
	const post = await collection.findOne({slug});

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
