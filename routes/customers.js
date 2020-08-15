const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers)
});

router.get('/:id',async (req,res) => {
    const customer = await Customer.findById(req.params.id);

    if(!customer) return res.status(404).send('The customer with the given ID was not found');

    res.send(customer);
});

router.post('/', auth, async (req,res) => {
    const validationResult = validate(req.body);
    if(validationResult.error) return res.status(400).send(validationResult.error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        paidMember: req.body.paidMember
    });
    
    await customer.save();
    res.send(customer);
});

router.put('/:id', auth, async (req,res) => {
    //validation
    const validationResult = validate(req.body);
    if(validationResult.error) return res.status(400).send(validationResult.error.details[0].message);
    
    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        email: req.body.email,
        paidMember: req.body.paidMember 
    }, 
    {
        new: true,
        useFindAndModify: false
    });

    //looks if id is valid
    if(!customer) return res.status(404).send('The record with the given ID was not found');
    
    res.send(customer);
});

router.delete('/:id', [auth, admin], async (req,res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id, {
        useFindAndModify: false
    });
    if(!customer) return res.status(404).send('The customer with the given ID was not found');
    
    res.send(customer);
});

module.exports = router;