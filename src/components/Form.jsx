import { useState } from "react";

const Form = ({tambahCatatan}) => {
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    tambahCatatan(note);
    setNote('');
  } 

  const handleOnChange = e => {
    setNote(e.target.value);
  }

  return (
    <>
      <form className="mb-5" onSubmit={handleSubmit}>
        <div>
          <h1>Buku Catatan Pengingat</h1>
          <div className="d-flex gap-1 mt-3">
            <input type="text" onChange={handleOnChange} value={note} className="form-control" placeholder="Masukkan Daftar Catatan..." />
            <button type="submit" className="btn btn-outline-success">
            Tambah
            </button>
          </div>
        </div>
      </form>
    </>
    );
};

export default Form;
