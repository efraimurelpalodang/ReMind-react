import { useState } from "react";

const NoteList = ({ notes }) => {
  const [klik, setKlik] = useState([]);

  const handleChangeClick = (e, i) => {
    const newClick = [...klik];
    newClick[i] = e.target.checked;
    setKlik(newClick)
  }

  return (
    <>
      <h5>Daftar Catatan</h5>
      {notes.length != 0 ? (
      <ul className="list-unstyled mt-4">
        {notes.map((note, i) => (
        <li key={i}>
          <div className={`alert ${klik[i] ? 'alert-success': 'alert-dark'} d-flex gap-2 align-items-center mb-2 overflow-x-hidden`} role="alert">
            <input type="checkbox" className="p-3" onChange={e => handleChangeClick(e, i)} value={klik}/>
            <span className="mb-1">{klik[i]? <s>{note}</s> : note}</span>
          </div>
        </li>
        ))}
      </ul>
      ) : (
      <figure className="text-center mt-5">
        <blockquote className="blockquote">
        <p>Ayo buat catatan pengingat kamu sekarang</p>
        </blockquote>
        <figcaption className="blockquote-footer">
        <cite title="Source Title">Catatan belum dibuat!!</cite>
        </figcaption>
      </figure>
      )}
    </>
  );
};

export default NoteList;
