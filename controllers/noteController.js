const Note = require('../models/noteModel');

exports.createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    return res.status(201).json({
      Status: 'Sucesso!',
      data: note,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Status: 'Falha',

      menssagem: 'Algo deu muito errado, tente novamente mais tarde',
    });
  }
};

exports.getAllNotes = async (req, res) => {
  console.log(req.query);
  if (req.query.priority === 'false') {
    try {
      const notes = await Note.find({ priority: { $ne: true } });
      return res.status(200).json({
        Status: 'Sucesso',
        data: notes,
      });
    } catch (err) {
      console.error(err);
      res.send(500).json({
        Status: 'Falha',
        menssagem: 'Algo deu muito errado, por favor tente mais tarde',
      });
    }
  } else if (req.query.priority === 'true') {
    try {
      const notes = await Note.find({ priority: { $eq: true } });
      return res.status(200).json({
        Status: 'Sucesso',
        data: notes,
      });
    } catch (err) {
      console.error(err);
      res.send(500).json({
        Status: 'Falha',
        menssagem: 'Algo deu muito errado, por favor tente mais tarde',
      });
    }
  } else {
    try {
      const notes = await Note.find().sort({ priority: 'desc' });
      return res.status(200).json({
        Status: 'Sucesso',
        data: notes,
      });
    } catch (err) {
      console.error(err);
      res.send(500).json({
        Status: 'Falha',
        menssagem: 'Algo deu muito errado, por favor tente mais tarde',
      });
    }
  }
};

exports.changeNote = async (req, res) => {
  const chaves = Object.keys(req.body);
  try {
    const note = await Note.findOne({ _id: req.params.id });
    chaves.forEach((key) => {
      note[key] = req.body[key];
    });
    const result = await note.save();
    return res.status(200).json({
      Status: 'Sucesso',
      menssagem: 'Nota atualizada com sucesso',
      result,
      note,
    });
  } catch (err) {
    res.status(400).json({
      Status: 'Falha',
      menssagem: 'algo deu muito errado aqui',
    });
  }
};

exports.deleteNote = async (req, res) => {
  console.log(req.params.id);
  try {
    const response = await Note.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: 'Sucesso',
      menssagem: 'Nota deletada com sucesso',
      response,
    });
  } catch (err) {
    res.status(400).json({
      Status: 'Falha',
      menssagem: 'Algo deu errado',
    });
  }
};
