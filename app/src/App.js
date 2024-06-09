import React, { useState, useEffect } from 'react';

import api from './components/services/api';
import Notes from './components/Notes';
import RadioButton from './components/RadioButton';
import Modal from './components/Modal';

import './App.css';
import './global.css';
import './sidebar.css';
import './main.css';

function App() {
  /**
   * Funções e variáveis a serem usadas
   *
   * Prestar atenção em tudo que está declarada
   *    */
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [allNotes, setAllNotes] = useState([]);
  const [changedNote, setChangedNote] = useState('');
  const [open, setOpen] = useState(false);
  const [menssagem, setMenssagem] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /**
   * Função que seja executada apenas uma vez após a inicialização do app
   *
   * lembrar que ela é usada UMA VEZ APÓS A CONSTRUÇÃO
   */

  useEffect(() => {
    getAllNotes();
  }, []);

  async function getAllNotes() {
    try {
      const response = await api.get('/');

      const data = response.data.data;

      setAllNotes(data);
    } catch (err) {
      console.error(err.menssagem);
    }
  }
  const handleDeleteNote = async (id) => {
    try {
      const response = await api.delete(`/${id}`);
      if (response) {
        setMenssagem(response.data.menssagem);
        setAllNotes(allNotes.filter((note) => note._id !== id));

        handleOpen();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangedteNote = async (oldData, newData, id) => {
    if (oldData !== newData) {
      try {
        const response = await api.patch(`${id}`, { note: newData });

        console.log(response.data.menssagem);
      } catch (error) {
        console.error(error.status);
      }
    }
  };

  const handleChangedPriority = async (id, priority) => {
    try {
      const response = await api.patch(`${id}`, { priority: !priority });
      if (response.data.note) {
        const element = document.getElementById(`${id}`);
        const classes = element.classList;
        classes.toggle('priority');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterNotes = async (filter) => {
    if (filter === 'priority') {
      try {
        const response = await api.get('?priority=true');
        setAllNotes(response.data.data);
      } catch (err) {
        console.error(err);
      }
    } else if (filter === 'normal') {
      try {
        const response = await api.get('?priority=false');
        setAllNotes(response.data.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      getAllNotes();
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/', {
      name,
      note,
      active: true,
      priority: false,
    });

    setName('');
    setNote('');

    setAllNotes([...allNotes, response.data.data]);
  }
  useEffect(() => {
    function enableSubmitButton() {
      const btn = document.getElementById('btn-submit');
      const btnClasses = btn.classList;
      if (name && note) return btnClasses.add('enabled');

      btnClasses.remove('enabled');
    }
    enableSubmitButton();
  }, [name, note]);
  useEffect(() => {
    document.querySelector('html').setAttribute('lang', 'pt-BR');
  });

  return (
    <div id="app">
      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">Título da Anotação</label>
            <input
              required
              maxLength={32}
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></input>
            <div>
              <legend>{name.length}/32</legend>
            </div>
          </div>

          <div className="input-block">
            <label htmlFor="note">Anotação</label>
            <textarea
              maxLength={200}
              onChange={(event) => setNote(event.target.value)}
              required
              value={note}
              id="note"
              name="note"
            ></textarea>
            <div>
              <legend>{note.length}/200</legend>
            </div>
          </div>
          <button id="btn-submit" type="submit">
            Salvar
          </button>
        </form>
        <RadioButton filterNotes={filterNotes}></RadioButton>
      </aside>
      <main>
        <ul>
          {allNotes.map((data) => (
            <Notes
              key={data._id}
              handleDeleteNote={handleDeleteNote}
              handleChangedteNote={handleChangedteNote}
              setChangedNote={setChangedNote}
              data={data}
              handleChangedPriority={handleChangedPriority}
              changedNote={changedNote}
            ></Notes>
          ))}
        </ul>
        <Modal
          menssagem={menssagem}
          handleClose={handleClose}
          setOpen={setOpen}
          open={open}
        ></Modal>
      </main>
    </div>
  );
}

export default App;
