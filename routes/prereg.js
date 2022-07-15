require('dotenv').config();
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const mailer = require('../services/mailer')

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
			//Aca va la logica que manda el email con el temporalCode para continuar con el registro
			
			if(mailer.sendEmail(email, "New account registered", "You have been registered in the system. Your temporal code is: " + temporalCode)){
				//La aplicacion a su vez deberia guardar el temporalCode en algun lado para luego comparar con el del usuario
				//Pero por ahora solo se muestra el mensaje de que el email fue enviado
				return res.status(201).send({ msg: 'Email sent' });
			}else{
				return res.status(404).send({
					error: "Couldn't send the email"
				})
			}
			

			

			

		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
