/**
 * Created by nathangodinho on 15/02/2018.
 */
const mongoose = require('mongoose');

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
  club: { type: String, unique: true },
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


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
