const router = require('express').Router()
const {User} = require('../models')
const {signToken} = require('../utils/auth')

router.get('/', async(req, res) => {
    try{
      const result = await User.find({});
      res.status(200).json(result);
    }catch(err){
      res.status(500).json(err);
    }
})

router.get('/:id', async(req, res) => {
    try{
        const result = await User.find({_id: req.params.id})
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/login', async(req, res) => {
    try{
        const result = await User.find({username: req.body.username})
        const token = signToken(result)
        if(await result[0].isCorrectPassword(req.body.password)){
            res.status(200).json({token, result})
        }else{
            res.status(400).json({})
        }
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/', async(req, res) => {
    try{
        const newUser = new User(req.body)
        await newUser.save()
        const token = signToken(newUser)
        res.status(200).json({token, newUser})
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const result = await User.findOneAndDelete({_id: req.params.id})
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id', async(req, res) => {
    try{
        const result = await User.findOneAndUpdate({_id: req.params.id}, req.body)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router