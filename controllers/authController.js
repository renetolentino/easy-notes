const User = require('../models/userModel');

exports.signUp = async (req, res, next) => {
  try {
    const newUser = new User({ ...req.body });
    // console.log('Estamos dentro do Try');
    newUser.createPassword(req.body.password);
    await newUser.setPassword(newUser.password);
    await newUser.save();
    const { user } = await User.authenticate()(
      newUser.username,
      newUser.password
    );
    // console.log(user);
    res.status(201).json({
      status: 'Sucesso',
      menssagem: 'Usuário criado com sucesso',
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Falha',
      menssagem: 'Erro ao criar usuário',
      error: error,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(404).json({
        status: 'Falha ao entrar',
        menssagem: 'Ao que parece, o usuário não existe.',
      });
    await User.authenticate()(req.body.username, req.body.password);
    // console.log(req.session);
    res.cookie('sessionID', req.sessionID);
    res.cookie('userID', user._id);
    res.status(200).json({
      status: 'Sucesso',
      sessionID: req.sessionID,
      menssagem: 'Usuário autenticado com sucesso',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'Falha',
      menssagem: 'Usuário ou senha inválido',
      error: error,
    });
  }
};

exports.protectedRoute = async (req, res, next) => {
  const sessionID = req.headers.authorization.split(' ')[1];
  const userID = req.headers.cookie.split('%3A%')[1].split('%')[0];
  const user = User.findOne({ _id: userID });
  //   console.log(userID);
  if (sessionID && user) return next();
  //   const user_id = req.headers.cookie.split('%')[2];
  //   console.log(user_id);
  res.status(400).json({
    status: 'Falha de autenticação',
    menssagem: 'Por favor, faça o login novamente',
  });
};
