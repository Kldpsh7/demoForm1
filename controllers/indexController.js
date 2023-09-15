const path = require('path')
const Appointment = require('../models/appointments');
const { where } = require('sequelize');

module.exports.getIndex = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','index.html'))
}

module.exports.getAppointments = (req,res,next) => {
    Appointment.findAll()
    .then(apmt=>{
        res.json(apmt)
    })
    .catch(err=>console.log(err))
}

module.exports.postAppointments = (req,res,next) => {
    Appointment.create({
        name:req.body.name,
        email:req.body.mail,
        phone:req.body.phone
    })
    .then(()=>res.redirect('/'))
    .catch(err=>console.log(err))
}

module.exports.deleteAppointments = (req,res,next) => {
    const delId = req.query.id;
    Appointment.findAll({where:{id:delId}})
    .then(apt=>{
        return apt[0].destroy()
    })
    .then(()=>res.redirect('/'))
    .catch(err=>console.log(err))
}

module.exports.editAppointments = (req,res,next) => {

}