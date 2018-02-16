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
