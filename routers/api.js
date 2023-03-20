const express = require('express');
const Stand = require('../models/stand');
const router = express.Router();

// get a list of stands from the db
router.get('/stands', (req, res) => {
    Stand.geoNear(
        {type: 'Point', coordinates:[req.query.lng, req.query.lat]},
        {maxDistance: 100000, spherical:true}
    ).then((stand) => {
        res.send(stand);
    });
}) 

// add a new ninjas to the db
router.post('/stands', (req, res, next) => {
    console.log("check out data in post");
    console.log(req.body);
   Stand.create(req.body).then(stand=>{
    res.send(stand);
   }).catch(next);
})

// update a ninjas in the db
router.put('/stands/:id', (req, res) => {
    Stand.findByIdAndUpdate({_id: req.params.id}, req.body).then(stand => {
        res.send(stand);
    })
})

// delete a ninjas from the db
router.delete('/stands/:id', (req, res) => {
    Stand.findByIdAndRemove({_id: req.params.id}).then(() =>{
        Stand.findOne({_id:req.params.id}).then((stand)=>{
            res.send(stand);
        })
    })
})

module.exports = router;