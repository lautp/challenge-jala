const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const Contact = require('../model/Contact');

// @route    GET    api/contact
// @desc    Get all contacts
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const contact = await Contact.find();
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST    api/contact
// @desc    Create new contact
// @access  Private

router.post(
	'/',
	auth,
	[
		[
			body('name', 'Enter a valid name').not().isEmpty(),
			body('email', 'Enter a valid email').isEmail(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}

		const { name, email } = req.body;

		let id = 1;

		try {
			const newContact = new Contact({
				user: req.user.id,
				id,
				name,
				email,
			});

			const contact = await newContact.save();

			res.json(contact);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Post error');
		}
	}
);

// @route   PUT    api/contact/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
	const { name, email } = req.body;

	//Create object "contact"

	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;

	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ msg: 'Contact not found' });

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		);

		res.json(contact);
	} catch (err) {
		console.error(err.msg);
		res.status(500).send('server error');
	}
});

// @route    DELETE    api/contact/:id
// @desc    Delete contact
// @access  Public
router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ msg: 'Contact not found' });

		await Contact.findByIdAndRemove(req.params.id);

		res.json({
			msg: 'Contact removed',
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
