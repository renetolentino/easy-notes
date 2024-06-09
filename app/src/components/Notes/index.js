import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { BsExclamationCircleFill } from 'react-icons/bs';
import './style.css';
import './priority-notes.css';

function Notes({
  data,
  handleDeleteNote,
  handleChangedteNote,
  setChangedNote,
  changedNote,
  handleChangedPriority,
}) {
  /**
   *
   * @param {object} data informa a nota que está sendo passada
   * @returns String retorna a string contendo a classe
   */
  const handlePriorityClass = (data) => {
    if (data.priority) return 'notepad-infos priority';
    return 'notepad-infos';
  };

  return (
    <>
      <li id={data._id} className={handlePriorityClass(data)}>
        <div>
          <strong>{data.name}</strong>
          <div>
            <FaRegTrashCan
              className="delete-icon"
              onClick={() => handleDeleteNote(data._id)}
              id={'delete-icon-' + data._id}
            />
          </div>
        </div>

        <textarea
          onBlur={() => handleChangedteNote(changedNote, data.note, data._id)}
          onChange={(e) => setChangedNote(e.target.value)}
          defaultValue={data.note}
        ></textarea>
        <div className="lower-icons">
          <span>
            <BsExclamationCircleFill
              className="important-icon"
              onClick={() => handleChangedPriority(data._id, data.priority)}
              id={`change-priority-${data._id}`}
            />
          </span>
        </div>
      </li>
    </>
  );
}

export default Notes;
