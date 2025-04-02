// app/api/todos/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import mongoose from 'mongoose';

// Define Todo schema
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Get Todo Model (or create it if it doesn't exist)
const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

// GET handler - fetch all todos with pagination
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const totalTodos = await Todo.countDocuments();
    const todos = await Todo.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      todos,
      totalPages: Math.ceil(totalTodos / limit)
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST handler - create a new todo
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    if (!body.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const newTodo = new Todo({
      title: body.title,
      description: body.description || '',
      date: new Date(),
    });

    const savedTodo = await newTodo.save();
    return NextResponse.json(savedTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}