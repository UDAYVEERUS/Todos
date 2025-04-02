// app/components/TodoDetail.js
import { Suspense } from 'react';
import TodoDetailForm from './TodoDetailForm';

// Function to fetch a single todo
async function getTodo(id) {
  if (!id) return null;

  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://your-production-api.com' 
    : 'http://localhost:5000';
  
  const res = await fetch(`${API_URL}/api/todos/${id}`, {
    cache: 'no-store' // Don't cache this data
  });
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

export default async function TodoDetail({ searchParams }) {
  const todoId = searchParams?.todoId;
  
  if (!todoId) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Select a todo from the list to view details</p>
      </div>
    );
  }

  const todo = await getTodo(todoId);
  
  if (!todo) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Todo not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6">Todo Details</h2>
      <TodoDetailForm todo={todo} />
    </div>
  );
}