'use client'

import { useState } from 'react'
import { Check, Trash2, Edit2, X, MoreVertical } from 'lucide-react'

const StackedList = ({ lists, onDelete, onEdit, onToggleComplete }: StackedListProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')
  const [activeMenu, setActiveMenu] = useState<number | null>(null)

  const handleEditStart = (index: number, currentText: string) => {
    setEditingIndex(index)
    setEditValue(currentText)
    setActiveMenu(null)
  }

  const handleEditSave = (index: number) => {
    if (editValue.trim()) {
      onEdit(index, editValue)
    }
    setEditingIndex(null)
    setEditValue('')
  }

  const handleEditCancel = () => {
    setEditingIndex(null)
    setEditValue('')
  }

  return (
    <>
      <h1 className="text-2xl mb-3 font-semibold text-white">Daftar Catatan</h1>
      
      {lists.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Belum ada catatan. Tambahkan item pertama!</p>
        </div>
      ) : (
        <ul role="list" className="grid gap-3 max-w-full">
          {lists.map((list, i) => {
            const isCompleted = list.startsWith('[DONE]')
            const displayText = isCompleted ? list.replace('[DONE]', '') : list
            const isEditing = editingIndex === i

            return (
              <li 
                key={i} 
                className={`
                  flex items-center justify-between gap-x-4 p-4 rounded-lg border max-w-full transition-all duration-200
                  ${isCompleted 
                    ? 'bg-emerald-500/10 border-emerald-500/30 opacity-75' 
                    : 'bg-white/5 border-gray-600 hover:bg-white/10'
                  }
                `}
              >
                {isEditing ? (
                  // Mode Edit
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 rounded-md bg-white/10 px-3 py-2 text-base text-white outline-1 outline-white/20 focus:outline-2 focus:outline-indigo-500"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleEditSave(i)
                        if (e.key === 'Escape') handleEditCancel()
                      }}
                    />
                    <button
                      onClick={() => handleEditSave(i)}
                      className="p-2 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="p-2 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  // Mode View
                  <>
                    {/* Checkbox & Text */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => onToggleComplete(i)}
                        className={`
                          shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                          ${isCompleted 
                            ? 'bg-emerald-500 border-emerald-500' 
                            : 'border-gray-500 hover:border-emerald-400'
                          }
                        `}
                      >
                        {isCompleted && <Check size={14} className="text-white" />}
                      </button>
                      
                      <p className={`
                        text-lg truncate transition-all duration-200
                        ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-200'}
                      `}>
                        {displayText}
                      </p>
                    </div>

                    {/* Actions Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === i ? null : i)}
                        className="p-2 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenu === i && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                          <button
                            onClick={() => handleEditStart(i, displayText)}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-2 transition-colors"
                          >
                            <Edit2 size={14} />
                            Edit
                          </button>
                          
                          <button
                            onClick={() => {
                              onDelete(i)
                              setActiveMenu(null)
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                          >
                            <Trash2 size={14} />
                            Hapus
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default StackedList