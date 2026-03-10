import React, { useState } from 'react'
import Form from './components/Form'
import Container from './components/Container'
import NoteList from './components/NoteList'

const App = () => {
  const [notes, setNotes] = useState([]);

  const tambahCatatan = catatanBaru => {
    setNotes([
      ...notes,
      catatanBaru
    ]);
  }

  return (
    <>
      <Container>
        <Form tambahCatatan={tambahCatatan} />
        <NoteList notes={notes}/>
      </Container>
    </>
  );
}

export default App