require('dotenv').config();
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const User = require('../model/User');

// @ruta    POST    api/users
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

			if (user) {
				return res.status(400).json({ msg: 'Email already exists' });
			}

			const temporalCode = crypto.randomUUID().slice(0, 6);

			res.json(temporalCode);

			//Aca va la logica que manda el email con el temporalCode para continuar con el registro

			//La aplicacion a su vez deberia guardar el temporalCode en algun lado para luego comparar con el del usuario
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
