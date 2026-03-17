'use client'
import { useState, useEffect } from "react";
import StackedList from "./components/StackedList";
import FormInput from "./components/FormInput";

export default function Home() {
  const [lists, setLists] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('shopping-list')
    if (saved) {
      setLists(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("shopping-list", JSON.stringify(lists));
  }, [lists]);

  const addList = (newItem: string) => {
    if (!newItem.trim()) return 
    setLists(prev => [...prev, newItem.trim()]);
  };

  const deleteList = (index: number) => {
    setLists(prev => prev.filter((_, i) => i !== index));
  };

  const editList = (index: number, newText: string) => {
    setLists((prev) => prev.map((item, i) => (i === index ? newText : item)));
  };

  const toggleComplete = (index: number) => {
    setLists((prev) =>
      prev.map((item, i) => {
      if (i === index) {
        return item.startsWith("[DONE]")
        ? item.replace("[DONE]", "") 
        : "[DONE]" + item; 
      }
      return item;
      }),
    );
  };

  return (
    <div className="md:w-3/4 w-sm mx-auto mt-7">
      <FormInput onAdd={addList} />
      <StackedList lists={lists} onDelete={deleteList} onEdit={editList} onToggleComplete={toggleComplete} />
    </div>
  );
}
