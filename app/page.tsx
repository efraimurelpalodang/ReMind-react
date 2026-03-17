'use client'
import { useState, useEffect } from "react";
import StackedList from "./components/StackedList";
import FormInput from "./components/FormInput";
import Footer from "./components/Footer"; // Import Footer

export default function Home() {
  const [lists, setLists] = useState<string[]>([]);

  // Load dari localStorage saat mount
  useEffect(() => {
    const saved = localStorage.getItem('shopping-list')
    if (saved) {
      setLists(JSON.parse(saved))
    }
  }, [])

  // Save ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem('shopping-list', JSON.stringify(lists))
  }, [lists])

  const addList = (newItem: string) => {
    if (!newItem.trim()) return
    setLists(prev => [...prev, newItem.trim()]);
  };

  const deleteList = (index: number) => {
    setLists(prev => prev.filter((_, i) => i !== index));
  };

  const editList = (index: number, newText: string) => {
    setLists(prev => prev.map((item, i) => i === index ? newText : item));
  };

  const toggleComplete = (index: number) => {
    setLists(prev => prev.map((item, i) => {
      if (i === index) {
        if (item.startsWith('[DONE]')) {
          return item.replace('[DONE]', '')
        } else {
          return '[DONE]' + item
        }
      }
      return item
    }));
  };

  // Handler baru untuk clear semua
  const clearAll = () => {
    setLists([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="md:w-3/4 max-w-2xl mx-auto">
        <FormInput onAdd={addList}/>
        <StackedList 
          lists={lists}
          onDelete={deleteList}
          onEdit={editList}
          onToggleComplete={toggleComplete}
        />
        {/* Tambah Footer di sini */}
        <Footer />
      </div>
    </div>
  );
}