'use client'

import { useState } from "react"

const FormInput = ({ onAdd }: FormInputProps) => {
  const [val, setVal] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(val);
    setVal('');
  }

  return (
    <>
      <h1 className="text-5xl"><i>R</i>emind</h1>
      <form className="mt-2.5 mb-7 flex gap-2" onSubmit={handleFormSubmit}>
        <input type="text" value={val} onChange={e => setVal(e.target.value)} placeholder="Ketik disini...." className="block flex-auto w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500" />
        <button type="submit" className="block flex-1 w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Tambah</button>
      </form>
    </>
  )
}

export default FormInput