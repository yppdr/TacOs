
const express = require('express')
const mongoose = require('mongoose');
const body = require('body-parser')

let app = express();
let port = 3000;

app.use(body())

const Tacos = require('./tacos')


mongoose.connect('mongodb+srv://lowas:MDP@tacos.sheoh.gcp.mongodb.net/tacos?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', async (req, res) => {
    const tacos = await Tacos.find()
    await res.json(tacos)
})


app.post('/', async (req, res) => {
    const nom = req.body.nom; 
    const isok = req.body.isok;
    const date = req.body.date;
    const isdel = req.body.isdel;
 
    if (!nom || !isok  || !date || !isdel) { 
        res.send('Il manque un argument')
        return
    }
 
    const nouveau_tacos = new Tacos({ 
        nom : nom,
        isok : isok,
        date : date,
        isdel : isdel
    })
     
    await nouveau_tacos.save() 
    res.json(nouveau_tacos)
    return
 
})

app.patch('/:id', async(req, res) => {
    const id = req.params.id
    const tacos = await Tacos.findOne({_id : id})
     
    const nom = req.body.nom;
    const isok = req.body.isok
    const date  = req.body.date;
    const isdel  = req.body.isdel;
     
     
    if (nom) {
        tacos.nom = nom
    }
    if (isok) {
        tacos.isok = isok
    }
    if (date) {
        tacos.date = date
    }
    if (isdel) {
        tacos.isdel = isdel
    }
     
    await tacos.save()
     
    res.json(tacos) 
     
})
 
app.listen(port, () =>  { 
    console.log('API lancée ! Prépare ton tacos')
})