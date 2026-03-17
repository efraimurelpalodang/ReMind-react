interface FormInputProps {
  onAdd: (newItem: string) => void
} 

interface Item {
  id: number
  text: string
  completed: boolean
}

interface StackedListProps {
  lists: string[]
  onDelete: (index: number) => void
  onEdit: (index: number, newText: string) => void
  onToggleComplete: (index: number) => void
}