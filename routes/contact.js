const router = require('express').Router();
const Contact = require('../model/Contact');
const User = require('../model/User');

router.post('/', async (req,res) => {
    const contact = Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    try {
        const cont = await contact.save();
        res.send({
            data:cont,
            status:'Ok',
            message:'message send successfuly'
        });
    } catch (error) {
        res.status(400).send(error);
    }

});

router.get('/', async (req,res) => {
    try {
        const cont = await Contact.find();
        res.json(cont)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
