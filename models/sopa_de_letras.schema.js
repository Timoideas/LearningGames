import { Schema, model, models } from 'mongoose';
import validator from 'mongoose-unique-validator';
const Sopa_de_letrasSchema = new Schema({
	sopa_de_letras: { type: String },
});
Sopa_de_letrasSchema.plugin(validator, { message: 'El {PATH} debería ser único' });
export default models.Sopa_de_letras || model('Sopa_de_letras', Sopa_de_letrasSchema);

