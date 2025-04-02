// app/components/TodoList.js
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

// Function to fetch todos with pagination
async function getTodos(page = 1, limit = 10) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const res = await fetch(`${API_URL}/api/todos?page=${page}&limit=${limit}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch todos');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    return { todos: [], totalPages: 1 };
  }
}

export default function TodoList({ page = 1 }) {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('todoId');
  
  const [todos, setTodos] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    getTodos(page).then(({ todos = [], totalPages = 1 }) => {
      setTodos(todos);
      setTotalPages(totalPages);
    });
  }, [page]);
  
  if (todos.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Select a todo from the list to view details</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ul className="divide-y divide-gray-200">
        {todos.map((todo) => (
          <li key={todo._id} className={`todo-item ${selectedId === todo._id ? 'bg-blue-50' : ''}`}>
            <Link 
              href={`/?todoId=${todo._id}`}
              className="block p-4 hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-blue-600">{todo.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(todo.date).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="border-t border-gray-200 p-4 mt-auto">
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}