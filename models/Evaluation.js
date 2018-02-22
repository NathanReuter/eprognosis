/**
 * Created by nathangodinho on 21/02/2018.
 */
/**
 * Created by nathangodinho on 15/02/2018.
 */
const mongoose = require('mongoose');
const Patient = require('./Patient');

const backGrounds = {
  family: [String],
  personal: [String],
  surgery: [String],
  traumatic: [String]
};

const evaluationSchema = new mongoose.Schema({
  patient: mongoose.Schema.ObjectId,
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  dominance: { type: String, enum: ['destro', 'canhoto'] },
  backGrounds
});

evaluationSchema.pre('save', function save(next) {
  const evaluation = this;

  Patient.findById(evaluation.patient, (err, patient) => {
    patient.evaluations.push(evaluation._id);
    patient.save(next);
  });
});

evaluationSchema.virtual('created').get(() => {
  if (this._created) return this._created;
  return this._created = this._id.getTimestamp();
});
const Evaluation = mongoose.model('Evaluation', evaluationSchema);


module.exports = Evaluation;
