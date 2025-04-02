// app/api/todos/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

// Get Todo Model
const Todo = mongoose.models.Todo || mongoose.model('Todo', 
  new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    updatedAt: Date
  }, { timestamps: true })
);

// GET handler - fetch a single todo
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const todo = await Todo.findById(params.id);
    
    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT handler - update a todo
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    
    await connectDB();
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      params.id,
      { 
        ...body,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// DELETE handler - delete a todo
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const deletedTodo = await Todo.findByIdAndDelete(params.id);
    
    if (!deletedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}