const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	id: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	name: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('contact', ContactSchema);
