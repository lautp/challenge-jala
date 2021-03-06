const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('contact', ContactSchema);
