// app/components/CreateTodoButton.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateTodoModal from './CreateTodoModal';

export default function CreateTodoButton() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTodo = async ({ title, description }) => {
    setIsCreating(true);
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim()
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create todo');
      }

      // Close modal first to avoid UI jump
      setIsModalOpen(false);
      
      // Then update the UI
      router.refresh();
      router.push(`/?todoId=${data._id}`);
    } catch (error) {
      console.error('Error creating todo:', error);
      alert(error.message || 'Failed to create todo. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Create new todo"
      >
        +
      </button>

      <CreateTodoModal
        isOpen={isModalOpen}
        onClose={() => !isCreating && setIsModalOpen(false)}
        onSubmit={handleCreateTodo}
      />
    </>
  );
}