require('dotenv').config();
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const mailer = require('../services/mailer');

// @ruta    POST    api/prereg
// @desc    Start register process
// @acceso  Public
router.post(
	'/',
	[body('email', 'Enter a valid email').isEmail()],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				error: errors,
			});
		}
		const { email } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user && user.password !== 'null') {
				return res.status(400).json({ msg: 'Email already exists' });
			}

			const temporalCode = crypto.randomUUID().slice(0, 6);

			const name = 'null';
			const password = 'null';
			const username = 'null';

			// if user exists update if not create new user
		
			user2 = new User({
				name,
				email,
				password,
				username,
				temporalCode,
			});
			if (!user) {
				console.log('no exists');
				await user2.save();
			} else {
				console.log('exists');
				await User.findOneAndUpdate(
					{ email },
					{ $set: { temporalCode } },
				);
			}
			//Aca va la logica que manda el email con el temporalCode para continuar con el registro
			if (
				mailer.sendEmail(
					email,
					'New account registered',
					'You have been registered in the system. Your temporal code is: ' +
						temporalCode
				)
			) {
				return res.status(201).send({ msg: 'Email sent' });
			} else {
				return res.status(404).send({
					error: "Couldn't send the email",
				});
			}
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    GET    api/prereg
// @desc    Continue register process
// @acceso  Public
router.get('/:temporalCode', async (req, res) => {
	try {
		const temporalCode = req.params.temporalCode;
		const user = await User.find({ temporalCode });
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
