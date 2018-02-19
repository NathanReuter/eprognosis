/**
 * Created by nathangodinho on 15/02/2018.
 */
const mongoose = require('mongoose');
const crypto = require('crypto');
// Export this in the future

const statesArray = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
  'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
const positionArray = ['zagueiro', 'ld', 'le', 'volante', 'meio campo', 'atacante'];
const categoryArray = ['profissional', 'juniores', 'juvenil'];
const addressSchema = {
  street: String,
  city: String,
  state: {
    type: String,
    uppercase: true,
    required: true,
    enum: statesArray
  },
  number: Number,
  complement: String,
  zip: Number
};

const patientMeasures = {
  weight: Number,
  height: Number
};

const career = {
  club: { type: String },
  position: { type: String, enum: positionArray },
  category: { type: String, enum: categoryArray }
};

const patientSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  gender: String,
  birthday: Date,
  phone: [String],
  cpf: { type: String, unique: true },
  rg: { type: String, unique: true },
  nationality: String,
  insurance: {
    name: String,
    code: Number
  },
  picture: String,
  email: { type: String, unique: true },
  tokens: Array,
  address: [addressSchema],
  career,
  patientMeasures
}, { timestamps: true });


/**
 * Helper method for getting user's gravatar.
 */
patientSchema.methods.gravatar = function gravatar(size) {
  if (this.picture) {
    return this.picture;
  }
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
