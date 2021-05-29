const express = require('express');
const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json());
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/latihan',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const isi = new mongoose.Schema({
    dekripsi:String,
})
const tampil=mongoose.model('tes',isi);
const tp={};
const ini=[];
app.get('/',async(req, res)=>{
    res.sendFile('from.html',{root:__dirname})
})
app.post('/todo',async(req, res)=>{
    const tpl =new tampil(req.body);
    try{
        tpl.save();
        console.log(tpl)
    }catch(error) { res.status(500).send(error)}
    res.end();
})
app.get('/todo',async(req,res)=>{
    await tampil.find({},(err,data)=>{
        res.send(data);
    }).exec();
})
app.listen(4000,console.log('running'))
