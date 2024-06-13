const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Por favor informe o seu nome'],
    minLength: 3,
    maxLength: 32,
  },
  email: {
    type: String,
    required: [true, 'Por favor insira um email válido'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Por favor, nos informe como gostará de ser chamado'],
    minLenght: 3,
    maxLenght: 30,
  },
  birthDate: {
    type: Date,
    required: [true, 'Por favor, insira a sua data de nascimento corretamente'],
    validate: function (birthDate) {
      return new Date().getFullYear() - new Date(birthDate).getFullYear() > 18;
    },
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'manager', 'user'],
  },
  password: {
    type: String,
    required: [
      true,
      'Digita uma senha por favor com no mínimo 8 caracteres e no máximo 12',
    ],
    minLenght: 8,
    maxLenght: 12,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
userSchema.methods.createPassword = function (password) {
  this.password = crypto.createHash('sha256').update(password).digest('hex');
};

const User = mongoose.model('User', userSchema);

module.exports = User;
