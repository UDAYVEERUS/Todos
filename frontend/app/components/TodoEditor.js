'use client';

import { useState } from 'react';

export default function TodoEditor({ todo }) {
  const [title, setTitle] = useState(todo?.title || 'New Additions');
  const [content, setContent] = useState(todo?.description || 'To stay representative of framework & new example apps.');

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {/* Formatting Toolbar */}
      <div className="flex items-center gap-1 mb-4">
        <button className="p-1 hover:bg-gray-100 rounded min-w-[24px] text-center">
          <span className="font-bold">B</span>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded min-w-[24px] text-center">
          <span className="italic">I</span>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded min-w-[24px] text-center">
          <span className="underline">U</span>
        </button>
        <div className="h-6 w-px bg-gray-300 mx-1" />
        <button className="p-1 hover:bg-gray-100 rounded min-w-[24px] text-center">
          <span>⌗</span>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded min-w-[24px] text-center">
          <span>≡</span>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded min-w-[24px] text-center">
          <span>≡</span>
        </button>
        <div className="h-6 w-px bg-gray-300 mx-1" />
        <button className="p-1 hover:bg-gray-100 rounded min-w-[24px] text-center">
          <span>•</span>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded min-w-[24px] text-center">
          <span>1.</span>
        </button>
        <div className="h-6 w-px bg-gray-300 mx-1" />
        <button className="p-1 hover:bg-gray-100 rounded min-w-[24px] text-center">
          <span className="font-mono text-sm">Tt</span>
        </button>
      </div>

      {/* Content Area */}
      <div 
        className="min-h-[200px] focus:outline-none text-gray-700"
        contentEditable
        suppressContentEditableWarning
      >
        {content}
      </div>
    </div>
  );
} 