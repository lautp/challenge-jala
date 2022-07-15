require('dotenv').config();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const auth = require('../middleware/auth');

// @ruta		GET			api/users
// @desc		Get list of registered users
// @acceso	Public
router.get('/', async (req, res) => {
	try {
		const user = await User.find({});
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @ruta    PUT    api/users
// @desc    Finish register process
// @acceso  Public
router.put(
	'/:id',
	[
		body('name', 'Ingrese un nombre valido').not().isEmpty(),
		body('email', 'Ingrese un email valido').isEmail(),
		body('password', 'Ingrese un password de 6 caracteres o mas').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const { name, username, password } = req.body;

		//Crea el objeto "user"

		const userFields = {};
		if (name) userFields.name = name;
		if (username) userFields.username = username;

		const salt = await bcryptjs.genSalt(10);
		if (password) userFields.password = await bcryptjs.hash(password, salt);

		userFields.temporalCode = 'null';

		try {
			let user = await User.findById(req.params.id);

			user = await User.findByIdAndUpdate(
				req.params.id,
				{ $set: userFields },
				{ new: true }
			);

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				process.env.jwtSecret,
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);

			res.json(user);
		} catch (err) {
			console.error(err.msg);
			res.status(500).send('server error');
		}
	}
);

// @route   DELETE    api/user/:id
// @desc    Delete user
// @acceso  Private
router.delete('/:id', auth, async (req, res) => {
	try {
		let user = await User.findById(req.params.id);

		if (!user) return res.status(404).json({ msg: 'User not found' });

		await User.findByIdAndRemove(req.params.id);

		res.json({
			msg: 'User removed',
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
