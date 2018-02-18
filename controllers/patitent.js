const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Patient = require('../models/Patient');

/**
 * POST /admin/user
 * Patients Page
 */
exports.getPatientsPage = (req, res, next) => {
  Patient.find({}, (err, patients) => {
    if (err) {
      return next(err);
    }
    res.render('treatment/patient/patients', {
      title: 'Paciente',
      patients
    });
  });
};

exports.getNewPatientPage = (req, res) => {
  res.render('treatment/patient/newpatient', {
    title: 'Novo Paciente'
  });
};


exports.postNewPatient = (req, res, next) => {
  const body = req.body;
  const patientData = {
    name: body.name,
    gender: body.gender,
    birthday: body.birthday,
    phone: body.phone,
    cpf: body.cpf,
    rg: body.rg,
    nationality: body.nationality,
    insurance: {
      name: body.insuranceName,
      code: body.insuranceCode
    },
    email: body.email,
    address: {
      street: body.street,
      city: body.city,
      state: body.state,
      number: body.number,
      complement: body.complement,
      zip: body.zip
    },
    career: {
      club: body.club,
      position: body.position,
      category: body.category
    }
  };

  newPatient = new Patient(patientData);
  Patient.findOne({ cpf: patientData.cpf }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      req.flash('errors', { msg: 'Um paciente com o mesmo cpf já foi cadastrado' });
      return res.redirect('/treatment/newtreatment');
    }
    newPatient.save((err) => {
      if (err) { return next(err); }
      res.redirect('/treatment/patients');
    });
  });
};
