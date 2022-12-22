import database from 'database/database';
import ValidateObject from 'libraries/global/Validate';
import Sopa_de_letrasSchema from 'models/sopa_de_letras.schema';

export default async function API(req, res) {
	const { method } = req;
	await database();
	switch (method) {
		case 'GET':
			try {
				const sopa_de_letras = await Sopa_de_letrasSchema.find();
				res.status(200).json(sopa_de_letras);
			} catch ({ message }) {
				res.status(400).json({ error: message });
			}
			break;
		case 'POST':
			try {
				const body = await ValidateObject(req.body, ['sopa_de_letras']);
				const sopa_de_letras = new Sopa_de_letrasSchema(body);
				await sopa_de_letras.save();
				res.status(200).json(sopa_de_letras);
			} catch ({ message }) {
				res.status(400).json({ error: message });
			}
			break;
		case 'PUT':
			try {
				const { _id } = req.body;
				const body = await ValidateObject(req.body, ['sopa_de_letras']);
				const sopa_de_letras = await Sopa_de_letrasSchema.findOneAndUpdate({ _id }, body, { 
					new: true, 
				});
				res.status(200).json(sopa_de_letras);
			} catch ({ message }) {
				res.status(400).json({ error: message });
			}
			break;
		case 'DELETE':
			try {
				const { _id } = req.body;
				await Sopa_de_letrasSchema.findOneAndDelete({ _id });
				res.status(200).json({ ok: true });
			} catch ({ message }) {
				res.status(400).json({ error: message });
			}
			break;
		default:
			res.status(405).json({
				message: 'Method not allowed',
			});
			break;
	}
}
