/**
 * Created by nathangodinho on 22/02/2018.
 */
const Evaluation = require('../models/Evaluation');
const Patient = require('../models/Patient');

exports.postCreateEvaluation = (req, res, next) => {
  const body = req.body;
  const evaluation = new Evaluation(body);

  evaluation.backGrounds.family = body.familyBackground;
  evaluation.backGrounds.personal = body.personalBackground;
  evaluation.backGrounds.surgery = body.surgeryBackground;
  evaluation.backGrounds.traumatic = body.traumaticBackground;

  evaluation.save((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', { msg: 'Avaliação Cadastrada' });
    res.redirect(`/treatment/patient?patientid=${body.patient}`);
  });
};

exports.getCreateEvalutionPage = (req, res, next) => {
  const patientid = req.query.patientid;

  Patient.findById(patientid, (err, patient) => {
    if (err) {
      return next(err);
    }
    res.render('treatment/evaluation/createevaluation', {
      title: 'Nova Avaliação',
      patient
    });
  });
};

