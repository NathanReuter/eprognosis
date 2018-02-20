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
      title: 'Pacientes',
      patients
    });
  });
};

exports.getPatientPage = (req, res, next) => {
  const patientid = req.query.patientid;

  console.log('patientid', patientid);
  Patient.findById(patientid, (err, patient) => {
    if (err) {
      return next(err);
    }
    res.render('treatment/patient/patient', {
      title: 'Paciente',
      patient
    });
  });
};

exports.getNewPatientPage = (req, res) => {
  res.render('treatment/patient/newpatient', {
    title: 'Novo Paciente'
  });
};

exports.getNewPatientPicturePage = (req, res, next) => {
  const patientid = req.query.patientid;

  Patient.findById(patientid, (err, patient) => {
    if (err || !patient) { next(err); }
    res.render('treatment/patient/newpatientPicture', {
      title: 'Novo Paciente Etapa 2',
      patient
    });
  });
};


exports.postNewPatient = (req, res, next) => {
  const body = req.body;
  const newPatient = new Patient({
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
  });

  Patient.findOne({ cpf: newPatient.cpf }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      req.flash('errors', { msg: 'Um paciente com o mesmo cpf já foi cadastrado' });
      return res.redirect('/treatment/newpatient');
    }
    newPatient.save((err, patient) => {
      if (err) {
        if (err.message) {
          req.flash('errors', { msg: err.message });
          return res.redirect('/treatment/newpatient');
        }
        return next(err);
      }
      res.redirect(`/treatment/newpatientpicture?patientid=${patient._id}`);
    });
  });
};

exports.updatePatientPhoto = (req, res, next) => {
  const patientid = req.query.patientid;
  const uploadedPhotoPath = `/${req.file.path}`;

  Patient.findById(patientid, (err, patient) => {
    if (err) { return next(err); }
    patient.picture = uploadedPhotoPath;
    patient.save((err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Foto Adicionada com Sucesso' });
      res.redirect('/treatment/newpatientpicture?patientid='.concat(patientid));
    });
  });
};


exports.getRemovePatient = (req, res, next) => {
  const patientid = req.query.patientid;

  Patient.remove({ _id: patientid }, (err) => {
    if (err) { return next(err); }
    req.flash('success', { msg: 'Paciente Removido' });
    res.send({ location: '/treatment/patients' });
  });
};
