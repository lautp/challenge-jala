require('dotenv').config();
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../model/Message');

// @ruta		GET			api/messages
// @desc		Get list of messages
// @acceso	Public
router.get('/', async (req, res) => {
	try {
		const { email } = req.body;
		const messages = await Message.find({ email });
		res.json(messages);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @ruta    POST    api/messages
// @desc    Add message
// @acceso  Public
router.post(
	'/',
	auth,
	[
		[
			body('name', 'Enter a name').not().isEmpty(),
			body('email', 'Enter an email').isEmail(),
			body('text', 'Enter a message').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}

		const { name, email, text } = req.body;

		try {
			const newMessage = new Message({
				user: req.user.id,
				name,
				email,
				text,
			});

			const message = await newMessage.save();

			res.json(message);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Post error');
		}
	}
);

// @route   DELETE    api/user/:id
// @desc    Delete user
// @acceso  Private
// router.delete('/:id', auth, async (req, res) => {
// 	try {
// 		let user = await User.findById(req.params.id);

// 		if (!user) return res.status(404).json({ msg: 'User not found' });

// 		await User.findByIdAndRemove(req.params.id);

// 		res.json({
// 			msg: 'User removed',
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('server error');
// 	}
// });

module.exports = router;
