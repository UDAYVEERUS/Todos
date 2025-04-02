// app/components/TodoDetailForm.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TodoDetailForm({ todo }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: todo.title,
    description: todo.description
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Auto-save with debounce
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/todos/${todo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to update todo');
      }

      router.refresh(); // Refresh the page data
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Use debounced update
  const debouncedUpdate = debounce(handleUpdate, 500);

  // Update form and trigger debounced save
  const handleInputChange = (e) => {
    handleChange(e);
    debouncedUpdate();
  };

  return (
    <div className="flex-grow space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      
      <div className="text-right">
        {isUpdating && <span className="text-sm text-gray-500 mr-2">Saving...</span>}
        <p className="text-sm text-gray-500">
          Last updated: {new Date(todo.updatedAt || todo.date).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}