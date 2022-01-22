const router = require('express').Router();
const Skills = require('../model/Skills');
const User = require('../model/User');

router.post('/', async (req,res) => {
    const skill = Skills({
        category: req.body.category,
        name: req.body.name,
        image: req.body.image
    });
    try {
        const ski = await skill.save();
        res.send({
            data:ski,
            status:'Ok',
            message:'Skill added successfuly'
        });
    } catch (error) {
        res.status(400).send(error);
    }

});

router.get('/', async (req,res) => {
    try {
        const skill = await Skills.find();
        res.json(skill)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
